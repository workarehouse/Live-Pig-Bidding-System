<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="序号">
                        <a-input v-model:value="formData.ord" placeholder="请输入序号" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="区域" v-bind="validateInfos.areacod">
                        <j-dict-select-tag v-model:value="formData.areacod"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
                            placeholder="请选择区域" :disabled="disabled && formData.id" :showChooseOption="false" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="品种" v-bind="validateInfos.pigctg">
                        <j-dict-select-tag v-model:value="formData.pigctg" dictCode="xms_pritpl.pigctg"
                            placeholder="请选择品种" :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="重量阶段" v-bind="validateInfos.wgtstg">
                        <j-dict-select-tag v-model:value="formData.wgtstg" dictCode="xms_pritpl.wgtstg"
                            placeholder="请选择重量阶段" :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="分级" v-bind="validateInfos.grade">
                        <j-dict-select-tag v-model:value="formData.grade" dictCode="xms_pritpl.grade"
                            :showChooseOption="false" placeholder="请选择分级" :disabled="disabled" />
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="最小重量" v-bind="validateInfos.minwgt">
                        <a-input v-model:value="formData.minwgt" placeholder="请输入最小重量" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="最大重量" v-bind="validateInfos.maxwgt">
                        <a-input v-model:value="formData.maxwgt" placeholder="请输入最大重量" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="状态" v-bind="validateInfos.state">
                        <j-switch v-model:value="formData.state" :disabled="disabled"></j-switch>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="备注" v-bind="validateInfos.msg">
                        <a-input v-model:value="formData.msg" placeholder="请输入备注" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <!-- <a-col :span="24">
                    <a-form-item label="创建人" v-bind="validateInfos.createBy">
                        <a-input v-model:value="formData.createBy" placeholder="请输入创建人" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="创建时间" v-bind="validateInfos.createTime">
                        <a-date-picker
                            placeholder="请选择创建时间"
                            v-model:value="formData.createTime"
                            value-format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled="disabled"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="更新人" v-bind="validateInfos.updateBy">
                        <a-input v-model:value="formData.updateBy" placeholder="请输入更新人" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="更新时间" v-bind="validateInfos.updateTime">
                        <a-date-picker
                            placeholder="请选择更新时间"
                            v-model:value="formData.updateTime"
                            value-format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled="disabled"
                        />
                    </a-form-item>
                </a-col> -->
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
import JSwitch from '/@/components/Form/src/jeecg/components/JSwitch.vue'
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../XmsPritpl.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    tplid: '',
    areacod: '',
    pigctg: '',
    wgtstg: '',
    grade: '',
    state: 'Y',
    msg: '',
    createBy: '',
    createTime: '',
    updateBy: '',
    updateTime: ''
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
    if (model.tplid) {
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
