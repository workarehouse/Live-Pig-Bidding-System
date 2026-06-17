import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '订单编号',
        align: 'center',
        dataIndex: 'ordno'
    },
    {
        title: '销售日期',
        align: 'center',
        dataIndex: 'saldat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: '编码',
    //     align: 'center',
    //     dataIndex: 'farmcod'
    // },
    // {
    //     title: '名称',
    //     align: 'center',
    //     dataIndex: 'farmnam'
    // },
    {
        title: '销售员',
        align: 'center',
        dataIndex: 'lnkman'
    },
    {
        title: '开票员',
        align: 'center',
        dataIndex: 'farmchck'
    },
    {
        title: '财务',
        align: 'center',
        dataIndex: 'farmfin'
    },
    {
        title: '场长',
        align: 'center',
        dataIndex: 'farmmgr'
    },
    {
        title: '收款确认(财务)',
        align: 'center',
        dataIndex: 'repushdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '收款领用(销售员)',
        align: 'center',
        dataIndex: 'reclamdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: 'reclamdatDur',
    //     align: 'center',
    //     dataIndex: 'reclamdatDur'
    // },
    {
        title: '售前完成时间',
        align: 'center',
        dataIndex: 'bsaldat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: 'bsaldatDur',
    //     align: 'center',
    //     dataIndex: 'bsaldatDur'
    // },
    {
        title: '最后一张码单',
        align: 'center',
        dataIndex: 'codsmtim',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: 'codsmtimDur',
    //     align: 'center',
    //     dataIndex: 'codsmtimDur'
    // },
    {
        title: '订单足额收款(销售员)',
        align: 'center',
        width: 180,
        dataIndex: 'lastreclamdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: 'lastreclamdatDur',
    //     align: 'center',
    //     dataIndex: 'lastreclamdatDur'
    // },
    {
        title: '折减审批(销售员)',
        align: 'center',
        dataIndex: 'issudat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '订单交割(开票 + 销售)',
        width: 180,
        align: 'center',
        dataIndex: 'wdelvdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    // {
    //     title: 'wdelvdatDur',
    //     align: 'center',
    //     dataIndex: 'wdelvdatDur'
    // },

    // {
    //     title: 'issudatDur',
    //     align: 'center',
    //     dataIndex: 'issudatDur'
    // },
    {
        title: '订单已交割时间',
        align: 'center',
        dataIndex: 'delvdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    }
    // {
    //     title: 'delvdatDur',
    //     align: 'center',
    //     dataIndex: 'delvdatDur'
    // }
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
        label: '销售日期',
        field: 'saldat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '编码',
        field: 'farmcod',
        component: 'Input',
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
        label: '编码',
        field: 'farmcod',
        component: 'Input'
    },
    {
        label: '名称',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: '销售业务',
        field: 'lnkman',
        component: 'Input'
    },
    {
        label: '猪场财务人员',
        field: 'farmfin',
        component: 'Input'
    },
    {
        label: '猪场开票员',
        field: 'farmchck',
        component: 'Input'
    },
    {
        label: '猪场厂长',
        field: 'farmmgr',
        component: 'Input'
    },
    {
        label: '收款单推送时间',
        field: 'repushdat',
        component: 'DatePicker'
    },
    {
        label: '收款单领用【第一次】',
        field: 'reclamdat',
        component: 'DatePicker'
    },
    {
        label: 'reclamdatDur',
        field: 'reclamdatDur',
        component: 'InputNumber'
    },
    {
        label: '售前完成时间',
        field: 'bsaldat',
        component: 'DatePicker'
    },
    {
        label: 'bsaldatDur',
        field: 'bsaldatDur',
        component: 'InputNumber'
    },
    {
        label: '最后一张码单',
        field: 'codsmtim',
        component: 'DatePicker'
    },
    {
        label: 'codsmtimDur',
        field: 'codsmtimDur',
        component: 'InputNumber'
    },
    {
        label: '足额收款最后一次领款',
        field: 'lastreclamdat',
        component: 'DatePicker'
    },
    {
        label: 'lastreclamdatDur',
        field: 'lastreclamdatDur',
        component: 'InputNumber'
    },
    {
        label: '订单可交割',
        field: 'wdelvdat',
        component: 'DatePicker'
    },
    {
        label: 'wdelvdatDur',
        field: 'wdelvdatDur',
        component: 'InputNumber'
    },
    {
        label: '现场折扣【折减审批】时间',
        field: 'issudat',
        component: 'DatePicker'
    },
    {
        label: 'issudatDur',
        field: 'issudatDur',
        component: 'InputNumber'
    },
    {
        label: '订单已交割时间',
        field: 'delvdat',
        component: 'DatePicker'
    },
    {
        label: 'delvdatDur',
        field: 'delvdatDur',
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
