import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    // {
    //     title: '模板ID',
    //     align: 'center',
    //     dataIndex: 'tplid'
    // },
    {
        title: '序号',
        align: 'center',
        dataIndex: 'ord'
    },
    {
        title: '区域',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '品种',
        align: 'center',
        dataIndex: 'pigctg_dictText'
    },
    {
        title: '重量阶段',
        align: 'center',
        dataIndex: 'wgtstg_dictText'
    },
    {
        title: '分级',
        align: 'center',
        dataIndex: 'grade_dictText'
    },
    {
        title: '最小重量',
        align: 'center',
        dataIndex: 'minwgt'
    },
    {
        title: '最大重量',
        align: 'center',
        dataIndex: 'maxwgt'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state',
        customRender: ({ text }) => {
            return render.renderSwitch(text, [
                { text: '是', value: 'Y' },
                { text: '否', value: 'N' }
            ])
        }
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'msg'
    },
    {
        title: '创建人',
        align: 'center',
        dataIndex: 'createBy'
    },
    {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    },
    {
        title: '更新人',
        align: 'center',
        dataIndex: 'updateBy'
    },
    {
        title: '更新时间',
        align: 'center',
        dataIndex: 'updateTime',
        customRender: ({ text }) => {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
        }
    }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
        },
        colProps: { span: 6 }
    },
    {
        label: '状态',
        field: 'state',
        component: 'JSwitch',
        componentProps: {},
        colProps: { span: 6 }
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '模板ID',
        field: 'tplid',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入模板ID!' }]
        }
    },
    {
        label: '区域',
        field: 'areacod',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "xms_salorg WHERE orgtyp='B' and state='Y' ORDER BY orgord,orgnam,orgcod"
        }
    },
    {
        label: '品种',
        field: 'pigctg',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_pritpl.pigctg'
        }
    },
    {
        label: '重量阶段',
        field: 'wgtstg',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_pritpl.wgtstg'
        }
    },
    {
        label: '分级',
        field: 'grade',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'xms_pritpl.grade'
        }
    },
    {
        label: '状态',
        field: 'state',
        component: 'JSwitch',
        componentProps: {}
    },
    {
        label: '备注',
        field: 'msg',
        component: 'Input'
    },
    {
        label: '创建人',
        field: 'createBy',
        component: 'Input'
    },
    {
        label: '创建时间',
        field: 'createTime',
        component: 'DatePicker'
    },
    {
        label: '更新人',
        field: 'updateBy',
        component: 'Input'
    },
    {
        label: '更新时间',
        field: 'updateTime',
        component: 'DatePicker'
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
