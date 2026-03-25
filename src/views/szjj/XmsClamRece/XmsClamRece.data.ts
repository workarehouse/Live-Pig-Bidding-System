import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '单号',
        align: 'center',
        dataIndex: 'ordno'
    },
    {
        title: '销售单号',
        align: 'center',
        dataIndex: 'salordno'
    },
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmnam'
    },
    {
        title: '客户',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '收款单勾选金额【累计和】',
        align: 'center',
        dataIndex: 'receamt'
    },
    {
        title: '尾款冻结金额',
        align: 'center',
        dataIndex: 'frzbalan'
    },
    {
        title: '折扣冻结金额',
        align: 'center',
        dataIndex: 'frzdisc'
    },

    {
        title: '创建时间',
        align: 'center',
        dataIndex: 'credat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: '更新时间',
    //     align: 'center',
    //     dataIndex: 'upddat',
    //     customRender: ({ text }) => {
    //         return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
    //     }
    // }
    // {
    //     title: '更新人',
    //     align: 'center',
    //     dataIndex: 'updusr'
    // }
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state_dictText'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '单号',
        field: 'ordno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '销售单号',
        field: 'salordno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '创建时间',
        field: 'credat',
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
        label: '销售单号  szjj_busi_order.ordno',
        field: 'salordno',
        component: 'Input'
    },
    {
        label: '收款单勾选金额【累计和】',
        field: 'receamt',
        component: 'InputNumber'
    },
    {
        label: '尾款冻结金额',
        field: 'frzbalan',
        component: 'InputNumber'
    },
    {
        label: '折扣冻结金额',
        field: 'frzdisc',
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
        label: '更新时间',
        field: 'upddat',
        component: 'DatePicker'
    },
    {
        label: '更新人',
        field: 'updusr',
        component: 'Input'
    },
    {
        label: '状态（Y：已完成，N作废）',
        field: 'state',
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
