<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable" ref="tableRef" :show-summary="true" :summary-data="sumdata" :rowSelection="rowSelection">
            <!--插槽:table标题-->
            <template #tableTitle>
                <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
                <a-button @click="handlePrice"> 生成价格</a-button>
                <a-button @click="handlePublish"> 批量发布</a-button>
                <a-button @click="handleFenpei"> 批量分配</a-button>

                <a-dropdown v-if="selectedRowKeys.length > 0">
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" @click="batchHandleDelete">
                                <Icon icon="ant-design:delete-outlined"></Icon>
                                删除
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button
                        >批量操作
                        <Icon icon="mdi:chevron-down"></Icon>
                    </a-button>
                </a-dropdown>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
            <!--字段回显插槽-->
            <template #htmlSlot="{ text }">
                <div v-html="text"></div>
            </template>
            <!--省市区字段回显插槽-->
            <template #pcaSlot="{ text }">
                {{ getAreaTextByCode(text) }}
            </template>
            <template #fileSlot="{ text }">
                <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
                <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)"
                    >下载</a-button
                >
            </template>
        </BasicTable>
        <!-- 表单区域 -->
        <SzjjBusiMainModal @register="registerModal" @success="handleSuccess"></SzjjBusiMainModal>
        <LogModal @register="registerlog" @success="handleSuccess"></LogModal>
        <OrderModal @register="registerOrder" @success="handleSuccess"></OrderModal>

        <a-modal title="发布时间" v-model:visible="timeVisible" :confirm-loading="confirmLoading" @ok="handleOkTime" @cancel="cancelOkTime">
            <TimePicker
                v-model:value="btim"
                v-model:open="timeOpen1"
                format="HH:mm"
                style="padding: 20px 0 20px 20px; width: 200px"
                placeholder="请选择今天开始时间"
            >
                <template #addon>
                    <a-button size="small" type="primary" @click="timeOpen1 = false">确认</a-button>
                </template>
            </TimePicker>
            -
            <TimePicker
                v-model:value="etim"
                v-model:open="timeOpen2"
                format="HH:mm"
                style="padding: 20px 0 20px 20px; width: 200px"
                placeholder="请选择今天结束时间"
            >
                <template #addon>
                    <a-button size="small" type="primary" @click="timeOpen2 = false">确认</a-button>
                </template>
            </TimePicker>
        </a-modal>
    </div>
</template>

<script lang="ts" name="szjj-szjjBusiMain" setup>
import { ref, computed, unref } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useModal } from '/@/components/Modal'
import { useListPage } from '/@/hooks/system/useListPage'
import SzjjBusiMainModal from './components/SzjjBusiMainModal.vue'
import LogModal from './components/ModalLog.vue'
import OrderModal from './components/ModalOrder.vue'
import { defHttp } from '/@/utils/http/axios'
import { message, TimePicker } from 'ant-design-vue'
import { columns, searchFormSchema } from './SzjjBusiMain.data'
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, copymain, getSumInfo } from './SzjjBusiMain.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import moment from 'moment'

const sumdata = ref<any>([])
//注册model
const [registerModal, { openModal }] = useModal()

const [registerlog, { openModal: openModalLog }] = useModal()
const [registerOrder, { openModal: openModalOrder }] = useModal()

const timeVisible = ref(false)
const confirmLoading = ref(false)

// 发布开始时间和结束时间
const btim = ref('')
const etim = ref('')
const timeOpen1 = ref(false)
const timeOpen2 = ref(false)

//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: 'szjj_busi_main',
        api: list,
        columns,
        canResize: false,
        showIndexColumn: true,
        formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
            autoSubmitOnEnter: true,
            showAdvancedButton: false,

            fieldMapToNumber: [],
            fieldMapToTime: []
        },
        actionColumn: {
            width: 230,
            fixed: 'right'
        },
        beforeFetch(params) {
            //params.depId = departId.value;
            console.log('============json:' + JSON.stringify(params))
            getTableSum(params)
        },
        rowKey: 'id',
        rowSelection: {
            type: 'checkbox'
        }
    },
    exportConfig: {
        name: '猪源数据',
        url: getExportUrl
    },
    importConfig: {
        url: getImportUrl,
        success: handleSuccess
    }
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext
async function getTableSum(queryParam) {
    const rsp_data = await getSumInfo(queryParam)
    rsp_data._row = ''
    rsp_data._index = ''
    rsp_data.id = -1
    //rsp_data.username='合计：';
    //console.log(JSON.stringify(rsp_data));
    sumdata.value = [rsp_data]
}
/**
 * 新增事件
 */
function handleAdd() {
    openModal(true, {
        isUpdate: false,
        showFooter: true
    })
}

/**
 * 生成价格
 */
