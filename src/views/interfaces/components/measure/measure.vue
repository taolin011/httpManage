<style scoped lang="less">
.measure {
  font-family: 思源黑体;
  margin: 20px;
  height: 100%;
  * {
    box-sizing: border-box;
  }
  .send {
    .method {
      width: 110px;
      height: 32px;
      background: rgb(248, 248, 248);
    }
  }
  .demo-tabs {
    margin: 20px 0;
    .params-name {
      margin: 10px;
      display: block;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.7);
    }
  }

}
</style>
<template>
  <div class="measure">
    <div class="send">
      <el-select v-model="value" class="method m-2" size="default">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="input"
        :placeholder="interfaces.url"
        style="width: 1337px; height: 32px; margin-right: 20px"
      />
      <el-button type="primary">发送</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Params" name="Params" class="params">
        <span class="params-name">Query</span>
        <paramsTable :measureParams="measureParams"></paramsTable>
      </el-tab-pane>
      <el-tab-pane label="Body" name="Body">
        <span class="params-name">form-data</span>
        <paramsTable :measureParams="measureBody"></paramsTable>
      </el-tab-pane>
      <el-tab-pane label="Cookie" name="Cookie">
        <paramsTable :measureParams="measureCookie"></paramsTable>
      </el-tab-pane>
      <el-tab-pane label="Header" name="Header">
        <paramsTable :measureParams="measureHeader"></paramsTable>
      </el-tab-pane>
    </el-tabs>
   <response :responseData="responseData"></response>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import paramsTable from './params-table.vue'
import response from '../document/response.vue'
const activeName = ref('Params')

const interfaces = {
  group: '默认',
  id: '2000001',
  name: '接口2',
  time: '2023:8:3:14.07',
  update_time: '2023:8:3:14.07',
  state: '开发中',
  request: 'GET',
  url: 'dog',
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
  response: [
    {
      attr: 'name',
      type: 'string',
    },
    {
      attr: 'age',
      type: 'string',
    },
  ],
  responseExample: "{\n''name':'string',\n'age':'string'\n}",
}
const value = ref('')
const input = ref('')
const options = [
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
    value: 'DELETE',
    label: 'DELETE',
  },
  {
    value: 'OPTIONS',
    label: 'OPTIONS',
  },
]
const props = defineProps({
  interfaces: {
    type: Object,
  },
})
const measureParams = reactive([])
const measureCookie = reactive([])
const measureHeader = reactive([])
const measureBody = reactive([])
onMounted(() => {
  interfaces.params.forEach((item, index) => {
    measureParams.push({
      attr: item.attr,
      attrValue: '',
      type: item.type,
      typeValue: '',
      declare: '',
    })
  })
})

const responseData = {
  request: 'GET',
  url: 'dog',
  Header: [
    {
      attr: 'User-Agent',
      value: 'Apifox/1.0.0 (https://apifox.com)',
    },
    {
      attr: 'Accept',
      value: '*/*',
    },
    {
      attr: 'Host',
      value: '127.0.0.1:4523',
    },
    {
      attr: 'Accept-Encoding',
      value: 'gzip, deflate, br',
    },
    {
      attr: 'Connection',
      value: 'keep-alive',
    },
  ],
  Body: {
    category: 'form-data',
    data: [
      {
        attr: 'name',
        value: 'string',
      },
      {
        attr: 'age',
        value: 'string',
      },
    ],
  },
  checked: true,
  status: 200,
}
</script>
