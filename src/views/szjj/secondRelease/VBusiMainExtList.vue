<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable" :rowSelection="rowSelection">
            <!--插槽:table标题-->
            <template #tableTitle>
                <a-button type="primary" :disabled="selectedRowKeys.length == 0" @click="showSelectedRowKeys" preIcon="ant-design:plus-outlined">
                    批量二次发布</a-button
                >
                <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
                <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
                <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
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
                </a-dropdown> -->
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
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
        <VBusiMainExtModal @register="registerModal" @success="handleSuccess"></VBusiMainExtModal>

        <a-modal v-model:visible="selectedRowKeysVisible" title="批量二次发布" @ok="handleSelectedRowKeys">
            <div style="padding: 16px">
                <span>今日竞拍时间: </span>
                <!-- <a-range-picker
                    :show-time="{ format: 'HH:mm:ss' }"
                    format="YYYY-MM-DD HH:mm:ss"
                    :placeholder="['开始竞拍时间', '结束竞拍时间']"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledDateTime"
                    @ok="onOkTime"
                /> -->

                <a-time-picker
                    placeholder="开始竞拍时间"
                    :disabledHours="disabledHours"
                    :disabledMinutes="disabledMinutes"
                    :disabledSeconds="disabledSeconds"
                    @change="onOkTime($event, 'btim')"
                    v-model:open="timePickerOpen1"
                >
                    <template #addon>
                        <a-button size="small" type="primary" @click="timePickerOpen1 = false">确认</a-button>
                    </template>
                </a-time-picker>
                -
                <a-time-picker
                    placeholder="结束竞拍时间"
                    :disabledHours="disabledHours"
                    :disabledMinutes="disabledMinutes"
                    :disabledSeconds="disabledSeconds"
                    v-model:open="timePickerOpen2"
                    @change="onOkTime($event, 'etim')"
                >
                    <template #addon>
                        <a-button size="small" type="primary" @click="timePickerOpen2 = false">确认</a-button>
                    </template>
                </a-time-picker>
            </div>
            <a-table :dataSource="dataSource" :columns="tableColumns" :pagination="false">
                <template #appendcnt="{ record }">
                    <div class="editable-cell">
                        <div class="editable-cell-input-wrapper">
                            <a-input-number v-model:value="record.appendcnt" :min="0" />
                        </div>
                    </div>
                </template>
            </a-table>
        </a-modal>
    </div>
</template>

<script lang="ts" name="xmsale-vBusiMainExt" setup>
import { ref, computed, unref } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useModal } from '/@/components/Modal'
import { useListPage } from '/@/hooks/system/useListPage'
import VBusiMainExtModal from './components/VBusiMainExtModal.vue'
import { columns, searchFormSchema } from './VBusiMainExt.data'
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './VBusiMainExt.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import { defHttp } from '/@/utils/http/axios'
import moment, { Moment } from 'moment'
import { message } from 'ant-design-vue'

const timePickerOpen1 = ref(false)
const timePickerOpen2 = ref(false)

//注册model
const [registerModal, { openModal }] = useModal()
const tableColumns = [
    {
        title: '订单号',
        dataIndex: 'order',
        key: 'order'
    },
    {
        title: '剩余头数',
        dataIndex: 'diffpigcnt',
        key: 'diffpigcnt'
    },
    {
        title: '追加头数',
        dataIndex: 'appendcnt',
        key: 'appendcnt',
        slots: { customRender: 'appendcnt' }
    }
]

const dataSource = ref<any>([])
const selectedRowKeysVisible = ref(false)
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: 'v_busi_main_ext',
        api: list,
        columns,
        canResize: false,
        showIndexColumn: true,
        defSort: {
            column: ''
        },
        formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
            fieldMapToNumber: [],
            fieldMapToTime: []
        },
        actionColumn: {
            width: 160,
            fixed: 'right'
        }
    },
    exportConfig: {
        name: 'v_busi_main_ext',
        url: getExportUrl
    },
    importConfig: {
        url: getImportUrl,
        success: handleSuccess
    }
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

const onOkTime = (time: any, valuename: 'btim' | 'etim') => {
    console.log(moment().format('YYYY-MM-DD'), time.format('HH:mm:ss'))

    dataSource.value = dataSource.value.map((item) => {
        return {
            ...item,
            btim: valuename == 'btim' ? `${moment().format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}` : item.btim,
            etim: valuename == 'etim' ? `${moment().format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}` : item.etim
        }
    })
}

const disabledHours = () => {
    const hours = []
    for (let i = 0; i < moment().hour(); i++) {
        hours.push(i)
    }
    return hours
}

const disabledMinutes = (selectedHour) => {
    const minutes = []
    if (selectedHour === moment().hour()) {
        for (let i = 0; i < moment().minute(); i++) {
            minutes.push(i)
        }
    }
    return minutes
}

const disabledSeconds = (selectedHour, selectedMinute) => {
    const seconds = []
    if (selectedHour === moment().hour() && selectedMinute === moment().minute()) {
        for (let i = 0; i < moment().second(); i++) {
            seconds.push(i)
        }
    }
    return seconds
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
/**
 * 删除事件
 */
async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess)
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
        }
        // {
        //     label: '复制',
        //     onClick: handleEdit.bind(null, record)
        // },
        // {
        //     label: '作废',
        //     popConfirm: {
        //         title: '是否确认作废',
        //         confirm: handleDelete.bind(null, record)
        //     }
        // }
    ]
}
/**
 * 下拉操作栏
 */
function getDropDownAction() {
    return []
}

function showSelectedRowKeys() {
    dataSource.value = rowSelection.selectedRows.map((item) => {
        return {
            order: item.mordno,
            btim: '',
            etim: '',
            mid: item.id,
            diffpigcnt: item.diffpigcnt || 0, //原头数
            appendcnt: 0, //追加头数
            pigcnt: 0 //总头数
        }
    })

    selectedRowKeysVisible.value = true
}

/**
 * 批量二次发布
 */
function handleSelectedRowKeys() {
    if (dataSource.value.some((item) => !item.btim || !item.etim)) {
        return message.error('请选择竞拍时间')
    }

    const data = dataSource.value.map((item) => {
        return {
            ...item,
            pigcnt: Number(item.diffpigcnt) + Number(item.appendcnt)
        }
    })

    defHttp
        .post({ url: '/xmsale/vBusiMainExt/genSubmains', params: data })
        .then(() => {
            handleSuccess()
        })
        .finally(() => {
            selectedRowKeysVisible.value = false
        })
}
</script>

<style scoped></style>
