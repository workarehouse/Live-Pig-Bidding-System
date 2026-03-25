<template>
    <a-card>
        <div class="item-cell">
            <div class="title">猪场:</div>
            <a-select
                v-model:value="pigFarmId"
                :options="pigFarmOptions"
                show-search
                placeholder="请选择猪场"
                class="right-box"
                @change="handleChangeForm"
                :disabled="disabled || route.query.id"
            >
            </a-select>
        </div>

        <a-form layout="inline" :model="form" :label-col="{ style: { width: '120px' } }" :wrapper-col="{ span: 14 }" style="padding-top: 20px">
            <a-form-item label="本周出栏计划头数">
                <a-input v-model:value="form.wkplan" :disabled="disabled" />
            </a-form-item>
            <a-form-item label="本周已出栏头数">
                <a-input v-model:value="form.wkqty" :disabled="disabled" />
            </a-form-item>
            <a-form-item label="待出栏计划数">
                <a-input v-model:value="form.awqty" :disabled="disabled" />
            </a-form-item>
        </a-form>
    </a-card>

    <a-card style="margin-top: 10px">
        <div style="padding-bottom: 20px; font-weight: bold">次日出栏计划</div>
        <div>
            <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
                <template v-for="col in ['planqty3', 'planqty2', 'msg']" #[col]="{ text, record }" :key="col">
                    <div>
                        <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][col]" style="margin: -5px 0" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
            </a-table>
        </div>

        <div v-if="!disabled" style="padding-top: 20px; text-align: right">
            <a-button @click="onSubmit({ state: 'C' })">暂存</a-button>
            <a-button type="primary" @click="onSubmit({ state: 'Y' })" style="margin-left: 20px">提交</a-button>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { defHttp } from '/@/utils/http/axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const pigFarmId = ref('')
const columns = [
    {
        title: '品名',
        dataIndex: 'name',
        width: '20%',
        slots: { customRender: 'name' }
    },
    {
        title: '昨日填报数(三元)',
        dataIndex: 'ydplanqty3',
        width: '8%',
        slots: { customRender: 'ydplanqty3' }
    },
    {
        title: '昨日填报接单数(三元)',
        dataIndex: 'ydorder3',
        width: '11%',
        slots: { customRender: 'ydorder3' }
    },
    {
        title: '计划出栏头数(三元)',
        dataIndex: 'planqty3',
        width: '15%',
        slots: { customRender: 'planqty3' }
    },
    {
        title: '昨日填报数(二元)',
        dataIndex: 'ydplanqty2',
        width: '8%',
        slots: { customRender: 'ydplanqty2' }
    },
    {
        title: '昨日填报接单数(二元)',
        dataIndex: 'ydorder2',
        width: '11%',
        slots: { customRender: 'ydorder2' }
    },
    {
        title: '计划出栏头数(二元)',
        dataIndex: 'planqty2',
        width: '15%',
        slots: { customRender: 'planqty2' }
    },
    {
        title: '备注',
        dataIndex: 'msg',
        width: '30%',
        slots: { customRender: 'msg' }
    }
    // {
    //     title: '',
    //     dataIndex: 'operation',
    //     slots: { customRender: 'operation' }
    // }
]
const pigFarmOptions = ref([])
const dataSource = ref([])
const editableData = reactive({})
const form = ref({ wkplan: '', wkqty: '', awqty: '' })

console.log(route.query)

const disabled = computed(() => {
    return route.query.disabled === 'disabled'
})

const handleChangeForm = () => {
    // 重置form表单
    resetData()
    getpritpl()
}

/**
 * 重置表格数据
 */
const resetData = () => {
    form.value = { wkplan: '', wkqty: '', awqty: '' }
}

const save = (key: string) => {
    Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
    delete editableData[key]
}

/**
 * 获取区域模板
 */