function handlePrice() {
    defHttp.post({ url: '/szjj/szjjBusiMain/genprice', params: { flg: '1' } }).then((res) => {
        reload()
    })
}

/**
 * 发布时间
 */
function handleOkTime() {
    // 如果没有选择时间, 则提示
    if (!btim.value || !etim.value) {
        return message.warning('请选择开始时间和结束时间')
    }

    confirmLoading.value = true
    const fbtim = moment(btim.value).format('YYYY-MM-DD HH:mm')
    const fetim = moment(etim.value).format('YYYY-MM-DD HH:mm')

    const ids = selectedRowKeys.value.join(',')
    defHttp
        .post({ url: '/szjj/szjjBusiMain/publishBatch', params: { btim: fbtim, etim: fetim, ids } })
        .then(() => {
            timeVisible.value = false
            reset()
            reload()
        })
        .finally(() => {
            confirmLoading.value = false
        })
}

function reset() {
    btim.value = ''
    etim.value = ''
}

/**
 * 发布
 */
function handlePublish() {
    // 如果没有选择数据, 则提示
    if (selectedRowKeys.value.length == 0) {
        return message.warning('请选择需要发布的数据')
    }

    timeVisible.value = true
}

// 监听timeVisible关闭
function cancelOkTime() {
    timeVisible.value = false
    reset()
}

/**
 * 批量分配
 */
function handleFenpei() {
    // 如果没有选择数据, 则提示
    if (selectedRowKeys.value.length == 0) {
        return message.warning('请选择需要分配的数据')
    }

    const ids = selectedRowKeys.value.join(',')

    defHttp.post({ url: '/szjj/szjjBusiMain/preAllotBatch', params: { ids } }).then(() => {
        reload()
    })
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
    openModal(true, {
        record,
        isUpdate: true,
        showFooter: true
    })
}
/**
 * 详情
 */
function handleDetail(record: Recordable) {
    openModal(true, {
        record,
        isUpdate: true,
        showFooter: false
    })
}
function openLogDlg(record: Recordable) {
    openModalLog(true, {
        record,
        isUpdate: true,
        showFooter: false
    })
}

function openOrderDlg(record: Recordable) {
    openModalOrder(true, {
        record,
        isUpdate: true,
        showFooter: false
    })
}

/**
 * 删除事件
 */
async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess)
}
async function handleCopymain(record) {
    await copymain({ id: record.id }, handleSuccess)
    reload()
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess)
}
/**
 * 成功回调
 */
function handleSuccess() {
    ;(selectedRowKeys.value = []) && reload()
}
/**
 * 操作栏
 */
function getTableAction(record) {
    return [
        {
            label: '详情',
            onClick: handleDetail.bind(null, record)
        },
        {
            label: '复制',
            onClick: handleCopymain.bind(null, record)
        },
        {
            ifShow: record['auditing'] == '0', //||record["state"]=='2',
            label: '编辑',
            onClick: handleEdit.bind(null, record)
        },
        {
            label: '竞拍',
            ifShow: record['state'] == '2' || record['state'] == '1', //||record["state"]=='1', 拍卖中不显示
            onClick: openLogDlg.bind(null, record)
        },
        {
            label: '订单',
            ifShow: record['state'] == '2',
            onClick: openOrderDlg.bind(null, record)
        },
        {
            label: '作废',
            ifShow: record['auditing'] == '0' || record['state'] == '0' || record['state'] == '1',
            popConfirm: {
                title: '是否确认作废？一旦作废将不能恢复！',
                confirm: handleDelete.bind(null, record)
            }
        }
    ]
}
/**
 * 下拉操作栏 状态 -1：未发布 0：未开拍 1：拍卖中， 2：拍卖完成
 */
function getDropDownAction(record) {
    return [
        {
            ifShow: record['auditing'] == '0', //||record["state"]=='2',
            label: '编辑',
            onClick: handleEdit.bind(null, record)
        },
        {
            label: '竞拍',
            ifShow: record['state'] == '2', //||record["state"]=='1', 拍卖中不显示
            onClick: openLogDlg.bind(null, record)
        },
        {
            label: '订单',
            ifShow: record['state'] == '2',
            onClick: openOrderDlg.bind(null, record)
        },
        {
            label: '作废',
            ifShow: record['auditing'] == '0' || record['state'] == '0' || record['state'] == '1',
            popConfirm: {
                title: '是否确认作废？一旦作废将不能恢复！',
                confirm: handleDelete.bind(null, record)
            }
        }
    ]
}
//console.log("xxxxxxxxxxx:"+$refs.tableRef);
//$refs.tableRef.hideColumn($refs.tableRef.getColumnByField('pigcnt'))
</script>

<style scoped></style>
