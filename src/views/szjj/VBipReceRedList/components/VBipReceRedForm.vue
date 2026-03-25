<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="主键，BIP收款单据表头唯一标识" v-bind="validateInfos.pkGatherbill">
            <a-input v-model:value="formData.pkGatherbill" placeholder="请输入主键，BIP收款单据表头唯一标识" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据号，BIP自动生成" v-bind="validateInfos.billno">
            <a-input v-model:value="formData.billno" placeholder="请输入单据号，BIP自动生成" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据日期，格式示例：2025-04-24" v-bind="validateInfos.billdate">
		        <a-date-picker placeholder="请选择单据日期，格式示例：2025-04-24" v-model:value="formData.billdate" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="打款客户" v-bind="validateInfos.paycustomer">
            <a-input v-model:value="formData.paycustomer" placeholder="请输入打款客户" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.cpynam">
            <a-input v-model:value="formData.cpynam" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="原币金额" v-bind="validateInfos.money">
	          <a-input-number v-model:value="formData.money" placeholder="请输入原币金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="可用金额" v-bind="validateInfos.balan">
	          <a-input-number v-model:value="formData.balan" placeholder="请输入可用金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="主键，BIP收款单据表头唯一标识" v-bind="validateInfos.rpkGatherbill">
            <a-input v-model:value="formData.rpkGatherbill" placeholder="请输入主键，BIP收款单据表头唯一标识" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据号，BIP自动生成" v-bind="validateInfos.rbillno">
            <a-input v-model:value="formData.rbillno" placeholder="请输入单据号，BIP自动生成" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据日期，格式示例：2025-04-24" v-bind="validateInfos.rbilldate">
		        <a-date-picker placeholder="请选择单据日期，格式示例：2025-04-24" v-model:value="formData.rbilldate" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="打款客户" v-bind="validateInfos.rpaycustomer">
            <a-input v-model:value="formData.rpaycustomer" placeholder="请输入打款客户" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.rcpynam">
            <a-input v-model:value="formData.rcpynam" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="原币金额" v-bind="validateInfos.rmoney">
	          <a-input-number v-model:value="formData.rmoney" placeholder="请输入原币金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="ruseamt" v-bind="validateInfos.ruseamt">
	          <a-input-number v-model:value="formData.ruseamt" placeholder="请输入ruseamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import moment from 'moment';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../VBipReceRed.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    pkGatherbill: '',   
    id: '',
    billno: '',   
    id: '',
    billdate: '',   
    id: '',
    paycustomer: '',   
    id: '',
    cpynam: '',   
    id: '',
    money: undefined,
    id: '',
    balan: undefined,
    id: '',
    rpkGatherbill: '',   
    id: '',
    rbillno: '',   
    id: '',
    rbilldate: '',   
    id: '',
    rpaycustomer: '',   
    id: '',
    rcpynam: '',   
    id: '',
    rmoney: undefined,
    id: '',
    ruseamt: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    pkGatherbill: [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!'},],
    billno: [{ required: true, message: '请输入单据号，BIP自动生成!'},],
    billdate: [{ required: true, message: '请输入单据日期，格式示例：2025-04-24!'},],
    money: [{ required: true, message: '请输入原币金额!'},],
    rpkGatherbill: [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!'},],
    rbillno: [{ required: true, message: '请输入单据号，BIP自动生成!'},],
    rbilldate: [{ required: true, message: '请输入单据日期，格式示例：2025-04-24!'},],
    rmoney: [{ required: true, message: '请输入原币金额!'},],
    ruseamt: [{ required: true, message: '请输入ruseamt!'},],
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
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
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
</style>
