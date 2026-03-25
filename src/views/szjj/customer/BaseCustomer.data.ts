import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '登录账号',
        align: 'center',
        dataIndex: 'custLoginname'
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
    // {
    //     title: '客户分类',
    //     align: 'center',
    //     dataIndex: 'custsty_dictText'
    // },
    {
        title: '联系电话',
        align: 'center',
        dataIndex: 'custTel'
    }
    // {
    //     title: '保证金金额',
    //     align: 'center',
    //     dataIndex: 'payMoney'
    // },
    // {
    //     title: '联系人',
    //     align: 'center',
    //     dataIndex: 'custPerson'
    // },
    // {
    //     title: '数据权限',
    //     align: 'center',
    //     dataIndex: 'dataAuthTxt'
    // },
    // {
    //     title: '状态',
    //     align: 'center',
    //     dataIndex: 'auditing_dictText'
    // }
]
//查询数据
export const searchFormSchema: FormSchema[] = [
    // {
    //     label: '状态',
    //     field: 'auditing',
    //     component: 'JDictSelectTag',
    //     defaultValue: '1',
    //     componentProps: {
    //         dictCode: 'cust_auditing',
    //         showChooseOption: false
    //     }
    // },
    // {
    //     label: '保证金状态',
    //     field: 'payAuditing',
    //     component: 'JDictSelectTag',
    //     componentProps: {
    //         dictCode: '0_payauditing',
    //         showChooseOption: false
    //     }
    // },
    {
        label: '客户编码',
        field: 'custcod',
        component: 'Input',
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
        label: '状态',
        field: 'auditing',
        component: 'JDictSelectTag',
        componentProps: {
            disabled: true,
            dictCode: 'cust_auditing',
            showChooseOption: false
        }
    },
    {
        label: '客户编码',
        field: 'custCode',
        component: 'Input',
        componentProps: {
            // disabled: true
        }
    },
    {
        label: '客户名称',
        field: 'custName',
        component: 'Input',
        componentProps: {
            // disabled: true
        }
    },
    {
        label: '客户公司',
        field: 'orgcode',
        component: 'JDictSelectTag',
        componentProps: {
            showChooseOption: false,
            dictCode: 'xms_cus_onoff_cpy'
        }
    },
    {
        label: '分类',
        field: 'custsty',
        component: 'JDictSelectTag',
        componentProps: {
            showChooseOption: false,
            dictCode: 'customer.custsty'
        }
    },

    {
        label: 'NC代码',
        field: 'nccod',
        component: 'Input',
        componentProps: {}
    },
    {
        label: 'ERP代码',
        field: 'erpcod',
        component: 'Input',
        componentProps: {}
    },

    // {
    //     label: '保证金状态',
    //     field: 'payAuditing',
    //     component: 'JDictSelectTag',
    //     componentProps: {
    //         dictCode: '0_payauditing',
    //         showChooseOption: false
    //     }
    // },
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
        label: '所属区域',
        field: 'dataAuth',
        component: 'JSelectMultiple',
        componentProps: {
            showChooseOption: false,
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgid"
        }
    },
    {
        label: '联系地址',
        field: 'addr',
        component: 'Input'
    },
    // {
    //     label: '添加时间',
    //     field: 'joinDatetime',
    //     component: 'DatePicker'
    // },
    {
        label: '保证金',
        field: 'payMoney',
        component: 'InputNumber',

        componentProps: {
            disabled: true,
            placeholder: '请输入保证金的金额（元）'
        }
    },
    {
        label: '银行名称',
        field: 'banknam',
        component: 'Input'
    },
    {
        label: '银行账户名称',
        field: 'bankusr',
        component: 'Input'
    },
    {
        label: '银行账号',
        field: 'bankno',
        component: 'Input'
    },
    {
        label: '银行支付关联号',
        field: 'banksrcno',
        component: 'Input'
    },
    {
        label: '纳税号或身份证',
        field: 'idcard',
        component: 'Input'
    },
    {
        label: '微信号',
        field: 'wxId',
        component: 'Input'
    },
    // {
    //     label: '离开时间',
    //     field: 'outDatetime',
    //     component: 'DatePicker'
    // },
    // {
    //     label: '缴纳时间',
    //     field: 'payDatetime',
    //     component: 'DatePicker',
    //     componentProps: {
    //         placeholder: '请输入保证金缴纳时间'
    //     }
    // },

    // {
    //     label: '微信id',
    //     field: 'wxId',
    //     component: 'Input'
    // },
    // {
    //     label: '微信名称',
    //     field: 'wxName',
    //     component: 'Input'
    // },
    {
        label: '登录账号',
        field: 'custLoginname',
        component: 'Input'
    },
    {
        label: '登录密码',
        field: 'custPassword',
        component: 'Input'
    },
    {
        label: '备注',
        field: 'memo',
        component: 'InputTextArea'
    },
    {
        field: 'picurls',
        component: 'JUpload',
        label: '附件',
        componentProps: { buttonVisible: false, disabled: true }
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
