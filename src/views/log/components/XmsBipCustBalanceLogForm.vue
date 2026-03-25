<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="关联单号【当扣减收款单 xms_nc_rece_cons_log.ordno,  当冻结尾款，冻结折扣，实扣尾款或实扣质量折扣 为 销售单号szjj_busi_order.ordno 】" v-bind="validateInfos.srcno">
            <a-input v-model:value="formData.srcno" placeholder="请输入关联单号【当扣减收款单 xms_nc_rece_cons_log.ordno,  当冻结尾款，冻结折扣，实扣尾款或实扣质量折扣 为 销售单号szjj_busi_order.ordno 】" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户编码" v-bind="validateInfos.custcod">
            <a-input v-model:value="formData.custcod" placeholder="请输入客户编码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="猪场代码" v-bind="validateInfos.lpno">
            <a-input v-model:value="formData.lpno" placeholder="请输入猪场代码" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结收款金额(来源收款单，本次变动值, 正数是增加冻结值 负数是使用冻结值[减少冻结值])" v-bind="validateInfos.frzamt">
	          <a-input-number v-model:value="formData.frzamt" placeholder="请输入冻结收款金额(来源收款单，本次变动值, 正数是增加冻结值 负数是使用冻结值[减少冻结值])" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结质量折扣（本次变动值 ：正数为增加，负数为扣减）" v-bind="validateInfos.frzdisc">
	          <a-input-number v-model:value="formData.frzdisc" placeholder="请输入冻结质量折扣（本次变动值 ：正数为增加，负数为扣减）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结尾款（本次变动值 ：正数为增加，负数为扣减）" v-bind="validateInfos.frzbalan">
	          <a-input-number v-model:value="formData.frzbalan" placeholder="请输入冻结尾款（本次变动值 ：正数为增加，负数为扣减）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结转出金额（本次变动值 ：正数为增加，负数为扣减）" v-bind="validateInfos.frzchgamt">
	          <a-input-number v-model:value="formData.frzchgamt" placeholder="请输入冻结转出金额（本次变动值 ：正数为增加，负数为扣减）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="收款金额变动（本次变动值：正数为增加，负数为扣减）" v-bind="validateInfos.avamt">
	          <a-input-number v-model:value="formData.avamt" placeholder="请输入收款金额变动（本次变动值：正数为增加，负数为扣减）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="质量折扣变动（本次变动值：正数为增加，负数为扣减）" v-bind="validateInfos.discbalan">
	          <a-input-number v-model:value="formData.discbalan" placeholder="请输入质量折扣变动（本次变动值：正数为增加，负数为扣减）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="尾款变动(本次变动值：正数为增加，负数为扣减)" v-bind="validateInfos.balan">
	          <a-input-number v-model:value="formData.balan" placeholder="请输入尾款变动(本次变动值：正数为增加，负数为扣减)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="退款冻结金额（本次正在退款的金额）" v-bind="validateInfos.frzretamt">
	          <a-input-number v-model:value="formData.frzretamt" placeholder="请输入退款冻结金额（本次正在退款的金额）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="     *        收款单：     0：冻结收款（frzamt>0） 1：扣减冻结收款 2: 收到收款单【直接增加】 4：直接扣减收款【未经冻结，直接扣减】
     *        尾 款：     10：冻结尾款  11：扣减冻结尾款 12: 直接增加尾款 14：直接扣减尾款
     *        折 扣：     20：冻结质量折扣  21：扣减冻结质量折扣 22: 直接增加质量折扣 24：直接扣减质量折扣
     *        退款：      32：直接增加退款冻结金额（正在退款金额）   34：减少退款冻结金额（就是退款成功）" v-bind="validateInfos.ordsty">
            <a-input v-model:value="formData.ordsty" placeholder="请输入     *        收款单：     0：冻结收款（frzamt>0） 1：扣减冻结收款 2: 收到收款单【直接增加】 4：直接扣减收款【未经冻结，直接扣减】
     *        尾 款：     10：冻结尾款  11：扣减冻结尾款 12: 直接增加尾款 14：直接扣减尾款
     *        折 扣：     20：冻结质量折扣  21：扣减冻结质量折扣 22: 直接增加质量折扣 24：直接扣减质量折扣
     *        退款：      32：直接增加退款冻结金额（正在退款金额）   34：减少退款冻结金额（就是退款成功）" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前冻结金额(冻结收款单之后)" v-bind="validateInfos.curfrzamt">
	          <a-input-number v-model:value="formData.curfrzamt" placeholder="请输入当前冻结金额(冻结收款单之后)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前冻结质量折扣（冻结折扣之后）" v-bind="validateInfos.curfrzdisc">
	          <a-input-number v-model:value="formData.curfrzdisc" placeholder="请输入当前冻结质量折扣（冻结折扣之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前可用质量折扣（实际扣减折扣之后）" v-bind="validateInfos.curdiscbalan">
	          <a-input-number v-model:value="formData.curdiscbalan" placeholder="请输入当前可用质量折扣（实际扣减折扣之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前可用尾款(扣减尾款之后)" v-bind="validateInfos.curbalan">
	          <a-input-number v-model:value="formData.curbalan" placeholder="请输入当前可用尾款(扣减尾款之后)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前冻结尾款（冻结之后）" v-bind="validateInfos.curfrzbalan">
	          <a-input-number v-model:value="formData.curfrzbalan" placeholder="请输入当前冻结尾款（冻结之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前收款单金额（实扣之后）" v-bind="validateInfos.curavamt">
	          <a-input-number v-model:value="formData.curavamt" placeholder="请输入当前收款单金额（实扣之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前退款冻结金额（本次退款之后）" v-bind="validateInfos.curfrzretamt">
	          <a-input-number v-model:value="formData.curfrzretamt" placeholder="请输入当前退款冻结金额（本次退款之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="当前冻结转出金额（冻结之后）" v-bind="validateInfos.curfrzchgamt">
	          <a-input-number v-model:value="formData.curfrzchgamt" placeholder="请输入当前冻结转出金额（冻结之后）" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="更新人" v-bind="validateInfos.updusr">
            <a-input v-model:value="formData.updusr" placeholder="请输入更新人" :disabled="disabled"></a-input>
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
          <a-form-item label="日志信息" v-bind="validateInfos.logmsg">
            <a-input v-model:value="formData.logmsg" placeholder="请输入日志信息" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="冻结使用状态 0：冻结状态 1：已经使用 -1：其他" v-bind="validateInfos.frzuseflg">
            <a-input v-model:value="formData.frzuseflg" placeholder="请输入冻结使用状态 0：冻结状态 1：已经使用 -1：其他" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../XmsBipCustBalanceLog.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    srcno: '',   
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
    frzchgamt: undefined,
    id: '',
    avamt: undefined,
    id: '',
    discbalan: undefined,
    id: '',
    balan: undefined,
    id: '',
    frzretamt: undefined,
    id: '',
    ordsty: '',   
    id: '',
    curfrzamt: undefined,
    id: '',
    curfrzdisc: undefined,
    id: '',
    curdiscbalan: undefined,
    id: '',
    curbalan: undefined,
    id: '',
    curfrzbalan: undefined,
    id: '',
    curavamt: undefined,
    id: '',
    curfrzretamt: undefined,
    id: '',
    curfrzchgamt: undefined,
    id: '',
    updusr: '',   
    id: '',
    creusr: '',   
    id: '',
    credat: '',   
    id: '',
    upddat: '',   
    id: '',
    logmsg: '',   
    id: '',
    frzuseflg: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    custcod: [{ required: true, message: '请输入客户编码!'},],
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
