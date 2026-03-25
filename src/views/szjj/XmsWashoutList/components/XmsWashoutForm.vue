<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="洗消点编码" v-bind="validateInfos.ptcod">
                        <a-input v-model:value="formData.ptcod" placeholder="请输入洗消点编码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="洗消点名称" v-bind="validateInfos.ptnam">
                        <a-input v-model:value="formData.ptnam" placeholder="请输入洗消点名称" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="所属组织" v-bind="validateInfos.areacod">
                        <a-select v-model:value="formData.areacod" placeholder="请选择所属组织" :disabled="disabled">
                            <a-select-option v-for="item in areacodOptions" :value="item.orgid">{{ item.orgnam }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="地址" v-bind="validateInfos.addr">
                        <a-input v-model:value="formData.addr" placeholder="请输入详细地址" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
          <a-form-item label="地图精度" v-bind="validateInfos.lng">
            <a-input v-model:value="formData.lng" placeholder="地图精度" :disabled="disabled" ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="地图纬度" v-bind="validateInfos.lat">
            <a-input v-model:value="formData.lat" placeholder="地图纬度" :disabled="disabled" ></a-input>
          </a-form-item>
        </a-col>
                <a-col :span="24">
                    <a-form-item label="状态" v-bind="validateInfos.state">
                        <a-radio-group v-model:value="formData.state" button-style="solid" placeholder="请选择状态" :disabled="disabled">
                            <a-radio-button value="Y">有效</a-radio-button>
                            <a-radio-button value="N">无效</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="备注" v-bind="validateInfos.msg">
                        <a-textarea v-model:value="formData.msg" placeholder="请输入备注" :disabled="disabled" :rows="8"></a-textarea>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue'
import { defHttp } from '/@/utils/http/axios'
import { useMessage } from '/@/hooks/web/useMessage'
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../XmsWashout.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    ptid: '',
    ptcod: '',
    ptnam: '',
    areacod: '',
    addr: '',
    state: 'Y',
    msg: ''
})

const areacodOptions = ref<any[]>([])

const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    ptcod: [{ required: true, message: '请输入洗消点编码!' }],
    ptnam: [{ required: true, message: '请输入洗消点名称!' }],
    areacod: [{ required: true, message: '请选择所属组织' }],
    addr: [{ required: true, message: '请输入地址!' }]
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

onMounted(() => {
    defHttp.post({ url: '/xmsale/xmsSalorg/getL2SalOrgs' }).then((res) => {
        areacodOptions.value = res
    })
})

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
