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
        title: 'BPM审批申请单号',
        align: 'center',
        dataIndex: 'docno'
    },
    {
        title: '客户编码',
        align: 'center',
        dataIndex: 'custcod'
    },
    {
        title: '客户名称',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '法人单位',
        align: 'center',
        dataIndex: 'srclpcpy'
    },
    {
        title: '法人单位',
        align: 'center',
        dataIndex: 'tolpcpy'
    },
    {
        title: '转移金额(尾款)',
        align: 'center',
        dataIndex: 'amt'
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
        title: '创建人',
        align: 'center',
        dataIndex: 'creusr'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state',
        customRender: ({ text }) => {
            const stateTextMap: Record<string, string> = {
                A: '待退款',
                B: '发起BPM流程',
                C: 'BPM审批通过',
                D: '发起NC退款',
                Y: '已完成',
                N: 'BPM申请不通过',
                U: 'NC审批不通过',
                X: '删除'
            }
            return text ? stateTextMap[String(text)] ?? String(text) : ''
        }
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
        label: 'ordno',
        field: 'ordno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: 'BPM审批申请单号',
        field: 'docno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '源法人单位代码',
        field: 'srclpno',
        component: 'JDictSelectTag',
        componentProps: {},
        colProps: { span: 6 }
    },
    {
        label: '目标法人单位代码',
        field: 'tolpno',
        component: 'JDictSelectTag',
        componentProps: {},
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
        label: 'ordno',
        field: 'ordno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入ordno!' }]
        }
    },
    {
        label: 'BPM审批申请单号',
        field: 'docno',
        component: 'Input'
    },
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input'
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '源法人单位代码',
        field: 'srclpno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '法人单位',
        field: 'srclpcpy',
        component: 'Input'
    },
    {
        label: '目标法人单位代码',
        field: 'tolpno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '法人单位',
        field: 'tolpcpy',
        component: 'Input'
    },
    {
        label: '转移金额(尾款)',
        field: 'amt',
        component: 'InputNumber'
    },
    {
        label: '创建时间',
        field: 'credat',
        component: 'DatePicker'
    },
    {
        label: '创建人',
        field: 'creusr',
        component: 'Input'
    },
    {
        label: '状态（A：待退款，B：发起BPM流程,C : BPM审批通过 D：发起NC退款，Y：已完成，N：BPM申请不通过）U：NC审批不通过 X:删除',
        field: 'state',
        component: 'Input'
    },
    {
        label: '日志',
        field: 'logmsg',
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
