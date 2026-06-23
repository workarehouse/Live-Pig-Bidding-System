import { h } from 'vue'
import { BasicColumn } from '/@/components/Table'
import { FormSchema } from '/@/components/Table'
import Icon from '/@/components/Icon'

const formatNodeTimeParts = (text) => {
    if (!text) {
        return {
            dateText: '',
            timeText: ''
        }
    }
    const value = String(text).trim().replace('T', ' ').replace(/\s+/g, ' ')
    const [datePart = '', timePart = ''] = value.split(' ')
    const dateText = datePart.length >= 10 ? datePart.substr(5, 5) : datePart
    const timeText = timePart.length >= 5 ? timePart.substr(0, 5) : timePart
    return {
        dateText,
        timeText
    }
}

const getTimeoutMinutes = (value) => {
    const minutes = Number(value)
    return Number.isFinite(minutes) && minutes > 0 ? minutes : undefined
}

const timeoutDurationFields = ['reclamdatDur', 'bsaldatDur', 'codsmtimDur', 'lastreclamdatDur', 'issudatDur', 'wdelvdatDur', 'delvdatDur']

const renderTimeoutMinutes = (minutes) => {
    return h(
        'div',
        {
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#262626',
                lineHeight: '18px',
                whiteSpace: 'nowrap'
            }
        },
        [
            h(Icon, {
                icon: 'ant-design:clock-circle-outlined',
                size: 14,
                style: {
                    marginRight: '4px'
                }
            }),
            h('span', `${minutes}分钟`)
        ]
    )
}

const renderTotalTimeout = (record) => {
    const hasDurationValue = timeoutDurationFields.some(
        (field) => record?.[field] !== undefined && record?.[field] !== null && record?.[field] !== ''
    )
    if (!hasDurationValue) {
        return ''
    }

    const totalMinutes = timeoutDurationFields.reduce((sum, field) => {
        const minutes = Number(record?.[field])
        return Number.isFinite(minutes) && minutes > 0 ? sum + minutes : sum
    }, 0)

    return renderTimeoutMinutes(totalMinutes)
}

const renderNodeTime = (text, record, durationField: string) => {
    const { dateText, timeText } = formatNodeTimeParts(text)
    const timeoutMinutes = getTimeoutMinutes(record?.[durationField])
    if (!dateText && !timeText && !timeoutMinutes) {
        return ''
    }

    const children: any[] = []
    const nodeTimeText = [dateText, timeText].filter(Boolean).join(' ')
    if (nodeTimeText) {
        children.push(
            h(
                'div',
                {
                    style: {
                        whiteSpace: 'nowrap'
                    }
                },
                nodeTimeText
            )
        )
    }
    if (timeoutMinutes) {
        children.push(h('div', { style: { marginTop: '2px' } }, [renderTimeoutMinutes(timeoutMinutes)]))
    }

    return h(
        'div',
        {
            style: {
                lineHeight: '18px',
                textAlign: 'center'
            }
        },
        children
    )
}
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '订单编号',
        align: 'center',
        dataIndex: 'ordno'
    },
    {
        title: '销售日期',
        align: 'center',
        dataIndex: 'saldat'
    },
    // {
    //     title: '编码',
    //     align: 'center',
    //     dataIndex: 'farmcod'
    // },
    // {
    //     title: '名称',
    //     align: 'center',
    //     dataIndex: 'farmnam'
    // },
    {
        title: '销售员',
        align: 'center',
        dataIndex: 'lnkman'
    },
    {
        title: '开票员',
        align: 'center',
        dataIndex: 'farmchck'
    },
    {
        title: '财务',
        align: 'center',
        dataIndex: 'farmfin'
    },
    {
        title: '场长',
        align: 'center',
        dataIndex: 'farmmgr'
    },
    {
        title: '收款确认(财务)',
        align: 'center',
        dataIndex: 'repushdat'
    },
    {
        title: '收款领用(销售员)',
        align: 'center',
        dataIndex: 'reclamdat',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'reclamdatDur')
    },
    // {
    //     title: 'reclamdatDur',
    //     align: 'center',
    //     dataIndex: 'reclamdatDur'
    // },
    {
        title: '售前准备（场长）',
        align: 'center',
        dataIndex: 'bsaldat',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'bsaldatDur')
    },
    // {
    //     title: 'bsaldatDur',
    //     align: 'center',
    //     dataIndex: 'bsaldatDur'
    // },
    {
        title: '码单提交（开票员）',
        align: 'center',
        dataIndex: 'codsmtim',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'codsmtimDur')
    },
    // {
    //     title: 'codsmtimDur',
    //     align: 'center',
    //     dataIndex: 'codsmtimDur'
    // },
    {
        title: '订单足额收款(销售员)',
        align: 'center',
        width: 180,
        dataIndex: 'lastreclamdat',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'lastreclamdatDur')
    },
    // {
    //     title: 'lastreclamdatDur',
    //     align: 'center',
    //     dataIndex: 'lastreclamdatDur'
    // },
    {
        title: '折减审批(销售员)',
        align: 'center',
        dataIndex: 'issudat',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'issudatDur')
    },
    {
        title: '订单交割(开票 + 销售)',
        width: 180,
        align: 'center',
        dataIndex: 'wdelvdat',
        customRender: ({ text, record }) => renderNodeTime(text, record, 'wdelvdatDur')
    },
    // {
    //     title: 'wdelvdatDur',
    //     align: 'center',
    //     dataIndex: 'wdelvdatDur'
    // },

    // {
    //     title: 'issudatDur',
    //     align: 'center',
    //     dataIndex: 'issudatDur'
    // },
    {
        title: '累计超时',
        align: 'center',
        dataIndex: 'totalTimeoutDur',
        customRender: ({ record }) => renderTotalTimeout(record)
    }
    // {
    //     title: 'delvdatDur',
    //     align: 'center',
    //     dataIndex: 'delvdatDur'
    // }
]

