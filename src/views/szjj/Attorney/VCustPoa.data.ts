import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
import { h } from 'vue'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '所属法人单位(公司)',
        align: 'center',
        dataIndex: 'lpcpy'
    },
    {
        title: '客户名称',
        align: 'center',
        dataIndex: 'custnam'
    },
    {
        title: '被委托人',
        align: 'center',
        dataIndex: 'agentnam'
    },
    {
        title: '委托开始日期',
        align: 'center',
        dataIndex: 'startdat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '委托结束日期',
        align: 'center',
        dataIndex: 'enddat',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'msg'
    },
    {
        title: '委托书',
        align: 'center',
        dataIndex: 'poaurl',
        customRender: ({ text }) => {
            if (!text) return h('span', '无')
            return h('a', { href: text, target: '_blank' }, '下载')
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
        label: '被委托人（打款人名字）',
        field: 'agentnam',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '委托开始日期',
        field: 'startdat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '委托结束日期',
        field: 'enddat',
        component: 'DatePicker',
        colProps: { span: 6 }
    },
    {
        label: 'Y：有效 N ：无效（作废）',
        field: 'state',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入客户编码!' }]
        }
    },
    {
        label: '被委托人（打款人名字）',
        field: 'agentnam',
        component: 'Input'
    },
    {
        label: '委托开始日期',
        field: 'startdat',
        component: 'DatePicker'
    },
    {
        label: '委托结束日期',
        field: 'enddat',
        component: 'DatePicker'
    },
    {
        label: '备注',
        field: 'msg',
        component: 'Input'
    },
    {
        label: 'Y：有效 N ：无效（作废）',
        field: 'state',
        component: 'Input'
    },
    {
        label: '委托书',
        field: 'poaurl',
        component: 'JUpload',
        componentProps: {
            buttonVisible: false,
            disabled: true
        }
    },
    {
        label: '客户名称',
        field: 'custnam',
        component: 'Input'
    },
    {
        label: '联系电话',
        field: 'custTel',
        component: 'Input'
    },
    {
        label: '联系地址',
        field: 'addr',
        component: 'Input'
    },
    {
        label: 'NC系统的客户编码',
        field: 'nccod',
        component: 'Input'
    },
    {
        label: 'ERP的客户编码（麦汇）',
        field: 'erpcod',
        component: 'Input'
    },
    {
        label: '客户属性（内部/外部客户） 字典customer.custprop',
        field: 'custprop',
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
