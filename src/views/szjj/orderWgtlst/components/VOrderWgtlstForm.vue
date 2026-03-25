<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="码单" v-bind="validateInfos.codno">
            <a-input v-model:value="formData.codno" placeholder="请输入码单" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单号[szjj_busi_order.ordno]" v-bind="validateInfos.salordno">
            <a-input v-model:value="formData.salordno" placeholder="请输入单号[szjj_busi_order.ordno]" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="销售日期【szjj_buss_main.delvbdat】" v-bind="validateInfos.saldat">
		        <a-date-picker placeholder="请选择销售日期【szjj_buss_main.delvbdat】" v-model:value="formData.saldat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="数量" v-bind="validateInfos.pigcnt">
	          <a-input-number v-model:value="formData.pigcnt" placeholder="请输入数量" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="总重" v-bind="validateInfos.wgt">
	          <a-input-number v-model:value="formData.wgt" placeholder="请输入总重" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="金额[不含折扣金额 销售金额=amt+discamt]" v-bind="validateInfos.amt">
	          <a-input-number v-model:value="formData.amt" placeholder="请输入金额[不含折扣金额 销售金额=amt+discamt]" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场代码" v-bind="validateInfos.farmercod">
	          <j-dict-select-tag v-model:value="formData.farmercod" dictCode="szjj_base_farmer  where auditing='1',farmer_name,farmer_code" placeholder="请选择猪场代码" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.farmnam">
            <a-input v-model:value="formData.farmnam" placeholder="请输入名称" :disabled="disabled"></a-input>
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
          <a-form-item label="状态（A：待确认【收款待认领】，C：收款认领，Y：已完成，N作废）" v-bind="validateInfos.state">
	          <j-dict-select-tag v-model:value="formData.state" dictCode="order_state" placeholder="请选择状态（A：待确认【收款待认领】，C：收款认领，Y：已完成，N作废）" :disabled="disabled"/>
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
  import { saveOrUpdate } from '../VOrderWgtlst.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    codno: '',   
    id: '',
    salordno: '',   
    id: '',
    saldat: '',   
    id: '',
    pigcnt: undefined,
    id: '',
    wgt: undefined,
    id: '',
    amt: undefined,
    id: '',
    farmercod: '',   
    id: '',
    farmnam: '',   
    id: '',
    custcod: '',   
    id: '',
    custnam: '',   
    id: '',
    state: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    codno: [{ required: true, message: '请输入码单!'},],
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
