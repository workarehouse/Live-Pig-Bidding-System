<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="销售日期【szjj_buss_main.delvbdat】" v-bind="validateInfos.saldat">
		        <a-date-picker placeholder="请选择销售日期【szjj_buss_main.delvbdat】" v-model:value="formData.saldat" value-format="YYYY-MM-DD"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单号" v-bind="validateInfos.lpno">
	          <j-dict-select-tag v-model:value="formData.lpno" dictCode="xms_bank_info  where state='Y',lpcpy,lpno" placeholder="请选择单号" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="法人单位" v-bind="validateInfos.lpcpy">
            <a-input v-model:value="formData.lpcpy" placeholder="请输入法人单位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="编码" v-bind="validateInfos.farmcod">
	          <j-dict-select-tag v-model:value="formData.farmcod" dictCode="szjj_base_farmer where auditing='1',farmer_name,farmer_code" placeholder="请选择编码" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.farmnam">
            <a-input v-model:value="formData.farmnam" placeholder="请输入名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="balan" v-bind="validateInfos.balan">
	          <a-input-number v-model:value="formData.balan" placeholder="请输入balan" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="delvbalan" v-bind="validateInfos.delvbalan">
	          <a-input-number v-model:value="formData.delvbalan" placeholder="请输入delvbalan" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="frzbalan" v-bind="validateInfos.frzbalan">
	          <a-input-number v-model:value="formData.frzbalan" placeholder="请输入frzbalan" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="receamt" v-bind="validateInfos.receamt">
	          <a-input-number v-model:value="formData.receamt" placeholder="请输入receamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="curavamt" v-bind="validateInfos.curavamt">
	          <a-input-number v-model:value="formData.curavamt" placeholder="请输入curavamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="curbalan" v-bind="validateInfos.curbalan">
	          <a-input-number v-model:value="formData.curbalan" placeholder="请输入curbalan" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="salamt" v-bind="validateInfos.salamt">
	          <a-input-number v-model:value="formData.salamt" placeholder="请输入salamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="discamt" v-bind="validateInfos.discamt">
	          <a-input-number v-model:value="formData.discamt" placeholder="请输入discamt" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="curdiscbalan" v-bind="validateInfos.curdiscbalan">
	          <a-input-number v-model:value="formData.curdiscbalan" placeholder="请输入curdiscbalan" style="width: 100%" :disabled="disabled"/>
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
  import { saveOrUpdate } from '../VOrderTrackSum.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    saldat: '',   
    id: '',
    lpno: '',   
    id: '',
    lpcpy: '',   
    id: '',
    farmcod: '',   
    id: '',
    farmnam: '',   
    id: '',
    balan: undefined,
    id: '',
    delvbalan: undefined,
    id: '',
    frzbalan: undefined,
    id: '',
    receamt: undefined,
    id: '',
    curavamt: undefined,
    id: '',
    curbalan: undefined,
    id: '',
    salamt: undefined,
    id: '',
    discamt: undefined,
    id: '',
    curdiscbalan: undefined,
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
