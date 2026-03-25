import { FormSchema } from '/@/components/Form'

// 部门基础表单
export function useBasicFormSchema() {
    const basicFormSchema: FormSchema[] = [
        {
            field: 'orgnam',
            label: '组织名称',
            component: 'Input',
            componentProps: {
                placeholder: '请输入组织名称'
            },
            rules: [{ required: true, message: '组织名称不能为空' }]
        },
        {
            field: 'orgcod',
            label: '组织编码',
            component: 'Input',
            componentProps: {
                placeholder: '请输入组织编码'
            },
            rules: [{ required: true, message: '组织编码不能为空' }]
        },
        {
            field: 'parentid',
            label: '上级组织',
            component: 'TreeSelect',
            componentProps: {
                treeData: [],
                placeholder: '无',
                dropdownStyle: { maxHeight: '200px', overflow: 'auto' }
            }
        },
        {
            field: 'orgtyp',
            label: '组织类型',
            component: 'RadioButtonGroup',
            componentProps: { options: [] },
            rules: [{ required: true, message: '组织类型不能为空' }]
        },
        {
            field: 'state',
            label: '状态',
            component: 'RadioButtonGroup',
            componentProps: {
                options: [
                    { label: '有效', value: 'Y' },
                    { label: '无效', value: 'N' }
                ]
            },
            rules: [{ required: true, message: '状态不能为空' }]
        },

        {
            field: 'orgord',
            label: '排序',
            component: 'InputNumber',
            componentProps: {}
        },
        {
            field: 'erpcod',
            label: '三方系统关联代码',
            component: 'Input',
            componentProps: { placeholder: '请输入ERP关联代码或三方系统关联代码' }
        },
        {
            field: 'msg',
            label: '备注',
            component: 'InputTextArea',
            componentProps: { placeholder: '请输入备注' }
        }
    ]
    return { basicFormSchema }
}

// 机构类型选项
export const orgCategoryOptions = {
    // 一级部门
    root: [{ value: 'C', label: '公司' }],
    // 子级部门
    child: [{ value: 'B', label: '部门' }]
}
