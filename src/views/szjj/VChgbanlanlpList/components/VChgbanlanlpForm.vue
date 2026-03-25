<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="ordno" v-bind="validateInfos.ordno">
            <a-input v-model:value="formData.ordno" placeholder="请输入ordno" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="BPM审批申请单号" v-bind="validateInfos.docno">
            <a-input v-model:value="formData.docno" placeholder="请输入BPM审批申请单号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.custcod" placeholder="请输入客户编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户名称" v-bind="validateInfos.custnam">
            <a-input v-model:value="formData.custnam" placeholder="请输入客户名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="源法人单位代码" v-bind="validateInfos.srclpno">
	          <j-dict-select-tag v-model:value="formData.srclpno" dictCode="" placeholder="请选择源法人单位代码" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.srclpcpy">
            <a-input v-model:value="formData.srclpcpy" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="目标法人单位代码" v-bind="validateInfos.tolpno">
	          <j-dict-select-tag v-model:value="formData.tolpno" dictCode="" placeholder="请选择目标法人单位代码" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.tolpcpy">
            <a-input v-model:value="formData.tolpcpy" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="转移金额(尾款)" v-bind="validateInfos.amt">
	          <a-input-number v-model:value="formData.amt" placeholder="请输入转移金额(尾款)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="创建时间" v-bind="validateInfos.credat">
		        <a-date-picker placeholder="请选择创建时间" v-model:value="formData.credat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="创建人" v-bind="validateInfos.creusr">
            <a-input v-model:value="formData.creusr" placeholder="请输入创建人" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="状态（A：待退款，B：发起BPM流程,C : BPM审批通过 D：发起NC退款，Y：已完成，N：BPM申请不通过）U：NC审批不通过 X:删除" v-bind="validateInfos.state">
            <a-input v-model:value="formData.state" placeholder="请输入状态（A：待退款，B：发起BPM流程,C : BPM审批通过 D：发起NC退款，Y：已完成，N：BPM申请不通过）U：NC审批不通过 X:删除" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="日志" v-bind="validateInfos.logmsg">
            <a-input v-model:value="formData.logmsg" placeholder="请输入日志" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../VChgbanlanlp.api';
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
    docno: '',   
    id: '',
    custcod: '',   
    id: '',
    custnam: '',   
    id: '',
    srclpno: '',   
    id: '',
    srclpcpy: '',   
    id: '',
    tolpno: '',   
    id: '',
    tolpcpy: '',   
    id: '',
    amt: undefined,
    id: '',
    credat: '',   
    id: '',
    creusr: '',   
    id: '',
    state: '',   
    id: '',
    logmsg: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    ordno: [{ required: true, message: '请输入ordno!'},],
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
