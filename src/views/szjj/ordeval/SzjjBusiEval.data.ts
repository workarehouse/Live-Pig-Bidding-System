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
    title: '整体评价',
    align: "center",
    dataIndex: 'score'
  },
  {
    title: '评价内容',
    align: "center",
    dataIndex: 'content'
  },
  {
    title: '照片1',
    align: "center",
    dataIndex: 'picurl1',
    customRender: render.renderImage,
  },
  {
    title: '照片2',
    align: "center",
    dataIndex: 'picurl2',
    customRender: render.renderImage,
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
      return !text?"":text;
    },
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
    label: "评价内容",
    field: 'content',
    component: 'Input',
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '单号',
    field: 'ordno',
    component: 'Input',
    dynamicDisabled: true
  },
  {
    label: '整体评价',
    field: 'score',
    component: 'InputNumber',
  },
  {
    label: '评价内容',
    field: 'content',
    component: 'InputTextArea',
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
    label: '创建人',
    field: 'creusr',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'credat',
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
