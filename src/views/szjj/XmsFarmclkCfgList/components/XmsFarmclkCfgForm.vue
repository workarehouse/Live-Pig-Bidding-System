<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="猪场" v-bind="validateInfos.farmcod">
            <j-dict-select-tag v-model:value="formData.farmcod" dictCode="szjj_base_farmer,farmer_name,farmer_code"
              placeholder="请选择猪场" :disabled="disabled || isUpdate" showSearch />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="区域" v-bind="validateInfos.area">
            <a-input v-model:value="formData.area" placeholder="请输入区域" :disabled="disabled || isUpdate"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="统计项（辅助配置）" v-bind="validateInfos.rptitm">
            <a-select v-model:value="formData.rptitm" placeholder="请选择统计项（辅助配置）" :disabled="disabled">
              <a-select-option value="车间">车间</a-select-option>
              <a-select-option value="其他">其他</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="排序号" v-bind="validateInfos.ord">
            <a-input v-model:value="formData.ord" placeholder="请输入排序号" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { getValueType } from '/@/utils';
import { saveOrUpdate } from '../XmsFarmclkCfg.api';
import { Form } from 'ant-design-vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const isUpdate = ref<boolean>(false);
const formData = reactive<Record<string, any>>({
  id: '',
  farmcod: '',
  area: '',
  rptitm: '',
  ord: '',
});
const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  area: [{ required: true, message: '请输入区域!' },],
};
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

/**
 * 新增
 */
function add() {
  isUpdate.value = false;
  nextTick(() => {
    resetFields();
    Object.assign(formData, {
      id: '',
      farmcod: '',
      area: '',
      rptitm: '',
      ord: '',
    });
  });
}

/**
 * 编辑
 */
function edit(record) {
  isUpdate.value = true;
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
  //时间格式化
  let model = formData;
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
