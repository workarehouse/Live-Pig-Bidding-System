<template>
    <a-spin :spinning="confirmLoading">
        <a-spin v-if="load" />
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="24">
                    <a-form-item label="客户名称">
                        <!-- <a-select
                            :disabled="true"
                            v-model:value="formData.custCode"
                            show-search
                            :options="optionsCustName"
                            :filterOption="(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0"
                        >
                        </a-select> -->
                        <a-input v-model:value="formData.custCode" :disabled="true"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="猪场名称">
                        <JSearchSelect v-model:value="formData.farmcod" :dictOptions="optionsFarm"
                            :disabled="disabled || props.type !== 'add'" @change="onFarmChange"></JSearchSelect>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="销售订单" v-bind="validateInfos.ordno">
                        <a-input v-if="props.type !== 'add'" v-model:value="formData.ordnoText"
                            :disabled="props.type !== 'add'" />

                        <a-select v-else v-model:value="formData.ordno" show-search placeholder="搜索订单"
                            :options="options" :disabled="props.type !== 'add'"
                            :filterOption="(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0">
                        </a-select>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="折扣金额">
                        <div style="display: flex; align-items: center">
                            <a-input-number v-model:value="formData.disamt" placeholder="请输入折扣金额" style="width: 100%"
                                :disabled="disabled" :formatter="(value) => `${value}`" :parser="(value) => {
                                    value = value.replace(/[^0-9.-]/g, '')
                                    const match = value.match(/-?\d*\.?\d{0,2}/)
                                    return match ? match[0] : ''
                                }
                                    "></a-input-number>
                            <span style="padding-left: 10px"> 元</span>
                        </div>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="调整销售金额">
                        <div style="display: flex; align-items: center">
                            <a-input-number v-model:value="formData.adjamt" placeholder="请输入调整销售金额" style="width: 100%"
                                :disabled="disabled" :formatter="(value) => `${value}`" :parser="(value) => {
                                    value = value.replace(/[^0-9.-]/g, '')
                                    const match = value.match(/-?\d*\.?\d{0,2}/)
                                    return match ? match[0] : ''
                                }
                                    "></a-input-number>
                            <span style="padding-left: 10px"> 元</span>
                        </div>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="备注" v-bind="validateInfos.msg">
                        <a-textarea :auto-size="{ minRows: 3, maxRows: 6 }" v-model:value="formData.msg"
                            placeholder="请输入备注" :disabled="disabled" :maxlength="100"></a-textarea>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-form-item label="附件" v-bind="validateInfos.atturl">
                        <JUpload v-model:value="formData.atturl" text="文件"
                            :buttonVisible="!disabled && props.type !== 'confirm'"
                            :disabled="disabled || props.type == 'confirm'"></JUpload>
                    </a-form-item>
                </a-col>

                <a-col v-if="props.type == 'detail'" :span="24">
                    <a-form-item label="单据记录" v-bind="validateInfos.msg">
                        <div style="padding: 5px 0; color: #00000073" v-for="(item, index) in datainfo.logs">
                            {{ `${index + 1} ${item.opttim} ${item.optusr} ${item.logmsg}` }}
                        </div>
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
import { saveOrUpdate, getFarmerByLoginAcct } from '../XmsSpecDis.api'
import { Form } from 'ant-design-vue'
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue'
import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue'

const optionsFarm = ref([])
const load = ref<boolean>(false)
const optionsCustName = ref([])
const datainfo = ref<any>({})
const options = ref([])
const props = defineProps({
    disabled: { type: Boolean, default: false },
    type: { type: String, default: '' }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    adjamt: 0,
    ordno: '',
    disamt: 0,
    msg: '',
    creusr: '',
    credat: '',
    updusr: '',
    upddat: '',
    state: '',
    apprusr: '',
    apprdat: '',
    apprmsg: '',
    consdat: '',
    atturl: '',
    flg: '1',
    custCode: '海南罗牛山肉类有限公司',
    farmcod: ''
})

const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    ordno: [{ required: true, message: '请输入销售单号!' }],
    // disamt: [{ required: true, message: '请输入折扣金额!' }],
    atturl: [{ required: true, message: '请上传附件!' }]
}
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true })


onMounted(() => {
    getFarmerByLoginAcct().then((res) => {
        optionsFarm.value = res.map((item) => {
            return { text: item.farmnam, value: item.farmcod }
        })
    })
})

/**
 * 新增
 */
async function add() {
    resetFields()
    Object.assign(formData, {})
    findcusts()
}

/**
 * 编辑
 */
async function edit(record) {
    const data = await defHttp.get({ url: '/xmsale/xmsSpecDis/getSpecDisInfo', params: { ordno: record.ordno } })
    datainfo.value = data

    nextTick(() => {
        resetFields()
        //赋值
        Object.assign(formData, record)

        formData.atturl = data.dts.map((item) => item.atturl).join(',')
        formData.adjamt = data.info.adjamt
        if (props.type !== 'add') {
            formData.ordnoText = `${data.info.custnam} | ${data.info.ordno} | ${data.info.farmnam} | ${data.info.pigtyptxt} | ${data.info.pigcnt}头 | ${data.info.wgt}kg | ${data.info.saldat}`
        }
    })
}

function onFarmChange(value) {
    formData.farmcod = value
    formData.ordno = ''
    findspecdisords()
}

function handleUpdateFile(url, ordno) {
    if (!url) return []

    url = url.split(',')

    return url.map((item) => {
        return {
            atturl: item,
            ordno: ordno
        }
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

    model.dts = handleUpdateFile(model.atturl, model.ordno)

    await saveOrUpdate(model, isUpdate.value, props.type)
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

//获取销售订单
function findspecdisords() {
    load.value = true
    defHttp
        .get({ url: '/xmsale/xmsSpecDis/findspecdisords', params: { farmcod: formData.farmcod } })
        .then((res) => {
            options.value = res.map((item) => {
                return {
                    label: `${item.custnam} | ${item.ordno} | ${item.farmnam} | ${item.pigtyptxt} | ${item.pigcnt}头 | ${item.wgt | 0}kg | ${item.saldat
                        }`,
                    value: item.ordno
                }
            })
        })
        .finally(() => {
            load.value = false
        })
}

// 获取客户数据
function findcusts() {
    load.value = true
    defHttp
        .get({ url: '/szjj/baseCustomer/list', params: { order: 'desc', pageSize: 999, auditing: 1 } })
        .then((res) => {
            optionsCustName.value = res.records.map((item) => {
                return {
                    label: item.custName,
                    value: item.custCode
                }
            })
            if (!formData.custCode) {
                formData.custCode = '0101040105'
            }
        })
        .finally(() => {
            load.value = false
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
