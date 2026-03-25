<template>
        <a-card>
        <div class="item-cell">
            <div style="margin-right: 10px;">猪场: </div>
            <a-select v-model:value="formData.farmcod" placeholder="请选择猪场" :options="farmOptions" :disabled="disabled"
             class="right-box" @change="handleChangeForm">
            </a-select>
            <!-- <div class="title1">区域: </div>
            <j-dict-select-tag v-model:value="formData.areacod" dictCode="xms_salorg where orgtyp='B',orgnam,orgcod" placeholder="请选择区域" :disabled="disabled"/> -->
            <div class="title1">出栏时间: </div>
            <a-date-picker value-format="YYYY-MM-DD" placeholder="请选择开始时间" v-model:value="formData.starttime" :disabled="disabled" class="query-group-cust"/>
                 <span class="query-group-split-cust">~</span>
            <a-date-picker value-format="YYYY-MM-DD" placeholder="请选择结束日期" v-model:value="formData.endtime" :disabled="disabled" class="query-group-cust"/>
        </div>

        <a-form layout="inline" :model="formData" :label-col="{ style: { width: '120px' } }" :wrapper-col="{ span: 14 }"
            style="padding-top: 20px">
            <a-form-item label="当月出栏计划头数">
                <a-input v-model:value="formData.poutnum" :disabled="disabled" />
            </a-form-item>
            <a-form-item label="当月已出栏头数">
                <a-input v-model:value="formData.aoutnum" :disabled="disabled" />
            </a-form-item>
            <a-form-item label="当月栏计划数">
                <a-input v-model:value="formData.outnum" :disabled="disabled" />
            </a-form-item>
        </a-form>
    </a-card>
    <div style="margin-left: 25px; font-weight: bold">周出栏计划：</div>
    <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <div>
            <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
                <template v-for="col in ['planqty3', 'planqty2', 'msg', 'zyftime', 'zyfage', 'avgweight']" #[col]="{ text, record }" :key="col">
                    <div>
                      <a-date-picker v-if="col == 'zyftime'" value-format="YYYY-MM-DD" placeholder="转育肥日期" v-model:value="editableData[record.key][col]" class="query-group-cust"/>
                        <a-input v-else-if="editableData[record.key]" v-model:value="editableData[record.key][col]"
                            style="margin: -5px 0" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
            </a-table>
        </div>

        <!-- <div v-if="!disabled" style="padding-top: 20px; text-align: right">
            <a-button @click="onSubmit({ state: 'C' })">暂存</a-button>
            <a-button type="primary" @click="onSubmit({ state: 'Y' })" style="margin-left: 20px">提交</a-button>
        </div> -->
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import moment from 'moment';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../XmsWoutplan.api';
  import { Form } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es'
  const farmOptions = ref([])
  const dataSource = ref([])
  const farmcod = ref('')
  const handleChangeForm = () => {
    // 重置form表单
    resetData()
    getpritpl()
}
  const editableData = reactive({})
  const props = defineProps({
    disabled: { type: Boolean, default: false },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    areacod: '',   
    farmcod: null,   
    week: '',   
    starttime: '',   
    endtime: '',   
    num: undefined,
    reporttime: '',   
    poutnum: undefined,
    aoutnum: undefined,
    outnum: undefined,
  });
  const columns = [
    {
        title: '品名',
        dataIndex: 'name',
        width: '18%',
        slots: { customRender: 'name' }
    },
    {
        title: '三元出栏计划头数',
        dataIndex: 'planqty3',
        width: '15%',
        slots: { customRender: 'planqty3' }
    },
    {
        title: '二元出栏计划头数',
        dataIndex: 'planqty2',
        width: '15%',
        slots: { customRender: 'planqty2' }
    },
    {
        title: '转育肥日期',
        dataIndex: 'zyftime',
        width: '13%',
        slots: { customRender: 'zyftime' }
    },
    {
        title: '转育肥日龄（天）',
        dataIndex: 'zyfage',
        width: '13%',
        slots: { customRender: 'zyfage' }
    },
    {
        title: '转群均重（kg）',
        dataIndex: 'avgweight',
        width: '12%',
        slots: { customRender: 'avgweight' }
    },
    {
        title: '备注',
        dataIndex: 'msg',
        width: '30%',
        slots: { customRender: 'msg' }
    },
]
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
  
  onMounted(async () => {
    await findfarmersbylogin()
    getpritpl()
})
/**
 * 当前账号的区域权限,猪场权限
 */
 const findfarmersbylogin = () => {
    return defHttp.post({ url: '/xmsale/baseapi/findfarmersbylogin' }).then((res) => {
        console.log('findfarmersbylogin', res)
        farmOptions.value = res.map((item: any) => {
            return { label: item.farmnam, value: item.farmid + ''  }
        })

        // 设置默认值
        if (farmOptions.value.length > 0 && !farmcod.value) {
          farmcod.value = farmOptions.value[0].value
        }

    })
}
const getDetail = (record) => {
   return defHttp.get({ url: '/xmsale/xmsWoutplan/queryById', params: { id: record.id } }).then((res) => {
        //formData.value = res
        // farmcod.value = res.farmcod
        dataSource.value = res.dt.map((item: any, index: number) => {
            const data = {
                key: index.toString(),
                pritplid: item.pritplid,
                id: item.id,
                planid: item.planid,
                name: item.wgtstgtxt,
                planqty3: item.planqty3,
                planqty2: item.planqty2,
                zyftime: item.zyftime,
                zyfage: item.zyfage,
                avgweight: item.avgweight,
                msg: item.msg
            }

            editableData[index.toString()] = cloneDeep(data);
            

            return data
        })
    })
}
/**
 * 获取区域模板
 */
 const getpritpl = () => {
    defHttp.get({ url: '/xmsale/xmsPritpl/getpritplbyfarmerid', params: { farmid: farmcod.value } }).then((res) => {
        // 根据模板生成表格数据
        dataSource.value = res.map((item: any, index: number) => {
            const key = index.toString();
            const data = {
                key: key,
                pritplid: item.tplid,
                name: item.wgtstgtxt,
                planqty3: 0,
                planqty2: 0,
                zyftime: null,
                zyfage: null,
                avgweight: null,
                msg: ''
            };
            // 设置editableData，使得每一行都是可编辑的
            editableData[key] = cloneDeep(data);
            return data;
        })
    })
}
  /**
   * 新增
   */
  function add() {
    resetData()
    edit({});
  }
  /**
 * 重置表格数据
 */
const resetData = () => {
  formData.value = { }
}

  /**
   * 编辑
   */
  function  edit(record) {
    setTimeout(async () => {
      resetFields();

      //赋值
      Object.assign(formData, record);

      if(record.id){
       await  getDetail(record)
      }
    }, 200);
  }

  /**
   * 清空数据
   */
  function resetDataFunction () {
    resetData();
  }

  /**
   * 提交数据
   */
  async function submitForm(params) {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }

    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
   
    // 保存所有正在编辑的数据
    for (const key in editableData) {
        Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
    }

    model = { ...model, ...params, dt: dataSource.value }

    delete model.updateTime
    delete model.createTime 
    delete model.updateBy
    delete model.createBy

    await saveOrUpdate(model, isUpdate.value)
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
    add,
    edit,
    submitForm,
    resetDataFunction,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
  .item-cell {
    display: flex;
    align-items: center;

    .title {
        margin-right: 10px;
    }
    .title1 {
        margin-right: 10px;
        margin-left: 10px;
    }

    .right-box {
        width: 150px;
    }
}
.editable-row-operations a {
    margin-right: 8px;
}
</style>