//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '单号',
        field: 'ordno',
        component: 'Input',
        colProps: { span: 6 }
    },
    {
        label: '销售日期',
        field: 'saldat',
        component: 'RangePicker',
        colProps: { span: 6 }
    },
    {
        label: '编码',
        field: 'farmcod',
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
        dynamicRules: () => {
            return [{ required: true, message: '请输入单号!' }]
        }
    },
    {
        label: '销售日期',
        field: 'saldat',
        component: 'DatePicker'
    },
    {
        label: '编码',
        field: 'farmcod',
        component: 'Input'
    },
    {
        label: '名称',
        field: 'farmnam',
        component: 'Input'
    },
    {
        label: '销售业务',
        field: 'lnkman',
        component: 'Input'
    },
    {
        label: '猪场财务人员',
        field: 'farmfin',
        component: 'Input'
    },
    {
        label: '猪场开票员',
        field: 'farmchck',
        component: 'Input'
    },
    {
        label: '猪场厂长',
        field: 'farmmgr',
        component: 'Input'
    },
    {
        label: '收款单推送时间',
        field: 'repushdat',
        component: 'DatePicker'
    },
    {
        label: '收款单领用【第一次】',
        field: 'reclamdat',
        component: 'DatePicker'
    },
    {
        label: 'reclamdatDur',
        field: 'reclamdatDur',
        component: 'InputNumber'
    },
    {
        label: '售前完成时间',
        field: 'bsaldat',
        component: 'DatePicker'
    },
    {
        label: 'bsaldatDur',
        field: 'bsaldatDur',
        component: 'InputNumber'
    },
    {
        label: '最后一张码单',
        field: 'codsmtim',
        component: 'DatePicker'
    },
    {
        label: 'codsmtimDur',
        field: 'codsmtimDur',
        component: 'InputNumber'
    },
    {
        label: '足额收款最后一次领款',
        field: 'lastreclamdat',
        component: 'DatePicker'
    },
    {
        label: 'lastreclamdatDur',
        field: 'lastreclamdatDur',
        component: 'InputNumber'
    },
    {
        label: '订单可交割',
        field: 'wdelvdat',
        component: 'DatePicker'
    },
    {
        label: 'wdelvdatDur',
        field: 'wdelvdatDur',
        component: 'InputNumber'
    },
    {
        label: '现场折扣【折减审批】时间',
        field: 'issudat',
        component: 'DatePicker'
    },
    {
        label: 'issudatDur',
        field: 'issudatDur',
        component: 'InputNumber'
    },
    {
        label: '订单已交割时间',
        field: 'delvdat',
        component: 'DatePicker'
    },
    {
        label: 'delvdatDur',
        field: 'delvdatDur',
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
