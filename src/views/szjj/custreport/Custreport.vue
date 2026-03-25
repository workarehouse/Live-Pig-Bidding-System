<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="4">
            <a-form-item label="日期：从">
              
              <DatePicker  v-model:value="queryParam.bdat" value-format="YYYY-MM-DD"    ></DatePicker>
               
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item label="到">
              <DatePicker  v-model:value="queryParam.edat"  value-format="YYYY-MM-DD"  ></DatePicker>
            </a-form-item> 
          </a-col>
          <a-col :lg="4">
            <a-form-item label="猪场">
              <ApiSelect :api="getFarmsByLoginUser"  v-model:value="queryParam.farmcod" label-field="farmnam" value-field="farmcod" placeholder="请选择猪场"  :showChooseOption="false" :allowClear="true"></ApiSelect>
           
               
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                 
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable"   :show-summary="true"  :summary-data="sumdata">
      <!--插槽:table标题-->
      <template #tableTitle>
          <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
      <!--操作栏-->
           <!--字段回显插槽-->
      <template #htmlSlot="{text}">
        <div v-html="text"></div>
      </template>
       
      <template #fileSlot="{text}">
        <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable> 
  </div>
</template>

<script lang="ts" name="szjj-Custreport" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './Custreport.data';
  import { list, getExportUrl,getFarmsByLoginUser,getSumInfo } from './Custreport.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { DatePicker } from 'ant-design-vue';
  
   
import { ApiSelect } from '/@/components/Form';
import { async } from 'rxjs';
import { Console } from 'windicss/utils';

  const queryParam = ref<any>({});
  const sumdata=ref<any>([]);
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const exParam = ref<any>({});

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '报表统计',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      showActionColumn: false, 
      beforeFetch: (params) => {
        return Object.assign(params, queryParam.value);
      },
    },
    exportConfig: {
      name: "报表统计",
      url: getExportUrl,
      exParam
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

  
  sumdata.value=[  {_row: '平均', _index: '平均', bidcnt: 50,cnt:40,}];

  function  handleSummary(tableData: Recordable[]){

//const rsp_data=await getSumInfo(queryParam);
 //console.log("--------log------xx-")


// 可用工具方法自动计算合计
//console.log("--------log-------"+JSON.stringify(rsp_data));
//return [rsp_data];
 //return [{"custcnt":1,"cnt":null,"bidcnt":0,"allotpigcnt":0,"pigcnt":0,"wgt":0,"amt":0,"_row":"平均","_index":"平均"}]
    return [ 
          {
        _row: '平均',
        _index: '平均',
        // 计算平均值
        bidcnt: rsp_data.bidcnt,
        cnt:rsp_data.cnt,
      },
    ];
  }   
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
    

  /**
   * 查询
   */
  async function searchQuery() {
    exParam.value = queryParam.value

    reload();
    const rsp_data=await getSumInfo(queryParam.value);
    rsp_data._row='平均';
    rsp_data._index='平均';
    //rsp_data.username='合计：'+rsp_data.custcnt;
    Console.log(JSON.stringify(rsp_data));
    sumdata.value=[rsp_data];
    //sumdata.value=[  {_row: '平均', _index: '平均', bidcnt: 50,cnt:40,}];
  }
  
  /**
   * 重置
   */
  function searchReset() {
    queryParam.value = {};
    selectedRowKeys.value = [];
    exParam.value = {};

    //刷新数据
    reload();
  }
  
  searchQuery() ;

</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      width: calc(50% - 15px);
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
  }
</style>
