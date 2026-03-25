import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    // {
    //     title: '主键，BIP收款单据表头唯一标识',
    //     align: 'center',
    //     dataIndex: 'ordno'
    // },
    {
        title: '单据日期',
        align: 'center',
        dataIndex: 'billdate',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '单据号',
        align: 'center',
        width: 180,
        dataIndex: 'billno'
    },
    {
        title: '打款客户',
        align: 'center',
        dataIndex: 'paycustomer'
    },
    {
        title: '法人单位',
        align: 'center',
        width: 180,
        dataIndex: 'orgnam'
    },
    {
        title: '收款单金额',
        align: 'center',
        dataIndex: 'receamt'
    },
    {
        title: '认领金额',
        align: 'center',
        dataIndex: 'clamt'
    },
    {
        title: '转为尾款的金额',
        align: 'center',
        dataIndex: 'lpbalan'
    },
    {
        title: '销售单号',
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
        title: '客户名称',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmnam'
    },
    {
        title: 'state',
        align: 'center',
        dataIndex: 'state',
        customRender: ({ text }) => {
            return render.renderSwitch(text, [
                { text: '已认领', value: 'Y' },
                { text: '未认领', value: 'A' }
            ])
        }
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
        label: '单据号，BIP自动生成',
        field: 'billno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '打款客户',
        field: 'paycustomer',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '法人单位',
        field: 'orgnam',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '主键，BIP收款单据表头唯一标识',
        field: 'ordno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入主键，BIP收款单据表头唯一标识!' }]
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
        label: '单据号，BIP自动生成',
        field: 'billno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单据号，BIP自动生成!' }]
        }
    },
    {
        label: '打款客户',
        field: 'paycustomer',
        component: 'Input'
    },
    {
        label: '财务组织编码(收款组织）',
        field: 'orgcod',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入财务组织编码(收款组织）!' }]
        }
    },
    {
        label: '法人单位',
        field: 'orgnam',
        component: 'Input'
    },
    {
        label: '原币金额',
        field: 'receamt',
        component: 'InputNumber',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入原币金额!' }]
        }
    },
    {
        label: 'clamt',
        field: 'clamt',
        component: 'InputNumber'
    },
    {
        label: '转为尾款的金额',
        field: 'lpbalan',
        component: 'InputNumber'
    },
    {
        label: '销售单号  szjj_busi_order.ordno',
        field: 'salordno',
        component: 'Input'
    },
    {
        label: '销售日期【szjj_buss_main.delvbdat】',
        field: 'saldat',
        component: 'DatePicker'
    },
    {
        label: '客户号码（采购商）',
        field: 'custcod',
        component: 'Input'
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '猪场代码',
        field: 'farmcod',
        component: 'Input'
    },
    {
        label: '名称',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: 'salamt',
        field: 'salamt',
        component: 'InputNumber'
    },
    {
        label: 'state',
        field: 'state',
        component: 'Input'
    },
    {
        label: '单号',
        field: 'lpno',
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
