<template>
    <a-spin :spinning="confirmLoading">
        <PageWrapper>
            <a-descriptions title="" bordered :column="2">
                <a-descriptions-item label="单号">{{ formData.ordno }} </a-descriptions-item>
                <a-descriptions-item label="订单时间">{{ formData.credat }}</a-descriptions-item>

                <a-descriptions-item label="客户信息" :span="2">{{ formData.custcod }}-{{ formData.custnam }}</a-descriptions-item>
                <a-descriptions-item label="品种">{{ formData.pignam }}</a-descriptions-item>
                <a-descriptions-item label="猪场">{{ formData.farmernam }}</a-descriptions-item>
                <a-descriptions-item label="交易地址">{{ formData.delvaddr }}</a-descriptions-item>
                <a-descriptions-item label="猪源单号">{{ formData.srcid }}</a-descriptions-item>
            </a-descriptions>
        </PageWrapper>
        <a-card title="订单意向" :bordered="false" style="width: 100%">
            <a-descriptions title="" bordered :column="2">
                <a-descriptions-item label="数量">{{ formData.allotPigcnt }} 头</a-descriptions-item>
                <a-descriptions-item label="均重">{{ formData.allotAvgwgt }}公斤/头</a-descriptions-item>
                <a-descriptions-item label="单价">{{ formData.allotPrice }}元/公斤</a-descriptions-item>
                <a-descriptions-item label="预计金额">{{ formData.allotAmt }}元</a-descriptions-item>
            </a-descriptions>
        </a-card>
        <a-card title="实际交易" :bordered="false" style="width: 100%">
            <a-divider orientation="left">猪场：{{ formData.farmernam }}</a-divider>
            <a-descriptions title="" bordered :column="3">
                <a-descriptions-item label="数量"
                    ><a-input-number
                        v-if="formData.state == 'A'"
                        id="inputNumber"
                        v-model:value="submitData.pigcnt1"
                        :size="3"
                        style="width: 30px"
                        :precision="0"
                        placeholder="输入头数"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.pigcnt1 }}</span
                    >头
                </a-descriptions-item>

                <a-descriptions-item label="均重"
                    >{{ isNaN(submitData.pigcnt1) || isNaN(submitData.wgt1) ? 0 : formatMoney(submitData.wgt1 / submitData.pigcnt1, 2) }}公斤/头
                </a-descriptions-item>
                <a-descriptions-item label="单价"
                    >{{ isNaN(submitData.wgt1) || isNaN(submitData.amt1) ? 0 : formatMoney(submitData.amt1 / submitData.wgt1, 2) }}元/公斤
                </a-descriptions-item>
                <a-descriptions-item label="总重"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.wgt1"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总重[公斤]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.wgt1 }}</span
                    >公斤
                </a-descriptions-item>
                <a-descriptions-item label="总金额"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.amt1"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总金额[元]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.amt1 }}</span
                    >元
                </a-descriptions-item>
                <a-descriptions-item label="总折让金额"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.discount1"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总折让[元]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.discount1 }}</span
                    >元
                </a-descriptions-item>
            </a-descriptions>
            <a-divider orientation="left" v-if="formData.state == 'A' || submitData.pigcnt2 > 0"
                >其他猪场调配：<j-dict-select-tag
                    v-if="formData.state == 'A'"
                    v-model:value="submitData.farmercod2"
                    dict-code="szjj_base_farmer  where auditing='1',farmer_name,farmer_code"
                    placeholder="请选择猪场"
                ></j-dict-select-tag>
                <sapn v-if="formData.state != 'A'">{{ submitData.farmernam2 }}</sapn>
            </a-divider>

            <a-descriptions title="" bordered :column="3" v-if="formData.state == 'A' || submitData.pigcnt2 > 0">
                <a-descriptions-item label="数量">
                    <a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.pigcnt2"
                        :size="3"
                        style="width: 30px"
                        :precision="0"
                        placeholder="输入头数"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.pigcnt2 }}头</span>
                </a-descriptions-item>
                <a-descriptions-item label="均重"
                    >{{ isNaN(submitData.pigcnt2) || isNaN(submitData.wgt2) ? 0 : formatMoney(submitData.wgt2 / submitData.pigcnt2, 2) }}公斤/头
                </a-descriptions-item>
                <a-descriptions-item label="单价"
                    >{{ isNaN(submitData.amt2) || isNaN(submitData.wgt2) ? 0 : formatMoney(submitData.amt2 / submitData.wgt2, 2) }}元/公斤
                </a-descriptions-item>
                <a-descriptions-item label="总重"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.wgt2"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总重[公斤]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.wgt2 }}</span
                    >公斤
                </a-descriptions-item>
                <a-descriptions-item label="总金额"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.amt2"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总金额[元]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.amt2 }}</span
                    >元
                </a-descriptions-item>
                <a-descriptions-item label="总折让金额"
                    ><a-input-number
                        id="inputNumber"
                        v-if="formData.state == 'A'"
                        v-model:value="submitData.discount2"
                        style="width: 50px"
                        :precision="2"
                        placeholder="输入总折让[元]"
                        :min="0"
                    />
                    <span v-if="formData.state != 'A'">{{ submitData.discount2 }}</span
                    >元
                </a-descriptions-item>
            </a-descriptions>
        </a-card>

        <a-descriptions style="padding: 0 30px">
            <a-descriptions-item label="实际交割日期">
                <a-space direction="vertical" :size="12">
                    <a-date-picker v-model:value="submitData.trantim" valueFormat="YYYY-MM-DD HH:mm:ss" :disabled="formData.state !== 'A'" />
                </a-space>
            </a-descriptions-item>
        </a-descriptions>

        <a-descriptions style="padding: 0 30px">
            <a-descriptions-item label="备注">
                <a-textarea
                    v-model:value="submitData.msg"
                    :rows="2"
                    placeholder="手填（可以输入200个字符）"
                    :disabled="formData.state !== 'A'"
                ></a-textarea>
            </a-descriptions-item>
        </a-descriptions>

        <a-divider orientation="left"
            >总计：{{ isNaN(submitData.amt1 + submitData.amt2) ? 0 : formatMoney(submitData.amt1 + submitData.amt2, 2) }}元</a-divider
        >
    </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed } from 'vue'
