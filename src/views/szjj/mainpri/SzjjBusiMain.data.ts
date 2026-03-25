import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import { rules } from '/@/utils/helper/validator'
import { render } from '/@/utils/common/renderUtils'
import { JVxeTypes } from '/@/components/jeecg/JVxeTable/types'
import { getdefdelvIinfo, getFarmsByLoginUser } from './SzjjBusiMain.api'
import moment from 'moment'
import dayjs from 'dayjs'

//列表数据
export const columns: BasicColumn[] = [
    {
        title: '单号',
        align: 'left',
        dataIndex: 'ordno',
        width: 110
    },
    {
        title: '状态',
        align: 'center',
        dataIndex: 'statetxt'
    },

    {
        title: '发布状态',
        align: 'center',
        defaultHidden: true,
        dataIndex: 'auditing_dictText',
        width: 80
    },
    {
        title: '猪场',
        align: 'center',
        dataIndex: 'farmerCode_dictText',
        width: 100
    },
    {
        title: '猪品种',
        align: 'left',
        dataIndex: 'pigType_dictText'
    },
    {
        title: '生猪数量',
        align: 'right',
        dataIndex: 'pigcnt',
        width: '80px'
    },
    {
        title: '生猪均重',
        align: 'right',
        dataIndex: 'avgwgt',
        width: 80
    },
    {
        title: '起拍价格',
        align: 'right',
        dataIndex: 'beginPrice',
        width: 80
    },
    {
        title: '竞拍时间',
        align: 'center',
        dataIndex: 'beginDatetime',
        width: 200,
        customRender: ({ text, record, index }) => {
            return !text ? '' + '~' + record['endDatetime'] : text + '~' + record['endDatetime'].slice(-5)
        }
    },
    {
        title: '竞拍结束时间',
        align: 'center',
        dataIndex: 'endDatetime',
        customRender: ({ text, record, index }) => {
            return !text ? '' : text
        },
        defaultHidden: true
    },
    {
        title: '最小重量',
        align: 'right',
        dataIndex: 'minwgt',
        defaultHidden: true
    },
    {
        title: '最大重量',
        align: 'right',
        dataIndex: 'maxwgt',
        defaultHidden: true
    },
    {
        title: '加价幅度',
        align: 'right',
        dataIndex: 'incprice',
        width: 80
    },
    {
        title: '交割日期-开始',
        align: 'center',
        dataIndex: 'delvbdat',
        customRender: ({ text }) => {
            return !text ? '' : text
        },
        defaultHidden: true
    },
    {
        title: '交割日期-结束',
        align: 'center',
        dataIndex: 'delvedat',
        customRender: ({ text }) => {
            return !text ? '' : text
        },
        defaultHidden: true
    },
    {
        title: '交割地址',
        align: 'center',
        dataIndex: 'delvaddr',
        defaultHidden: true
    },
    {
        title: '销售业务',
        align: 'center',
        dataIndex: 'lnkman',
        width: '80px'
    },
    {
        title: '销售电话',
        align: 'center',
        dataIndex: 'lnkphone'
    },
    {
        title: '备注',
        align: 'center',
        dataIndex: 'memo',
        defaultHidden: true
    },
    {
        title: '更新时间',
        align: 'center',
        dataIndex: 'updateTime',
        customRender: ({ text }) => {
            return !text ? '' : text
        }
    }
]
//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '状态',
        field: 'state',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'auction_state',
            maxlength: 180,
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '猪场',
        field: 'farmerCode',
        component: 'ApiSelect',
        componentProps: {
            api: getFarmsByLoginUser,
            labelField: 'farmnam',
            valueField: 'farmcod',
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '猪品种',
        field: 'pigType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'pig_type',
            showChooseOption: false
        },
        colProps: { span: 6 }
    },
    {
        label: '开拍：从',
        field: 'bdat',
        component: 'DatePicker',
        componentProps: {
            placeholder: '开拍开始日期'
        }
    },
    {
        label: '到',
        field: 'edat',
        component: 'DatePicker',
        componentProps: {
            placeholder: '开拍结束日期'
        },
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
        label: '单号',
        field: 'ordno',
        component: 'Input',
        componentProps: {
            disabled: true,
            placeholder: '系统自动生成'
        }
    },
    {
        label: '猪场',
        field: 'farmerCode',
        component: 'ApiSelect',
        componentProps: ({ formModel }) => {
            return {
                api: getFarmsByLoginUser,
                labelField: 'farmnam',
                valueField: 'farmcod',
                disabled: true,
                showChooseOption: false,
                onChange: async (e) => {
                    formModel.ordno = e
                    console.log(e)
                    console.log(JSON.stringify(formModel))
                    await setDefaultVale(formModel, e)
                }
            }
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请选择猪场!' }]
        }
    },
    {
        label: '猪品种',
        field: 'pigType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'pig_type',
            showChooseOption: false,
            disabled: true
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入猪品种!' }]
        }
    },
    {
        label: '生猪数量',
        field: 'pigcnt',
        component: 'InputNumber',
        componentProps: {
            placeholder: '请输入生猪数量',
            precision: 0,
            disabled: true
        }
    },

    {
        label: '起拍价格',
        field: 'beginPrice',
        component: 'InputNumber',
        componentProps: {
            precision: 2,
            placeholder: '请输入起拍价格 （元/公斤）'
        },
        dynamicRules: ({ model, schema }) => {
            return [{ required: true, message: '请输入起拍价格 （元/公斤）!' }]
        }
    },
    {
        label: '加价幅度',
        field: 'incprice',
        component: 'InputNumber',
        defaultValue: '0.1',
        componentProps: {
            precision: 2,
            placeholder: '请输入加价幅度（元/公斤）',
            disabled: true
        }
    },
    {
        label: '竞拍：从',
        field: 'beginDatetime',
        component: 'DatePicker',
        componentProps: ({ formModel, formActionType }) => {
            return {
                'show-time': true,
                placeholder: '请输入竞拍开始时间',
                disabled: true,
                onOk: (date: any) => {
                    // this.startTime = data
                    //console.log(JSON.stringify(formModel.beginDatetime)+"----------------beginDatetime:"+date);
                    //console.log("----------- ---2--beginDatetime:"+formModel.beginDatetime);
                    if (formModel.endDatetime == null) formModel.endDatetime = moment(formModel.beginDatetime).add(2, 'hours')
                    //if(formModel.beginDatetime!=null&&formModel.endDatetime==null){
                }
            }
        }
    },
    {
        label: '到',
        field: 'endDatetime',
        component: 'DatePicker',
        componentProps: {
            'show-time': true,
            placeholder: '请输入竞拍结束时间',
            disabled: true
        }
    },
    {
        label: '最小重量',
        field: 'minwgt',
        component: 'InputNumber',
        componentProps: {
            precision: 0,
            disabled: true
        }
    },
    {
        label: '最大重量',
        field: 'maxwgt',
        component: 'InputNumber',
        componentProps: {
            precision: 0,
            disabled: true
        }
    },
    {
        label: '生猪均重',
        field: 'avgwgt',
        component: 'InputNumber',
        componentProps: {
            precision: 0,
            placeholder: '请输入生猪均重（公斤/头）',
            disabled: true
        }
    },
    {
        label: '交割地址',
        field: 'delvaddr',
        component: 'Input',
        componentProps: { disabled: true }
    },
    {
        label: '交割：从',
        field: 'delvbdat',
        component: 'DatePicker',
        componentProps: ({ formModel, formActionType }) => {
            return {
                'show-time': true,
                disabled: true,
                placeholder: '请输入交割开始时间',
                onOk: (date: any) => {
                    if (formModel.delvedat == null) formModel.delvedat = moment(formModel.delvbdat).add(24, 'hours')
                },
                disabledDate: (currentDate) => {
                    let date = dayjs(currentDate).format('YYYY-MM-DD')
                    let nowDate = dayjs(formModel.endDatetime).format('YYYY-MM-DD')
                    if (date <= nowDate) return true
                    return false
                }
            }
        }
    },
    {
        label: '到',
        field: 'delvedat',
        component: 'DatePicker',
        componentProps: { 'show-time': true, disabled: true, placeholder: '请输入交割结束时间' }
    },

    {
        label: '销售业务',
        field: 'lnkman',
        component: 'Input',
        componentProps: { disabled: true }
    },
    {
        label: '销售电话',
        field: 'lnkphone',
        component: 'Input',
        componentProps: { disabled: true }
    },
    {
        field: 'picurls',
        component: 'JImageUpload',
        label: '图片',
        helpMessage: '最多上传3张图片',
        componentProps: {
            disabled: true,
            fileMax: 3
        }
    },
    {
        label: '是否发布',
        field: 'auditing',
        component: 'Input',
        show: false
    },
    {
        label: '备注',
        field: 'memo',
        component: 'InputTextArea',
        componentProps: {
            placeholder: '请输入说明',
            disabled: true,
            autosize: { minRows: 6, maxRows: 12 }
        }
    },

    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false
    }
]
async function setDefaultVale(formModel, farmcod) {
    const resp_data = await getdefdelvIinfo({ farmcod: farmcod })
    console.log(resp_data)
    console.log(JSON.stringify(resp_data))

    if (resp_data != undefined) {
        formModel.delvaddr = resp_data.delvaddr
        formModel.lnkman = resp_data.lnkman
        formModel.lnkphone = resp_data.lnkphone
    }
}
