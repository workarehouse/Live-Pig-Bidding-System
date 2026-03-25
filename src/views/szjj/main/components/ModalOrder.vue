<template>
    <BasicModal
        v-bind="$attrs"
        @register="register"
        title="订单信息"
        @visible-change="handleVisibleChange"
        :width="1000"
        :height="500"
        cancelText="关闭"
        :centered="false"
        @ok="saveData"
        :show-ok-btn="saveflg"
    >
        <Description title="猪源信息" :collapseOptions="{ canExpand: false }" :column="2" :data="mainData" :schema="schema_desc" :width="850" />

        <!--<a-button type="primary" @click="closeModal" class="mr-2"> 从内部关闭弹窗 </a-button>
    <a-button type="primary" @click="setModalProps"> 从内部修改title </a-button>-->

        <Description
            title="竞价概况"
            :collapseOptions="{ canExpand: false }"
            :column="2"
            :data="bidData"
            :schema="schema_bid"
            :width="850"
            v-if="bidData.price"
        />

        <BasicTable @register="registerOrdTable" @edit-change="saveRowData">
            <template #toolbar>
                <a-row style="width: 80%" align="middle">
                    <a-col :span="12">
                        <a-row align="middle">
                            <a-col :span="6"><span class="statistic-title">合计头数 </span></a-col>
                            <a-col :span="18">
                                <Statistic :value="totalNum" />
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="12">
                        <a-row align="middle">
                            <a-col :span="6"><span class="statistic-title">合计金额 </span></a-col>
                            <a-col :span="18">
                                <Statistic :precision="2" :value="totalAmount" />
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </template>
        </BasicTable>
    </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'

import { Description, DescItem, useDescription } from '/@/components/Description/index'
import { getallotinfo, saveAllotInfo } from '../SzjjBusiMain.api'
import { BasicTable, useTable, BasicColumn } from '/@/components/Table'
import { Console } from 'console'
import { mapTableTotalSummary } from '/@/utils/common/compUtils'
import { Statistic } from 'ant-design-vue'

const saveflg = ref(true)
// Emits声明
// const emit = defineEmits(['register','success']);
const schema_desc: DescItem[] = [
    {
        field: 'farmerName',
        label: '猪场'
    },
    {
        field: 'pignam',
        label: '品种',
        render: (curVal, data) => {
            return `${curVal}`
        }
    },
    {
        field: 'pigcnt',
        label: '数量'
    },
    {
        field: 'avgwgt',
        label: '均重'
    },
    {
        field: 'beginPrice',
        label: '底价'
    },
    {
        field: 'incprice',
        label: '加价幅度'
    },
    {
        field: 'beginDatetime',
        label: '竞拍时间',
        render: (curVal, data) => {
            //return `${data.beginDatetime}~${data.endDatetime?"":data.endDatetime.substring(0, 10)}`;
            if (!data.beginDatetime || !data.endDatetime) return ''
            else {
                return data.beginDatetime + '~' + data.endDatetime.substring(11, 16)
            }
        }
    },
    {
        field: 'createTime',
        label: '发布时间'
    }
]
const schema_bid: DescItem[] = [
    {
        field: 'price',
        label: '最高出价'
    },
    {
        field: 'cnt',
        label: '参拍客户',
        render(val, data) {
            return val + ' 家'
        }
    }
]

