<template>
    <div>
        <!--查询区域-->
        <div class="jeecg-basic-table-form-container">
            <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol"
                :wrapper-col="wrapperCol">
                <a-row :gutter="24">
                    <a-col :lg="8">
                        <a-form-item label="生效日期">
                            <a-date-picker value-format="YYYY-MM-DD" placeholder="开始日期" v-model:value="queryParam.bdat"
                                class="query-group-cust" />
                            <span class="query-group-split-cust">~</span>
                            <a-date-picker value-format="YYYY-MM-DD" placeholder="结束日期" v-model:value="queryParam.edat"
                                class="query-group-cust" />
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
        <BasicTable @register="registerTable" :rowSelection="rowSelection">
            <!--插槽:table标题-->
            <template #tableTitle>
                <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"
                    v-auth="'XmsSpecDisList:add'"> 新增</a-button>
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
                <!-- <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
                <a-dropdown v-if="selectedRowKeys.length > 0">
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" @click="batchHandleDelete">
                                <Icon icon="ant-design:delete-outlined"></Icon>
                                删除
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
                <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
                    @click="downloadFile(text)">下载</a-button>
            </template>
        </BasicTable>
        <!-- 表单区域 -->
        <XmsSpecDisModal ref="registerModal" @success="handleSuccess"></XmsSpecDisModal>
    </div>
</template>

<script lang="ts" name="xmsale-xmsSpecDis" setup>
import { ref, reactive, nextTick } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useListPage } from '/@/hooks/system/useListPage'
import { columns } from './XmsSpecDis.data'
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './XmsSpecDis.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import XmsSpecDisModal from './components/XmsSpecDisModal.vue'
import { usePermission } from '/@/hooks/web/usePermission'
const { hasPermission } = usePermission()

const queryParam = ref<any>({})
const toggleSearchStatus = ref<boolean>(false)
const registerModal = ref()

//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: 'xms_spec_dis',
        api: list,
        columns,
        canResize: false,
        useSearchForm: false,
        actionColumn: {
            width: 250,
            fixed: 'right'
        },
        defSort: {
            // apprdat: 'desc'
            // order: 'desc'
        },
        beforeFetch: (params) => {
            return Object.assign(params, queryParam.value)
        }
    },
    exportConfig: {
        name: 'xms_spec_dis',
        url: getExportUrl
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

/**
 * 新增事件
 */
function handleAdd() {
    registerModal.value.disableSubmit = false
    registerModal.value.add()
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false
    registerModal.value.edit(record)
}

/**
 * 详情
 */
function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true

    console.log('record', record);

    registerModal.value.edit(record)
}

/**
 * 删除事件
 */
async function handleDelete(record) {
    await deleteOne({ id: record.ordno }, handleSuccess)
}

/**
 * 确认事件
 */
async function handleConfirm(record) {
    registerModal.value.disableSubmit = false
    registerModal.value.confirm(record)
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
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            ifShow: hasPermission('XmsSpecDisList:edit'),
            disabled: record.state === 'B' || record.state === 'Y'
        },
        {
            label: '确认',
            onClick: handleConfirm.bind(null, record),
            ifShow: hasPermission('XmsSpecDisList:confirm'),
            disabled: record.state === 'Y'
        },
        {
            label: '删除',
            disabled: record.state === 'Y',
            popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record)
            }
        }
    ]
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
    return []
}

/**
 * 查询
 */
function searchQuery() {
    reload()
}

/**
 * 重置
 */
function searchReset() {
    queryParam.value = {}
    selectedRowKeys.value = []
    //刷新数据
    reload()
}
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
