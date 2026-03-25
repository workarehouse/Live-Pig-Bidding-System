import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '标题',
    align: "center",
    dataIndex: 'title'
  },
  {
    title: '照片',
    align: "center",
    dataIndex: 'picurl',
    customRender: render.renderImage,
  },
  {
    title: '跳转地址',
    align: "center",
    dataIndex: 'url'
  },
  {
    title: '排序',
    align: "center",
    dataIndex: 'ord'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'state_dictText'
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
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '照片',
    field: 'picurl',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '跳转地址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '排序',
    field: 'ord',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'state',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "state_yn"
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