const getpritpl = () => {
    console.log('pigFarmId', pigFarmId.value)

    defHttp.get({ url: '/xmsale/xmsPritpl/v2/getpritplbyfarmerid', params: { farmid: pigFarmId.value } }).then((res) => {
        // 根据模板生成表格数据
        dataSource.value = res.map((item: any, index: number) => {
            const key = index.toString()
            const data = {
                key: key,
                pritplid: item.tplid,
                name: item.wgtstgtxt,
                planqty3: 0,
                planqty2: 0,
                ydplanqty3: item.ydplanqty3,
                ydplanqty2: item.ydplanqty2,
                ydorder3: item.ydorder3,
                ydorder2: item.ydorder2,
                msg: ''
            }
            // 设置editableData，使得每一行都是可编辑的
            editableData[key] = cloneDeep(data)
            return data
        })
    })
}

/**
 *当前账号的区域权限,猪场权限
 */
const findsaleareasbylogin = () => {
    defHttp.post({ url: '/xmsale/baseapi/findsaleareasbylogin' }).then((res) => {
        console.log('findsaleareasbylogin', res)
    })
}

/**
 * 当前账号的区域权限,猪场权限
 */
const findfarmersbylogin = () => {
    return defHttp.post({ url: '/xmsale/baseapi/findfarmersbylogin' }).then((res) => {
        console.log('findfarmersbylogin', res)
        pigFarmOptions.value = res.map((item: any) => {
            return { label: item.farmnam, value: item.farmid }
        })

        // 设置默认值
        if (pigFarmOptions.value.length > 0 && !pigFarmId.value) {
            pigFarmId.value = pigFarmOptions.value[0].value
        }
    })
}

const getTomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 2)
    const yyyy = tomorrow.getFullYear()
    let mm = tomorrow.getMonth() + 1 // getMonth() 返回0-11，代表1-12月
    let dd = tomorrow.getDate()

    // 如果月份或日期小于10，前面添加一个'0'使其变成两位数
    if (mm < 10) {
        mm = '0' + mm
    }

    if (dd < 10) {
        dd = '0' + dd
    }

    return `${yyyy}-${mm}-${dd}`
}

const onSubmit = async (params) => {
    const url = route.query.id ? '/xmsale/xmsNdoutplan/edit' : '/xmsale/xmsNdoutplan/add'

    // 保存所有正在编辑的数据
    for (const key in editableData) {
        const targetItem = dataSource.value.filter((item) => key === item.key)[0]
        if (targetItem) {
            Object.assign(targetItem, editableData[key])
        } else {
            console.error(`Cannot save: targetItem for key ${key} is undefined or null`)
        }
    }

    let newForm
    if (route.query.id) {
        newForm = { ...form.value, farmid: pigFarmId.value, ...params }
    } else {
        newForm = { ...form.value, farmid: pigFarmId.value, outdat: getTomorrowDate(), ...params }
    }

    await defHttp.post({ url, params: { dts: dataSource.value, info: newForm } })

    // 返回
    history.back()
}

const getDetail = () => {
    defHttp.get({ url: '/xmsale/xmsNdoutplan/queryById', params: { id: route.query.id } }).then((res) => {
        console.log('getDetail', res)
        form.value = res.info
        pigFarmId.value = res.info.farmid
        dataSource.value = res.dts.map((item: any, index: number) => {
            const data = {
                key: index.toString(),
                pritplid: item.pritplid,
                name: item.fldtxt,
                planqty3: item.planqty3,
                planqty2: item.planqty2,
                ydplanqty3: item.ydplanqty3,
                ydplanqty2: item.ydplanqty2,
                ydorder3: item.ydorder3,
                ydorder2: item.ydorder2,
                msg: item.msg
            }

            if (!disabled.value) {
                editableData[index.toString()] = cloneDeep(data)
            }

            return data
        })
    })
}

onMounted(async () => {
    await findsaleareasbylogin()
    await findfarmersbylogin()

    if (route.query.id) {
        await getDetail()
    } else {
        await getpritpl()
    }
})
</script>

<style lang="less" scoped>
.item-cell {
    display: flex;
    align-items: center;

    .title {
        font-size: 16px;
        margin-right: 20px;
    }

    .right-box {
        width: 150px;
    }
}

.editable-row-operations a {
    margin-right: 8px;
}
</style>
