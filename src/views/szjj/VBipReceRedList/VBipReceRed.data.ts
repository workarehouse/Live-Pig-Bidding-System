import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    // {
    //     title: '主键',
    //     align: 'center',
    //     dataIndex: 'pkGatherbill'
    // },
    {
        title: '收款单日期',
        align: 'center',
        dataIndex: 'billdate',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '单据号',
        align: 'center',
        dataIndex: 'billno'
    },
    {
        title: '打款客户',
        align: 'center',
        dataIndex: 'paycustomer'
    },
    {
        title: '收款公司',
        align: 'center',
        dataIndex: 'cpynam'
    },
    {
        title: '收款金额',
        align: 'center',
        dataIndex: 'money'
    },
    {
        title: '可用金额',
        align: 'center',
        dataIndex: 'balan'
    },
    {
        title: 'BIP收款单号',
        align: 'center',
        dataIndex: 'rbillno'
    },
    {
        title: '打款客户',
        align: 'center',
        dataIndex: 'rpaycustomer'
    },
    {
        title: '收款公司',
        align: 'center',
        dataIndex: 'rcpynam'
    },
    {
        title: '收款金额',
        align: 'center',
        dataIndex: 'rmoney'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'ruseamt'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '单据日期，格式示例：2025-04-24',
        field: 'billdate',
        component: 'DatePicker',
        colProps: { span: 6 }
    },
    {
        label: '法人单位',
        field: 'cpynam',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '单据日期，格式示例：2025-04-24',
        field: 'rbilldate',
        component: 'DatePicker',
        colProps: { span: 6 }
    },
    {
        label: '打款客户',
        field: 'rpaycustomer',
        component: 'Input',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '主键，BIP收款单据表头唯一标识',
        field: 'pkGatherbill',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!' }]
        }
    },
    {
        label: '单据号，BIP自动生成',
        field: 'billno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单据号，BIP自动生成!' }]
        }
    },
    {
        label: '单据日期，格式示例：2025-04-24',
        field: 'billdate',
        component: 'DatePicker',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单据日期，格式示例：2025-04-24!' }]
        }
    },
    {
        label: '打款客户',
        field: 'paycustomer',
        component: 'Input'
    },
    {
        label: '法人单位',
        field: 'cpynam',
        component: 'Input'
    },
    {
        label: '原币金额',
        field: 'money',
        component: 'InputNumber',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入原币金额!' }]
        }
    },
    {
        label: '可用金额',
        field: 'balan',
        component: 'InputNumber'
    },
    {
        label: '主键，BIP收款单据表头唯一标识',
        field: 'rpkGatherbill',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!' }]
        }
    },
    {
        label: '单据号，BIP自动生成',
        field: 'rbillno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单据号，BIP自动生成!' }]
        }
    },
    {
        label: '单据日期，格式示例：2025-04-24',
        field: 'rbilldate',
        component: 'DatePicker',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单据日期，格式示例：2025-04-24!' }]
        }
    },
    {
        label: '打款客户',
        field: 'rpaycustomer',
        component: 'Input'
    },
    {
        label: '法人单位',
        field: 'rcpynam',
        component: 'Input'
    },
    {
        label: '原币金额',
        field: 'rmoney',
        component: 'InputNumber',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入原币金额!' }]
        }
    },
    {
        label: 'ruseamt',
        field: 'ruseamt',
        component: 'InputNumber',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入ruseamt!' }]
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
