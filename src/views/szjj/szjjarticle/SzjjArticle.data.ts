import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '标题',
    align: "center",
    width:200,
    dataIndex: 'title'
  },
  {
    title: '类型',
    align: "center",
    width:100,
    dataIndex: 'sty_dictText'
  },
  {
    title: '文章内容',
    align: "left",
    width:300,
    dataIndex: 'content'
  },
  {
    title: '照片1',
    width:100,
    align: "center",
    dataIndex: 'picurl1',
    customRender: render.renderImage,
  },
  {
    title: '照片2',
    width:100,
    align: "center",
    dataIndex: 'picurl2',
    customRender: render.renderImage,
  },
  {
    title: '状态',
    width:100,
    align: "center",
    dataIndex: 'state_dictText'
  },
  {
    title: '更新人',
    align: "center",
    width:100,
    dataIndex: 'updusr'
  },
  {
    title: '更新时间',
    width:200,
    align: "center",
    dataIndex: 'upddat'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "标题",
    field: 'title',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "类型 0：竞拍须知，1用户隐私，2用户协议",
    field: 'sty',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "article_sty"
    },
    colProps: {span: 6},
  },
  {
    label: "文章内容",
    field: 'content',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "状态",
    field: 'state',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "article_state"
    },
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
    required: true,
  },
  {
    label: '类型 0：竞拍须知，1用户隐私，2用户协议',
    field: 'sty',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "article_sty"
    },
    required: true,
  },
  {
    label: '文章内容',
    field: 'content',
    component: 'InputTextArea',
    required: true,
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
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "article_state"
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
