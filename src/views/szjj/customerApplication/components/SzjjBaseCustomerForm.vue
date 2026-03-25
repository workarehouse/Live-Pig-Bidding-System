<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="客户编码" v-bind="validateInfos.custCode">
                        <a-input v-model:value="formData.custCode" placeholder="自动生成" :disabled="true"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="分类" v-bind="validateInfos.custsty">
                        <j-dict-select-tag v-model:value="formData.custsty" dictCode="customer.custsty"
                            placeholder="请选择分类" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="客户名称" v-bind="validateInfos.custName">
                        <a-input v-model:value="formData.custName" placeholder="请输入客户名称" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="所属区域" v-bind="validateInfos.dataAuth">
                        <JSelectMultiple v-model:value="formData.dataAuth" :disabled="disabled"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="NC代码" v-bind="validateInfos.nccod">
                        <a-input v-model:value="formData.nccod" placeholder="" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="ERP代码" v-bind="validateInfos.erpcod">
                        <a-input v-model:value="formData.erpcod" placeholder="" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系人" v-bind="validateInfos.custPerson">
                        <a-input v-model:value="formData.custPerson" placeholder="请输入联系人"
                            :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系电话" v-bind="validateInfos.custTel">
                        <a-input v-model:value="formData.custTel" placeholder="请输入联系电话" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="联系地址" v-bind="validateInfos.addr">
                        <a-input v-model:value="formData.addr" placeholder="请输入联系地址" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="保证金" v-bind="validateInfos.payMoney">
                        <a-input v-model:value="formData.payMoney" placeholder="具体金额" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="12">
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
                </a-col>

                <a-col :span="12">
                    <a-form-item label="备注" v-bind="validateInfos.memo">
                        <a-textarea v-model:value="formData.memo" placeholder="请输入备注" :rows="4" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="12"></a-col>

                <a-col :span="12">
                    <a-form-item label="附件">
                        <JUpload :buttonVisible="false" v-model:value="formData.picurls" text="协议和转账记录"></JUpload>
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
import { saveOrUpdate } from '../SzjjBaseCustomer.api'
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
    doctyp: 'A'
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 7 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)

//表单验证
const validatorRules = {
    custsty: [{ required: true, message: '请选择分类!' }],
    dataAuth: [{ required: true, message: '请选择所属区域!' }],
    custName: [{ required: true, message: '请输入客户名称!' }],
    custPerson: [{ required: true, message: '请输入联系人!' }],
    payMoney: [{ required: true, message: '请输入保证金!' }],
    custLoginname: [{ required: true, message: '请输入登录账号!' }],
    custPassword: [{ required: true, message: '请输入登录密码!' }],
    custTel: [{ required: true }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }]
}
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true })

/**
 * 新增
 */
function add() {
    edit({})
}

/**
 * 编辑
 */
function edit(record) {
    nextTick(() => {
        resetFields()
        //赋值
        Object.assign(formData, record)
    })
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
        isUpdate.value = true
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
            if (res.success) {
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
