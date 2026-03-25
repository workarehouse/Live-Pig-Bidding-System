import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '关联单号',
        align: 'center',
        dataIndex: 'srcno'
    },
    {
        title: '客户编码',
        align: 'center',
        dataIndex: 'custcod'
    },
    {
        title: '猪场代码',
        align: 'center',
        dataIndex: 'lpno'
    },
    {
        title: '冻结收款金额(来源收款单，本次变动值, 正数是增加冻结值 负数是使用冻结值[减少冻结值])',
        align: 'center',
        dataIndex: 'frzamt'
    },
    {
        title: '冻结质量折扣（本次变动值 ：正数为增加，负数为扣减）',
        align: 'center',
        dataIndex: 'frzdisc'
    },
    {
        title: '冻结尾款（本次变动值 ：正数为增加，负数为扣减）',
        align: 'center',
        dataIndex: 'frzbalan'
    },
    {
        title: '冻结转出金额（本次变动值 ：正数为增加，负数为扣减）',
        align: 'center',
        dataIndex: 'frzchgamt'
    },
    {
        title: '收款金额变动（本次变动值：正数为增加，负数为扣减）',
        align: 'center',
        dataIndex: 'avamt'
    },
    {
        title: '质量折扣变动（本次变动值：正数为增加，负数为扣减）',
        align: 'center',
        dataIndex: 'discbalan'
    },
    {
        title: '尾款变动(本次变动值：正数为增加，负数为扣减)',
        align: 'center',
        dataIndex: 'balan'
    },
    {
        title: '退款冻结金额（本次正在退款的金额）',
        align: 'center',
        dataIndex: 'frzretamt'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'ordsty'
    },
    {
        title: '当前冻结金额(冻结收款单之后)',
        align: 'center',
        dataIndex: 'curfrzamt'
    },
    {
        title: '当前冻结质量折扣（冻结折扣之后）',
        align: 'center',
        dataIndex: 'curfrzdisc'
    },
    {
        title: '当前可用质量折扣（实际扣减折扣之后）',
        align: 'center',
        dataIndex: 'curdiscbalan'
    },
    {
        title: '当前可用尾款(扣减尾款之后)',
        align: 'center',
        dataIndex: 'curbalan'
    },
    {
        title: '当前冻结尾款（冻结之后）',
        align: 'center',
        dataIndex: 'curfrzbalan'
    },
    {
        title: '当前收款单金额（实扣之后）',
        align: 'center',
        dataIndex: 'curavamt'
    },
    {
        title: '当前退款冻结金额（本次退款之后）',
        align: 'center',
        dataIndex: 'curfrzretamt'
    },
    {
        title: '当前冻结转出金额（冻结之后）',
        align: 'center',
        dataIndex: 'curfrzchgamt'
    },
    {
        title: '更新人',
        align: 'center',
        dataIndex: 'updusr'
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
        title: '更新时间',
        align: 'center',
        dataIndex: 'upddat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '日志信息',
        align: 'center',
        dataIndex: 'logmsg'
    },
    {
        title: '冻结使用状态 0：冻结状态 1：已经使用 -1：其他',
        align: 'center',
        dataIndex: 'frzuseflg'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '关联单号',
        field: 'srcno',
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
        label: '猪场代码',
        field: 'lpno',
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
        label: '关联单号【当扣减收款单 xms_nc_rece_cons_log.ordno,  当冻结尾款，冻结折扣，实扣尾款或实扣质量折扣 为 销售单号szjj_busi_order.ordno 】',
        field: 'srcno',
        component: 'Input'
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
        label: '猪场代码',
        field: 'lpno',
        component: 'Input'
    },
    {
        label: '冻结收款金额(来源收款单，本次变动值, 正数是增加冻结值 负数是使用冻结值[减少冻结值])',
        field: 'frzamt',
        component: 'InputNumber'
    },
    {
        label: '冻结质量折扣（本次变动值 ：正数为增加，负数为扣减）',
        field: 'frzdisc',
        component: 'InputNumber'
    },
    {
        label: '冻结尾款（本次变动值 ：正数为增加，负数为扣减）',
        field: 'frzbalan',
        component: 'InputNumber'
    },
    {
        label: '冻结转出金额（本次变动值 ：正数为增加，负数为扣减）',
        field: 'frzchgamt',
        component: 'InputNumber'
    },
    {
        label: '收款金额变动（本次变动值：正数为增加，负数为扣减）',
        field: 'avamt',
        component: 'InputNumber'
    },
    {
        label: '质量折扣变动（本次变动值：正数为增加，负数为扣减）',
        field: 'discbalan',
        component: 'InputNumber'
    },
    {
        label: '尾款变动(本次变动值：正数为增加，负数为扣减)',
        field: 'balan',
        component: 'InputNumber'
    },
    {
        label: '退款冻结金额（本次正在退款的金额）',
        field: 'frzretamt',
        component: 'InputNumber'
    },
    {
        label: '状态',
        field: 'ordsty',
        component: 'Input'
    },
    {
        label: '当前冻结金额(冻结收款单之后)',
        field: 'curfrzamt',
        component: 'InputNumber'
    },
    {
        label: '当前冻结质量折扣（冻结折扣之后）',
        field: 'curfrzdisc',
        component: 'InputNumber'
    },
    {
        label: '当前可用质量折扣（实际扣减折扣之后）',
        field: 'curdiscbalan',
        component: 'InputNumber'
    },
    {
        label: '当前可用尾款(扣减尾款之后)',
        field: 'curbalan',
        component: 'InputNumber'
    },
    {
        label: '当前冻结尾款（冻结之后）',
        field: 'curfrzbalan',
        component: 'InputNumber'
    },
    {
        label: '当前收款单金额（实扣之后）',
        field: 'curavamt',
        component: 'InputNumber'
    },
    {
        label: '当前退款冻结金额（本次退款之后）',
        field: 'curfrzretamt',
        component: 'InputNumber'
    },
    {
        label: '当前冻结转出金额（冻结之后）',
        field: 'curfrzchgamt',
        component: 'InputNumber'
    },
    {
        label: '更新人',
        field: 'updusr',
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
        label: '更新时间',
        field: 'upddat',
        component: 'DatePicker'
    },
    {
        label: '日志信息',
        field: 'logmsg',
        component: 'Input'
    },
    {
        label: '冻结使用状态 0：冻结状态 1：已经使用 -1：其他',
        field: 'frzuseflg',
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
