import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getAreas } from '../../main/SzjjBusiMain.api';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '客户',
    align:"center",
    dataIndex: 'custnam'
   },
   {
    title: '头数',
    align:"center",
    dataIndex: 'pigcnt'
   },
   {
    title: '金额',
    align:"center",
    dataIndex: 'amt'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "区域",
      field: 'areacod',
      component: 'ApiSelect',
      componentProps: {
        api: getAreas,
        labelField: 'areanam',
        valueField: 'areacod',
        showChooseOption: false,
      },
      colProps: {span: 6},
 	},
     {
      label: "查询日期",
      field: "saldat",
      component: 'RangePicker',
      colProps: {span: 6},
	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客户',
    field: 'custnam',
    component: 'Input',
  },
  {
    label: '头数',
    field: 'pigcnt',
    component: 'InputNumber',
  },
  {
    label: '金额',
    field: 'amt',
    component: 'InputNumber',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];
