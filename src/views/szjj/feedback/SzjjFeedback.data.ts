import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '评价内容',
    align: "center",
    dataIndex: 'content'
  },
  {
    title: '手机号',
    align: "center",
    dataIndex: 'mobile'
  },
  {
    title: '状态 ',
    align: "center",
    dataIndex: 'state'
  },
  {
    title: '创建人',
    align: "center",
    dataIndex: 'creusr'
  },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'credat',
    customRender:({text}) =>{
      return text;
    },
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
      return text;
    },
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "评价内容",
    field: 'content',
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
    label: '评价内容',
    field: 'content',
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'mobile',
    component: 'Input',
  },
  {
    label: '照片1',
    field: 'picurl1',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '照片2',
    field: 'picurl2',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '状态 ',
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
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
