<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="猪场ID" v-bind="validateInfos.farmid">
                        <j-dict-select-tag
                            v-model:value="formData.farmid"
                            dictCode="szjj_base_farmer  where auditing='1',farmer_name,id"
                            placeholder="请选择猪场ID"
                            :disabled="disabled"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="出栏日期" v-bind="validateInfos.outdat">
                        <a-date-picker
                            placeholder="请选择出栏日期"
                            v-model:value="formData.outdat"
                            value-format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled="disabled"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="本周出栏计划数量" v-bind="validateInfos.wkplan">
                        <a-input-number
                            v-model:value="formData.wkplan"
                            placeholder="请输入本周出栏计划数量"
                            style="width: 100%"
                            :disabled="disabled"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="本周已出栏数量" v-bind="validateInfos.wkqty">
                        <a-input-number v-model:value="formData.wkqty" placeholder="请输入本周已出栏数量" style="width: 100%" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="待出栏" v-bind="validateInfos.awqty">
                        <a-input-number v-model:value="formData.awqty" placeholder="请输入待出栏" style="width: 100%" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="总头数【汇总】" v-bind="validateInfos.tqty">
                        <a-input-number v-model:value="formData.tqty" placeholder="请输入总头数【汇总】" style="width: 100%" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="总重量【汇总】" v-bind="validateInfos.twgt">
                        <a-input-number v-model:value="formData.twgt" placeholder="请输入总重量【汇总】" style="width: 100%" :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="状态;Y 有效，N 无效  F：已冻结【已汇总】" v-bind="validateInfos.state">
                        <a-input
                            v-model:value="formData.state"
                            placeholder="请输入状态;Y 有效，N 无效  F：已冻结【已汇总】"
                            :disabled="disabled"
                        ></a-input>
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
import { saveOrUpdate } from '../XmsNdoutplan.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    farmid: undefined,
    id: '',
    outdat: '',
    id: '',
    wkplan: undefined,
    id: '',
    wkqty: undefined,
    id: '',
    awqty: undefined,
    id: '',
    tqty: undefined,
    id: '',
    twgt: undefined,
    id: '',
    state: ''
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
