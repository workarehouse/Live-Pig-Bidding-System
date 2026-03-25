<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <!-- <a-col :span="12">
                    <a-form-item label="状态" v-bind="validateInfos.auditing">
                        <j-dict-select-tag v-model:value="formData.auditing" dictCode="cust_auditing"
                            placeholder="请选择状态" :disabled="disabled" />
                    </a-form-item>
                </a-col> -->

                <a-col :span="12">
                    <a-form-item label="客户编码" v-bind="validateInfos.custCode">
                        <a-input v-model:value="formData.custCode" placeholder="自动生成" :disabled="true"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="客户公司" v-bind="validateInfos.orgcode">
                        <JDictSelectTag :showChooseOption="false" v-model:value="formData.orgcode" placeholder="请选择客户公司"
                            dictCode="xms_cus_onoff_cpy" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="客户名称" v-bind="validateInfos.custName">
                        <a-input v-model:value="formData.custName" placeholder="请输入客户名称"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="客户类型" v-bind="validateInfos.custsty">
                        <j-dict-select-tag v-model:value="formData.custsty" dictCode="customer.custsty"
                            placeholder="请选择客户类型" :showChooseOption="false" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="NC代码" v-bind="validateInfos.nccod">
                        <a-input v-model:value="formData.nccod" placeholder="请输入NC代码"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="ERP代码" v-bind="validateInfos.erpcod">
                        <a-input v-model:value="formData.erpcod" placeholder="请输入养殖系统编码"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="所属区域" v-bind="validateInfos.dataAuth">
                        <j-select-multiple v-model:value="formData.dataAuth"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系人" v-bind="validateInfos.custPerson">
                        <a-input v-model:value="formData.custPerson" placeholder="请输入联系人"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系电话" v-bind="validateInfos.custTel">
                        <a-input v-model:value="formData.custTel" placeholder="请输入联系电话"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系地址" v-bind="validateInfos.addr">
                        <a-input v-model:value="formData.addr" placeholder="请输入联系地址"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="保证金" v-bind="validateInfos.payMoney">
                        <a-input v-model:value="formData.payMoney" placeholder="具体金额" :disabled="true"></a-input>
                    </a-form-item>
                </a-col>

                <!-- <a-col :span="12">
                    <a-form-item label="登录账号" v-bind="validateInfos.custLoginname">
                        <a-input v-model:value="formData.custLoginname" placeholder="请输入登录账号"
                            :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="登录密码" v-bind="validateInfos.custPassword">
                        <a-input v-model:value="formData.custPassword" placeholder="请输入登录密码"
                            :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col> -->

                <a-col :span="12">
                    <a-form-item label="银行名称">
                        <a-input v-model:value="formData.banknam" :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="银行账户名称">
                        <a-input v-model:value="formData.bankusr" :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="银行账号">
                        <a-input v-model:value="formData.bankno" :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="银行支付关联号">
                        <a-input v-model:value="formData.banksrcno"
                            :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="纳税号或身份证">
                        <a-input v-model:value="formData.idcard" :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="微信号">
                        <a-input v-model:value="formData.wxId" :disabled="disabled || formData.isOpenUser"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="备注" v-bind="validateInfos.memo">
                        <a-textarea v-model:value="formData.memo" placeholder="请输入备注" :rows="2"
                            :disabled="disabled || formData.isOpenUser" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="附件上传">
                        <JUpload v-model:value="formData.picurls" text="协议和转账记录"></JUpload>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="选择发起人" v-bind="validateInfos.bpmusr">
                        <JDictSelectTag :showChooseOption="false" v-model:value="formData.bpmusr" placeholder="请选择发起人"
                            dictCode="xms_ndsaleplan.bpmusr" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue'
import { defHttp } from '/@/utils/http/axios'
import { useMessage } from '/@/hooks/web/useMessage'
import moment from 'moment'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'
import JCheckbox from '/@/components/Form/src/jeecg/components/JCheckbox.vue'
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../BaseCustomer.api'
import { Form } from 'ant-design-vue'
import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue'
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    picurls: '',
    dataAuth: '',
    auditing: '',
    custCode: '',
    custName: '',
    custPerson: '',
    custTel: '',
    joinDatetime: '',
    outDatetime: '',
    payMoney: '',
    payDatetime: '',
    memo: '',
    wxId: '',
    wxName: '',
    doctyp: 'A',
    bpmusr: ''
})

const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 6 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    orgcode: [{ required: true, message: '请选择客户公司!' }],
    custsty: [{ required: true, message: '请选择分类!' }],
    dataAuth: [{ required: true, message: '请选择所属区域!' }],
    bpmusr: [{ required: true, message: '请选择发起人!' }]
    // custTel: [{ required: true, message: '请输入联系电话!' }]
}
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true })

/**
 * 新增
 */
function add(record) {
    edit(record || {})
}

/**
 * 编辑
 */
function edit(record) {
    setTimeout(() => {
        resetFields()
        //赋值
        Object.assign(formData, record)
    }, 20)
}

/**
 * 提交数据
 */
async function submitForm() {
    // 触发表单验证
    await validate()
    confirmLoading.value = true
    const isUpdate = ref<boolean>(false)
    //时间格式化
    let model = formData

    if (model.id) {
        isUpdate.value = formData.isUpdate
    }
    //循环数据
    for (let data in model) {
        //如果该数据是数组并且是字符串类型
        if (model[data] instanceof Array) {
            let valueType = getValueType(formRef.value.getProps, data)
            //如果是字符串类型的需要变成以逗号分割的字符串
            if (valueType === 'string') {
                model[data] = model[data].join(',')
            }
        }
    }

    await saveOrUpdate(model, isUpdate.value)
        .then((res) => {
            if (res) {
                createMessage.success(res.message)
                emit('ok')
            } else {
                createMessage.warning(res.message)
            }
        })
        .finally(() => {
            confirmLoading.value = false
        })
}

defineExpose({
    add,
    edit,
    submitForm
})
</script>

<style lang="less" scoped>
.antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 12px;
}
</style>
