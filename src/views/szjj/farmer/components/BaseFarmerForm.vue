<template>
    <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-row>
                <a-col :span="8">
                    <a-form-item label="编码" v-bind="validateInfos.farmerCode">
                        <a-input v-model:value="formData.farmerCode" placeholder="请输入编码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="名称" v-bind="validateInfos.farmerName">
                        <a-input v-model:value="formData.farmerName" placeholder="请输入名称" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="养殖类型" v-bind="validateInfos.brdtyp">
                        <j-dict-select-tag v-model:value="formData.brdtyp" dictCode="pig_brdtyp" placeholder="请选择类型"
                            :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="猪场类型" v-bind="validateInfos.sty">
                        <j-dict-select-tag v-model:value="formData.sty" dictCode="farmer.sty" placeholder="请选择类型"
                            :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="BI猪场" v-bind="validateInfos.mhid">
                        <j-dict-select-tag v-model:value="formData.mhid"
                            dictCode="bi_farmer WHERE is_daily=1 ORDER BY mh_fram_name,mh_fram_name,mh_fram_id"
                            placeholder="请选择类型" :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="XN代码" v-bind="validateInfos.xncod">
                        <a-input v-model:value="formData.xncod" placeholder="请输入XN代码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="NC代码" v-bind="validateInfos.nccod">
                        <a-input v-model:value="formData.nccod" placeholder="请输入NC代码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="NC公司编码" v-bind="validateInfos.nccpy">
                        <a-input v-model:value="formData.nccpy" placeholder="请输入NC公司编码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="预收款比例开关" v-bind="validateInfos.clamctrlflg">
                        <RadioButtonGroup v-model:value="formData.clamctrlflg" :options="ynoptions2" defaultValue="N"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="预收款比例" v-bind="validateInfos.clamrate">
                        <a-input-number v-model:value="formData.clamrate" placeholder="请输入预收款比例" :disabled="disabled"
                            :min="0" :max="10" :step="0.1" style="width: 100%" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="收款账号" v-bind="validateInfos.lpno">
                        <j-dict-select-tag v-model:value="formData.lpno"
                            dictCode="xms_bank_info WHERE state='Y' ORDER BY lpno,lpcpy,lpno" placeholder="请选择类型"
                            :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="ERP代码" v-bind="validateInfos.erpcod">
                        <a-input v-model:value="formData.erpcod" placeholder="请输入养殖系统编码" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="销售区域" v-bind="validateInfos.psalorgid">
                        <j-dict-select-tag placeholder="请选择销售区域" v-model:value="formData.psalorgid"
                            dictCode="xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid"
                            :showChooseOption="false" :allowClear="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="管理区域" v-bind="validateInfos.prptorgid">
                        <j-dict-select-tag placeholder="请选择管理区域" v-model:value="formData.prptorgid"
                            dictCode="xms_rptorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid"
                            :showChooseOption="false" :allowClear="true" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="磅秤标志" v-bind="validateInfos.scaleflg">
                        <j-dict-select-tag placeholder="请选择磅秤标志" v-model:value="formData.scaleflg"
                            dictCode="pig_scaleflg" :showChooseOption="false" :allowClear="true" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="检疫票" v-bind="validateInfos.qtkt">
                        <a-checkbox-group v-model:value="formData.qtkt" :options="qtktoptions" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地磅" v-bind="validateInfos.wgtway">
                        <RadioButtonGroup v-model:value="formData.wgtway" :options="wgtwayoptions" defaultValue="地磅称重"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="中转升级机" v-bind="validateInfos.upflg">
                        <RadioButtonGroup v-model:value="formData.upflg" :options="ynoptions" defaultValue="Y"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="可冲水" v-bind="validateInfos.wtflg">
                        <RadioButtonGroup v-model:value="formData.wtflg" :options="ynoptions" defaultValue="Y"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="休息室" v-bind="validateInfos.romflg">
                        <RadioButtonGroup v-model:value="formData.romflg" :options="ynoptions" defaultValue="Y"
                            :disabled="disabled" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="销售业务" v-bind="validateInfos.lnkman">
                        <a-input v-model:value="formData.lnkman" placeholder="销售业务" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="销售业务BIP编码" v-bind="validateInfos.lnkmancod">
                        <a-input v-model:value="formData.lnkmancod" placeholder="销售业务BIP编码"
                            :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="销售电话" v-bind="validateInfos.lnkphone">
                        <a-input v-model:value="formData.lnkphone" placeholder="销售电话" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="交割点" v-bind="validateInfos.delvaddr">
                        <a-input v-model:value="formData.delvaddr" placeholder="请输入交割地点" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图精度" v-bind="validateInfos.delvlng">
                        <a-input v-model:value="formData.delvlng" placeholder="交割点精度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图纬度" v-bind="validateInfos.delvlat">
                        <a-input v-model:value="formData.delvlat" placeholder="交割点纬度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="猪场地址" v-bind="validateInfos.addr">
                        <a-input v-model:value="formData.addr" placeholder="猪场地址" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图精度" v-bind="validateInfos.lng">
                        <a-input v-model:value="formData.lng" placeholder="猪场精度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图纬度" v-bind="validateInfos.lat">
                        <a-input v-model:value="formData.lat" placeholder="猪场纬度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="消毒点" v-bind="validateInfos.disfaddr">
                        <a-input v-model:value="formData.disfaddr" placeholder="消毒点地址" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图精度" v-bind="validateInfos.disflng">
                        <a-input v-model:value="formData.disflng" placeholder="消毒点精度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="地图纬度" v-bind="validateInfos.disflat">
                        <a-input v-model:value="formData.disflat" placeholder="消毒点纬度" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-form-item label="排序" v-bind="validateInfos.ord">
                        <a-input v-model:value="formData.ord" placeholder="排序" :disabled="disabled"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="状态" v-bind="validateInfos.auditing">
                        <j-dict-select-tag v-model:value="formData.auditing" dictCode="0_auditing" placeholder="请选择状态"
                            :disabled="disabled" :showChooseOption="false" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="备注" v-bind="validateInfos.memo">
                        <a-input v-model:value="formData.memo" placeholder="请输入备注" :disabled="disabled"></a-input>
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
import { RadioButtonGroup } from '/@/components/Form'
import { getValueType } from '/@/utils'
import { saveOrUpdate } from '../BaseFarmer.api'
import { Form } from 'ant-design-vue'

