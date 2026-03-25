<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.custcod" placeholder="请输入客户编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.lpno">
	          <j-dict-select-tag v-model:value="formData.lpno" dictCode="" placeholder="请选择法人单位" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结金额(来源收款单)" v-bind="validateInfos.frzamt">
	          <a-input-number v-model:value="formData.frzamt" placeholder="请输入冻结金额(来源收款单)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结质量折扣" v-bind="validateInfos.frzdisc">
	          <a-input-number v-model:value="formData.frzdisc" placeholder="请输入冻结质量折扣" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结尾款" v-bind="validateInfos.frzbalan">
	          <a-input-number v-model:value="formData.frzbalan" placeholder="请输入冻结尾款" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="可用收款金额(来源收款单，)" v-bind="validateInfos.avamt">
	          <a-input-number v-model:value="formData.avamt" placeholder="请输入可用收款金额(来源收款单，)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="可用金额(尾款)" v-bind="validateInfos.balan">
	          <a-input-number v-model:value="formData.balan" placeholder="请输入可用金额(尾款)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="可用质量折扣（余额）" v-bind="validateInfos.discbalan">
	          <a-input-number v-model:value="formData.discbalan" placeholder="请输入可用质量折扣（余额）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="退款冻结金额（退款中）" v-bind="validateInfos.frzretamt">
	          <a-input-number v-model:value="formData.frzretamt" placeholder="请输入退款冻结金额（退款中）" style="width: 100%" :disabled="disabled"/>
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
          <a-form-item label="冻结转出金额（余额转移中）" v-bind="validateInfos.frzchgamt">
	          <a-input-number v-model:value="formData.frzchgamt" placeholder="请输入冻结转出金额（余额转移中）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户名称" v-bind="validateInfos.custnam">
            <a-input v-model:value="formData.custnam" placeholder="请输入客户名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.lpcpy">
            <a-input v-model:value="formData.lpcpy" placeholder="请输入法人单位" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../VBipCustBalance.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    custcod: '',   
    id: '',
    lpno: '',   
    id: '',
    frzamt: undefined,
    id: '',
    frzdisc: undefined,
    id: '',
    frzbalan: undefined,
    id: '',
    avamt: undefined,
    id: '',
    balan: undefined,
    id: '',
    discbalan: undefined,
    id: '',
    frzretamt: undefined,
    id: '',
    creusr: '',   
    id: '',
    credat: '',   
    id: '',
    updusr: '',   
    id: '',
    upddat: '',   
    id: '',
    frzchgamt: undefined,
    id: '',
    custnam: '',   
    id: '',
    lpcpy: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    custcod: [{ required: true, message: '请输入客户编码!'},],
    lpno: [{ required: true, message: '请输入法人单位!'},],
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
