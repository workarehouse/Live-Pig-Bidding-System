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
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>

                <a-dropdown v-if="selectedRowKeys.length > 0">
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" @click="batchHandleDelete">
                                <Icon icon="ant-design:delete-outlined"></Icon>
                                作废
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>批量操作
                        <Icon icon="mdi:chevron-down"></Icon>
                    </a-button>
                </a-dropdown>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <a @click="handleEdit(record)" v-if="record.state == 'A'">交割</a>
                <a @click="handleDetail(record)" v-if="record.state == 'Y' || record.state == 'N'">详情</a>

                <a-divider type="vertical" v-if="record.state == 'A'" />
                <!-- <a-popconfirm title="你确认作废吗？" ok-text="确认" cancel-text="取消" @confirm="handleDelete(record)" placement="topRight" v-if="record.state == 'A'">
          <a href="#">作废</a>
        </a-popconfirm> -->

                <a v-if="record.state == 'A' || record.state == 'C'" @click="clickYd(record)" type="text">接单人 </a>
                <a v-if="record.state == 'A'" @click="clickClose(record)" type="text">关闭</a>
            </template>
            <!--字段回显插槽-->
            <template #htmlSlot="{ text }">
                <div v-html="text"></div>
            </template>
            <template #fileSlot="{ text }">
                <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
                <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
                    @click="downloadFile(text)">下载</a-button>
            </template>
        </BasicTable>
        <!-- 表单区域 -->
        <SzjjBusiOrderModal ref="registerModal" @success="handleSuccess"></SzjjBusiOrderModal>

        <a-modal v-model:visible="visibleClose" centered title="关闭" @ok="handleOkClose">
            <div style="display: flex; padding: 16px">
                <span style="flex-shrink: 0; padding-right: 16px">备注: </span>
                <a-textarea v-model:value="remark" :rows="2" placeholder="手填（可以输入200个字符）"></a-textarea>
            </div>
        </a-modal>

        <!-- 接单人弹窗 -->
        <a-modal v-model:visible="visibleYd" centered title="选择接单人" @ok="handleOkYd" :confirm-loading="ydSaving">
            <div style="padding: 16px">
                <a-form-item label="接单人">
                    <a-select v-model:value="selectedYd" placeholder="请选择接单人" style="width: 100%" :loading="ydLoading"
                        :options="ydList" />
                </a-form-item>
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

                        <a-col :span="12">
                            <a-form-item label="交割日期">
                                <a-date-picker :disabled-date="disabledDate" v-model:value="formAdd.saldat"
                                    style="width: 100%" />
                            </a-form-item>
                        </a-col>

                        <a-col :span="12">
                            <a-form-item label="猪场">
                                <a-select v-model:value="formAdd.farmcod" @change="onFarmChange">
                                    <a-select-option v-for="item in farmerList" :key="item.farmnam"
                                        :value="item.farmcod">{{
                                            item.farmnam
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="猪品种">
                                <j-dict-select-tag v-model:value="formAdd.pigType" dictCode="pig_type"
                                    placeholder="请选择猪品种" :showChooseOption="false" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="头数">
                                <a-input placeholder="输入头数" v-model:value="formAdd.pigcnt"></a-input>
                            </a-form-item>
                        </a-col>

                        <a-col :span="12">
                            <a-form-item label="重量阶段">
                                <a-select ref="select" v-model:value="formAdd.wgtstgtplid">
                                    <a-select-option v-for="item in tplidForm" :value="item.tplid">{{ item.wgtstgtxt
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="计划单价">
                                <a-input v-model:value="formAdd.price" placeholder="请输入输入计划单价"></a-input>
                            </a-form-item>
                        </a-col>
                        <!-- <a-col :span="12">
              <a-form-item label="均重">
                <a-input v-model:value="formAdd.avgwgt" placeholder="默认取重量阶段的平均值"></a-input>
              </a-form-item>
            </a-col> -->
                        <a-col :span="12"> </a-col>
                        <a-descriptions title="客户信息" />
                        <a-col :span="24">
                            <a-form-item :labelCol="{ sm: { span: 3 } }" label="客户名称" name="custcod">
                                <a-select :filter-option="filterOption" v-model:value="formAdd.custcod" show-search
                                    placeholder="请选择客户" :options="dictOptions">
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item :labelCol="{ sm: { span: 3 } }" label="关联原订单">
                                <a-select-option placeholder="请选择要关联的原订单"></a-select-option>
                                <a-select show-search :filterOption="filterOptionOrder" ref="select"
                                    v-model:value="formAdd.oldordno" placeholder="请选择要关联的原订单">
                                    <a-select-option v-for="item in closeOrderList" :value="item.ordno">{{
                                        `${item.ordno} ${item.custnam} ${item.pignam} ${item.pigcnt}头`
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item :labelCol="{ sm: { span: 3 } }" label="客户需求">
                                <a-textarea v-model:value="formAdd.custreq" :rows="2"
                                    placeholder="请输入客户需求"></a-textarea>
                            </a-form-item>
                        </a-col>

                        <!-- <a-col :span="12">
              <a-form-item label="订单时间">
                <a-input placeholder="系统自动带出发起新增当日" :disabled="true"></a-input>
              </a-form-item>
            </a-col> -->
                        <!-- <a-col :span="12">
              <a-form-item label="订单状态">
                <a-input placeholder="系统自动带出当前订单状态" :disabled="true"></a-input>
              </a-form-item>
            </a-col> -->
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
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, getSumInfo, getOrderDetailByOrdno, closeOrder, findYds, saveSalYd } from './SzjjBusiOrder.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import SzjjBusiOrderModal from './components/SzjjBusiOrderModal.vue'
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
    saldat: moment().add(1, 'days').format('YYYY-MM-DD')
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
            width: 150,
            fixed: 'right'
        },
        beforeFetch: (params) => {
            params.column = 'ordno'
            return Object.assign(params, queryParam.value)
        }
    },
    exportConfig: {
        name: '销售订单',
        url: getExportUrl,
        exParam
    },
    importConfig: {
        url: getImportUrl,
        success: handleSuccess
    }
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
                url: '/szjj/szjjBusiOrder/genhandorder',
                params: { ...formAdd.value, saldat: moment(formAdd.value.saldat).format('YYYY-MM-DD') }
            })
            .then((res) => {
                visibleAdd.value = false
                onResetAdd()
            })
    })
}

