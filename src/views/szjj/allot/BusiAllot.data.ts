import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'

//列表数据
export const columns: BasicColumn[] = [
   {
    title: '状态',
    align:"center",
    dataIndex: 'auditing_dictText',
    width:90,
    customRender:({text,record}) =>{
 
       if(record.auditing=='1') return '已确认';
       else return '未确认';
     
    }
   },
   {
    title: '分配日期',
    align:"center",
    dataIndex: 'cntDate',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '单号',
    align:"center",
    dataIndex: 'ordno'
   },
   {
    title: '关联竞价ID',
    align:"center",
    dataIndex: 'srcid'
   },
   {
    title: '分配数量',
    align:"center",
    dataIndex: 'pigcnt'
   },
   {
    title: '分配客户数',
    align:"center",
    dataIndex: 'custcnt'
   },
   {
    title: '预计重量',
    align:"center",
    dataIndex: 'wgt'
   },
   {
    title: '预计金额',
    align:"center",
    dataIndex: 'amt'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'msg'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "发布状态",
    field: 'auditing',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"0_auditing"
        ,maxlength:180
     
    },
    colProps: {span: 6},
     
 },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '状态',
    field: 'auditing',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"0_auditing"
     },
  },
  {
    label: '分配日期',
    field: 'cntDate',
    component: 'DatePicker',
  },
  {
    label: '单号',
    field: 'ordno',
    component: 'Input',
  },
  {
    label: '关联竞价ID',
    field: 'srcid',
    component: 'InputNumber',
  },
  {
    label: '分配数量',
    field: 'pigcnt',
    component: 'Input',
  },
  {
    label: '分配客户数',
    field: 'custcnt',
    component: 'Input',
  },
  {
    label: '预计重量',
    field: 'wgt',
    component: 'Input',
  },
  {
    label: '预计金额',
    field: 'amt',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'msg',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];
//子表单数据
//子表表格配置
export const busiAllotDetailColumns: JVxeColumn[] = [
    {
      title: '主表id',
      key: 'allotId',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '关联竞价记录ID【szjj_buss_bid.id】',
      key: 'bidid',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '出价用户账号',
      key: 'bidusr',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '出价客户',
      key: 'bidcustcod',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '出价单价',
      key: 'bidprice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '出价数量',
      key: 'bidpigcnt',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '排名',
      key: 'bidord',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '分配数量',
      key: 'pigcnt',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '备注',
      key: 'msg',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]
