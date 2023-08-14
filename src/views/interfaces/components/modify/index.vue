<script setup>
import { ref,reactive, onMounted } from 'vue'
import paramsTable from '../measure/params-table.vue'

const methods = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
]

const data = reactive({
  group: '默认',
  id: '2000001',
  name: '接口2',
  time: '2023:8:3:14.07',
  update_time: '2023:8:3:14.07',
  state: '开发中',
  method: 'GET',
  url: '/dog',
  summary: '接口摘要',
  description: '接口描述',
  tags: ['dog'],
  creator: '张三',
  updater: '李四',
  params: [
    {
      attr: 'name',
      type: 'string',
      isMust: '必须',
    },
    {
      attr: 'age',
      type: 'string',
      isMust: '必须',
    },
  ],
  example: "{\n''name':'string',\n'age':'string'\n}",
  response: {
    '200': {
      description: '成功',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              age: {
                type: 'string',
              },
            },
          },
        },
      },
    }
  },
  responseExample: "{\n''name':'string',\n'age':'string'\n}",
})

const method = ref(data.method)
const url = ref(data.url)

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: '成功(200)',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: '记录不存在(404)',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (
  targetName,
  action = 'remove' | 'add'
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

</script>

<template>
  <div class="modify">
    <div class="a">
      <el-select v-model="method" class="method">
        <el-option
          v-for="item in methods"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="url"
        class="url"
      />
      <el-button type="primary">保存</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <input type="text" class="summary" v-model="data.summary">
    <el-row>
      <el-col :span="4" class="b">
        <div class="label">状态</div>
        <el-select v-model="data.state">
          <el-option label="开发中" value="开发中" />
          <el-option label="已完成" value="已完成" />
          <el-option label="已废弃" value="已废弃" />
        </el-select>
      </el-col>
      <el-col :span="4" class="b">
        <div class="label">责任人</div>
        <el-select v-model="data.creator">
          <el-option label="张三" value="张三" />
          <el-option label="李四" value="李四" />
          <el-option label="王五" value="王五" />
        </el-select>
      </el-col>
      <el-col :span="4"  class="b" >
        <div class="label">标签</div>
        <el-select multiple v-model="data.tags">
          <el-option label="默认" value="默认" />
          <el-option label="dog" value="dog" />
          <el-option label="cat" value="cat" />
        </el-select>
      </el-col>
    </el-row>
    <div class="label">说明</div>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="data.description" style="width: 60%;"></el-input>
    <div style="margin-top: 1rem">请求参数</div>
    <el-tabs v-model="activeName" class="params-tabs" @tab-click="handleClick" >
      <el-tab-pane label="Params" name="params" >
        <params-table :measureParams="data.params" />
      </el-tab-pane>
      <el-tab-pane label="Body" name="body">body</el-tab-pane>
      <el-tab-pane label="Cookie" name="cookie">
        <params-table :measureParams="data.params" />
      </el-tab-pane>
      <el-tab-pane label="Header" name="header">
        <params-table :measureParams="data.params" />
      </el-tab-pane>
      <el-tab-pane label="前置操作" name="pre">前置操作</el-tab-pane>
      <el-tab-pane label="后置操作" name="post">后置操作</el-tab-pane>
    </el-tabs>
    <div class="label">返回响应</div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      class="demo-tabs"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <label style="margin-right: 2rem">HTTP状态码：<el-input v-model="item.title" style="width: 10rem;"></el-input></label>
        <label style="margin-right: 2rem">响应组件名称：<el-input v-model="item.title" style="width: 10rem;"></el-input></label>
        <label style="margin-right: 2rem">内容格式：
          <el-select>
            <el-option label="JSON" value="JSON" />
            <el-option label="HTML" value="HTML" />
            <el-option label="XML" value="XML" />
          </el-select>
        </label>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.modify {
  padding: 0 1rem;
  overflow: auto;
  .a {
    .method {
      width: 100px;
      background: rgb(248, 248, 248);
    }
    .url {
      width: 60%;
      height: 2rem;
      margin: 0 1rem;
    }
  }
  .summary {
    margin: 0.5rem 0;
    height: 2rem;
    width: 90%;
    font-size: 15px;
    outline: none;
    border: none;
  }
  .summary:focus {
    border-bottom: 1px solid #409eff;
  }
  .b {
    margin-right: 1rem;
  }
  .label {
    margin: 0.5rem 0;
  }
  :deep(.el-tabs__nav) {
    margin-left: 0px;
  }
  :deep(.el-tabs__item.is-top:nth-child(2)) {
    padding-left: 10px;
  }

}


</style>