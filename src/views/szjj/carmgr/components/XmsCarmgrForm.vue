<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="车牌号" v-bind="validateInfos.carno">
                        <a-input v-model:value="formData.carno" placeholder="请输入车牌号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="车辆类型" v-bind="validateInfos.stycod">
                        <j-dict-select-tag v-model:value="formData.stycod" dictCode="xms_carmgr.stycod"
                            placeholder="请选择洗消点类型" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="区域" v-bind="validateInfos.areacod">
                        <j-dict-select-tag v-model:value="formData.areacod"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
                            placeholder="请选择区域" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="司机账号" v-bind="validateInfos.drvno">
                        <j-dict-select-tag v-model:value="formData.drvno"
                            dictCode="sys_user WHERE user_identity=4,username,username" placeholder="请选择司机账号"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="司机姓名" v-bind="validateInfos.drvnam">
                        <a-input v-model:value="formData.drvnam" placeholder="请输入司机姓名" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="司机电话" v-bind="validateInfos.tel">
                        <a-input v-model:value="formData.tel" placeholder="请输入司机电话" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="状态" v-bind="validateInfos.state">
                        <j-dict-select-tag type="radio" v-model:value="formData.state" dictCode="state_yn"
                            placeholder="请选择状态" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="备注" v-bind="validateInfos.msg">
                        <a-textarea v-model:value="formData.msg" rows="4" placeholder="请输入备注" :disabled="disabled" />
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
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../XmsCarmgr.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    carno: '',
    stycod: '',
    areacod: '',
    drvno: '',
    drvnam: '',
    tel: '',
    state: '',
    msg: ''
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    carno: [{ required: true, message: '请输入车牌号!' }],
    stycod: [{ required: true, message: '请输入洗消点类型!' }],
    areacod: [{ required: true, message: '请输入区域!' }],
    drvno: [{ required: true, message: '请输入司机账号!' }],
    tel: [{ required: false }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }],
    state: [{ required: true, message: '请输入状态!' }]
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
    if (model.ptid) {
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
