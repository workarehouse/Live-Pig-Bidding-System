<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="主键，BIP收款单据表头唯一标识" v-bind="validateInfos.ordno">
            <a-input v-model:value="formData.ordno" placeholder="请输入主键，BIP收款单据表头唯一标识" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据日期，格式示例：2025-04-24" v-bind="validateInfos.billdate">
		        <a-date-picker placeholder="请选择单据日期，格式示例：2025-04-24" v-model:value="formData.billdate" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据号，BIP自动生成" v-bind="validateInfos.billno">
            <a-input v-model:value="formData.billno" placeholder="请输入单据号，BIP自动生成" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="打款客户" v-bind="validateInfos.paycustomer">
            <a-input v-model:value="formData.paycustomer" placeholder="请输入打款客户" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="财务组织编码(收款组织）" v-bind="validateInfos.orgcod">
            <a-input v-model:value="formData.orgcod" placeholder="请输入财务组织编码(收款组织）" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.orgnam">
            <a-input v-model:value="formData.orgnam" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="原币金额" v-bind="validateInfos.receamt">
	          <a-input-number v-model:value="formData.receamt" placeholder="请输入原币金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="clamt" v-bind="validateInfos.clamt">
	          <a-input-number v-model:value="formData.clamt" placeholder="请输入clamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="转为尾款的金额" v-bind="validateInfos.lpbalan">
	          <a-input-number v-model:value="formData.lpbalan" placeholder="请输入转为尾款的金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="销售单号  szjj_busi_order.ordno" v-bind="validateInfos.salordno">
            <a-input v-model:value="formData.salordno" placeholder="请输入销售单号  szjj_busi_order.ordno" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="销售日期【szjj_buss_main.delvbdat】" v-bind="validateInfos.saldat">
		        <a-date-picker placeholder="请选择销售日期【szjj_buss_main.delvbdat】" v-model:value="formData.saldat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户号码（采购商）" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.custcod" placeholder="请输入客户号码（采购商）" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户名称" v-bind="validateInfos.custnam">
            <a-input v-model:value="formData.custnam" placeholder="请输入客户名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场代码" v-bind="validateInfos.farmcod">
            <a-input v-model:value="formData.farmcod" placeholder="请输入猪场代码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.farmnam">
            <a-input v-model:value="formData.farmnam" placeholder="请输入名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="salamt" v-bind="validateInfos.salamt">
	          <a-input-number v-model:value="formData.salamt" placeholder="请输入salamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="state" v-bind="validateInfos.state">
            <a-input v-model:value="formData.state" placeholder="请输入state" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单号" v-bind="validateInfos.lpno">
            <a-input v-model:value="formData.lpno" placeholder="请输入单号" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../VClamReceInfo.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    ordno: '',   
    id: '',
    billdate: '',   
    id: '',
    billno: '',   
    id: '',
    paycustomer: '',   
    id: '',
    orgcod: '',   
    id: '',
    orgnam: '',   
    id: '',
    receamt: undefined,
    id: '',
    clamt: undefined,
    id: '',
    lpbalan: undefined,
    id: '',
    salordno: '',   
    id: '',
    saldat: '',   
    id: '',
    custcod: '',   
    id: '',
    custnam: '',   
    id: '',
    farmcod: '',   
    id: '',
    farmnam: '',   
    id: '',
    salamt: undefined,
    id: '',
    state: '',   
    id: '',
    lpno: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    ordno: [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!'},],
    billdate: [{ required: true, message: '请输入单据日期，格式示例：2025-04-24!'},],
    billno: [{ required: true, message: '请输入单据号，BIP自动生成!'},],
    orgcod: [{ required: true, message: '请输入财务组织编码(收款组织）!'},],
    receamt: [{ required: true, message: '请输入原币金额!'},],
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
