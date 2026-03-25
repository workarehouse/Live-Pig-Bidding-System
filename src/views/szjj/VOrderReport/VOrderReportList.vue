<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable">
            <!--插槽:table标题-->
            <template #tableTitle>
                <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
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
                    <a-button
                        >批量操作
                        <Icon icon="mdi:chevron-down"></Icon>
                    </a-button>
                </a-dropdown>
            </template>
            <!--操作栏-->

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
        <VOrderReportModal @register="registerModal" @success="handleSuccess"></VOrderReportModal>
    </div>
</template>

<script lang="ts" name="szjj-vOrderReport" setup>
import { ref, computed, unref } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useModal } from '/@/components/Modal'
import { useListPage } from '/@/hooks/system/useListPage'
import VOrderReportModal from './components/VOrderReportModal.vue'
import { columns, searchFormSchema } from './VOrderReport.data'
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './VOrderReport.api'
import { downloadFile } from '/@/utils/common/renderUtils'
const checkedKeys = ref<Array<string | number>>([])
//注册model
const [registerModal, { openModal }] = useModal()
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: 'v_order_report',
        api: list,
        columns,
        canResize: false,
        formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
            autoSubmitOnEnter: true,
            showAdvancedButton: true,
            fieldMapToNumber: [['avgwgt', ['beginwgt', 'endwgt']]],
            fieldMapToTime: [['begintim', ['begintim_begin', 'begintim_end'], 'YYYY-MM-DD']]
        },
        actionColumn: {
            width: 120,
            fixed: 'right'
        },
        showActionColumn: false,
        showIndexColumn: false,
        rowSelection: false
    },
    exportConfig: {
        name: '销售订单数据跟踪表',
        url: getExportUrl
    },
    importConfig: {
        url: getImportUrl,
        success: handleSuccess
    }
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

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
            label: '编辑',
            onClick: handleEdit.bind(null, record)
        }
    ]
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
</script>

<style scoped></style>