const dictOptions = ref<any>([])

onMounted(() => {
    defHttp.get({ url: '/szjj/baseCustomer/list', params: { auditing: 1, pageSize: 999999 } }).then((res) => {
        dictOptions.value = res.records.map((item) => {
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

    findnearclseorders()
})

// 查找最近关闭销售订单
const findnearclseorders = () => {
    defHttp.post({ url: '/szjj/szjjBusiOrder/findnearclseorders', params: { ordno: '', days: 4, keyword: '' } }).then((res) => {
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

function onResetAdd() {
    formAdd.value = { custcod: '', saldat: moment().add(1, 'days').format('YYYY-MM-DD') }
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
    ; (selectedRowKeys.value = []) && reload()
}

function tplidFormReset() {
    tplidForm.value = []
    formAdd.value.wgtstgtplid = ''
}

function onFarmChange(value) {
    defHttp.post({ url: '/szjj/szjjBusiOrder/findpritplbyfarmcod', params: { farmcod: value } }).then((res) => {
        tplidFormReset()
        tplidForm.value = res
    })
}

function filterOptionOrder(input: string, option: any) {
    return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

/**
 * 查询
 */
async function searchQuery() {
    exParam.value = queryParam.value
    exParam.value = queryParam.value
    reload()
    const rsp_data = await getSumInfo(queryParam.value)
    rsp_data._row = ''
    rsp_data._index = ''
    rsp_data.id = -1
    //rsp_data.username='合计：';
    //Console.log(JSON.stringify(rsp_data));
    sumdata.value = [rsp_data]
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

// 接单人
const visibleYd = ref<boolean>(false)
const ydList = ref<any[]>([])
const selectedYd = ref<string | undefined>(undefined)
const ydLoading = ref<boolean>(false)
const ydSaving = ref<boolean>(false)

const clickYd = async (record) => {
    activeRecord.value = record
    selectedYd.value = record.ydcod || undefined
    visibleYd.value = true
    ydLoading.value = true
    try {
        const res = await findYds()
        ydList.value = (res || []).map((item: any) => ({
            label: item.ydnam,
            value: item.ydcod
        }))
    } finally {
        ydLoading.value = false
    }
}

const handleOkYd = async () => {
    if (!selectedYd.value) {
        return message.error('请选择接单人')
    }
    ydSaving.value = true
    try {
        const res = await saveSalYd({ ordno: activeRecord.value.ordno, ydcod: selectedYd.value })
        if (res && res.success === false) {
            message.error(res.message || '操作失败')
        } else {
            message.success('保存成功')
            visibleYd.value = false
            reload()
        }
    } finally {
        ydSaving.value = false
    }
}

const handleOkClose = async () => {
    if (!remark.value) {
        return message.error('请填写备注')
    }

    const res = await closeOrder({ ordno: activeRecord.value.ordno, msg: remark.value })
    console.log(res)
    if (res.success) {
        visibleClose.value = false
        reload()
    } else {
        message.error(res.message || '操作失败')
    }
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
