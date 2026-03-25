<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="单号" v-bind="validateInfos.ordno">
            <a-input v-model:value="formData.ordno" placeholder="请输入单号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场代码" v-bind="validateInfos.farmcod">
	          <j-dict-select-tag v-model:value="formData.farmcod" dictCode="szjj_base_farmer where auditing='1',farmer_name,farmer_code" placeholder="请选择猪场代码" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.farmnam">
            <a-input v-model:value="formData.farmnam" placeholder="请输入名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.custcod" placeholder="请输入客户编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="退款备注" v-bind="validateInfos.msg">
            <a-input v-model:value="formData.msg" placeholder="请输入退款备注" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="状态" v-bind="validateInfos.state">
            <a-input v-model:value="formData.state" placeholder="请输入状态" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="创建人" v-bind="validateInfos.creusr">
            <a-input v-model:value="formData.creusr" placeholder="请输入创建人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="创建时间" v-bind="validateInfos.credat">
		        <a-date-picker placeholder="请选择创建时间" v-model:value="formData.credat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="更新人" v-bind="validateInfos.updusr">
            <a-input v-model:value="formData.updusr" placeholder="请输入更新人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="更新时间" v-bind="validateInfos.upddat">
		        <a-date-picker placeholder="请选择更新时间" v-model:value="formData.upddat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="BPM审批完成时间" v-bind="validateInfos.bpmfindat">
		        <a-date-picker placeholder="请选择BPM审批完成时间" v-model:value="formData.bpmfindat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="NC审批完成时间" v-bind="validateInfos.ncfindat">
		        <a-date-picker placeholder="请选择NC审批完成时间" v-model:value="formData.ncfindat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="日志" v-bind="validateInfos.logmsg">
            <a-input v-model:value="formData.logmsg" placeholder="请输入日志" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="BPM审批申请单号" v-bind="validateInfos.docno">
            <a-input v-model:value="formData.docno" placeholder="请输入BPM审批申请单号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="NC申请单号" v-bind="validateInfos.ncdocno">
            <a-input v-model:value="formData.ncdocno" placeholder="请输入NC申请单号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="退款金额" v-bind="validateInfos.amt">
	          <a-input-number v-model:value="formData.amt" placeholder="请输入退款金额" style="width: 100%" :disabled="disabled"/>
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
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../VCustRefund.api';
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
    farmcod: '',   
    id: '',
    farmnam: '',   
    id: '',
    custcod: '',   
    id: '',
    msg: '',   
    id: '',
    state: '',   
    id: '',
    creusr: '',   
    id: '',
    credat: '',   
    id: '',
    updusr: '',   
    id: '',
    upddat: '',   
    id: '',
    bpmfindat: '',   
    id: '',
    ncfindat: '',   
    id: '',
    logmsg: '',   
    id: '',
    docno: '',   
    id: '',
    ncdocno: '',   
    id: '',
    amt: undefined,
    id: '',
    ordsty: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    ordno: [{ required: true, message: '请输入单号!'},],
    custcod: [{ required: true, message: '请输入客户编码!'},],
    amt: [{ required: true, message: '请输入退款金额!'},],
    ordsty: [{ required: true, message: '请输入单据类型 B：尾款退款  R：收款单退款!'},],
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
