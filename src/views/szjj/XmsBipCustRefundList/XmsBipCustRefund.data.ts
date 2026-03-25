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
        title: '客户编码',
        align: 'center',
        dataIndex: 'custcod'
    },
    {
        title: '法人单位',
        align: 'center',
        dataIndex: 'lpno'
    },
    {
        title: '总退款金额',
        align: 'center',
        dataIndex: 'tamt'
    },
    {
        title: '尾款退款金额',
        align: 'center',
        dataIndex: 'refbalan'
    },
    {
        title: '退款备注',
        align: 'center',
        dataIndex: 'msg'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state'
    },
    {
        title: 'BPM审批完成时间',
        align: 'center',
        dataIndex: 'bpmfindat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: 'NC审批完成时间',
        align: 'center',
        dataIndex: 'ncfindat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: 'BPM审批申请单号',
        align: 'center',
        dataIndex: 'docno'
    },
    {
        title: 'NC申请单号',
        align: 'center',
        dataIndex: 'ncdocno'
    },
    {
        title: '日志',
        align: 'center',
        dataIndex: 'logmsg'
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
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '状态（A：待退款，B：发起BPM流程,C : BPM审批通过 D：发起NC退款，Y：已完成，N：BPM申请不通过）U：NC审批不通过 X:删除',
        field: 'state',
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
        component: 'Input'
    },
    {
        label: '总退款金额',
        field: 'tamt',
        component: 'InputNumber'
    },
    {
        label: '尾款退款金额  由于目前先充值收款单到尾款才退款，尾款退款金额与总退款金额是一致的',
        field: 'refbalan',
        component: 'InputNumber'
    },
    {
        label: '退款备注',
        field: 'msg',
        component: 'Input'
    },
    {
        label: '状态（A：待退款，B：发起BPM流程,C : BPM审批通过 D：发起NC退款，Y：已完成，N：BPM申请不通过）U：NC审批不通过 X:删除',
        field: 'state',
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
        label: 'BPM审批完成时间',
        field: 'bpmfindat',
        component: 'DatePicker'
    },
    {
        label: 'NC审批完成时间',
        field: 'ncfindat',
        component: 'DatePicker'
    },
    {
        label: '日志',
        field: 'logmsg',
        component: 'Input'
    },
    {
        label: 'BPM审批申请单号',
        field: 'docno',
        component: 'Input'
    },
    {
        label: 'NC申请单号',
        field: 'ncdocno',
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
