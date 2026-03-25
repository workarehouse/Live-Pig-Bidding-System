import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '车牌号',
        align: 'center',
        dataIndex: 'carno'
    },
    {
        title: '车辆类型',
        align: 'center',
        dataIndex: 'stycod_dictText'
    },
    {
        title: '区域',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '司机账号',
        align: 'center',
        dataIndex: 'drvno'
    },
    {
        title: '司机姓名',
        align: 'center',
        dataIndex: 'drvnam'
    },
    {
        title: '司机电话',
        align: 'center',
        dataIndex: 'tel'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state_dictText'
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'msg'
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = []

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '车牌号',
        field: 'carno',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入车牌号!' }]
        }
    },
    {
        label: '车辆类型',
        field: 'stycod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_carmgr.stycod'
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入洗消点类型!' }]
        }
    },
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入区域!' }]
        }
    },
    {
        label: '司机账号',
        field: 'drvno',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'sys_user WHERE user_identity=4,username,username'
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入司机账号!' }]
        }
    },
    {
        label: '司机姓名',
        field: 'drvnam',
        component: 'Input'
    },
    {
        label: '司机电话',
        field: 'tel',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: false }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' }]
        }
    },
    {
        label: '状态',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'state_yn'
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入状态!' }]
        }
    },
    {
        label: '备注',
        field: 'msg',
        component: 'InputTextArea'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
