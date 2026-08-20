<template>
    <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="getTitle" :width="1000" @ok="handleSubmit"
        :showFooter="showFooter" destroyOnClose>
        <a-row>
            <a-col :span="14">
                <BasicForm @register="registerForm" />
            </a-col>
            <a-col :span="10">
                <p class="data">数据权限</p>
                <p class="data-tip">公司级权限和猪场级权限相互独立，分别用于不同的权限控制，请按需分别勾选。</p>
                <a-tree :checkable="true" :check-strictly="true" :tree-data="treeData" :auto-expand-parent="true"
                    :checked-keys="strictCheckedKeys" @check="handleCheck">
                    <template #title="node">
                        <span>{{ node.title }}</span>
                        <span v-if="getCheckedCount(node.key) > 0" class="checked-count">
                            已选 {{ getCheckedCount(node.key) }}
                        </span>
                        <a-button v-if="isLeafParent(node.key)" size="small" class="check-all"
                            @click.stop="toggleBranch(node.key)">
                            {{ isBranchAllChecked(node.key) ? '取消全选' : '全选' }}
                        </a-button>
                    </template>
                </a-tree>
            </a-col>
        </a-row>
    </BasicDrawer>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, unref, useAttrs, onMounted, watch } from 'vue'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './user.data'
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'
import { saveOrUpdateUser, getUserRoles, getUserDepartList } from './user.api'
import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth'
import { defHttp } from '/@/utils/http/axios'

// 声明Emits
const emit = defineEmits(['success', 'register'])
const attrs = useAttrs()
const isUpdate = ref(true)
const rowId = ref('')
const departOptions = ref([])
const treeData = ref([])
const checkedKeys = ref<string[]>() // 数据权限

//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 90,
    schemas: formSchema,
    showActionButtonGroup: false
})
// TODO [VUEN-527] https://www.teambition.com/task/6239beb894b358003fe93626
const showFooter = ref(true)
//表单赋值
const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // 打开抽屉时刷新部门树
    const treeRes = await defHttp.get({ url: '/xmsale/baseapi/findsaleOrgTree' })
    treeData.value = treeRes || []

    // 组合成数组,数据权限赋值（不联动，勾选状态与保存值一一对应）
    checkedKeys.value = data?.record?.dataAuth ? data.record.dataAuth.split(',') : []

    await resetFields()
    showFooter.value = data?.showFooter ?? true
    setDrawerProps({ confirmLoading: false, showFooter: showFooter.value })
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
        rowId.value = data.record.id
        //租户信息定义成数组
        if (data.record.relTenantIds && !Array.isArray(data.record.relTenantIds)) {
            data.record.relTenantIds = data.record.relTenantIds.split(',')
        } else {
            //【issues/I56C5I】用户管理中连续点两次编辑租户配置就丢失了
            //data.record.relTenantIds = [];
        }

        //查角色/赋值/try catch 处理，不然编辑有问题
        try {
            const userRoles = await getUserRoles({ userid: data.record.id })
            if (userRoles && userRoles.length > 0) {
                data.record.selectedroles = userRoles
            }
        } catch (error) { }

        //查所属部门/赋值
        const userDepart = await getUserDepartList({ userId: data.record.id })
        if (userDepart && userDepart.length > 0) {
            data.record.selecteddeparts = userDepart
            let selectDepartKeys = Array.from(userDepart, ({ key }) => key)
            data.record.selecteddeparts = selectDepartKeys.join(',')
            departOptions.value = userDepart.map((item) => {
                return { label: item.title, value: item.key }
            })
        }
        //负责部门/赋值
        data.record.departIds && !Array.isArray(data.record.departIds) && (data.record.departIds = data.record.departIds.split(','))
        //update-begin---author:zyf   Date:20211210  for：避免空值显示异常------------
        data.record.departIds = data.record.departIds == '' ? [] : data.record.departIds
        //update-begin---author:zyf   Date:20211210  for：避免空值显示异常------------
    }
    //处理角色用户列表情况(和角色列表有关系)
    data.selectedroles && (await setFieldsValue({ selectedroles: data.selectedroles }))
    //编辑时隐藏密码/角色列表隐藏角色信息/我的部门时隐藏所属部门
    updateSchema([
        {
            field: 'password',
            show: !unref(isUpdate)
        },
        {
            field: 'confirmPassword',
            ifShow: !unref(isUpdate)
        },
        {
            field: 'selectedroles',
            show: !data.isRole
        },
        {
            field: 'departIds',
            componentProps: { options: departOptions }
        },
        {
            field: 'selecteddeparts',
            show: !data?.departDisabled ?? false
        }
    ])
    // 无论新增还是编辑，都可以设置表单值
    if (typeof data.record === 'object') {
        setFieldsValue({
            ...data.record
        })
    }
    // 隐藏底部时禁用整个表单
    //update-begin-author:taoyan date:2022-5-24 for: VUEN-1117【issue】0523周开源问题
    setProps({ disabled: !showFooter.value })
    //update-end-author:taoyan date:2022-5-24 for: VUEN-1117【issue】0523周开源问题
})
//获取标题
const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'))
const { adaptiveWidth } = useDrawerAdaptiveWidth()