import { defHttp } from '/@/utils/http/axios'
import { useMessage } from '/@/hooks/web/useMessage'
import moment from 'moment'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue'
import { getValueType } from '/@/utils'
import { saveOrderTransDt, getOrderDetailByOrdno } from '../SzjjBusiOrder.api'
import { Form, Modal } from 'ant-design-vue'
import { PageWrapper } from '/@/components/Page'
import { isValidInput } from '../../../../utils/validator.ts'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const submitData = ref({
    pigcnt1: undefined,
    avgwgt1: undefined,
    price1: undefined,
    pigcnt2: undefined,
    avgwgt2: undefined,
    price2: undefined,
    farmercod1: undefined,
    farmercod2: undefined,
    ordno: undefined,
    amt1: undefined,
    wgt1: undefined,
    amt2: undefined,
    wgt2: undefined,
    msg: undefined,
    trantim: undefined
})
const formData = reactive<Record<string, any>>({
    ordno: '',
    srcid: undefined,
    custcod: '',
    allotOrdno: '',
    allotDtid: undefined,
    allotPigcnt: undefined,
    allotWgt: undefined,
    allotPrice: undefined,
    allotAmt: undefined,
    pigcnt: undefined,
    wgt: undefined,
    amt: undefined,
    state: '',
    creusr: '',
    credat: '',
    updusr: '',
    upddat: '',
    msg: '',
    trantim: ''
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    ordno: [{ required: true, message: '请输入单号!' }],
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
async function edit(record) {
    nextTick(() => {
        resetFields()
        //赋值
        Object.assign(formData, record)
    })
    let rspdata = await getOrderDetailByOrdno({ ordno: record.ordno })
    submitData.value = rspdata
}

function submitForm() {
    let params = submitData.value
    console.log('params ', submitData.value)

    if (!params.farmercod1) {
        params.farmercod1 = formData.farmercod
    }
    if (!isValidInput(params.pigcnt1)) {
        createMessage.warning('请输入生猪数量！')
        return
    }

    if (params.pigcnt1 || params.avgwgt1 || params.price1) {
        if (!isValidInput(params.pigcnt1)) {
            createMessage.warning('请输入' + formData.farmernam + '的生猪数量！')
            return
        }
        if (!isValidInput(params.wgt1)) {
            createMessage.warning('请输入' + formData.farmernam + '的生猪总重！')
            return
        }
        if (!isValidInput(params.amt1)) {
            createMessage.warning('请输入' + formData.farmernam + '的生猪总金额！')
            return
        }
    }

    if (params.farmercod2 || params.pigcnt2 || params.avgwgt2 || params.price2) {
        if (!isValidInput(params.pigcnt2)) {
            createMessage.warning('请输入生猪数量！')
            return
        }
        if (!isValidInput(params.wgt2)) {
            createMessage.warning('请输入生猪总重！')
            return
        }
        if (!isValidInput(params.amt2)) {
            createMessage.warning('请输入生猪总金额！')
            return
        }
        if (!isValidInput(params.farmercod2)) {
            createMessage.warning('请输入猪场信息！')
            return
        }
    }

    Modal.confirm({
        title: '确认提示',
        content: '一旦执行交割，数据将不能更改！请确认！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            doSubmitForm(params)
        }
    })
}
/**
 * 提交数据
 */
async function doSubmitForm(params) {
    await saveOrderTransDt(params)
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
function formatMoney(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    const n = !isFinite(+number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
    const dec = typeof decPoint === 'undefined' ? '.' : decPoint
    let s = ''
    const toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
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
