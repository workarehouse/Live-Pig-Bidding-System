import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '洗消点名称',
        align: 'center',
        dataIndex: 'ptnam'
    },
    {
        title: '所属组织',
        align: 'center',
        dataIndex: 'areacod_dictText'
    },
    {
        title: '地址',
        align: 'center',
        dataIndex: 'addr'
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'state',
        customRender: ({ text }) => {
            return render.renderSwitch(text, [
                { text: '有效', value: 'Y' },
                { text: '无效', value: 'N' }
            ])
        }
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
        label: '洗消点编码',
        field: 'ptcod',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入洗消点代码!' }]
        }
    },
    {
        label: '洗消点名称',
        field: 'ptnam',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入洗消点名称!' }]
        }
    },
    {
        label: '区域;xms_salorg.orgcod 销售代码',
        field: 'areacod',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入区域;xms_salorg.orgcod 销售代码!' }]
        }
    },
    {
        label: '地址',
        field: 'addr',
        component: 'Input',
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入地址!' }]
        }
    },
    {
        label: '状态;Y：有效，N:无效',
        field: 'state',
        component: 'Input'
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
    }
]
