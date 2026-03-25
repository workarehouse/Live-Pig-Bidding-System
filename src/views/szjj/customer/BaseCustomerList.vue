<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAddData" preIcon="ant-design:plus-outlined">新增</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>

        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>批量操作<Icon icon="mdi:chevron-down"></Icon> </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
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
    <!-- <BaseCustomerModal @register="registerModal" @success="handleSuccess"></BaseCustomerModal> -->
    <!-- 表单区域 -->
    <!-- <SzjjBaseCustomerModal ref="registerLocalModal" @success="handleSuccess"></SzjjBaseCustomerModal> -->

    <!--  -->
    <BModal ref="registerModal2" @success="handleSuccess"></BModal>
    <QutcktManageModal ref="qutcktManageModalRef"></QutcktManageModal>

    <a-modal v-model:visible="visibleWashout" title="退户" @ok="handleOkWashout" okText="提交申请">
      <div style="padding: 20px">
        <a-form ref="formRef">
          <a-col :span="12">
            <a-form-item labelAlign="left" label="选择发起人">
              <JDictSelectTag :showChooseOption="false" v-model:value="form.bpmusr" placeholder="请选择发起人"
                dictCode="xms_ndsaleplan.bpmusr" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item labelAlign="left" label="备注">
              <a-textarea v-model:value="form.memo" placeholder="请输入备注" :rows="2" />
            </a-form-item>
          </a-col>

          <p>附件上传</p>
          <JUpload v-model:value="form.picurls" text="文件"></JUpload>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" name="szjj-baseCustomer" setup>
import { ref, computed, unref } from 'vue'
import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { useModal } from '/@/components/Modal'
import { useListPage } from '/@/hooks/system/useListPage'
import { columns, searchFormSchema } from './BaseCustomer.data'
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './BaseCustomer.api'
import { downloadFile } from '/@/utils/common/renderUtils'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode, defineComponent } from 'vue'
import { defHttp } from '/@/utils/http/axios'
import SzjjBaseCustomerModal from './components/SzjjBaseCustomerModal.vue'
import BaseCustomerModal from './components/BaseCustomerModal.vue'
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'
import { message } from 'ant-design-vue'
import BModal from './components/BModal.vue'
import QutcktManageModal from './components/QutcktManageModal.vue'

const form = ref({
  picurls: '',
  bpmusr: '',
  memo: ''
})
const registerModal2 = ref()
const qutcktManageModalRef = ref()
const custCode = ref('')
const visibleWashout = ref(false)
const registerLocalModal = ref()
const checkedKeys = ref<Array<string | number>>([])
//注册model
const [registerModal, { openModal }] = useModal()
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '客户管理',
    api: list,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      fieldMapToNumber: [],
      fieldMapToTime: []
    },
    actionColumn: {
      width: 200,
      fixed: 'right'
    }
  },
  exportConfig: {
    name: '客户管理',
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
function handleAddData() {
  registerModal2.value.disableSubmit = false
  registerModal2.value.add()
}

function handleOkWashout() {
  if (!form.value.bpmusr) {
    message.error('请选择发起人')
    return
  }

  defHttp
    .post({
      url: `/xmsale/customerAppr/v2/closeappr?custno=${custCode.value}&picurls=${form.value.picurls}&bpmusr=${form.value.bpmusr}&memo=${form.value.memo}`
    })
    .then(() => {
      visibleWashout.value = false
      reload()
    })
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
  registerModal2.value.disableSubmit = false
  registerModal2.value.edit({ ...record, isUpdate: true })
}

/**
 * 详情
 */
function handleDetail(record: Recordable) {
  // openModal(true, {
  //     record,
  //     isUpdate: true,
  //     showFooter: false
  // })

  registerModal2.value.disableSubmit = true
  registerModal2.value.edit({ ...record, isUpdate: false })
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
  ; (selectedRowKeys.value = []) && reload()
}

/**
 * 退户
 */
function handleWashout(record: Recordable) {
  visibleWashout.value = true
  custCode.value = record.custCode
}

/**
 * 检疫票管理
 */
function handleQutckt(record: Recordable) {
  qutcktManageModalRef.value?.open(record)
}

/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '查看',
      onClick: handleDetail.bind(null, record)
    },
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record)
    },
    {
      label: '检疫票',
      onClick: handleQutckt.bind(null, record)
    }
    // {
    //     label: '开户',
    //     disabled: record.auditing == 1,
    //     onClick: handleAdd.bind(null, record)
    // },
    // {
    //     label: '退户',
    //     disabled: record.auditing != 1,
    //     onClick: handleWashout.bind(null, record)
    // }
    // {
    //     label: '删除',
    //     popConfirm: {
    //         title: '是否确认删除',
    //         confirm: handleDelete.bind(null, record)
    //     }
    // }
  ]
}
</script>

<style scoped></style>
