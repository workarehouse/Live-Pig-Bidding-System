<template>
  
  <BasicModal @register="register" title="竞拍详情" :helpMessage="['猪源信息', '竞拍详情']" :showOkBtn="false" 
   :width="896" :height="500" cancelText="关闭" :centered="false">
    
    <Description title="猪源信息" :collapseOptions="{ canExpand: false }" :column="2" :data="mockData2"
     :schema="schema" :width="850" />




    <!--<a-button type="primary" @click="closeModal" class="mr-2"> 从内部关闭弹窗 </a-button>
    <a-button type="primary" @click="setModalProps"> 从内部修改title </a-button>-->
 
 
    <Description title="竞价概况" :collapseOptions="{ canExpand: false }" :column="2" :data="mockData3"
     :schema="schema_bid" :width="850" v-if="mockData3.price"/>

     <BasicTable @register="registerLogTable"   />


    
  </BasicModal>

      

</template>
<script lang="ts">
  import { defineComponent,ref ,getCurrentInstance} from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description, DescItem, useDescription  } from '/@/components/Description/index';
  import { BasicTable, useTable ,BasicColumn} from '/@/components/Table';
 
  import { PageWrapper } from '/@/components/Page';
  import { Divider } from 'ant-design-vue';
  
  import {getmaininfo} from '../SzjjBusiMain.api';

 
  const schema: DescItem[] = [
    {
      field: 'farmerName',
      label: '猪场', 
    },
    {
      field: 'pignam',
      label: '品种',
      render: (curVal, data) => {
        return `${curVal}`;
      },
    },
    {
      field: 'pigcnt',
      label: '数量',
    },
    {
      field: 'avgwgt',
      label: '均重',
    },
    {
      field: 'beginPrice',
      label: '底价',
    },
    {
      field: 'incprice',
      label: '加价幅度',
    },
    {
      field: 'beginDatetime',
      label: '竞拍时间',
      render: (curVal, data) => {
       //return `${data.beginDatetime}~${data.endDatetime?"":data.endDatetime.substring(0, 10)}`;
       if(!data.beginDatetime||!data.endDatetime)
        return '';
       else{
        return data.beginDatetime+'~'+ data.endDatetime.substring(11, 16);
         
       }
         
  
      }
    },
    { 
      field: 'createTime',
      label: '发布时间',
       
    },


  ];
  const schema_bid: DescItem[] = [
    {
      field: 'price',
      label: '最高出价', 
      
    },
    {
      field: 'cnt',
      label: '出价次数', 
    }
  ];
 
  

const logTableSchema: BasicColumn[] = [
    {
      title: '日志',
      width: 150, 
      dataIndex: 'price',
      align:"left",
      customRender: ({ record }) => {
      return `${record.credat} 采购商${record.creusrnam} 出价${record.price}元/公斤 ${record.pigcnt}头`;;
    },
    }
  ];
  
  export default defineComponent({
    components: { BasicModal,Description, PageWrapper,Divider ,BasicTable},
    setup() {
      const modelRef = ref({});
      const modelbestRef = ref({});
      const logTableData = ref([]);
      
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        initData(data);
      });
    
    


      const [registerLogTable] = useTable({
        title: '竞价日志',
        columns: logTableSchema,
        pagination: false,
        dataSource: logTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });
      async function initData(data){
    const resp_data= await getmaininfo({id: data.record.id}, null);
   console.log(JSON.stringify(resp_data));
   //Object.assign(modelRef,resp_data);
   //modelRef.farmerName='abc';
   modelRef.value=resp_data;
   if(resp_data.bestBid){
   modelbestRef.value={price:resp_data.bestBid.price,cnt:resp_data.bidlog.length};
   }else{
    modelbestRef.value={};
   }

   logTableData.value= resp_data.bidlog;
 
 

  }

      return {
        register,
        registerLogTable,
        logTableSchema,
        logTableData,
        closeModal,
        
        mockData2:modelRef,
        mockData3:modelbestRef,
        schema,
        schema_bid,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
      };
    },


  });

</script> 