<template>
  <a-spin :spinning="confirmLoading">
    <PageWrapper>
    <a-descriptions title="" bordered :column="2">
      <a-descriptions-item label="单号">{{formData.ordno}} </a-descriptions-item>
      <a-descriptions-item label="整体评价">{{formData.score}}</a-descriptions-item>
      <a-descriptions-item label="评价内容" :span="2">{{formData.content}}</a-descriptions-item>
     
      <a-descriptions-item label="相关照片1" :span="2" v-if="formData.picurl1||formData.picurl2"  >
         
        <img :width="200" v-if="formData.picurl1"  :src="getImageUrl(formData.picurl1)" @click="openUrl(getImageUrl(formData.picurl1))"/> 
        <img :width="200"  v-if="formData.picurl2" :src="getImageUrl(formData.picurl2)" @click="openUrl(getImageUrl(formData.picurl2))"/> 
       
       
      </a-descriptions-item>
      <a-descriptions-item label="评论人">{{formData.creusr}} </a-descriptions-item>
      <a-descriptions-item label="评论时间">{{formData.credat}}</a-descriptions-item>

      <a-descriptions-item label="回复信息" :span="2" v-if="relpy.length>0">
        <ul>
            <li v-for="(item,index) in relpy">
               {{index+1}}.&nbsp;&nbsp;<span style="color:red">{{item.creusr}}发表于{{item.credat}}</span><br/>
               {{item.content}}
            </li>
        </ul>
      </a-descriptions-item>
      


      <a-descriptions-item label="回复" :span="2">
        <a-textarea
      v-model:value="formData.relpy"
      placeholder="请输入回复内容"
      :rows="4"
    />  
      </a-descriptions-item>


    </a-descriptions>
    
  </PageWrapper>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { saveEvalReply,getOrdEvalReply } from '../SzjjBusiEval.api';
 
  import { useGlobSetting } from '/@/hooks/setting';
  
  const globSetting = useGlobSetting();
  const baseApiUrl = globSetting.domainUrl;



  function getImageUrl(picurl){
    return `${baseApiUrl}/${picurl}`;
  }
  function openUrl(url){
      window.open(url,"_blank");
  }
 
 
 
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    ordno: '',   
 
    score: undefined,
 
    content: '',   
    
    picurl1: '',   
   
    picurl2: '',   
 
    creusr: '',   
    
    credat: '',   
    relpy:'',

  });
  const { createMessage } = useMessage();
 
  const confirmLoading = ref<boolean>(false);

 const relpy=ref([]);

  /**
   * 编辑
   */
   async function edit(record) {
     nextTick(() => {
   
      //赋值
      Object.assign(formData, record);
      formData.relpy='';
    


    });

    let rspdata=await getOrdEvalReply({evalid:record.id});
    console.log("--------------------id:"+record.id);
    console.log("--------------------rspdata:"+JSON.stringify(rspdata));
   
     relpy.value=rspdata;
  }

  /**
   * 提交数据
   */
  async function submitForm() {
 
    let model = formData;
     console.log("-----------------submit:"+JSON.stringify(model));
     if(model.relpy==''){
      createMessage.warning("请输入回复内容！");
      return ;
     }
     
    await saveEvalReply({evalId:formData.id,content:formData.relpy})
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
 
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
</style>
