<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable"   ref="tableRef">
     <!--插槽:table标题-->
      <template #tableTitle>
          <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined" v-show="false"> 新增</a-button>
          <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          
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
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{text}">
         <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{text}">
         {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{text}">
         <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
         <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <SzjjBusiMainModal @register="registerModal" @success="handleSuccess" okText="发布"></SzjjBusiMainModal>
    <LogModal @register="registerlog" @success="handleSuccess"></LogModal>
    <OrderModal @register="registerOrder" @success="handleSuccess"></OrderModal>

  </div>
</template>

<script lang="ts" name="szjj-szjjBusiMainpri" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import SzjjBusiMainModal from './components/SzjjBusiMainModal.vue'
  import LogModal from './components/ModalLog.vue'
  import OrderModal from './components/ModalOrder.vue'

  import {columns, searchFormSchema} from './SzjjBusiMain.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './SzjjBusiMain.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, {openModal}] = useModal();

  const [registerlog, { openModal: openModalLog }] = useModal();
  const [registerOrder, { openModal: openModalOrder }] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: 'szjj_busi_main',
           api: list,
           columns,
           canResize:false,
           formConfig: {
              labelWidth: 120,
              schemas: searchFormSchema,
              autoSubmitOnEnter:true,
              showAdvancedButton:false,
                             
              fieldMapToNumber: [
              ],
              fieldMapToTime: [
              ],
               
            },
           actionColumn: {
               width: 180,
               fixed:'right'
            },
      },
      rowSelection:false,
       exportConfig: {
            name:"szjj_busi_main",
            url: getExportUrl,
          },
          importConfig: {
            url: getImportUrl,
            success: handleSuccess
          },
  })

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

   /**
    * 新增事件
    */
  function handleAdd() {
     openModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }
   function openLogDlg(record: Recordable) {
    openModalLog(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }

   function openOrderDlg(record: Recordable) {
    openModalOrder(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }

   /**
    * 删除事件
    */
  async function handleDelete(record) {
     await deleteOne({id: record.id}, handleSuccess);
   }
   /**
    * 批量删除事件
    */
  async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
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
     function getTableAction(record){
       return [
       {
           label: '详情',
           onClick: handleDetail.bind(null, record),
         },
         {
        ifShow:record["auditing"]=='0',//||record["state"]=='2',
           label: '发布',
           onClick: handleEdit.bind(null, {...record, auditing: 1}),
         }
         , {
           label: '竞拍',
           ifShow:record["state"]=='2',//||record["state"]=='1', 拍卖中不显示
           onClick: openLogDlg.bind(null, record),
         }, {
           label: '订单',
           ifShow:record["state"]=='2',
           onClick: openOrderDlg.bind(null, record),
         }, {
           label: '作废',
            ifShow:record["auditing"]=='0'||record["state"]=='0'||record["state"]=='1',
           popConfirm: {
             title: '是否确认作废？一旦作废将不能恢复！',
             confirm: handleDelete.bind(null, record),
           }
         }
         
       ]
   }
     /**
        * 下拉操作栏 状态 -1：未发布 0：未开拍 1：拍卖中， 2：拍卖完成
        */
  function getDropDownAction(record){
       return [
       {
        ifShow:record["auditing"]=='0',//||record["state"]=='2',
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         }
         , {
           label: '竞拍',
           ifShow:record["state"]=='2',//||record["state"]=='1', 拍卖中不显示
           onClick: openLogDlg.bind(null, record),
         }, {
           label: '订单',
           ifShow:record["state"]=='2',
           onClick: openOrderDlg.bind(null, record),
         }, {
           label: '作废',
            ifShow:record["auditing"]=='0'||record["state"]=='0'||record["state"]=='1',
           popConfirm: {
             title: '是否确认作废？一旦作废将不能恢复！',
             confirm: handleDelete.bind(null, record),
           }
         }
       ]
   }
   //console.log("xxxxxxxxxxx:"+$refs.tableRef);
   //$refs.tableRef.hideColumn($refs.tableRef.getColumnByField('pigcnt'))
</script>

<style scoped>

</style>