import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '猪源单号',
        align: 'left',
        dataIndex: 'srcno',
        width: 110
    },
    {
        title: '单号',
        align: 'center',
        width: 120,
        dataIndex: 'ordno'
    },

    {
        title: '客户编码',
        align: 'center',
        width: 100,
        dataIndex: 'custcod'
        /*customRender:({record,text}) =>{
      return text+'-'+record.custnam;
    },*/
    },
    {
        title: '客户名称',
        align: 'left',
        width: 150,
        dataIndex: 'custnam'
        /*customRender:({record,text}) =>{
      return text+'-'+record.custnam;
    },*/
    },
    {
        title: '猪场',
        align: 'center',
        width: 100,
        dataIndex: 'farmernam'
        /*customRender:({record,text}) =>{
      return text+'-'+record.custnam;
    },*/
    },
    {
        title: '猪品种',
        align: 'left',
        width: 100,
        dataIndex: 'pignam'
        /*customRender:({record,text}) =>{
      return text+'-'+record.custnam;
    },*/
    },

    {
        title: '分配订单号',
        align: 'center',
        dataIndex: 'allotOrdno',
        defaultHidden: true
    },
    {
        title: '分配订单明细ID',
        align: 'center',
        defaultHidden: true,
        dataIndex: 'allotDtid'
    },
    {
        title: '分配数量',
        align: 'right',
        width: 90,
        dataIndex: 'allotPigcnt'
    },
    {
        title: '分配单价',
        align: 'right',
        width: 80,
        dataIndex: 'allotPrice'
    },
    {
        title: '预计金额',
        align: 'right',
        width: 100,
        dataIndex: 'allotAmt'
    },
    {
        title: '预付款金额',
        align: 'right',
        width: 100,
        dataIndex: 'advAmt'
    },
    {
        title: '交易数量',
        align: 'right',
        width: 80,
        dataIndex: 'pigcnt'
    },
    {
        title: '交易总重量',
        align: 'right',
        width: 100,
        dataIndex: 'wgt'
    },
    {
        title: '实际交易金额',
        align: 'right',
        width: 120,
        dataIndex: 'amt'
    },
    {
        title: '备注',
        align: 'center',
        width: 80,
        dataIndex: 'msg'
    },
    {
        title: '状态',
        align: 'center',
        width: 80,
        dataIndex: 'state_dictText'
    },
    {
        title: '创建人',
        align: 'center',
        dataIndex: 'creusr',
        defaultHidden: true
    },
    {
        title: '创建时间',
        align: 'center',
        dataIndex: 'credat',
        customRender: ({ text }) => {
            return !text ? '' : text
        },
        defaultHidden: true
    },
    {
        title: '更新人',
        align: 'center',
        width: 70,
        dataIndex: 'updusr'
    },
    {
        title: '更新时间',
        align: 'center',
        width: 140,
        dataIndex: 'upddat',
        customRender: ({ text }) => {
            return !text ? '' : text
        }
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'msg',
        defaultHidden: true
    }
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
        label: '客户号码（采购商）',
        field: 'custcod',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '状态（A：待交割，Y：已完成，N作废）',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'order_state'
        },
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
        label: '单号',
        field: 'ordno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单号!' }]
        }
    },
    {
        label: '关联竞价ID【szjj_buss_main.id】',
        field: 'srcid',
        component: 'InputNumber'
    },
    {
        label: '客户号码（采购商）',
        field: 'custcod',
        component: 'Input'
    },
    {
        label: '分配订单号',
        field: 'allotOrdno',
        component: 'Input'
    },
    {
        label: '分配订单明细ID',
        field: 'allotDtid',
        component: 'InputNumber'
    },
    {
        label: '预计（分配）数量',
        field: 'allotPigcnt',
        component: 'InputNumber'
    },
    {
        label: '预计（分配）重量;1已读）',
        field: 'allotWgt',
        component: 'InputNumber'
    },
    {
        label: '分配单价',
        field: 'allotPrice',
        component: 'InputNumber'
    },
    {
        label: '预计（分配）金额',
        field: 'allotAmt',
        component: 'InputNumber'
    },
    {
        label: '实际交易生猪数',
        field: 'pigcnt',
        component: 'InputNumber'
    },
    {
        label: '实际交易总重量',
        field: 'wgt',
        component: 'InputNumber'
    },
    {
        label: '实际交易金额',
        field: 'amt',
        component: 'InputNumber'
    },
    {
        label: '状态（A：待交割，Y：已完成，N作废）',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'order_state'
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入状态（A：待交割，Y：已完成，N作废）!' }]
        }
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
        label: '备注',
        field: 'msg',
        component: 'Input'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    },
    {
        title: '关联竞价ID',
        align: 'center',
        dataIndex: 'srcid',
        defaultHidden: true
    },

    {
        title: '分配重量',
        align: 'right',
        width: 90,
        defaultHidden: true,
        dataIndex: 'allotWgt'
    }
]
