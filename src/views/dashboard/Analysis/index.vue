<template>
  <!-- <IndexDef v-if="indexStyle === 0"></IndexDef>
  <IndexChart v-if="indexStyle === 1"></IndexChart>
  <IndexBdc v-if="indexStyle == 2"></IndexBdc>
  <IndexTask v-if="indexStyle == 3"></IndexTask>
  <div style="width: 100%; text-align: right; margin-top: 20px">
    请选择首页样式：
    <a-radio-group v-model:value="indexStyle">
      <a-radio :value="0">默认</a-radio>
      <a-radio :value="1">销量统计</a-radio>
      <a-radio :value="2">业务统计</a-radio>
      <a-radio :value="3">我的任务</a-radio>
    </a-radio-group>
  </div> -->

  <!-- 后台系统的首页 -->

  <div class="flex-cc box" style="height: 100%; display: flex; align-items: center; justify-content: center">
    <span class="title">罗牛山生猪销售系统</span>
    <span class="sub-title">欢迎使用!</span>

    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ" class="img" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import IndexDef from './homePage/IndexDef.vue';
import IndexChart from './homePage/IndexChart.vue';
import IndexBdc from './homePage/IndexBdc.vue';
import IndexTask from './homePage/IndexTask.vue';

const indexStyle = ref(0);
</script>

<style>
.box {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.title {
  font-family: AliPuHui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 68px;
  line-height: 1.2105263157894737;
}

.sub-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
}

.img {
  max-width: calc(100% - 632px);
  max-height: 100%;
  vertical-align: middle;
}
</style>
