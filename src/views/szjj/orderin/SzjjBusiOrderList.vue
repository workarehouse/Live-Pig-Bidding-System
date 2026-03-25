<template>
    <div>
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
            <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol"
                :wrapper-col="wrapperCol">
                <a-row :gutter="24">
                    <a-col :lg="8">
                        <a-form-item label="单号">
                            <a-input placeholder="请输入单号" v-model:value="queryParam.ordno" :allowClear="true"></a-input>
                        </a-form-item>
                    </a-col>

                    <a-col :lg="6">
                        <a-form-item label="状态">
                            <j-dict-select-tag placeholder="请选择状态" v-model:value="queryParam.state"
                                dictCode="order_state" :showChooseOption="false" :allowClear="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8">
                        <a-form-item label="日期">
                            <a-date-picker value-format="YYYY-MM-DD" placeholder="开始日期"
                                v-model:value="queryParam.credat_begin" class="query-group-cust" :allowClear="true" />
                            <span class="query-group-split-cust">~</span>
                            <a-date-picker value-format="YYYY-MM-DD" placeholder="结束日期"
                                v-model:value="queryParam.credat_end" class="query-group-cust" :allowClear="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="8">
                        <a-form-item label="关键字">
                            <a-input placeholder="请输入关键字" v-model:value="queryParam.keyword"
                                :allowClear="true"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="7" :md="8" :sm="24">
                        <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                            <a-col :lg="6">
                                <a-button type="primary" preIcon="ant-design:search-outlined"
                                    @click="searchQuery">查询</a-button>
                                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset"
                                    style="margin-left: 8px">重置</a-button>
                            </a-col>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <!--引用表格-->
        <BasicTable @register="registerTable" :show-summary="true" :summary-data="sumdata">
            <!--插槽:table标题-->
            <template #tableTitle>
                <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
                <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button> -->

                <a-dropdown v-if="selectedRowKeys.length > 0">
                    <template #overlay>
                        <a-menu>
                        </a-menu>
                    </template>
                    <a-button>批量操作
                        <Icon icon="mdi:chevron-down"></Icon>
                    </a-button>
                </a-dropdown>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
            </template>
            <!--字段回显插槽-->
            <template #htmlSlot="{ text }">
                <div v-html="text"></div>
            </template>
            <!--省市区字段回显插槽-->
            <template #pcaSlot="{ text }">
            </template>
            <template #fileSlot="{ text }">
                <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
                <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
                    @click="downloadFile(text)">下载</a-button>
            </template>
        </BasicTable>
        <!-- 表单区域 -->

        <a-modal v-model:visible="visibleClose" centered title="关闭" @ok="handleOkClose">
            <div style="display: flex; padding: 16px">
                <span style="flex-shrink: 0; padding-right: 16px">备注: </span>
                <a-textarea v-model:value="remark" :rows="2" placeholder="手填（可以输入200个字符）"></a-textarea>
            </div>
        </a-modal>

        <!-- 新增 -->
        <a-modal :width="800" v-model:visible="visibleAdd" centered title="新增" @ok="handleAddClose"
            @cancel="onResetAdd">
            <a-card>
                <a-form ref="formRef" :rules="rules" :model="formAdd" :labelCol="{ xs: { span: 24 }, sm: { span: 5 } }"
                    :wrapperCol="{ xs: { span: 24 }, sm: { span: 16 } }">
                    <a-descriptions title="订单信息" />
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="订单号">
                                <a-input placeholder="系统自动生成" :disabled="true"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12"></a-col>
                        <a-col :span="12">
                            <a-form-item label="客户名称" name="custcod">
                                <a-select :filter-option="filterOption" v-model:value="formAdd.custcod" show-search
                                    placeholder="请选择客户" :options="dictOptions">
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12"></a-col>
                        <a-col :span="12">
                            <a-form-item label="猪场" name="farmcod">
                                <a-select v-model:value="formAdd.farmcod" @change="findnearclseorders">
                                    <a-select-option v-for="item in farmerList" :key="item.farmnam"
                                        :value="item.farmcod">{{
                                            item.farmnam
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                        <a-col :span="12"></a-col>
                        <a-col :span="24">
                            <a-form-item :labelCol="{ sm: { span: 3 } }" label="销售订单">
                                <a-select-option placeholder="请选择销售订单"></a-select-option>
                                <a-select show-search :filterOption="filterOptionOrder" ref="select"
                                    v-model:value="formAdd.ordno" placeholder="请选择销售订单">
                                    <a-select-option v-for="item in closeOrderList" :value="item.ordno">{{
                                        `${item.ordno} ${item.custnam} ${item.pignam} ${item.pigcnt}头`
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-modal>
    </div>
</template>

<script lang="ts" name="szjj-szjjBusiOrder" setup>
import { ref, reactive, onMounted } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useListPage } from '/@/hooks/system/useListPage'
import { columns } from './SzjjBusiOrder.data'
import { list, deleteOne, } from './SzjjBusiOrder.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'
import { message } from 'ant-design-vue'
import { defHttp } from '/@/utils/http/axios'
import moment, { Moment } from 'moment'
const formRef = ref()
const rules = {
    custcod: [{ required: true, message: '请选择客户', trigger: 'blur' }]
}

const disabledDate = (current: Moment) => {
    return current && current < moment().startOf('day')
}
const farmerList = ref<any>([])
const queryParam = ref<any>({})
const exParam = ref<any>({})
const sumdata = ref<any>([])
const toggleSearchStatus = ref<boolean>(true)
const registerModal = ref()
const visibleClose = ref<boolean>(false)
const activeRecord = ref<any>()
const remark = ref<string>()

const formAdd = ref<any>({
    custcod: '',
    farmcod: '',
    ordno: ""
})

const closeOrderList = ref<any>([])
const visibleAdd = ref<boolean>(false)

//注册table数据
const { tableContext, onExportXls } = useListPage({
    tableProps: {
        title: 'szjj_busi_order',
        api: list,
        columns,
        canResize: false,
        useSearchForm: false,
        showIndexColumn: true,

        actionColumn: {
            width: 120,
            fixed: 'right'
        },
        beforeFetch: (params) => {
            params.column = 'ordno'
            return Object.assign(params, queryParam.value)
        }
    },
})
const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] =
    tableContext
const labelCol = reactive({
    xs: { span: 24 },
    sm: { span: 7 }
})
const wrapperCol = reactive({
    xs: { span: 24 },
    sm: { span: 16 }
})

const tplidForm = ref<any>([])

/**
 * 新增事件
 */
function handleAdd() {
    visibleAdd.value = true
}

function handleAddClose() {
    formRef.value.validate().then(() => {
        defHttp
            .post({
                url: '/xmsale/szjjBusiOrderIntran/saveorder',
                params: { ...formAdd.value, oldordno: formAdd.value.oldordno }
            })
            .then((res) => {
                visibleAdd.value = false
                onResetAdd()
            })
    })
}

const dictOptions = ref<any>([])

onMounted(() => {
    defHttp.get({ url: '/xmsale/szjjBusiOrderIntran/findintrancusts', params: { auditing: 1, pageSize: 999999 } }).then((res) => {
        dictOptions.value = res.map((item) => {
            return {
                label: item.custnam,
                value: item.custcod
            }
        })
    })

    // 用户猪场
    defHttp.post({ url: '/szjj/baseFarmer/getFarmerByLoginAcct', params: {} }).then((res) => {
        farmerList.value = res
    })
})

const findnearclseorders = () => {
    defHttp.get({ url: '/xmsale/szjjBusiOrderIntran/findorders', params: { custcod: formAdd.value.custcod, farmcod: formAdd.value.farmcod } }).then((res) => {
        closeOrderList.value = res
    })
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false
    registerModal.value.edit(record)
}

const filterOption = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

/**
 * 详情
 */
function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true
    registerModal.value.edit(record)
}

/**
 * 删除事件
 */
async function handleDelete(record) {
    await deleteOne({ id: record.ordno }, handleSuccess)
}

function onResetAdd() {
    formAdd.value = { custcod: '', farmcod: '', ordno: '' }
}

/**
 * 成功回调
 */
function handleSuccess() {
    ; (selectedRowKeys.value = []) && reload()
}

/**
 * 操作栏
 */
function getTableAction(record) {
    return [
        {
            label: '编辑',
            onClick: handleEdit.bind(null, record)
        }
    ]
}

function tplidFormReset() {
    tplidForm.value = []
    formAdd.value.wgtstgtplid = ''
}

function filterOptionOrder(input: string, option: any) {
    return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
    return [
        {
            label: '详情',
            onClick: handleDetail.bind(null, record)
        },
        {
            label: '删除',
            popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record)
            }
        }
    ]
}

/**
 * 查询
 */
async function searchQuery() {
    exParam.value = queryParam.value
    exParam.value = queryParam.value
    reload()
}

/**
 * 重置
 */
function searchReset() {
    queryParam.value = {}
    selectedRowKeys.value = []
    exParam.value = {}
    //刷新数据
    reload()
}

const clickClose = (record) => {
    visibleClose.value = true
    activeRecord.value = record
    console.log(activeRecord.value)
}

const handleOkClose = async () => {
    if (!remark.value) {
        return message.error('请填写备注')
    }

    // const res = await closeOrder({ ordno: activeRecord.value.ordno, msg: remark.value })
    // if (res.success) {
    //     visibleClose.value = false
    //     reload()
    // }
}

searchQuery()
</script>

<style lang="less" scoped>
.jeecg-basic-table-form-container {
    .table-page-search-submitButtons {
        display: block;
        margin-bottom: 24px;
        white-space: nowrap;
    }

    .query-group-cust {
        width: calc(50% - 15px);
        min-width: 100px !important;
    }

    .query-group-split-cust {
        width: 30px;
        display: inline-block;
        text-align: center;
    }
}
</style>
