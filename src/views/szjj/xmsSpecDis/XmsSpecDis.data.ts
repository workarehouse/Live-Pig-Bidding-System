import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'

//列表数据
export const columns: BasicColumn[] = [
    {
        title: '客户名称',
        align: 'center',
        width: 300,
        dataIndex: 'custnam'
    },
    {
        title: '订单',
        align: 'center',
        customRender: ({ record }) => {
            return ` ${record.farmnam} | ${record.pigtyptxt} | ${record.pigcnt}头 | ${record.wgt | 0}kg | ${record.saldat}`
        }
    },
    {
        title: '折减金额',
        width: 150,
        align: 'center',
        dataIndex: 'disamt'
    },
    {
        title: '调整销售金额',
        width: 150,
        align: 'center',
        dataIndex: 'adjamt'
    },
    {
        title: '生效日期',
        width: 150,
        align: 'center',
        dataIndex: 'apprdat'
    },
    {
        title: '状态 ',
        width: 150,
        align: 'center',
        dataIndex: 'state_dictText'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '生效日期',
        field: 'consdat',
        component: 'DatePicker',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '销售单号',
        field: 'ordno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入销售单号!' }]
        }
    },
    {
        label: '折扣金额',
        field: 'disamt',
        component: 'InputNumber'
    },
    {
        label: '备注',
        field: 'msg',
        component: 'Input'
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
        label: '状态  A：待确认，B：已确认  Y：已生效（使用） X：删除',
        field: 'state',
        component: 'Input'
    },
    {
        label: '审批人',
        field: 'apprusr',
        component: 'Input'
    },
    {
        label: '审批时间',
        field: 'apprdat',
        component: 'DatePicker'
    },
    {
        label: '审批日志',
        field: 'apprmsg',
        component: 'Input'
    },
    {
        label: '生效日期【state=Y】',
        field: 'consdat',
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
