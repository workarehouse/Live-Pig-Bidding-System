import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '填报状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '区域',
    align: "center",
    dataIndex: 'areacod_dictText'
  },
  {
    title: '猪场',
    align: "center",
    dataIndex: 'farmcod_dictText'
  },
  {
    title: '周计划',
    align: "center",
    dataIndex: 'week'
  },
  {
    title: '出栏日期',
    align: "center",
    dataIndex: 'startendtime'
  },
  {
    title: '出栏头数',
    align: "center",
    dataIndex: 'num'
  },
  {
    title: '填报人',
    align: "center",
    dataIndex: 'createBy'
  },
  {
    title: '上报时间',
    align: "center",
    dataIndex: 'reporttime'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "区域",
    field: 'areacod',
    component: 'JDictSelectTag',
    componentProps:{
    },
    colProps: {span: 6},
  },
  {
    label: "猪场code",
    field: 'farmcod',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "szjj_base_farmer  where auditing='1',farmer_name,id"
    },
    colProps: {span: 6},
  },
  {
    label: "出栏时间",
    field: "starttime",
    component: 'RangePicker',
    colProps: {span: 6},
  },
  {
    label: "出栏时间",
    field: "endtime",
    component: 'RangePicker',
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '区域',
    field: 'areacod',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: ""
    },
  },
  {
    label: '猪场code',
    field: 'farmcod',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "szjj_base_farmer  where auditing='1',farmer_name,id"
    },
  },
  {
    label: '周计划',
    field: 'week',
    component: 'Input',
  },
  {
    label: '出栏时间',
    field: 'starttime',
    component: 'DatePicker',
  },
  {
    label: '出栏时间',
    field: 'endtime',
    component: 'DatePicker',
  },
  {
    label: '出栏头数',
    field: 'num',
    component: 'InputNumber',
  },
  {
    label: '上报时间',
    field: 'reporttime',
    component: 'DatePicker',
  },
  {
    label: '当月出栏计划头数',
    field: 'poutnum',
    component: 'InputNumber',
  },
  {
    label: '当月已出栏头数',
    field: 'aoutnum',
    component: 'InputNumber',
  },
  {
    label: '当月栏计划数',
    field: 'outnum',
    component: 'InputNumber',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
