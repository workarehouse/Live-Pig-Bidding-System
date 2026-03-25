import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
import { getFarmsByLoginUser } from '../main/SzjjBusiMain.api'

//列表数据
export const columns: BasicColumn[] = [
    {
        title: '计划信息',
        children: [
            {
                title: '上架时间',
                align: 'center',
                sorter: true,
                dataIndex: 'begintim',
                width: 120,
                customRender: ({ text }) => {
                    return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
                }
            },
            {
                title: '猪场',
                align: 'center',
                width: 120,
                dataIndex: 'farmnam'
            },
            {
                title: '日计划猪场/栋舍',
                width: 120,
                align: 'center',
                dataIndex: 'housenam'
            },
            {
                title: '猪品种',
                align: 'center',
                width: 120,
                dataIndex: 'pignam'
            },
            {
                title: '生猪数量',
                align: 'center',
                width: 120,
                dataIndex: 'pigcnt'
            }
        ]
    },
    {
        title: '上架信息',
        children: [
            {
                title: '猪源单号',
                align: 'center',
                width: 150,
                dataIndex: 'ordno'
            },
            {
                title: '最小重量',
                align: 'center',
                width: 120,
                dataIndex: 'minwgt'
            },
            {
                title: '最大重量',
                align: 'center',
                width: 120,
                dataIndex: 'maxwgt'
            },
            {
                title: '生猪均重',
                align: 'center',
                width: 120,
                dataIndex: 'avgwgt'
            },
            {
                title: '牌价',
                align: 'center',
                width: 120,
                dataIndex: 'beginpri'
            },
            {
                title: '销售人员',
                align: 'center',
                width: 120,
                dataIndex: 'saleman'
            }
        ]
    },
    {
        title: '中标信息',
        children: [
            {
                title: '投标客户',
                align: 'center',
                width: 120,
                dataIndex: 'custnam'
            },
            {
                title: '中标时间',
                align: 'center',
                width: 120,
                dataIndex: 'biddat',
                customRender: ({ text }) => {
                    return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
                }
            },
            {
                title: '中标头数',
                align: 'center',
                width: 120,
                dataIndex: 'allotpigcnt'
            },
            {
                title: '中标价',
                align: 'center',
                width: 120,
                dataIndex: 'allotprice'
            }
        ]
    },
    {
        title: '交割情况',
        children: [
            {
                title: '订单号',
                align: 'center',
                width: 120,
                dataIndex: 'saleordno'
            },
            {
                title: '交割头数',
                align: 'center',
                width: 120,
                dataIndex: 'tranpigcnt'
            },
            {
                title: '交割重量',
                align: 'center',
                width: 120,
                dataIndex: 'tranwgt'
            },
            {
                title: '交割金额',
                align: 'center',
                width: 120,
                dataIndex: 'tranamt'
            },
            {
                title: '交割均重',
                align: 'center',
                width: 120,
                dataIndex: 'tranavgwgt'
            },
            {
                title: '交割单价',
                align: 'center',
                width: 120,
                dataIndex: 'tranprice'
            },
            {
                title: '交割猪场',
                align: 'center',
                width: 120,
                dataIndex: 'tranfarmnam'
            }
        ]
    },
    {
        title: '质量情况',
        children: [
            {
                title: '质量原因',
                align: 'center',
                width: 120,
                dataIndex: 'issumsg'
            },
            {
                title: '折减金额',
                align: 'center',
                width: 120,
                dataIndex: 'disamt'
            }
        ]
    }
    // {
    //     title: '猪源单号',
    //     align: 'center',
    //     dataIndex: 'ordno'
    // },
    //  {
    //   title: '猪场代码',
    //   align:"center",
    //   dataIndex: 'farmcod_dictText'
    //  },
    // {
    //     title: '次日计划数量',
    //     align: 'center',
    //     dataIndex: 'ndplanqty'
    // },
    // {
    //     title: '次日计划日期',
    //     align: 'center',
    //     dataIndex: 'nddat'
    // },

    // {
    //     title: '生猪数量',
    //     align: 'center',
    //     dataIndex: 'pigcnt'
    // },
    // {
    //     title: '最小重量',
    //     align: 'center',
    //     dataIndex: 'minwgt'
    // },
    // {
    //     title: '最大重量',
    //     align: 'center',
    //     dataIndex: 'maxwgt'
    // },
    // {
    //     title: '生猪均重',
    //     align: 'center',
    //     dataIndex: 'avgwgt'
    // },
    // {
    //     title: '牌价',
    //     align: 'center',
    //     dataIndex: 'beginpri'
    // },
    // {
    //     title: '销售人员',
    //     align: 'center',
    //     dataIndex: 'saleman'
    // },
    // {
    //     title: '投标客户账号',
    //     align: 'center',
    //     dataIndex: 'bidusr'
    // },
    // {
    //     title: '投标次数',
    //     align: 'center',
    //     dataIndex: 'bidcnt'
    // },

    // {
    //     title: '交割时间',
    //     align: 'center',
    //     dataIndex: 'allotdat',
    //     customRender: ({ text }) => {
    //         return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
    //     }
    // },
    // {
    //     title: '最终投标头数',
    //     align: 'center',
    //     dataIndex: 'allotpigcnt'
    // },
    // {
    //     title: '最终投标价',
    //     align: 'center',
    //     dataIndex: 'allotprice'
    // },
    // {
    //     title: '成交时间',
    //     align: 'center',
    //     dataIndex: 'trandat',
    //     customRender: ({ text }) => {
    //         return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
    //     }
    // },
]
//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '上架时间',
        field: 'begintim',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    // {
    //   label: '猪场代码',
    //   field: 'farmcod',
    //   component: 'JDictSelectTag',
    //   componentProps: {},
    //   colProps: { span: 6 },
    // },
    {
        label: '猪场',
        field: 'farmcods',
        component: 'ApiSelect',
        componentProps: {
            api: getFarmsByLoginUser,
            labelField: 'farmnam',
            valueField: 'farmcod',
            showChooseOption: false
        },
        colProps: { span: 6 }
    },

    // {
    //   label: '猪品种',
    //   field: 'pigtype',
    //   component: 'JDictSelectTag',
    //   componentProps: {},
    //   colProps: { span: 6 },
    // },
    {
        label: '猪品种',
        field: 'pigtypes',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'pig_type',
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '生猪均重',
        field: 'avgwgt',
        component: 'JRangeNumber',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '上架时间',
        field: 'begintim',
        component: 'DatePicker'
    },
    {
        label: '猪源单号',
        field: 'ordno',
        component: 'Input'
    },
    {
        label: '猪场代码',
        field: 'farmcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '名称猪场',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: '猪品种',
        field: 'pigtype',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: ''
        }
    },
    {
        label: '猪品种名称',
        field: 'pignam',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入猪品种名称!' }]
        }
    },
    {
        label: '生猪数量',
        field: 'pigcnt',
        component: 'InputNumber'
    },
    {
        label: '最小重量',
        field: 'minwgt',
        component: 'InputNumber'
    },
    {
        label: '最大重量',
        field: 'maxwgt',
        component: 'InputNumber'
    },
    {
        label: '生猪均重',
        field: 'avgwgt',
        component: 'InputNumber'
    },
    {
        label: '牌价',
        field: 'beginpri',
        component: 'InputNumber'
    },
    {
        label: '销售人员',
        field: 'saleman',
        component: 'Input'
    },
    {
        label: '投标客户账号',
        field: 'bidusr',
        component: 'Input'
    },
    {
        label: '投标客户',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '最终投标时间',
        field: 'biddat',
        component: 'DatePicker'
    },
    {
        label: '最终投标头数',
        field: 'bidpigcnt',
        component: 'InputNumber'
    },
    {
        label: '最终投标价',
        field: 'bidpri',
        component: 'InputNumber'
    },
    {
        label: '投标次数',
        field: 'bidcnt',
        component: 'InputNumber'
    },
    {
        label: '订单号',
        field: 'saleordno',
        component: 'Input'
    },
    {
        label: '交割时间',
        field: 'allotdat',
        component: 'DatePicker'
    },
    {
        label: '交割头数',
        field: 'allotpigcnt',
        component: 'InputNumber'
    },
    {
        label: '交割单价',
        field: 'allotprice',
        component: 'InputNumber'
    },
    {
        label: '成交时间',
        field: 'trandat',
        component: 'DatePicker'
    },
    {
        label: '成交头数',
        field: 'tranpigcnt',
        component: 'InputNumber'
    },
    {
        label: '成交重量',
        field: 'tranwgt',
        component: 'InputNumber'
    },
    {
        label: '成交金额',
        field: 'tranamt',
        component: 'InputNumber'
    },
    {
        label: '成交均重',
        field: 'tranavgwgt',
        component: 'InputNumber'
    },
    {
        label: '成交单价',
        field: 'tranprice',
        component: 'InputNumber'
    },
    {
        label: '成交猪场',
        field: 'tranfarmnam',
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
