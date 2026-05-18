import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmcod_dictText'
    },
    {
        title: '区域',
        align: 'center',
        dataIndex: 'area'
    },
    {
        title: '统计项（辅助配置）',
        align: 'center',
        dataIndex: 'rptitm'
    },
    {
        title: '排序号',
        align: 'center',
        dataIndex: 'ord'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '猪场代码',
        field: 'farmcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'szjj_base_farmer,farmer_name,farmer_code'
        },
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '猪场代码',
        field: 'farmcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'szjj_base_farmer,farmer_name,farmer_code'
        }
    },
    {
        label: '区域',
        field: 'area',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入区域!' }]
        }
    },
    {
        label: '统计项（辅助配置）',
        field: 'rptitm',
        component: 'Input'
    },
    {
        label: '排序号',
        field: 'ord',
        component: 'Input'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
