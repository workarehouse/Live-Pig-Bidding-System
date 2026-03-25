import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '销售区域',
        align: 'center',
        dataIndex: 'psalorgid_dictText'
    },
    {
        title: '编码',
        align: 'center',
        dataIndex: 'farmerCode'
    },
    {
        title: '名称',
        align: 'center',
        dataIndex: 'farmerName'
    },
    {
        title: '养殖类型',
        align: 'center',
        dataIndex: 'brdtyp_dictText'
    },
    {
        title: '收款账号',
        align: 'center',
        dataIndex: 'lpno'
    },
    {
        title: '销售业务',
        align: 'center',
        dataIndex: 'lnkman'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'auditing_dictText'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '编码',
        field: 'farmerCode',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '名称',
        field: 'farmerName',
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
        label: '编码',
        field: 'farmerCode',
        component: 'Input'
    },
    {
        label: '名称',
        field: 'farmerName',
        component: 'Input'
    },
    {
        label: '备注',
        field: 'memo',
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
