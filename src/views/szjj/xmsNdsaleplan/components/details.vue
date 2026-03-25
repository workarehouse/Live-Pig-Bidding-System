<template>
    <a-card>
        <a-descriptions>
            <a-descriptions-item label="区域">{{ areanam }}</a-descriptions-item>
            <a-descriptions-item label="计划销售日期">{{ saledat }}</a-descriptions-item>
        </a-descriptions>
    </a-card>

    <a-card style="margin-top: 10px">
        <div class="box">
            <div style="padding-bottom: 20px; font-weight: bold">次日销售计划</div>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <div>
            <a-table :columns="columns" :data-source="dts" bordered :pagination="false"> </a-table>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { defHttp } from '/@/utils/http/axios'
import { useRoute } from 'vue-router'
//import { getExportUrl } from '../XmsNdoutplanSum.api'
import { useMethods } from '/@/hooks/system/useMethods';
const { handleExportXls, } = useMethods();

const areanam = ref('')
const saledat = ref('')
const dts = ref([])
const route = useRoute()

const columns = [
    {
        title: '猪场',
        dataIndex: 'farmnam',
        width: '10%'
    },
    {
        title: '计划体重阶段',
        dataIndex: 'fldtxt',
        width: '9%'
    },
    {
        title: '昨日填报数(三元)',
        dataIndex: 'ydplanqty3',
        width: '8%'
    },
    {
        title: '昨日填报接单数(三元)',
        dataIndex: 'ydorder3',
        width: '11%'
    },
    {
        title: '计划头数(三元)',
        dataIndex: 'planqty3',
        width: '8%'
    },
    {
        title: '昨日填报数(二元)',
        dataIndex: 'ydplanqty2',
        width: '8%'
    },
    {
        title: '昨日填报接单数(二元)',
        dataIndex: 'ydorder2',
        width: '11%'
    },
    {
        title: '计划头数(二元)',
        dataIndex: 'planqty2',
        width: '8%'
    },
    {
        title: '调整体重阶段',
        dataIndex: 'adjfldtxt',
        width: '9%'
    },
    {
        title: '调整销售头数(三元)',
        dataIndex: 'adjqty3',
        width: '10%'
    },
    {
        title: '调整销售头数(二元)',
        dataIndex: 'adjqty2',
        width: '10%'
    },
    // {
    //     title: '备注',
    //     dataIndex: 'msg',
    //     width: '15%'
    // }
]

const getDetail = () => {
    defHttp.get({ url: '/xmsale/xmsNdsaleplan/queryById', params: { id: route.query.id } }).then((res) => {
        console.log('getDetail', res)
        areanam.value = res?.[0].areanam
        saledat.value = res?.[0].saledat
        dts.value = res
    })
}

const onExportXls = () => {
    handleExportXls('次日销售计划', '/xmsale/xmsNdsaleplan/exportXls', { bindid: route.query.id })
}

onMounted(async () => {
    await getDetail()
})
</script>

<style lang="less" scoped>
.box {
    display: flex;
    justify-content: space-between;
}
</style>
