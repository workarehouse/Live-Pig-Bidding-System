import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '区域',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '计划销售日期',
        align: 'center',
        dataIndex: 'saledat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '申请单号',
        align: 'center',
        dataIndex: 'docno'
    },
    {
        title: '同步时间',
        align: 'center',
        dataIndex: 'syncdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg where  orgtyp='B',orgnam,orgcod"
        },
        colProps: { span: 6 }
    },
    {
        label: '计划销售日期',
        field: 'saledat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '申请单号',
        field: 'docno',
        component: 'Input',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: 'bindid',
        field: 'bindid',
        component: 'Input'
    },
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg where  orgtyp='B',orgnam,orgcod"
        }
    },
    {
        label: '计划销售日期',
        field: 'saledat',
        component: 'DatePicker'
    },
    {
        label: '申请单号',
        field: 'docno',
        component: 'Input'
    },
    {
        label: '同步时间',
        field: 'syncdat',
        component: 'DatePicker'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
