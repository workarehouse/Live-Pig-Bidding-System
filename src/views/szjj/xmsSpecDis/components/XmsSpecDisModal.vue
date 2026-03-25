<template>
    <a-modal
        :title="title"
        :width="width"
        :visible="visible"
        @ok="handleOk"
        :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
        @cancel="handleCancel"
        cancelText="关闭"
    >
        <template #footer>
            <a-button key="back" @click="handleCancel">关闭</a-button>
            <a-button key="submit" type="primary" @click="handleOk">确认</a-button>
        </template>

        <XmsSpecDisForm ref="registerForm" @ok="submitCallback" :disabled="disableSubmit" :type="type"></XmsSpecDisForm>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick, defineExpose } from 'vue'
import XmsSpecDisForm from './XmsSpecDisForm.vue'

const title = ref<string>('')
const width = ref<number>(1000)
const visible = ref<boolean>(false)
const disableSubmit = ref<boolean>(false)
const registerForm = ref()
const type = ref<string>('')
const emit = defineEmits(['register', 'success'])

/**
 * 新增
 */
function add() {
    console.log(1111)

    title.value = '新增'
    visible.value = true
    type.value = 'add'
    nextTick(() => {
        registerForm.value.add()
    })
}

/**
 * 编辑
 * @param record
 */
function edit(record) {
    title.value = disableSubmit.value ? '详情' : '编辑'
    visible.value = true
    type.value = disableSubmit.value ? 'detail' : 'edit'
    setTimeout(() => {
        registerForm.value.edit(record)
    }, 250)
}

/**
 * 确认
 */
function confirm(record) {
    title.value = '确认'
    visible.value = true
    type.value = 'confirm'
    setTimeout(() => {
        registerForm.value.edit(record)
    }, 250)
}

/**
 * 确定按钮点击事件
 */
function handleOk() {
    registerForm.value.submitForm()
}

/**
 * form保存回调事件
 */
function submitCallback() {
    handleCancel()
    emit('success')
}

function handleConfirm() {
    registerForm.value.submitForm()
}

/**
 * 取消按钮回调事件
 */
function handleCancel() {
    visible.value = false
}

defineExpose({
    add,
    edit,
    confirm,
    disableSubmit
})
</script>

<style>
/**隐藏样式-modal确定按钮 */
.jee-hidden {
    display: none !important;
}
</style>
