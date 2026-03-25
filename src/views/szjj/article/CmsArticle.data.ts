import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '状态',
    align:"center",
    dataIndex: 'auditing_dictText'
   },
   {
    title: '是否置顶',
    align:"center",
    dataIndex: 'isTop_dictText'
   },
   {
    title: '标题',
    align:"center",
    dataIndex: 'articleTitle'
   },
   {
    title: '作者',
    align:"center",
    dataIndex: 'articleAuthor'
   },
   {
    title: '目录',
    align:"center",
    dataIndex: 'articleMenu_dictText'
   },
   {
    title: '发文时间',
    align:"center",
    sorter: true,
    dataIndex: 'articleTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },

];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "标题",
      field: 'articleTitle',
      component: 'Input',
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
        dictCode:"0_auditing",
        showChooseOption:false,

     },
  },
  {
    label: '是否置顶',
    field: 'isTop',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn",
        showChooseOption:false,
     },
  },
  {
    label: '标题',
    field: 'articleTitle',
    component: 'Input',
  },
  {
    label: '作者',
    field: 'articleAuthor',
    component: 'Input',
  },
  {
    label: '目录',
    field: 'articleMenu',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"0_article_menu",
        showChooseOption:false,
     },
  },
  {
    label: '发文时间',
    field: 'articleTime',
    component: 'DatePicker',
  },
  {
    label: '正文',
    field: 'articleContent',
    component: 'JEditor',
    colProps: {
      span: 24,
    },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];
