import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '流程单号',
        align: 'center',
        dataIndex: 'docno'
    },
    {
        title: '流程标题',
        align: 'center',
        dataIndex: 'title'
    },
    {
        title: '流程编码',
        align: 'center',
        dataIndex: 'proccod_dictText'
    },
    {
        title: '流程名称',
        align: 'center',
        dataIndex: 'procnam'
    },
    {
        title: '流程ID',
        align: 'center',
        dataIndex: 'bindid'
    },
    {
        title: '同步日期',
        align: 'center',
        dataIndex: 'syncdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '同步状态',
        align: 'center',
        dataIndex: 'syncsta_dictText'
    },
    {
        title: '同步次数',
        align: 'center',
        dataIndex: 'synctimes'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '流程单号',
        field: 'docno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '流程标题',
        field: 'title',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '流程编码',
        field: 'proccod',
        component: 'JDictSelectTag',
        componentProps: {},
        colProps: { span: 6 }
    },
    {
        label: '同步日期',
        field: 'syncdat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '同步状态',
        field: 'syncsta',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_sync_bpmproc.syncsta'
        },
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '流程单号',
        field: 'docno',
        component: 'Input'
    },
    {
        label: '流程标题',
        field: 'title',
        component: 'InputNumber'
    },
    {
        label: '流程编码',
        field: 'proccod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '流程名称',
        field: 'procnam',
        component: 'Input'
    },
    {
        label: '流程ID',
        field: 'bindid',
        component: 'Input'
    },
    {
        label: '同步日期',
        field: 'syncdat',
        component: 'DatePicker'
    },
    {
        label: '同步状态',
        field: 'syncsta',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_sync_bpmproc.syncsta'
        }
    },
    {
        label: '同步次数',
        field: 'synctimes',
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
