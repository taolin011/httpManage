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
      <el-select v-model="method" class="method m-2" size="default">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="path"
        style="width: 1337px; height: 32px; margin-right: 20px"
      />
      <el-button type="primary" @click="qingqiu">请求</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Params" name="Params" class="params">
        <paramsTable :params="params" label="params"></paramsTable>
      </el-tab-pane>
      <el-tab-pane label="Query" name="Query" class="params">
        <paramsTable :params="query" label="query"></paramsTable>
      </el-tab-pane>
      <el-tab-pane label="Body" name="Body">
        <paramsTable :params="body" label="object"></paramsTable>
      </el-tab-pane>
    </el-tabs>
   <response :res="res"></response>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted,watch } from 'vue'
import paramsTable from './params-table.vue'
import response from './response.vue'
import request from '../../../../utils/request'
const props = defineProps({
  curapi:{
    type:Object
  }
})



const res=ref()

const method = ref()
const path=ref()
const params=ref()
const query=ref()
const body=ref()
watch(()=>props.curapi.params,()=>{
  params.value=props.curapi.params
}, { immediate: true })
watch(()=>props.curapi.query,()=>{
  query.value=props.curapi.query
}, { immediate: true })
watch(()=>props.curapi.body,()=>{
  body.value=props.curapi.body
}, { immediate: true })

watch(()=>props.curapi,()=>{
  method.value=props.curapi.method
  path.value='/mock'+props.curapi.path
  res.value=null
 
}, { immediate: true })
const activeName = ref('Params')



const qingqiu=async()=>{
  if(method.value=='get'){
    const result=await request.get(`${path.value}`)
res.value=result

  }else if(method.value=='post'){
    const result=request.post(`${path.value}`)
    res.value=result
  }else if(method.value=='put'){
    const result=request.put(`${path.value}`)
    res.value=result
  }else if(method.value=='delete'){
    const result=request.delete(`${path.value}`)
    res.value=result
  }else if(method.value=='options'){
    const result=request.options(`${path.value}`)
    res.value=result
  }
  console.log(res.value);
}

const options = [
  {
    value: 'get',
    label: 'get',
  },
  {
    value: 'post',
    label: 'post',
  },
  {
    value: 'put',
    label: 'put',
  },
  {
    value: 'delete',
    label: 'delete',
  },
  {
    value: 'options',
    label: 'options',
  },
]



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
