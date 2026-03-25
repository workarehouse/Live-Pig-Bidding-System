<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    @ok="handleOk"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    :body-style="bodystyle"
    okText="交割"
    :ok-button-props="showOK ? {} : hidden_style"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <SzjjBusiOrderForm ref="registerForm" @ok="submitCallback" :disabled="disableSubmit"></SzjjBusiOrderForm>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import SzjjBusiOrderForm from './SzjjBusiOrderForm.vue';

  const title = ref<string>('');
  const width = ref<number>(900);
  const visible = ref<boolean>(false);
  const showOK = ref<boolean>(true);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  const bodystyle = {
    height: '500px',
    overflow: 'hidden',
    overflowY: 'scroll',
  };
  const hidden_style = { style: { display: 'none' } };

  /**
   * 新增
   */
  function add() {
    title.value = '新增';
    visible.value = true;
    showOK.value = true;
    nextTick(() => {
      registerForm.value.add();
    });
  }

  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    title.value = disableSubmit.value ? '订单详情' : '订单交割';
    visible.value = true;
    showOK.value = record.state == 'Y' ? false : true;

    nextTick(() => {
      registerForm.value.edit(record);
    });
  }

  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleCancel();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
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
