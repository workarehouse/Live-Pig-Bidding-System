import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '码单',
        align: 'center',
        dataIndex: 'codno'
    },
    {
        title: '单号',
        align: 'center',
        dataIndex: 'salordno'
    },
    {
        title: '销售日期',
        align: 'center',
        dataIndex: 'saldat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '数量',
        align: 'center',
        dataIndex: 'pigcnt'
    },
    {
        title: '总重',
        align: 'center',
        dataIndex: 'wgt'
    },
    {
        title: '金额',
        align: 'center',
        dataIndex: 'amt'
    },
    {
        title: '猪场代码',
        align: 'center',
        dataIndex: 'farmercod'
    },
    {
        title: '猪场名称',
        align: 'center',
        dataIndex: 'farmnam'
    },
    {
        title: '客户号码',
        align: 'center',
        dataIndex: 'custcod'
    },
    {
        title: '客户名称',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state_dictText'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '销售日期',
        field: 'saldat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '猪场代码',
        field: 'farmercod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,farmer_code"
        },
        colProps: { span: 6 }
    },
    {
        label: '状态',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'order_state'
        },
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '码单',
        field: 'codno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入码单!' }]
        }
    },
    {
        label: '单号',
        field: 'salordno',
        component: 'Input'
    },
    {
        label: '销售日期',
        field: 'saldat',
        component: 'DatePicker'
    },
    {
        label: '数量',
        field: 'pigcnt',
        component: 'InputNumber'
    },
    {
        label: '总重',
        field: 'wgt',
        component: 'InputNumber'
    },
    {
        label: '金额',
        field: 'amt',
        component: 'InputNumber'
    },
    {
        label: '猪场代码',
        field: 'farmercod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,farmer_code"
        },
        dynamicDisabled: true
    },
    {
        label: '名称',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: '客户号码',
        field: 'custcod',
        component: 'Input'
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '状态',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'order_state'
        }
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
