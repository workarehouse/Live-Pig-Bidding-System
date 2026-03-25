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
          <a-form-item label="销售单号  szjj_busi_order.ordno" v-bind="validateInfos.salordno">
            <a-input v-model:value="formData.salordno" placeholder="请输入销售单号  szjj_busi_order.ordno" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款单勾选金额【累计和】" v-bind="validateInfos.receamt">
	          <a-input-number v-model:value="formData.receamt" placeholder="请输入收款单勾选金额【累计和】" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="尾款冻结金额" v-bind="validateInfos.frzbalan">
	          <a-input-number v-model:value="formData.frzbalan" placeholder="请输入尾款冻结金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="折扣冻结金额" v-bind="validateInfos.frzdisc">
	          <a-input-number v-model:value="formData.frzdisc" placeholder="请输入折扣冻结金额" style="width: 100%" :disabled="disabled"/>
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
          <a-form-item label="更新时间" v-bind="validateInfos.upddat">
		        <a-date-picker placeholder="请选择更新时间" v-model:value="formData.upddat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="更新人" v-bind="validateInfos.updusr">
            <a-input v-model:value="formData.updusr" placeholder="请输入更新人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="状态（Y：已完成，N作废）" v-bind="validateInfos.state">
            <a-input v-model:value="formData.state" placeholder="请输入状态（Y：已完成，N作废）" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../XmsClamRece.api';
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
    salordno: '',   
    id: '',
    receamt: undefined,
    id: '',
    frzbalan: undefined,
    id: '',
    frzdisc: undefined,
    id: '',
    creusr: '',   
    id: '',
    credat: '',   
    id: '',
    upddat: '',   
    id: '',
    updusr: '',   
    id: '',
    state: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    ordno: [{ required: true, message: '请输入单号!'},],
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