type TreeNode = {
    key?: string
    children?: TreeNode[]
    [key: string]: unknown
}

// 统计每个父节点「下级已勾选的数量」，仅用于标题旁提示，不影响勾选与提交
// 返回值为这批节点（含其后代）的已勾选总数
const collectCheckedCount = (nodes: TreeNode[] = [], checkedSet: Set<string>, map: Map<string, number>): number => {
    let total = 0
    nodes.forEach((node) => {
        const key = node.key != null ? String(node.key) : null
        const children = Array.isArray(node.children) ? node.children : []
        const childCount = children.length > 0 ? collectCheckedCount(children, checkedSet, map) : 0
        if (key != null && children.length > 0) {
            map.set(key, childCount)
        }
        total += childCount + (key != null && checkedSet.has(key) ? 1 : 0)
    })
    return total
}

const checkedCountMap = computed(() => {
    const map = new Map<string, number>()
    collectCheckedCount(treeData.value, new Set(checkedKeys.value ?? []), map)
    return map
})

const getCheckedCount = (key: unknown) => (key == null ? 0 : (checkedCountMap.value.get(String(key)) ?? 0))

// key -> 节点 的索引，供全选按钮按分支取后代
const nodeMap = computed(() => {
    const map = new Map<string, TreeNode>()
    const walk = (nodes: TreeNode[] = []) => {
        nodes.forEach((node) => {
            if (node.key != null) {
                map.set(String(node.key), node)
            }
            if (Array.isArray(node.children)) {
                walk(node.children)
            }
        })
    }
    walk(treeData.value)
    return map
})

// 仅最末一级父节点（其子节点都是叶子）显示全选按钮
const isLeafParent = (key: unknown) => {
    const node = key == null ? null : nodeMap.value.get(String(key))
    const children = node && Array.isArray(node.children) ? node.children : []
    return children.length > 0 && children.every((child) => !Array.isArray(child.children) || child.children.length === 0)
}

// 取该节点全部后代的 key（不含自身，全选不改变父节点自己的勾选状态）
const getBranchKeys = (key: unknown): string[] => {
    const node = key == null ? null : nodeMap.value.get(String(key))
    if (!node) {
        return []
    }
    const keys: string[] = []
    const walk = (items: TreeNode[] = []) => {
        items.forEach((item) => {
            if (item.key != null) {
                keys.push(String(item.key))
            }
            if (Array.isArray(item.children)) {
                walk(item.children)
            }
        })
    }
    walk(Array.isArray(node.children) ? node.children : [])
    return keys
}

// 子节点是否已全部勾选
const isBranchAllChecked = (key: unknown) => {
    const keys = getBranchKeys(key)
    if (keys.length === 0) {
        return false
    }
    const checkedSet = new Set(checkedKeys.value ?? [])
    return keys.every((item) => checkedSet.has(item))
}

// 全选 / 取消全选所有子节点（checkStrictly 模式下需手动维护子节点勾选状态）
const toggleBranch = (key: unknown) => {
    const keys = getBranchKeys(key)
    if (keys.length === 0) {
        return
    }
    const checkedSet = new Set(checkedKeys.value ?? [])
    const allChecked = keys.every((item) => checkedSet.has(item))
    keys.forEach((item) => (allChecked ? checkedSet.delete(item) : checkedSet.add(item)))
    checkedKeys.value = Array.from(checkedSet)
}

// checkStrictly 模式下 checkedKeys 需传 { checked, halfChecked } 形式
const strictCheckedKeys = computed(() => ({ checked: checkedKeys.value ?? [], halfChecked: [] }))

// 同样地，@check 回传的也是 { checked, halfChecked }，统一成字符串数组
const handleCheck = (keys: any) => {
    const checked = Array.isArray(keys) ? keys : (keys?.checked ?? [])
    checkedKeys.value = checked.map((key: string | number) => String(key))
}

// checkedKeys用,拼接成字符串：勾选哪些节点就提交哪些，不额外补父节点
const sumCheckedKeys = computed(() => {
    return (checkedKeys.value ?? []).join(',')
})

//提交事件
async function handleSubmit() {
    try {
        let values = await validate()
        setDrawerProps({ confirmLoading: true })
        values.userIdentity === 1 && (values.departIds = '')

        //提交表单
        await saveOrUpdateUser({ ...values, dataAuth: sumCheckedKeys.value }, unref(isUpdate))

        //关闭弹窗
        closeDrawer()

        //刷新列表
        emit('success')
    } finally {
        setDrawerProps({ confirmLoading: false })
    }
}

onMounted(() => {
    // 获取部门树
    defHttp.get({ url: '/xmsale/baseapi/findsaleOrgTree' }).then((res) => {
        treeData.value = res || []
    })
})
</script>

<style lang="less" scoped>
.data::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
}

.data-tip {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    line-height: 18px;
}

.checked-count {
    margin-left: 6px;
    padding: 0 6px;
    color: #1890ff;
    font-size: 12px;
    background: #e6f7ff;
    border-radius: 8px;
}

.check-all {
    height: 20px;
    margin-left: 8px;
    padding: 0 8px;
    font-size: 12px;
    line-height: 18px;
}
</style>
