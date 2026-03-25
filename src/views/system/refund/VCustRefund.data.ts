import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '单号',
    align: "center",
    dataIndex: 'ordno'
  },
  {
    title: '猪场代码',
    align: "center",
    dataIndex: 'farmcod_dictText'
  },
  {
    title: '名称',
    align: "center",
    dataIndex: 'farmnam'
  },
  {
    title: '客户编码',
    align: "center",
    dataIndex: 'custcod'
  },
 
  {
    title: '状态',
    align: "center",
    dataIndex: 'state_dictText'
  },
   
  {
    title: '更新人',
    align: "center",
    dataIndex: 'updusr'
  },
  {
    title: '更新时间',
    align: "center",
    dataIndex: 'upddat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
  {
    title: 'BPM审批完成时间',
    align: "center",
    dataIndex: 'bpmfindat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
  {
    title: 'NC审批完成时间',
    align: "center",
    dataIndex: 'ncfindat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
  {
    title: '日志',
    align: "center",
    dataIndex: 'logmsg'
  },
  {
    title: 'BPM审批申请单号',
    align: "center",
    dataIndex: 'docno'
  },
  {
    title: 'NC申请单号',
    align: "center",
    dataIndex: 'ncdocno'
  },
  {
    title: '退款金额',
    align: "center",
    dataIndex: 'amt'
  }, 
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "单号",
    field: 'ordno',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "猪场代码",
    field: 'farmcod',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "szjj_base_farmer where auditing='1',farmer_name,farmer_code"
    },
    colProps: {span: 6},
  },
  {
    label: "客户编码",
    field: 'custcod',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "状态",
    field: 'state',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "创建时间",
    field: "credat",
    component: 'RangePicker',
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '单号',
    field: 'ordno',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入单号!'},
             ];
    },
  },
  {
    label: '猪场代码',
    field: 'farmcod',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "szjj_base_farmer where auditing='1',farmer_name,farmer_code"
    },
  },
  {
    label: '名称',
    field: 'farmnam',
    component: 'Input',
  },
  {
    label: '客户编码',
    field: 'custcod',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入客户编码!'},
             ];
    },
  },
  {
    label: '退款备注',
    field: 'msg',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'state',
    component: 'Input',
  },
  {
    label: '创建人',
    field: 'creusr',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'credat',
    component: 'DatePicker',
  },
  {
    label: '更新人',
    field: 'updusr',
    component: 'Input',
  },
  {
    label: '更新时间',
    field: 'upddat',
    component: 'DatePicker',
  },
  {
    label: 'BPM审批完成时间',
    field: 'bpmfindat',
    component: 'DatePicker',
  },
  {
    label: 'NC审批完成时间',
    field: 'ncfindat',
    component: 'DatePicker',
  },
  {
    label: '日志',
    field: 'logmsg',
    component: 'Input',
  },
  {
    label: 'BPM审批申请单号',
    field: 'docno',
    component: 'Input',
  },
  {
    label: 'NC申请单号',
    field: 'ncdocno',
    component: 'Input',
  },
  {
    label: '退款金额',
    field: 'amt',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入退款金额!'},
             ];
    },
  },
  {
    label: '单据类型',
    field: 'ordsty',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入单据类型'},
             ];
    },
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