const props = defineProps({
    disabled: { type: Boolean, default: false }
})
const formRef = ref()
const qtktoptions = [
    { label: '全国', value: '全国' },
    { label: '本省', value: '本省' },
    { label: 'A票', value: 'A票' },
    { label: 'B票', value: 'B票' }
]
const wgtwayoptions = [
    { label: '小磅', value: '小磅称重' },
    { label: '地磅', value: '地磅称重' },
    { label: '中转车过榜 ', value: '中转车过榜' }
]
const ynoptions = [
    { label: '有', value: 'Y' },
    { label: '无', value: 'N' }
]

const ynoptions2 = [
    { label: '启用', value: 'Y' },
    { label: '关闭', value: 'N' }
]
const useForm = Form.useForm
const emit = defineEmits(['register', 'ok'])
const formData = reactive<Record<string, any>>({
    id: '',
    clamrate: 1,
    mhid: '',
    auditing: '',
    farmerCode: '',
    farmerName: '',
    memo: '',
    lnkman: '',
    brdtyp: '',
    nccod: '',
    xncod: "",
    erpcod: '',
    psalorgid: '',
    prptorgid: '',
    qtkt: '',
    wgtway: '',
    upflg: '',
    wtflg: '',
    romflg: '',
    lnkphone: '',
    delvaddr: '',
    delvlng: '',
    delvlat: '',
    addr: '',
    lng: '',
    lat: '',
    disfaddr: '',
    disflng: '',
    disflat: '',
    ord: '',
})
const { createMessage } = useMessage()
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 7 } })
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } })
const confirmLoading = ref<boolean>(false)
//表单验证
const validatorRules = {
    farmerCode: [{ required: true, message: '请输入编码!' }],
    farmerName: [{ required: true, message: '请输入名称!' }],
    brdtyp: [{ required: true, message: '请选择养殖类型!' }],
    sty: [{ required: true, message: '请选择猪场类型!' }],
    nccod: [{ required: true, message: '请输入NC代码!' }],
    xncod: [{ required: true, message: '请输入欣农代码!' }],
    nccpy: [{ required: true, message: '请输入NC公司编码!' }],
    clamrate: [{ required: true, message: '请输入预收款比例!' }],
    lpno: [{ required: true, message: '请选择收款账号!' }],
    erpcod: [{ required: true, message: '请输入养殖系统编码!' }],
    scaleflg: [{ required: true, message: '请选择磅秤标志!' }],
    lnkman: [{ required: true, message: '请输入销售业务!' }],
    lnkphone: [{ required: true, message: '请输入销售电话!' }],
    psalorgid: [{ required: true, message: '请选择销售区域!' }],
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
    padding: 24px 24px 24px 24px;
}
</style>
