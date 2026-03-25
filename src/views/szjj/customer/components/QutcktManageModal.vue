<template>
  <a-modal v-model:visible="visible" :title="modalTitle" :width="1100" :footer="null" destroyOnClose
    @cancel="handleClose">
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </a-modal>

  <a-modal v-model:visible="editVisible" :title="editTitle" :confirmLoading="confirmLoading" destroyOnClose
    @ok="handleSubmit" @cancel="handleEditCancel">
    <a-form ref="formRef" :model="formData" :rules="formRules" :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }">
      <a-form-item label="车牌" name="carno">
        <a-input v-model:value="formData.carno" placeholder="请输入车牌" />
      </a-form-item>
      <a-form-item label="司机" name="drvnam">
        <a-input v-model:value="formData.drvnam" placeholder="请输入司机" />
      </a-form-item>
      <a-form-item label="司机电话" name="drvtel">
        <a-input v-model:value="formData.drvtel" placeholder="请输入司机电话" />
      </a-form-item>
      <a-form-item label="地址" name="addr">
        <a-input v-model:value="formData.addr" placeholder="请输入地址" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { BasicTable, TableAction, BasicColumn } from '/@/components/Table'
import { useListPage } from '/@/hooks/system/useListPage'
import { deleteOne, list, saveOrUpdate } from '../QutcktInfo.api'
import { message } from 'ant-design-vue'

const visible = ref(false)
const editVisible = ref(false)
const editTitle = ref('新增检疫票')
const confirmLoading = ref(false)
const currentCustCode = ref('')
const currentCustName = ref('')

const modalTitle = ref('检疫票管理')

const formRef = ref()
const formData = reactive<Record<string, any>>({
  id: '',
  custcod: '',
  carno: '',
  drvnam: '',
  drvtel: '',
  addr: ''
})

const formRules = {
  carno: [{ required: true, message: '请输入车牌' }],
  drvnam: [{ required: true, message: '请输入司机' }],
  drvtel: [{ required: true, message: '请输入司机电话' }],
  addr: [{ required: true, message: '请输入地址' }]
}

const columns: BasicColumn[] = [
  {
    title: '车牌',
    align: 'center',
    dataIndex: 'carno'
  },
  {
    title: '司机',
    align: 'center',
    dataIndex: 'drvnam'
  },
  {
    title: '司机电话',
    align: 'center',
    dataIndex: 'drvtel'
  },
  {
    title: '地址',
    align: 'center',
    dataIndex: 'addr'
  }
]

const { tableContext } = useListPage({
  tableProps: {
    title: '检疫票列表',
    api: list,
    columns,
    canResize: false,
    useSearchForm: false,
    actionColumn: {
      width: 140,
      fixed: 'right'
    },
    beforeFetch: (params) => {
      return Object.assign(params, {
        custcod: currentCustCode.value,
        custCode: currentCustCode.value,
        custno: currentCustCode.value
      })
    }
  }
})

const [registerTable, { reload }] = tableContext

function open(record: Recordable) {
  currentCustCode.value = record.custcod || record.custCode || record.custno || ''
  currentCustName.value = record.custnam || record.custName || ''
  modalTitle.value = currentCustName.value ? `检疫票管理 - ${currentCustName.value}` : '检疫票管理'
  visible.value = true
  nextTick(() => {
    reload()
  })
}

function handleClose() {
  visible.value = false
}

function handleAdd() {
  editTitle.value = '新增检疫票'
  formData.id = ''
  formData.custcod = currentCustCode.value
  formData.carno = ''
  formData.drvnam = ''
  formData.drvtel = ''
  formData.addr = ''
  editVisible.value = true
}

function handleEdit(record: Recordable) {
  editTitle.value = '编辑检疫票'
  formData.id = record.id || ''
  formData.custcod = record.custcod || currentCustCode.value
  formData.carno = record.carno || ''
  formData.drvnam = record.drvnam || ''
  formData.drvtel = record.drvtel || ''
  formData.addr = record.addr || ''
  editVisible.value = true
}

async function handleDelete(record: Recordable) {
  await deleteOne({ id: record.id }, () => {
    message.success('删除成功')
    reload()
  })
}

function getTableAction(record: Recordable) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record)
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

function handleEditCancel() {
  editVisible.value = false
}

async function handleSubmit() {
  await formRef.value.validate()
  confirmLoading.value = true

  const params = {
    id: formData.id,
    custcod: formData.custcod,
    carno: formData.carno,
    drvnam: formData.drvnam,
    drvtel: formData.drvtel,
    addr: formData.addr
  }

  const isUpdate = !!formData.id
  await saveOrUpdate(params, isUpdate)
    .then((res) => {
      if (res.success) {
        message.success(res.message || '保存成功')
        editVisible.value = false
        reload()
      } else {
        message.warning(res.message || '保存失败')
      }
    })
    .finally(() => {
      confirmLoading.value = false
    })
}

defineExpose({
  open
})
</script>
