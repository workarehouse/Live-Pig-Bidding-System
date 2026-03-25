import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '订单号',
        align: 'center',
        dataIndex: 'mordno'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'statetxt'
    },
    {
        title: '发布次数',
        align: 'center',
        dataIndex: 'mcnt'
    },
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmcod_dictText'
    },
    {
        title: '品种',
        align: 'center',
        dataIndex: 'pigType_dictText'
    },
    {
        title: '初始发布头数',
        align: 'center',
        dataIndex: 'mpigcnt'
    },
    {
        title: '剩余头数',
        align: 'center',
        dataIndex: 'diffpigcnt'
    },
    {
        title: '最低价格',
        align: 'center',
        dataIndex: 'beginPrice'
    },
    {
        title: '加价幅度',
        align: 'center',
        dataIndex: 'incprice'
    },
    {
        title: '均重',
        align: 'center',
        dataIndex: 'avgwgt'
    },
    {
        title: '起拍价格',
        align: 'right',
        dataIndex: 'beginPrice',
        width: 80
    },
    {
        title: '加价幅度',
        align: 'right',
        dataIndex: 'incprice',
        width: 80
    },

    {
        title: '生猪数量',
        align: 'center',
        dataIndex: 'lastPigcnt'
    },
    {
        title: '竞拍开始时间',
        align: 'center',
        dataIndex: 'lastBeginDatetime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '竞拍结束时间',
        align: 'center',
        dataIndex: 'lastEndDatetime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '销售员',
        align: 'center',
        dataIndex: 'lnkman'
    },
    {
        title: '销售电话',
        align: 'center',
        dataIndex: 'lnkphone'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '状态',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'auction_state',
            maxlength: 180,
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '猪场',
        field: 'farmerCode',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,farmer_code"
        },
        colProps: { span: 6 }
    },
    {
        label: '猪品种',
        field: 'pigType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'pig_type',
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '开拍：从',
        field: 'bdat',
        component: 'DatePicker',
        componentProps: {
            placeholder: '开拍开始日期',
            valueFormat: 'yyyy-MM-DD',
            format: 'YYYY-MM-DD'
        }
    },
    {
        label: '到',
        field: 'edat',
        component: 'DatePicker',
        componentProps: {
            placeholder: '开拍结束日期',
            valueFormat: 'yyyy-MM-DD',
            format: 'YYYY-MM-DD'
        },
        colProps: { span: 6 }
    },
    {
        label: '关键字',
        field: 'keyword',
        component: 'Input',
        colProps: { span: 6 }
    }
]
//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '订单号',
        component: 'Input',
        field: 'mordno'
    },
    {
        label: '状态',
        field: 'statetxt',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入statetxt!' }]
        }
    },
    {
        label: 'mcnt',
        field: 'mcnt',
        component: 'InputNumber'
    },
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y',orgnam,orgcod"
        }
    },
    {
        label: '猪场',
        field: 'farmcod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "szjj_base_farmer  where auditing='1',farmer_name,farmer_code"
        }
    },

    {
        label: '品种',
        field: 'pigType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'pig_type'
        }
    },
    {
        label: '生猪数量',
        field: 'pigcnt',
        component: 'InputNumber'
    },
    {
        label: '剩余头数',
        field: 'diffpigcnt',
        component: 'InputNumber'
    },
    {
        label: '生猪均重',
        field: 'avgwgt',
        component: 'InputNumber'
    },
    {
        label: '起拍价格',
        field: 'beginPrice',
        component: 'InputNumber'
    },
    {
        label: '加价幅度',
        field: 'incprice',
        component: 'InputNumber'
    },
    {
        label: '竞拍开始时间',
        field: 'lastBeginDatetime',
        component: 'DatePicker'
    },
    {
        label: '竞拍结束时间',
        field: 'lastEndDatetime',
        component: 'DatePicker'
    },
    {
        label: '追加头数',
        field: 'mpigcnt',
        component: 'InputNumber'
    },
    {
        label: '销售业务',
        field: 'lnkman',
        component: 'Input'
    },
    {
        label: '销售电话',
        field: 'lnkphone',
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
