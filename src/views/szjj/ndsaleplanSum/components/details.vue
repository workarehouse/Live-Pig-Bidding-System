<template>
    <a-card>
        <a-descriptions>
            <a-descriptions-item label="流程日期">{{ info.sumtime }}</a-descriptions-item>
            <a-descriptions-item label="部门">{{ areanam }}</a-descriptions-item>
        </a-descriptions>
    </a-card>

    <a-card style="margin-top: 10px">
        <div class="box">
            <div style="padding-bottom: 20px; font-weight: bold">次日出栏计划汇总</div>
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
import { getExportUrl } from '../XmsNdoutplanSum.api'
import { useMethods } from '/@/hooks/system/useMethods';
const { handleExportXls, } = useMethods();

const areanam = ref('')
const info = ref({})
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
        width: '15%'
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
        width: '15%'
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
        width: '15%'
    },
    {
        title: '备注',
        dataIndex: 'msg',
        width: '15%'
    }
]

const getDetail = () => {
    defHttp.get({ url: '/xmsale/xmsNdoutplanSum/queryById', params: { id: route.query.id } }).then((res) => {
        console.log('getDetail', res)
        areanam.value = res.areanam
        info.value = res.info
        dts.value = res.dts
    })
}

const onExportXls = () => {
    handleExportXls('次日汇总计划', getExportUrl, { id: route.query.id })
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
