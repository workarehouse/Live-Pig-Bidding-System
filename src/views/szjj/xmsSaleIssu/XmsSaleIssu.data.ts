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
    title: '关联单号',
    align: "center",
    dataIndex: 'srcno'
  },
  {
    title: '折扣数量（头数）',
    align: "center",
    dataIndex: 'pigcnt'
  },
  {
    title: '折扣金额',
    align: "center",
    dataIndex: 'amt'
  },
  {
    title: '状态', //（A：待处理， Y：已处理【无质量问题】，U：已处理【有质量问题】
    align: "center",
    dataIndex: 'state'
  },
  {
    title: '创建人',
    align: "center",
    dataIndex: 'createUser'
  },
  {
    title: '更新人',
    align: "center",
    dataIndex: 'updateUser'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
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
    label: '关联单号[szjj_busi_order.ordno]',
    field: 'srcno',
    component: 'Input',
  },
  {
    label: '折扣数量（头数）',
    field: 'pigcnt',
    component: 'InputNumber',
  },
  {
    label: '折扣金额',
    field: 'amt',
    component: 'InputNumber',
  },
  {
    label: '状态（A：待处理， Y：已处理【无质量问题】，U：已处理【有质量问题】',
    field: 'state',
    component: 'Input',
  },
  {
    label: '创建人',
    field: 'createUser',
    component: 'Input',
  },
  {
    label: '更新人',
    field: 'updateUser',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
