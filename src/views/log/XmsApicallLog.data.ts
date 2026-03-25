import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: 'API名称',
        align: 'center',
        dataIndex: 'apinam'
    },
    {
        title: 'API参数',
        align: 'center',
        dataIndex: 'param'
    },
    {
        title: 'API返回结果',
        align: 'center',
        dataIndex: 'result'
    },
    {
        title: '开始日期',
        align: 'center',
        dataIndex: 'startdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '结束日期',
        align: 'center',
        dataIndex: 'enddat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '执行状态',
        align: 'center',
        dataIndex: 'state'
    },
    {
        title: '日志',
        align: 'center',
        dataIndex: 'logmsg'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: 'API名称',
        field: 'apinam',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: 'API参数',
        field: 'param',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: 'API返回结果',
        field: 'result',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '开始日期',
        field: 'startdat',
        component: 'RangePicker',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: 'API名称',
        field: 'apinam',
        component: 'Input'
    },
    {
        label: 'API参数',
        field: 'param',
        component: 'InputTextArea'
    },
    {
        label: 'API返回结果',
        field: 'result',
        component: 'InputTextArea'
    },
    {
        label: '开始日期',
        field: 'startdat',
        component: 'DatePicker'
    },
    {
        label: '结束日期',
        field: 'enddat',
        component: 'DatePicker'
    },
    {
        label: '执行状态',
        field: 'state',
        component: 'Input'
    },
    {
        label: '日志',
        field: 'logmsg',
        component: 'InputTextArea'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
