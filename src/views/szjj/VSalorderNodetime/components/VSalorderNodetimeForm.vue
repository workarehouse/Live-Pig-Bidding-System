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
          <a-form-item label="销售日期【szjj_buss_main.delvbdat】" v-bind="validateInfos.saldat">
            <a-date-picker placeholder="请选择销售日期【szjj_buss_main.delvbdat】" v-model:value="formData.saldat"
              value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="编码" v-bind="validateInfos.farmcod">
            <a-input v-model:value="formData.farmcod" placeholder="请输入编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.farmnam">
            <a-input v-model:value="formData.farmnam" placeholder="请输入名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="销售业务" v-bind="validateInfos.lnkman">
            <a-input v-model:value="formData.lnkman" placeholder="请输入销售业务" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场财务人员" v-bind="validateInfos.farmfin">
            <a-input v-model:value="formData.farmfin" placeholder="请输入猪场财务人员" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场开票员" v-bind="validateInfos.farmchck">
            <a-input v-model:value="formData.farmchck" placeholder="请输入猪场开票员" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场厂长" v-bind="validateInfos.farmmgr">
            <a-input v-model:value="formData.farmmgr" placeholder="请输入猪场厂长" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款单推送时间（收款确认）" v-bind="validateInfos.repushdat">
            <a-date-picker placeholder="请选择收款单推送时间（收款确认）" v-model:value="formData.repushdat" value-format="YYYY-MM-DD"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款单领用【第一次】（收款领用）" v-bind="validateInfos.reclamdat">
            <a-date-picker placeholder="请选择收款单领用【第一次】（收款领用）" v-model:value="formData.reclamdat"
              value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="reclamdatDur" v-bind="validateInfos.reclamdatDur">
            <a-input-number v-model:value="formData.reclamdatDur" placeholder="请输入reclamdatDur" style="width: 100%"
              :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="售前完成时间" v-bind="validateInfos.bsaldat">
            <a-date-picker placeholder="请选择售前完成时间" v-model:value="formData.bsaldat" value-format="YYYY-MM-DD"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="bsaldatDur" v-bind="validateInfos.bsaldatDur">
            <a-input-number v-model:value="formData.bsaldatDur" placeholder="请输入bsaldatDur" style="width: 100%"
              :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="最后一张码单 
码单提交（开票员） 传码单【倒数第二次】
" v-bind="validateInfos.codsmtim">
            <a-date-picker placeholder="请选择最后一张码单 
码单提交（开票员） 传码单【倒数第二次】
" v-model:value="formData.codsmtim" value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="codsmtimDur" v-bind="validateInfos.codsmtimDur">
            <a-input-number v-model:value="formData.codsmtimDur" placeholder="请输入codsmtimDur" style="width: 100%"
              :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="足额收款最后一次领款 交割之前最后一次领款  交割时记录
" v-bind="validateInfos.lastreclamdat">
            <a-date-picker placeholder="请选择足额收款最后一次领款 交割之前最后一次领款  交割时记录
" v-model:value="formData.lastreclamdat" value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="lastreclamdatDur" v-bind="validateInfos.lastreclamdatDur">
            <a-input-number v-model:value="formData.lastreclamdatDur" placeholder="请输入lastreclamdatDur"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单可交割 【码单审核】订单可交割【码单99】
" v-bind="validateInfos.wdelvdat">
            <a-date-picker placeholder="请选择订单可交割 【码单审核】订单可交割【码单99】
" v-model:value="formData.wdelvdat" value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="wdelvdatDur" v-bind="validateInfos.wdelvdatDur">
            <a-input-number v-model:value="formData.wdelvdatDur" placeholder="请输入wdelvdatDur" style="width: 100%"
              :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="现场折扣【折减审批】时间" v-bind="validateInfos.issudat">
            <a-date-picker placeholder="请选择现场折扣【折减审批】时间" v-model:value="formData.issudat" value-format="YYYY-MM-DD"
              style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="issudatDur" v-bind="validateInfos.issudatDur">
            <a-input-number v-model:value="formData.issudatDur" placeholder="请输入issudatDur" style="width: 100%"
              :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单已交割时间
" v-bind="validateInfos.delvdat">
            <a-date-picker placeholder="请选择订单已交割时间
" v-model:value="formData.delvdat" value-format="YYYY-MM-DD" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="delvdatDur" v-bind="validateInfos.delvdatDur">
            <a-input-number v-model:value="formData.delvdatDur" placeholder="请输入delvdatDur" style="width: 100%"
              :disabled="disabled" />
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
import { saveOrUpdate } from '../VSalorderNodetime.api';
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
  saldat: '',
  id: '',
  farmcod: '',
  id: '',
  farmnam: '',
  id: '',
  lnkman: '',
  id: '',
  farmfin: '',
  id: '',
  farmchck: '',
  id: '',
  farmmgr: '',
  id: '',
  repushdat: '',
  id: '',
  reclamdat: '',
  id: '',
  reclamdatDur: undefined,
  id: '',
  bsaldat: '',
  id: '',
  bsaldatDur: undefined,
  id: '',
  codsmtim: '',
  id: '',
  codsmtimDur: undefined,
  id: '',
  lastreclamdat: '',
  id: '',
  lastreclamdatDur: undefined,
  id: '',
  wdelvdat: '',
  id: '',
  wdelvdatDur: undefined,
  id: '',
  issudat: '',
  id: '',
  issudatDur: undefined,
  id: '',
  delvdat: '',
  id: '',
  delvdatDur: undefined,
});
const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  ordno: [{ required: true, message: '请输入单号!' },],
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