const ordTableSchema: BasicColumn[] = [
    {
        title: '排名',
        width: 50,
        dataIndex: 'bidord',
        align: 'center'
    },
    {
        title: '客户名称',
        width: 100,
        dataIndex: 'bidusrnam',
        align: 'left'
    },
    {
        title: '出价时间',
        width: 80,
        dataIndex: 'credat',
        align: 'center',
        customRender: ({ record }) => {
            let str = record.credat
            return str ? str.split(' ')[1] : ''
        }
    },
    {
        title: '出价',
        width: 80,
        dataIndex: 'bidprice',
        align: 'right'
    },
    {
        title: '出价数量',
        width: 80,
        dataIndex: 'bidpigcnt',
        align: 'right'
    },
    {
        title: '分配头数',
        width: 150,
        dataIndex: 'pigcnt',
        align: 'center',
        editRule: true,
        editComponent: 'InputNumber',
        editComponentProps: { precision: 0, placeholder: '生猪头数' },
        edit: saveflg,
        editable: saveflg
    },
    {
        title: '分配说明',
        width: 200,
        dataIndex: 'msg',
        editComponentProps: { placeholder: '分配说明' },
        align: 'center',
        edit: saveflg,
        editable: saveflg
    },
    {
        title: '客户需求',
        width: 350,
        dataIndex: 'custreq',
        editComponentProps: { placeholder: '客户需求' },
        align: 'center',
        edit: saveflg,
        editable: saveflg
    }
    // {
    //     title: '小计',
    //     width: 80,
    //     dataIndex: 'amt',
    //     align: 'right'
    // }
]
export default defineComponent({
    components: { BasicModal, Description, BasicTable, Statistic },
    props: {
        userData: { type: Object }
    },
    setup(props) {
        let formData = ref({ auctid: 0, dts: [] })
        const mainData = ref({})
        const bidData = ref({})

        const [registerOrdTable, { updateTableDataRecord, setTableData }] = useTable({
            title: '订单分配',
            columns: ordTableSchema,
            pagination: false,
            dataSource: formData.value.dts,
            showIndexColumn: false,
            scroll: { y: 300 }
        })

        const [register, { setModalProps, closeModal }] = useModalInner((data) => {
            data && onDataReceive(data)
        })

        async function onDataReceive(data) {
            console.log('表格数据', data)

            const resp_data = await getallotinfo({ id: data.record.id }, null)
            console.log('分配数据', resp_data)

            mainData.value = resp_data
            formData.value.auctid = data.record.id
            formData.value.dts = resp_data.dtlst
            saveflg.value = resp_data.state != 'Y'

            if (resp_data.bestBid) {
                bidData.value = { price: resp_data.bestBid.price, cnt: resp_data.dtlst ? resp_data.dtlst.length : 0 }
            } else {
                bidData.value = {}
            }

            setTableData(resp_data.dtlst)
        }

        function handleVisibleChange(v) {
            v && props.userData && nextTick(() => onDataReceive(props.userData))
        }
        async function saveData() {
            console.log('*********************************')
            console.log(1, formData.value)

            const resp_data = await saveAllotInfo(formData.value, null)

            //关闭弹窗
            closeModal()
        }

        function saveRowData({ column, value, record }) {
            const amt = column.dataIndex == 'pigcnt' ? Number((record.bidprice * value).toFixed(2)) : record.amt

            console.log('saveRowData', amt)

            let newCol = { ...record, amt, [column.dataIndex]: value }
            // 价格计算, 避免精度缺失
            updateTableDataRecord(record.key, newCol)
            // 更新formData.dts
            formData.value.dts.forEach((item, index) => {
                if (item.bidid == record.bidid) {
                    formData.value.dts[index] = newCol
                }
            })
        }

        // 计算总金额
        let totalAmount = computed(() => {
            let total = 0
            formData.value.dts.forEach((item) => {
                total = total + item.bidprice * mainData.value.avgwgt * item.pigcnt
            })

            console.log('totalAmount', formData.value, total)

            return total
        })

        // 计算总头数
        let totalNum = computed(() => {
            let totalNum = 0
            formData.value.dts.forEach((item) => {
                totalNum += item.pigcnt
            })
            return totalNum
        })

        return {
            totalAmount,
            totalNum,
            register,
            handleVisibleChange,
            saveData,
            saveRowData,
            closeModal,
            saveflg,
            schema_desc,
            schema_bid,
            mainData,
            bidData,
            registerOrdTable,
            ordTableSchema
        }
    }
})
</script>

<style lang="less" scoped>
.statistic-title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}
</style>
