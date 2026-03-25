<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="区域代码" v-bind="validateInfos.areacod">
            <a-input v-model:value="formData.areacod" placeholder="请输入区域代码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="出栏日期" v-bind="validateInfos.outdat">
		        <a-date-picker placeholder="请选择出栏日期" v-model:value="formData.outdat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="汇总数量" v-bind="validateInfos.tqty">
	          <a-input-number v-model:value="formData.tqty" placeholder="请输入汇总数量" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="状态;A：汇总， B：已确认   X：作废  字典：xms_ndoutplan_sum" v-bind="validateInfos.state">
	          <j-select-multiple type="list_multi" v-model:value="formData.state" dictCode="xms_ndoutplan_sum" placeholder="请选择状态;A：汇总， B：已确认   X：作废  字典：xms_ndoutplan_sum" :disabled="disabled" :triggerChange="false"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="汇总时间" v-bind="validateInfos.sumtime">
		        <a-date-picker placeholder="请选择汇总时间" v-model:value="formData.sumtime" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="汇总人" v-bind="validateInfos.sumusr">
            <a-input v-model:value="formData.sumusr" placeholder="请输入汇总人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="确认时间" v-bind="validateInfos.cfmtime">
		        <a-date-picker placeholder="请选择确认时间" v-model:value="formData.cfmtime" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="确认人" v-bind="validateInfos.cfmusr">
            <a-input v-model:value="formData.cfmusr" placeholder="请输入确认人" :disabled="disabled"></a-input>
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
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../XmsNdoutplanSum.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    areacod: '',   
    id: '',
    outdat: '',   
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
