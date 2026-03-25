import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '单号',
        align: 'center',
        dataIndex: 'lpno'
    },
    {
        title: 'NC公司编码',
        align: 'center',
        dataIndex: 'nccod'
    },
    {
        title: '区域',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '法人单位',
        align: 'center',
        dataIndex: 'lpcpy'
    },
    {
        title: '税号',
        align: 'center',
        dataIndex: 'taxno'
    },
    {
        title: '银行账号',
        align: 'center',
        dataIndex: 'bankno'
    },
    {
        title: '银行名称',
        align: 'center',
        dataIndex: 'banknam'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state'
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'msg'
    }
    // {
    //   title: '排序号',
    //   align: "center",
    //   dataIndex: 'ord'
    // },
]

//查询数据
export const searchFormSchema: FormSchema[] = []

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '单号',
        field: 'lpno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入单号!' }]
        }
    },
    {
        label: 'NC公司编码',
        field: 'nccod',
        component: 'Input'
    },
    {
        label: '所属区域',
        field: 'areacod',
        component: 'JSelectMultiple',
        componentProps: {
            showChooseOption: false,
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid"
        }
    },
    {
        label: '法人单位',
        field: 'lpcpy',
        component: 'Input'
    },
    {
        label: '税号',
        field: 'taxno',
        component: 'Input'
    },
    {
        label: '银行账号',
        field: 'bankno',
        component: 'Input'
    },
    {
        label: '银行名称',
        field: 'banknam',
        component: 'Input'
    },
    {
        label: '状态 Y：有效，N:无效',
        field: 'state',
        component: 'Input'
    },
    {
        label: '备注',
        field: 'msg',
        component: 'Input'
    },
    {
        label: '排序号',
        field: 'ord',
        component: 'InputNumber'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
