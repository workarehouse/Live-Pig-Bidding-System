<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :pagination="{ pageSize: 100 }" @edit-end="editEnd">
      <!-- slots -->
      <template #tableTitle>
        <div style="padding: 20px 0; padding-left: 20px">
          <span style="padding-right: 20px">当前区域</span>
          <a-select ref="select" value="" style="width: 200px" @change="handleChangeSelect" placeholder="请选择区域">
            <a-select-option v-for="item in AreaByLoginAcct" :value="item.areacod">{{ item.areanam }}</a-select-option>
          </a-select>
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="szjj-Custreport" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './priceMage.data';
  import { list, updataPrice } from './priceMage.api';
  import { defHttp } from '/@/utils/http/axios';

  const queryParam = ref<any>({
    farmcod: 'haikou',
  });
  const sumdata = ref<any>([]);
  const exParam = ref<any>({});
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '价格列表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showActionColumn: false,
      pagination: false,
      beforeFetch: (params) => {
        params.column = '';
        return Object.assign(params, queryParam.value);
      },
    },
  });

  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;

  //区域选择
  const handleChangeSelect = (value: any) => {
    queryParam.value = Object.assign(queryParam.value, { areacod: value });
    reload();
  };

  // 获取区域列表
  const AreaByLoginAcct = ref<any>([]);
  const getAreaByLoginAcct = async () => {
    const res = await defHttp.post({ url: '/szjj/baseFarmer/getAreaByLoginAcct' });
    AreaByLoginAcct.value = res;
  };

  onMounted(() => {
    getAreaByLoginAcct();
  });

  const editEnd = (row) => {
    console.log(row.record)
    updataPrice(row.record).then((res) => {
      console.log(res);
    });
  };
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
