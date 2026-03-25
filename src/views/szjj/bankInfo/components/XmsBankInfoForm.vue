<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="单号" v-bind="validateInfos.lpno">
                        <a-input v-model:value="formData.lpno" placeholder="请输入单号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="区域" v-bind="validateInfos.areacod">
                        <j-dict-select-tag :showChooseOption="false" v-model:value="formData.areacod"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
                            placeholder="请选择区域" :disabled="disabled" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="法人单位" v-bind="validateInfos.lpcpy">
                        <a-input v-model:value="formData.lpcpy" placeholder="请输入法人单位" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="NC编码" v-bind="validateInfos.nccod">
                        <a-input v-model:value="formData.nccod" placeholder="请输入NC公司编码"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="BIP部门代码" v-bind="validateInfos.ncdeptid">
                        <a-input v-model:value="formData.ncdeptid" placeholder="请输入BIP部门代码"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="税号" v-bind="validateInfos.taxno">
                        <a-input v-model:value="formData.taxno" placeholder="请输入税号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="银行账号" v-bind="validateInfos.bankno">
                        <a-input v-model:value="formData.bankno" placeholder="请输入银行账号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="银行名称" v-bind="validateInfos.banknam">
                        <a-input v-model:value="formData.banknam" placeholder="请输入银行名称" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="状态 Y：有效，N:无效" v-bind="validateInfos.state">
                        <a-input v-model:value="formData.state" placeholder="请输入状态 Y：有效，N:无效"
                            :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="备注" v-bind="validateInfos.msg">
                        <a-input v-model:value="formData.msg" placeholder="请输入备注" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="排序号" v-bind="validateInfos.ord">
                        <a-input-number v-model:value="formData.ord" placeholder="请输入排序号" style="width: 100%"
                            :disabled="disabled" />
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
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../XmsBankInfo.api'
import { Form } from 'ant-design-vue'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    lpno: '',
    lpcpy: '',
    taxno: '',
    bankno: '',
    banknam: '',
    state: '',
    msg: '',
    ncdeptid: "",
    ord: undefined
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    lpno: [{ required: true, message: '请输入单号!' }]
}
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true })

/**
 * 新增
 */
function add() {
    edit({ isAdd: true })
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
    if (!model.isAdd) {
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
    padding: 24px 24px 24px 24px;
}
</style>
