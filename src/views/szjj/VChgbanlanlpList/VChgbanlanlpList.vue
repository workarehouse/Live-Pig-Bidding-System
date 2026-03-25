<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item label="单号">
              <a-input placeholder="请输入单号" v-model:value="queryParam.ordno"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="BPM审批申请单号">
              <a-input placeholder="请输入BPM审批申请单号" v-model:value="queryParam.docno"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="8">
              <a-form-item label="客户编码">
                <a-input placeholder="请输入客户编码" v-model:value="queryParam.custcod"></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item label="源法人单位代码">
                <a-input placeholder="请输入源法人单位代码" v-model:value="queryParam.srclpno"></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item label="目标法人单位代码">
                <a-input placeholder="请输入目标法人单位代码" v-model:value="queryParam.tolpno"></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item label="创建时间">
                <a-date-picker value-format="YYYY-MM-DD" placeholder="请选择开始时间" v-model:value="queryParam.credat_begin"
                  class="query-group-cust" />
                <span class="query-group-split-cust">~</span>
                <a-date-picker value-format="YYYY-MM-DD" placeholder="请选择结束日期" v-model:value="queryParam.credat_end"
                  class="query-group-cust" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset"
                  style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
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
    <VChgbanlanlpModal ref="registerModal" @success="handleSuccess"></VChgbanlanlpModal>
  </div>
</template>

<script lang="ts" name="xmsale-vChgbanlanlp" setup>
import { ref, reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns } from './VChgbanlanlp.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, genchglpbpmproc } from './VChgbanlanlp.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useMessage } from '/@/hooks/web/useMessage';
import VChgbanlanlpModal from './components/VChgbanlanlpModal.vue'

const { createMessage } = useMessage();

const queryParam = ref<any>({});
const toggleSearchStatus = ref<boolean>(false);
const loading = ref<boolean>(false);
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'v_chgbanlanlp',
    api: list,
    columns,
    canResize: false,
    useSearchForm: false,
    actionColumn: {
      width: 120,
      fixed: 'right',
    },
    defSort: {
      column: 'credat',
      order: 'desc'
    },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam.value);
    },
  },
  exportConfig: {
    name: "v_chgbanlanlp",
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
 * 编辑事件 - 触发BPM流程
 */
function handleEdit(record: Recordable) {
  if (!record.ordno) {
    createMessage.error('单号不能为空');
    return;
  }
  loading.value = true;
  genchglpbpmproc({ ordno: record.ordno, state: 'A', acct: 'liyingying' })
    .then(() => {
      createMessage.success('触发成功');
      reload();
    })
    .catch(() => {
      createMessage.error('触发失败');
    })
    .finally(() => {
      loading.value = false;
    });
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
      label: record.state == 'A' ? '触发' : '',
      onClick: handleEdit.bind(null, record),
      loading: loading.value,
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
