<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="流程单号" v-bind="validateInfos.docno">
                        <a-input v-model:value="formData.docno" placeholder="请输入流程单号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="流程标题" v-bind="validateInfos.title">
                        <a-input-number v-model:value="formData.title" placeholder="请输入流程标题" style="width: 100%"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="流程编码" v-bind="validateInfos.proccod">
                        <j-dict-select-tag v-model:value="formData.proccod" dictCode="" placeholder="请选择流程编码"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="流程名称" v-bind="validateInfos.procnam">
                        <a-input v-model:value="formData.procnam" placeholder="请输入流程名称" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="流程ID" v-bind="validateInfos.bindid">
                        <a-input v-model:value="formData.bindid" placeholder="请输入流程ID" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="同步日期" v-bind="validateInfos.syncdat">
                        <a-date-picker placeholder="请选择同步日期" v-model:value="formData.syncdat" value-format="YYYY-MM-DD"
                            style="width: 100%" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="同步状态" v-bind="validateInfos.syncsta">
                        <j-dict-select-tag v-model:value="formData.syncsta" dictCode="xms_sync_bpmproc.syncsta"
                            placeholder="请选择同步状态" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="同步次数" v-bind="validateInfos.synctimes">
                        <a-input-number v-model:value="formData.synctimes" placeholder="请输入同步次数" style="width: 100%"
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
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../XmsSyncBpmproc.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    docno: '',
    id: '',
    title: undefined,
    id: '',
    proccod: '',
    id: '',
    procnam: '',
    id: '',
    bindid: '',
    id: '',
    syncdat: '',
    id: '',
    syncsta: '',
    id: '',
    synctimes: undefined
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {}
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
    padding: 24px 24px 24px 24px;
}
</style>
