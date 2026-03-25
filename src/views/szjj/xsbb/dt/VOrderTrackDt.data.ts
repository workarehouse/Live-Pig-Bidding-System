import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '订单销售日期',
        width: 120,
        align: 'center',
        dataIndex: 'saldat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '公司',
        align: 'center',
        width: 250,
        dataIndex: 'lpcpy'
    },
    {
        title: '猪场',
        align: 'center',
        width: 120,
        dataIndex: 'farmcod_dictText'
    },
    {
        title: '客户',
        align: 'center',
        width: 120,
        dataIndex: 'custnam'
    },
    {
        title: '订单号',
        width: 120,
        align: 'center',
        dataIndex: 'ordno'
    },
    {
        title: '余额',
        align: 'center',
        width: 120,
        dataIndex: 'delvbalan'
    },
    {
        title: '尾款',
        width: 120,
        align: 'center',
        dataIndex: 'balan'
    },
    {
        title: '收款金额（元）',
        children: [
            {
                title: '留存金额',
                dataIndex: 'frzbalan',
                key: 'frzbalan',
                width: 120
            },
            {
                title: '认领使用收款单金额',
                dataIndex: 'receamt',
                key: 'receamt',
                width: 150
            },
            {
                title: '交割使用收款单金额',
                dataIndex: 'curavamt',
                key: 'curavamt',
                width: 150
            },
            {
                title: '交割使用留存金额',
                dataIndex: 'curbalan',
                key: 'curbalan',
                width: 150
            }
        ]
    },
    {
        title: '订单金额（元）',
        children: [
            {
                title: '订单金额',
                dataIndex: 'salamt',
                key: 'salamt',
                width: 120
            },
            {
                title: '码单折减金额',
                dataIndex: 'discamt',
                key: 'discamt',
                width: 150
            },
            {
                title: '交割用折减金额',
                dataIndex: 'curdiscbalan',
                key: 'curdiscbalan',
                width: 150
            },
            {
                title: '调整销售金额',
                dataIndex: 'adjamt',
                key: 'adjamt',
                width: 150
            }
        ]
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '公司',
        field: 'lpno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_bank_info  where state='Y',lpcpy,lpno"
        },
        colProps: { span: 6 }
    },
    {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '销售日期',
        field: 'saldat',
        component: 'RangePicker',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '单号',
        field: 'ordno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单号!' }]
        }
    },
    {
        label: '销售日期',
        field: 'saldat',
        component: 'DatePicker'
    },
    {
        label: '客户号码（采购商）',
        field: 'custcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '单号',
        field: 'lpno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_bank_info  where state='Y',lpcpy,lpno"
        }
    },
    {
        label: '法人单位',
        field: 'lpcpy',
        component: 'Input'
    },
    {
        label: '编码',
        field: 'farmcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer where auditing='1',farmer_name,farmer_code"
        }
    },
    {
        label: '名称',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: 'balan',
        field: 'balan',
        component: 'InputNumber'
    },
    {
        label: 'delvbalan',
        field: 'delvbalan',
        component: 'InputNumber'
    },
    {
        label: 'frzbalan',
        field: 'frzbalan',
        component: 'InputNumber'
    },
    {
        label: 'receamt',
        field: 'receamt',
        component: 'InputNumber'
    },
    {
        label: 'curavamt',
        field: 'curavamt',
        component: 'InputNumber'
    },
    {
        label: 'curbalan',
        field: 'curbalan',
        component: 'InputNumber'
    },
    {
        label: 'salamt',
        field: 'salamt',
        component: 'InputNumber'
    },
    {
        label: 'discamt',
        field: 'discamt',
        component: 'InputNumber'
    },
    {
        label: 'curdiscbalan',
        field: 'curdiscbalan',
        component: 'InputNumber'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
