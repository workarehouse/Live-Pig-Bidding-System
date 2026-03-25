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

        <BasicTable @register="registerOrdTable" @edit-change="saveRowData" />
    </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'

import { Description, DescItem, useDescription } from '/@/components/Description/index'
import { getallotinfo, saveAllotInfo } from '../SzjjBusiMain.api'
import { BasicTable, useTable, BasicColumn } from '/@/components/Table'
import { Console } from 'console'

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
            return str.substring(11, 16)
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
        width: 100,
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
    //     title: '小计1',
    //     width: 80,
    //     dataIndex: 'amt',
    //     align: 'right'
    // }
]
var formData = { auctid: 0, dts: [] }
export default defineComponent({
    components: { BasicModal, Description, BasicTable },
    props: {
        userData: { type: Object }
    },
    setup(props) {
        const mainData = ref({})
        const bidData = ref({})
        const ordTableData = ref([])

        const [registerOrdTable] = useTable({
            title: '订单分配',
            columns: ordTableSchema,
            pagination: false,
            dataSource: ordTableData,
            showIndexColumn: false,
            scroll: { y: 300 }
        })

        const [register, { setModalProps, closeModal }] = useModalInner((data) => {
            data && onDataReceive(data)
        })

        async function onDataReceive(data) {
            console.log('Data Received', data)

            const resp_data = await getallotinfo({ id: data.record.id }, null)
            console.log(JSON.stringify(resp_data))
            mainData.value = resp_data
            ordTableData.value = resp_data.dtlst
            formData.auctid = data.record.id
            formData.dts = resp_data.dtlst
            saveflg.value = resp_data.state != 'Y'

            if (resp_data.bestBid) {
                bidData.value = { price: resp_data.bestBid.price, cnt: resp_data.dtlst ? resp_data.dtlst.length : 0 }
            } else {
                bidData.value = {}
            }

            // 方式1;
            // setFieldsValue({
            //   field2: data.data,
            //   field1: data.info,
            // });

            // // 方式2
            //modelRef.value = { field2: resp_data.farmerName, field1: resp_data.pignam };

            // setProps({
            //   model:{ field2: data.data, field1: data.info }
            // })
        }

        function handleVisibleChange(v) {
            v && props.userData && nextTick(() => onDataReceive(props.userData))
        }
        async function saveData() {
            console.log('*********************************')
            console.log('-----formData----' + JSON.stringify(formData))

            const resp_data = await saveAllotInfo(formData, null)

            console.log('-----formData----' + JSON.stringify(resp_data))
            //关闭弹窗
            closeModal()
        }
        function saveRowData({ column, value, record }) {
            //修改表单数据
            for (var i = 0; i < formData.dts.length; i++) {
                let rowdata = formData.dts[i]

                if (record.id) {
                    // 按ID查
                    if (record.id == rowdata.id) {
                        rowdata[column.dataIndex] = value
                        break
                    }
                } else {
                    //按bidid查
                    if (record.bidid == rowdata.bidid) {
                        rowdata[column.dataIndex] = value
                        break
                    }
                }

                console.log('-------rowdata----' + rowdata)
            }

            if (column.dataIndex === 'pigcnt') {
                console.log('-------record----' + JSON.stringify(record))
                const {
                    editValueRefs: { amt, pigcnt }
                } = record
                amt.value = pigcnt.value * 100
            }

            /*if(column.dataIndex=='pigcnt'){
          record['pigcnt']=value;
        }
        if(column.dataIndex=='msg'){
          record['msg']=value;
        }*/

            console.log('-------record----' + JSON.stringify(record))
            console.log('-----------' + JSON.stringify(formData))
        }

        return {
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
            ordTableSchema,
            ordTableData
        }
    }
})
</script>
