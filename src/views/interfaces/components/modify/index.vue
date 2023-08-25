<script setup>
import { ref,reactive, onMounted } from 'vue'
import paramsTable from '../measure/params-table.vue'
import { updateApi } from '../../../../api/interface';
const props=defineProps({
    curapi:{
        type:Object
    }
})
console.log(props.curapi,'-----');
const methods = [
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
    value: 'patch',
    label: 'patch',
  },
  {
    value: 'delete',
    label: 'delete',
  },
]
const activeName=ref('params')
//去除空请求和空mock
const clearMockAndRequest=(data)=>{
  if(Array.isArray(data.body)){
    data.body.forEach((item,index)=>{
    if(item.attr==''&&item.attrValue==''){
      data.body.splice(index,1)
    }
  })
  }
  if(Array.isArray(data.response[0].body)){
    data.response[0].body.forEach((item,index)=>{
    if(item.attr==''&&item.attrValue==''){
      data.response[0].body.splice(index,1)
    }
    if(item.mock==''){
      delete item.mock
    }
  })
  }
  if(Array.isArray(data.query)){
    data.query.forEach((item,index)=>{
    if(item.attr==''&&item.attrValue==''){
      data.query.splice(index,1)
    }
  })
  }
  if(Array.isArray(data.params)){
    data.params.forEach((item,index)=>{
    if(item.attr==''&&item.attrValue==''){
      data.params.splice(index,1)
    }
  })
  }
  return data
}
const updata=()=>{
  console.log('@@@curapiUpdata',props.curapi);
  clearMockAndRequest(props.curapi)
  const {_id,name,group,method,path,params,query,body,response,description}=props.curapi
   updateApi(_id,{description,name,group,method,path,params,query,body,response}).then(res=>{  })

}

</script>

<template>
  <div class="modify">
    <div class="a">
      <el-select v-model="curapi.method" class="method">
        <el-option
          v-for="item in methods"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="curapi.path"
        class="url"
      />
      <el-button type="primary" @click="updata">确定修改</el-button>
    </div>
    <input type="text" class="summary" v-model="curapi.summary" placeholder="接口描述">
    <el-row>
      <el-col :span="4" class="b">
        <div class="label">状态</div>
        <el-select v-model="curapi.state">
          <el-option label="开发中" value="开发中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-col>
    </el-row>
    <div class="label">说明</div>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="curapi.description" style="width: 60%;"></el-input>
    <div style="margin-top: 1rem">请求参数</div>
      <el-tabs
        v-model="activeName"
        class="params-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Params" name="params">
          <span>Query参数</span>
          <params-table :params="curapi.query" label="query" />
          <br />
          <span>params参数</span>
          <params-table :params="curapi.params" label="params" />
        </el-tab-pane>
        <el-tab-pane label="Body" name="body">
          <params-table :params="curapi.body" label="object" />
        </el-tab-pane>
      </el-tabs>
      <div class="response">
        <span style="margin-bottom: 10px; display: block">返回响应</span>
        <el-tabs type="border-card">
          <el-tab-pane label="成功">
            <params-table label="response" :params="curapi.response[0].body" />
          </el-tab-pane>
        </el-tabs>
      </div>
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
      width: 80%;
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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