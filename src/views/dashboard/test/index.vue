<template>
    <div id="test">
        <div>测试</div>
        <a-button type="primary">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>

        <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                    <span>
                        <smile-outlined />
                        Name
                    </span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>
                        {{ record.name }}
                    </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>Invite 一 {{ record.name }}</a>
                        <a-divider type="vertical" />
                        <a>Delete</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            More actions
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>

    <a-button @click="takeScreenshot">截图</a-button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'

const screenshot = ref(null)

const takeScreenshot = () => {
    html2canvas(screenshot.value)
        .then((canvas) => {
            // 这里的 canvas 就是截图
            // 您可以将其添加到文档中，或者转换为图片 URL
            document.body.appendChild(canvas)
        })
        .catch((e) => {
            console.log(e)
        })
}

onMounted(() => {
    screenshot.value = document.getElementById('test')
})

import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
const columns = [
    {
        name: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags'
    },
    {
        title: 'Action',
        key: 'action'
    }
]

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
]
</script>

<style lang="less" scoped></style>
