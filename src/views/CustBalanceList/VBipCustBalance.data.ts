import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '客户编码',
        align: 'center',
        dataIndex: 'custcod'
    },
    {
        title: '客户名称',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '法人单位',
        align: 'center',
        dataIndex: 'lpcpy'
    },
    {
        title: '冻结金额(来源收款单)',
        align: 'center',
        dataIndex: 'frzamt'
    },
    {
        title: '冻结质量折扣',
        align: 'center',
        dataIndex: 'frzdisc'
    },
    {
        title: '冻结尾款',
        align: 'center',
        dataIndex: 'frzbalan'
    },
    {
        title: '可用收款金额(来源收款单，)',
        align: 'center',
        dataIndex: 'avamt'
    },
    {
        title: '可用金额(尾款)',
        align: 'center',
        dataIndex: 'balan'
    },
    {
        title: '可用质量折扣（余额）',
        align: 'center',
        dataIndex: 'discbalan'
    },
    {
        title: '退款冻结金额（退款中）',
        align: 'center',
        dataIndex: 'frzretamt'
    },
    {
        title: '冻结转出金额（余额转移中）',
        align: 'center',
        dataIndex: 'frzchgamt'
    },
    {
        title: '创建人',
        align: 'center',
        dataIndex: 'creusr'
    },
    {
        title: '创建时间',
        align: 'center',
        dataIndex: 'credat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '更新人',
        align: 'center',
        dataIndex: 'updusr'
    },
    {
        title: '更新时间',
        align: 'center',
        dataIndex: 'upddat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '法人单位',
        field: 'lpno',
        component: 'JDictSelectTag',
        componentProps: {},
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入客户编码!' }]
        }
    },
    {
        label: '法人单位',
        field: 'lpno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入法人单位!' }]
        }
    },
    {
        label: '冻结金额(来源收款单)',
        field: 'frzamt',
        component: 'InputNumber'
    },
    {
        label: '冻结质量折扣',
        field: 'frzdisc',
        component: 'InputNumber'
    },
    {
        label: '冻结尾款',
        field: 'frzbalan',
        component: 'InputNumber'
    },
    {
        label: '可用收款金额(来源收款单，)',
        field: 'avamt',
        component: 'InputNumber'
    },
    {
        label: '可用金额(尾款)',
        field: 'balan',
        component: 'InputNumber'
    },
    {
        label: '可用质量折扣（余额）',
        field: 'discbalan',
        component: 'InputNumber'
    },
    {
        label: '退款冻结金额（退款中）',
        field: 'frzretamt',
        component: 'InputNumber'
    },
    {
        label: '创建人',
        field: 'creusr',
        component: 'Input'
    },
    {
        label: '创建时间',
        field: 'credat',
        component: 'DatePicker'
    },
    {
        label: '更新人',
        field: 'updusr',
        component: 'Input'
    },
    {
        label: '更新时间',
        field: 'upddat',
        component: 'DatePicker'
    },
    {
        label: '冻结转出金额（余额转移中）',
        field: 'frzchgamt',
        component: 'InputNumber'
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '法人单位',
        field: 'lpcpy',
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
