<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item label="单据日期">
              <a-date-picker valueFormat="YYYY-MM-DD" placeholder="请选择单据日期" v-model:value="queryParam.billdate" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="单据号">
              <a-input placeholder="请输入单据号" v-model:value="queryParam.billno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="打款客户">
              <a-input placeholder="请输入打款客户" v-model:value="queryParam.paycustomer"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="法人单位">
              <a-input placeholder="请输入法人单位" v-model:value="queryParam.orgnam"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model:value="queryParam.custnam"></a-input>
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
    <VClamReceInfoModal ref="registerModal" @success="handleSuccess"></VClamReceInfoModal>
  </div>
</template>

<script lang="ts" name="xmsale-vClamReceInfo" setup>
import { ref, reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns } from './VClamReceInfo.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './VClamReceInfo.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import VClamReceInfoModal from './components/VClamReceInfoModal.vue'
import { defHttp } from '/@/utils/http/axios'

const queryParam = ref<any>({});
const toggleSearchStatus = ref<boolean>(false);
const registerModal = ref();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'v_clam_rece_info',
    api: list,
    columns,
    canResize: false,
    useSearchForm: false,
    defSort: {
      column: 'billdate',
      order: 'desc'
    },
    actionColumn: {
      width: 150,
      fixed: 'right',
    },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam.value);
    },
  },
  exportConfig: {
    name: "v_clam_rece_info",
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

/**
 * 取消认领
 */
function handleEdit(record: Recordable) {
  defHttp
    .post({
      url: '/xmsale/vClamReceInfo/cancelClaimRece',
      params: { ordno: record.calmno },
    })
    .then(() => {
      reload()
    });
}

// 退款
const handleRreturn = (record: Recordable) => {
  return defHttp.post({ url: '/xmsale/vClamReceInfo/saverefund', params: { ordno: record.ordno } }).then(() => {
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
      label: '取消认领',
      disabled: record.state === 'A',
      popConfirm: {
        title: '是否确认取消',
        confirm: handleEdit.bind(null, record)
      },
    },
    {
      label: '退款',
      disabled: record.state === 'Y',
      popConfirm: {
        title: '是否确认退款',
        confirm: handleRreturn.bind(null, record)
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