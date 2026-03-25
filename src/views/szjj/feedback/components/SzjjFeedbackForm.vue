<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="评价内容" v-bind="validateInfos.content">
            <a-textarea v-model:value="formData.content" placeholder="请输入评价内容" :disabled="disabled" :rows="4"></a-textarea>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手机号" v-bind="validateInfos.mobile">
             
            {{formData.mobile}}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="照片1" v-bind="validateInfos.picurl1">
	          <j-image-upload  v-model:value="formData.picurl1" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="formData.picurl2">
          <a-form-item label="照片2" v-bind="validateInfos.picurl2">
	          <j-image-upload  v-model:value="formData.picurl2" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
     
        <a-col :span="24">
          <a-form-item label="反馈人" v-bind="validateInfos.creusr">
             
            {{formData.creusr}}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="反馈时间" v-bind="validateInfos.credat">
		            {{formData.credat}}
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
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../SzjjFeedback.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    content: '',   
    id: '',
    mobile: '',   
    id: '',
    picurl1: '',   
    id: '',
    picurl2: '',   
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
  });
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
