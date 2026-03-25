<template>
  <a-modal :title="title" :width="width" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" :cancelButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleClose"  cancelText="" okText="">
    <XmsWoutplanForm ref="registerForm" @ok="submitCallback" :disabled="disableSubmit"></XmsWoutplanForm>
    <template #footer>
        <a-button v-if="!disableSubmit" @click="handleCancel" >暂存</a-button>
        <a-button v-if="!disableSubmit" type="primary" @click="handleOk">上报</a-button>
      </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import XmsWoutplanForm from './XmsWoutplanForm.vue'
  
  const title = ref<string>('');
  const width = ref<number>(1200);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  /**
   * 新增
   */
  function add() {
    title.value = '新增';
    visible.value = true;
    nextTick(() => {
      registerForm.value.add();
    });
  }
  
  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    title.value = disableSubmit.value ? '详情' : '编辑';
    visible.value = true;
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }
  
  /**
   * 提交按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm({ status: 1 });
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleClose();
    emit('success');
  }

  /**
   * 暂存按钮回调事件
   */
  function handleCancel() {
    registerForm.value.submitForm({ status: 0 });
  }

  function handleClose() {
    registerForm.value.resetDataFunction();
    visible.value = false;
  }

  defineExpose({
    add,
    edit,
    disableSubmit,
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
