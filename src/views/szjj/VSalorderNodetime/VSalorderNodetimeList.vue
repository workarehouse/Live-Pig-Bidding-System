<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item label="关键字">
              <a-input placeholder="请输入关键字" v-model:value="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="8">
              <a-form-item label="编码">
                <a-input placeholder="请输入编码" v-model:value="queryParam.farmcod"></a-input>
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
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="handleExport"> 导出</a-button>
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
    <VSalorderNodetimeModal ref="registerModal" @success="handleSuccess"></VSalorderNodetimeModal>
  </div>
</template>

<script lang="ts" name="xmsale-vSalorderNodetime" setup>
import { ref, reactive } from 'vue';
import { BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns } from './VSalorderNodetime.data';
import { list, getExportUrl } from './VSalorderNodetime.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import VSalorderNodetimeModal from './components/VSalorderNodetimeModal.vue'

const queryParam = ref<any>({});
const exParam = ref<any>({});
const toggleSearchStatus = ref<boolean>(false);
const registerModal = ref();
//注册table数据
const { tableContext, onExportXls } = useListPage({
  tableProps: {
    title: 'v_salorder_nodetime',
    api: list,
    columns,
    canResize: false,
    useSearchForm: false,
    showActionColumn: false,
    defSort: {
      column: 'saldat',
      order: 'desc',
    },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam.value);
    },
  },
  exportConfig: {
    name: "超时节点订单报表",
    url: getExportUrl,
    exParam,
  },
});
const [registerTable, { reload }] = tableContext;
const labelCol = reactive({
  xs: { span: 24 },
  sm: { span: 7 },
});
const wrapperCol = reactive({
  xs: { span: 24 },
  sm: { span: 16 },
});

/**
 * 成功回调
 */
function handleSuccess() {
  reload();
}

function handleExport() {
  exParam.value = queryParam.value;
  onExportXls();
}

/**
 * 查询
 */
function searchQuery() {
  exParam.value = queryParam.value;
  reload();
}

/**
 * 重置
 */
function searchReset() {
  queryParam.value = {};
  exParam.value = {};
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
