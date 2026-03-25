<template>
  <a-card>
        <a-descriptions>
            <a-descriptions-item label="区域">{{ formData.areacod_dictText }}</a-descriptions-item>
            <a-descriptions-item label="周计划">{{ formData.week }}</a-descriptions-item>
            <a-descriptions-item label="出栏日期">{{ formData.startendtime }}</a-descriptions-item>
        </a-descriptions>
  </a-card>
  <div style="margin-left: 25px; font-weight: bold">周出栏计划汇总：</div>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-table :columns="columns" :data-source="dts" bordered :pagination="false"> </a-table>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed,onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import moment from 'moment';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../XmsWoutplanSum.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const dts = ref([])
  const formData = reactive<Record<string, any>>({
    id: '',
    areacod: '',   
    id: '',
    starttime: '',   
    id: '',
    endtime: '',   
    id: '',
    tqty: undefined,
    id: '',
    state: '',   
    id: '',
    sumtime: '',   
    id: '',
    sumusr: '',   
    id: '',
    cfmtime: '',   
    id: '',
    cfmusr: '',   
    id: '',
    docno: '',   
  });
  const columns = [
    {
        title: '猪场',
        dataIndex: 'farmnam',
        width: '10%'
    },
    {
        title: '计划体重阶段',
        dataIndex: 'wgtstgtxt',
        width: '15%'
    },
    {
        title: '计划头数(三元)',
        dataIndex: 'planqty3',
        width: '10%'
    },
    {
        title: '计划头数(二元)',
        dataIndex: 'planqty2',
        width: '10%'
    },
    {
        title: '转育肥日期',
        dataIndex: 'zyftime',
        width: '10%'
    },
    {
        title: '转育肥日龄（天）',
        dataIndex: 'zyfage',
        width: '12%'
    },
    {
        title: '转群均重（kg）',
        dataIndex: 'avgweight',
        width: '15%'
    }
]
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
  
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    setTimeout(async () => {
      resetFields();
      //赋值
      Object.assign(formData, record);
      if(record.id){
       await  getDetail(record)
      }
    }, 200);
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }
  const getDetail = (record) => {
    defHttp.get({ url: '/xmsale/xmsWoutplanSum/queryById', params: { id: record.id } }).then((res) => {
        dts.value = res.dt
    })
}

  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
  .item-cell {
    display: flex;
    align-items: center;

    .title {
        margin-right: 10px;
    }
    .title1 {
        margin-right: 10px;
        margin-left: 10px;
    }

    .right-box {
        width: 150px;
    }
}
</style>
