import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmid_dictText'
    },
    {
        title: '出栏日期',
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
        title: '填报时间',
        align: 'center',
        dataIndex: 'createTime'
    }
    // {
    //     title: '状态;Y 有效，N 无效  F：已冻结【已汇总】',
    //     align: 'center',
    //     dataIndex: 'state'
    // }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '猪场ID',
        field: 'farmid',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,id"
        },
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '猪场ID',
        field: 'farmid',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,id"
        }
    },
    {
        label: '出栏日期',
        field: 'outdat',
        component: 'DatePicker'
    },
    {
        label: '本周出栏计划数量',
        field: 'wkplan',
        component: 'InputNumber'
    },
    {
        label: '本周已出栏数量',
        field: 'wkqty',
        component: 'InputNumber'
    },
    {
        label: '待出栏',
        field: 'awqty',
        component: 'InputNumber'
    },
    {
        label: '总头数【汇总】',
        field: 'tqty',
        component: 'InputNumber'
    },
    {
        label: '总重量【汇总】',
        field: 'twgt',
        component: 'InputNumber'
    },
    {
        label: '状态;Y 有效，N 无效  F：已冻结【已汇总】',
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
