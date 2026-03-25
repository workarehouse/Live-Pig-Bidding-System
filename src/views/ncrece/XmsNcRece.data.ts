import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    align: "center",
    dataIndex: 'ordno'
  },
  {
    title: '收款单号',
    align: "center",
    dataIndex: 'billcod'
  },
  {
    title: '单据日期',
    align: "center",
    dataIndex: 'orddat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
  {
    title: '单据类型',
    align: "center",
    dataIndex: 'ordtyp'
  },

  {
    title: '猪场ID',
    align: "center",
    dataIndex: 'ncfarmcod'
  },
  {
    title: '客户编码',
    align: "center",
    dataIndex: 'nccustcod'
  },
  {
    title: '客户名称',
    align: "center",
    dataIndex: 'custnam'
  },
  {
    title: '总金额',
    align: "center",
    dataIndex: 'amt'
  },
  {
    title: '单据更新日期',
    align: "center",
    dataIndex: 'updat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
 
  {
    title: '数据同步时间',
    align: "center",
    dataIndex: 'syncdat',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text);
    },
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "收款单号",
    field: 'billcod',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "单据日期",
    field: "orddat",
    component: 'RangePicker',
    colProps: {span: 6},
  },
  {
    label: "客户编码",
    field: 'custcod',
    component: 'Input',
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '收款单号',
    field: 'billcod',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入收款单号!'},
             ];
    },
  },
  {
    label: '单据日期',
    field: 'orddat',
    component: 'DatePicker',
  },
  {
    label: '单据类型',
    field: 'ordtyp',
    component: 'Input',
  },
  {
    label: '公司代码',
    field: 'cpycod',
    component: 'Input',
  },
  {
    label: '猪场ID',
    field: 'ncfarmcod',
    component: 'Input',
  },
  {
    label: '客户编码',
    field: 'nccustcod',
    component: 'Input',
  },
  {
    label: '客户名称',
    field: 'custnam',
    component: 'Input',
  },
  {
    label: '总金额',
    field: 'amt',
    component: 'InputNumber',
  },
  {
    label: '单据更新日期',
    field: 'updat',
    component: 'DatePicker',
  },
  {
    label: '单据状态',
    field: 'state',
    component: 'Input',
  },
  {
    label: '数据同步时间',
    field: 'syncdat',
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
