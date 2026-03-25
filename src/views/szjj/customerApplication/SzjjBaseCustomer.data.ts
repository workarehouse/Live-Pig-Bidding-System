import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '状态',
        align: 'center',
        dataIndex: 'docsta_dictText'
    },
    {
        title: '类型',
        align: 'center',
        dataIndex: 'doctyp_dictText'
    },
    {
        title: '账号',
        align: 'center',
        dataIndex: 'custLoginname'
    },
    {
        title: '客户名称',
        align: 'center',
        dataIndex: 'custName'
    },
    {
        title: '客户分类',
        align: 'center',
        dataIndex: 'custsty_dictText'
    },
    {
        title: '联系电话',
        align: 'center',
        dataIndex: 'custTel'
    },
    {
        title: '保证金金额',
        align: 'center',
        dataIndex: 'payMoney'
    },

    {
        title: '备注',
        align: 'center',
        dataIndex: 'memo'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '客户名称',
        field: 'custName',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '联系人',
        field: 'custPerson',
        component: 'Input',
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '状态',
        field: 'auditing',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: '0_auditing'
        }
    },
    {
        label: '客户编码',
        field: 'custCode',
        component: 'Input'
    },
    {
        label: '客户名称',
        field: 'custName',
        component: 'Input'
    },
    {
        label: '联系人',
        field: 'custPerson',
        component: 'Input'
    },
    {
        label: '联系电话',
        field: 'custTel',
        component: 'Input'
    },
    {
        label: '添加时间',
        field: 'joinDatetime',
        component: 'DatePicker'
    },
    {
        label: '离开时间',
        field: 'outDatetime',
        component: 'DatePicker'
    },
    {
        label: '保证金金额',
        field: 'payMoney',
        component: 'InputNumber'
    },
    {
        label: '保证金缴纳时间',
        field: 'payDatetime',
        component: 'DatePicker'
    },
    {
        label: '备注',
        field: 'memo',
        component: 'Input'
    },
    {
        label: '微信id',
        field: 'wxId',
        component: 'Input'
    },
    {
        label: '微信名称',
        field: 'wxName',
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
