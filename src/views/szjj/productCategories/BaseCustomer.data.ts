import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '分类编码',
        align: 'center',
        dataIndex: 'erpcod'
    },
    {
        title: '分类名称',
        align: 'center',
        dataIndex: 'ctgnam'
    },
    {
        title: '上级分类',
        align: 'center',
        dataIndex: 'parentid_dictText'
    },
    {
        title: '所属品种',
        align: 'center',
        dataIndex: 'pigtyp_dictText'
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
    }
]

//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '分类级别',
        field: 'ctglv',
        component: 'Select',
        required: true,
        componentProps: {
            options: [
                { label: '1级', value: 1 },
                { label: '2级', value: 2 }
            ]
        }
    },
    {
        label: '上级分类',
        field: 'parentid',
        component: 'JSearchSelect',
        componentProps: {
            dict: 'xms_prodctg WHERE ctglv = 1,ctgnam,id'
        },
        ifShow: ({ values }) => {
            return values.ctglv === 2
        }
    },
    {
        label: '分类编码',
        field: 'erpcod',
        required: true,
        component: 'Input'
    },
    {
        label: '分类名称',
        field: 'ctgnam',
        required: true,
        component: 'Input'
    },
    {
        label: '所属品种',
        field: 'pigtyp',
        component: 'JDictSelectTag',
        required: true,
        componentProps: {
            dictCode: 'xms_prodctg.pigtyp',
            type: 'radio'
        }
    },
    {
        label: '状态',
        field: 'state',
        component: 'RadioButtonGroup',
        required: true,
        componentProps: {
            options: [
                { label: '有效', value: 'Y' },
                { label: '无效', value: 'N' }
            ]
        },
        defaultValue: 'Y'
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
