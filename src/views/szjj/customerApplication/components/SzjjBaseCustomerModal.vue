<template>
    <a-modal :title="title" :width="width" :visible="visible" @ok="handleOk" @cancel="handleCancel" cancelText="关闭">
        <SzjjBaseCustomerForm ref="registerForm" @ok="submitCallback" :disabled="disableSubmit"></SzjjBaseCustomerForm>

        <template #footer>
            <a-textarea v-model:value="apprmsg" placeholder="请填写审批意见" :rows="2" />
            <a-button type="primary" @click="handleApprove('Y')" style="margin-top: 20px">审批通过</a-button>
            <a-button @click="handleApprove('N')">审批拒绝</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick, defineExpose } from 'vue'
import SzjjBaseCustomerForm from './SzjjBaseCustomerForm.vue'
import { defHttp } from '/@/utils/http/axios'
import { message } from 'ant-design-vue'

const title = ref<string>('')
const width = ref<number>(800)
const visible = ref<boolean>(false)
const disableSubmit = ref<boolean>(false)
const registerForm = ref()
const emit = defineEmits(['register', 'success'])
const recordData = ref<any>({})
const apprmsg = ref<string>('')
/**
 * 新增
 */
function add() {
    title.value = '新增'
    visible.value = true
    nextTick(() => {
        registerForm.value.add()
    })
}

/**
 * 编辑
 * @param record
 */
function edit(record) {
    recordData.value = record
    apprmsg.value = ''
    title.value = disableSubmit.value ? '审批详情' : '编辑'
    visible.value = true

    setTimeout(() => {
        nextTick(() => {
            registerForm.value.edit(record)
        })
    }, 0)
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

/**
 * 取消按钮回调事件
 */
function handleCancel() {
    visible.value = false
}

defineExpose({
    add,
    edit,
    disableSubmit
})

/**
 * 审批通过
 */
function handleApprove(apprsta) {
    // 审批意见不能为空
    if (!apprmsg.value) {
        message.error('请填写审批意见')
        return
    }

    defHttp
        .post({ url: `/xmsale/customerAppr/approve`, params: { docno: recordData.value.docno, apprmsg: apprmsg.value, apprsta } })
        .then()
        .finally(() => {
            visible.value = false
            handleCancel()
            emit('success')
        })
}
</script>

<style>
/**隐藏样式-modal确定按钮 */
.jee-hidden {
    display: none !important;
}
</style>
