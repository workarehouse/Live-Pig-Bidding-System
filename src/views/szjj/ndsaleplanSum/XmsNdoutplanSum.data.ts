import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state_dictText'
    },
    {
        title: '区域',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '日期',
        align: 'center',
        dataIndex: 'outdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '出栏头数',
        align: 'center',
        dataIndex: 'tqty'
    },
    {
        title: '汇总时间',
        align: 'center',
        dataIndex: 'sumtime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '提交人',
        align: 'center',
        dataIndex: 'sumusr'
    },
    {
        title: '上报时间',
        align: 'center',
        dataIndex: 'cfmtime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '出栏日期',
        field: 'outdat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '状态',
        field: 'state',
        component: 'JSelectMultiple',
        componentProps: {
            dictCode: 'xms_ndoutplan_sum'
        },
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '区域代码',
        field: 'areacod',
        component: 'Input'
    },
    {
        label: '出栏日期',
        field: 'outdat',
        component: 'DatePicker'
    },
    {
        label: '汇总数量',
        field: 'tqty',
        component: 'InputNumber'
    },
    {
        label: '状态;A：汇总， B：已确认   X：作废  字典：xms_ndoutplan_sum',
        field: 'state',
        component: 'JSelectMultiple',
        componentProps: {
            dictCode: 'xms_ndoutplan_sum'
        }
    },
    {
        label: '汇总时间',
        field: 'sumtime',
        component: 'DatePicker'
    },
    {
        label: '汇总人',
        field: 'sumusr',
        component: 'Input'
    },
    {
        label: '确认时间',
        field: 'cfmtime',
        component: 'DatePicker'
    },
    {
        label: '确认人',
        field: 'cfmusr',
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
