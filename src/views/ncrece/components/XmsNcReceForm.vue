<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="收款单ID" v-bind="validateInfos.ordno">
            <a-input v-model:value="formData.ordno" placeholder="请输入收款单ID" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款单号" v-bind="validateInfos.ordno">
            <a-input v-model:value="formData.billcod" placeholder="请输入收款单号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据日期" v-bind="validateInfos.orddat">
		        <a-date-picker placeholder="请选择单据日期" v-model:value="formData.orddat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据类型" v-bind="validateInfos.ordtyp">
            <a-input v-model:value="formData.ordtyp" placeholder="请输入单据类型" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="公司代码" v-bind="validateInfos.cpycod">
            <a-input v-model:value="formData.nccpycod" placeholder="请输入公司代码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场ID【部门ID】" v-bind="validateInfos.farmcod">
            <a-input v-model:value="formData.ncfarmcod" placeholder="请输入猪场ID【部门ID】" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.nccustcod" placeholder="请输入客户编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户名称" v-bind="validateInfos.custnam">
            <a-input v-model:value="formData.custnam" placeholder="请输入客户名称【customer】" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="总金额" v-bind="validateInfos.amt">
	          <a-input-number v-model:value="formData.amt" placeholder="请输入总金额" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单据更新日期" v-bind="validateInfos.updat">
		        <a-date-picker placeholder="请选择单据更新日期【系统更新日期】" v-model:value="formData.updat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      
        <a-col :span="24">
          <a-form-item label="数据同步时间" v-bind="validateInfos.syncdat">
		        <a-date-picker placeholder="请选择数据同步时间" v-model:value="formData.syncdat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
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
  import { saveOrUpdate } from '../XmsNcRece.api';
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
    orddat: '',   
    id: '',
    ordtyp: '',   
    id: '',
    cpycod: '',   
    id: '',
    farmcod: '',   
    id: '',
    custcod: '',   
    id: '',
    custnam: '',   
    id: '',
    amt: undefined,
    id: '',
    updat: '',   
    id: '',
    state: '',   
    id: '',
    syncdat: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    ordno: [{ required: true, message: '请输入收款单号 vbillcode!'},],
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
