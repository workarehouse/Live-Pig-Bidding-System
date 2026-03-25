<template>
    <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="896" @ok="handleSubmit" :height="500" okText="保存">
        <BasicForm @register="registerForm" />
        <div v-if="isUpdate == true">
            当前状态：{{ cur_record.statetxt }}&nbsp;&nbsp;&nbsp;&nbsp;
            <a v-if="cur_record.state == '1'" href="#Anchor-Props" title="竞拍" @click="goLog">竞拍日志>></a>
            <a v-if="cur_record.state == '2'" href="#Anchor-Props" title="订单" @click="goOrder">订单>></a>
        </div>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from "vue"
import { BasicModal, useModalInner } from "/@/components/Modal"
import { BasicForm, useForm } from "/@/components/Form/index"
import { formSchema } from "../SzjjBusiMain.data"
import { saveOrUpdate } from "../SzjjBusiMain.api"
import { message } from "ant-design-vue"

// Emits声明
const emit = defineEmits(["register", "success"])
const isUpdate = ref(true)
//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 12 }
})
var cur_record = { statetxt: "abc" }
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields()
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter })
    //cur_record.statetxt=data.record.statetxt;
    //复制属性
    Object.assign(cur_record, data.record)

    isUpdate.value = !!data?.isUpdate

    if (unref(isUpdate)) {
        //表单赋值
        await setFieldsValue({
            ...data.record
        })
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter })
})

//设置标题
const title = computed(() => (!unref(isUpdate) ? "新增" : "编辑"))

//表单提交事件
async function handleSubmit(v) {
    try {
        let values = await validate()
        setModalProps({ confirmLoading: true })

        // 校验提交日期
        const { beginDatetime, endDatetime, delvbdat, delvedat } = values

        if (beginDatetime > delvbdat || beginDatetime > delvedat || endDatetime > delvbdat || endDatetime > delvedat) {
            return message.error("竞拍时间不能大于交割时间!")
        }

        //提交表单
        await saveOrUpdate(values, isUpdate.value)
        //关闭弹窗
        closeModal()
        //刷新列表
        emit("success")
    } finally {
        setModalProps({ confirmLoading: false })
    }
}
function goLog() {
    //关闭当前对话框
    closeModal()
}
function goOrder() {
    //关闭当前对话框
    closeModal()
}
</script>

<style lang="less" scoped>
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
    width: 100%;
}

:deep(.ant-calendar-picker) {
    width: 100%;
}
</style>
