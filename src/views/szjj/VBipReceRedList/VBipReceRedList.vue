<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item label="单据开始日期">
              <a-date-picker valueFormat="YYYY-MM-DD" placeholder="请选择单据日期" v-model:value="queryParam.billdate" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="单据结束日期">
              <a-date-picker valueFormat="YYYY-MM-DD" placeholder="请选择单据日期" v-model:value="queryParam.rbilldate" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="法人单位">
              <a-input placeholder="请输入法人单位" v-model:value="queryParam.cpynam"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="打款客户">
              <a-input placeholder="请输入打款客户" v-model:value="queryParam.rpaycustomer"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
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
        <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
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
</a-dropdown> -->
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
          @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <VBipReceRedModal ref="registerModal" @success="handleSuccess"></VBipReceRedModal>
  </div>
</template>

<script lang="ts" name="xmsale-vBipReceRed" setup>
import { ref, reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns } from './VBipReceRed.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './VBipReceRed.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import VBipReceRedModal from './components/VBipReceRedModal.vue'
import { defHttp } from '/@/utils/http/axios'

const queryParam = ref<any>({});
const toggleSearchStatus = ref<boolean>(false);
const registerModal = ref();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'v_bip_rece_red',
    api: list,
    columns,
    canResize: false,
    useSearchForm: false,
    defSort: {
      column: '',
      order: 'desc'
    },
    // actionColumn: {
    //   width: 120,
    //   fixed: 'right',
    // },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam.value);
    },
  },
  exportConfig: {
    name: "v_bip_rece_red",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
});
const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
const labelCol = reactive({
  xs: { span: 24 },
  sm: { span: 7 },
});
const wrapperCol = reactive({
  xs: { span: 24 },
  sm: { span: 16 },
});

const cancelClaimRreturn = (params) => {
  return defHttp.post({ url: '/xmsale/vClamReceInfo/saverefund', params })
}

/**
 * 退款
 */
function handleRreturn(record) {
  cancelClaimRreturn({ ordno: record.ordno }).then(() => {
    reload()
  })
}

// 取消领用
const cancelClaimRece = (params) => {
  return defHttp.post({ url: '/xmsale/xmsClamRece/cancelClaimRece', params })
}

function handleCancelClaimRece(record) {
  cancelClaimRece({ id: record.id }).then(() => {
    reload()
  })
}

/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}

/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '取消领用',
      popConfirm: {
        title: '是否确认撤销',
        confirm: handleCancelClaimRece.bind(null, record)
      }
    },
    {
      label: '退款',
      popConfirm: {
        title: '是否确认退款',
        confirm: handleRreturn.bind(null, record),
      },
    },
  ];
}

/**
 * 查询
 */
function searchQuery() {
  reload();
}

/**
 * 重置
 */
function searchReset() {
  queryParam.value = {};
  selectedRowKeys.value = [];
  //刷新数据
  reload();
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
    text-align: center
  }
}
</style>
