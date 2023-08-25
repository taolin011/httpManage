<style lang="less" scoped>
.response {
  overflow: auto;
  width: 100%;
  height: 400px;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  .response-tabs {
    width: 1250px;
    padding: 20px;
    font-size: 14px;
    .response-name {
      display: block;
      font-size: 16px;
      color: rgb(0, 0, 0);
      margin-bottom: 15px;
    }
    .top {
      margin-top: 10px;
      .method {
        color: #4caf50;
        font-weight: 900;
        margin: 0 10px;
      }
      .url {
        font-size: 14px;
      }
    }
    .Header {
      margin: 20px 0;
      table {
        margin: 0 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        td {
          padding: 10px;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
    .Body {
      margin: 20px 0;
      .explain {
        color: rgba(0, 0, 0, 0.7);
        display: block;
        margin-left: 20px;
      }
      table {
        margin: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        td {
          padding: 10px;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .response-checked {
    padding: 20px;
    flex: 1;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .head {
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.8);
  }
  .display {
    span {
      display: block;
      margin: 10px;
      color: rgba(0, 0, 0, 0.6);
      background: rgb(249, 250, 251);
    }
  }
}
</style>
<template>
  <div class="response">
    <el-tabs
      v-model="activeResponse"
      class="response-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Body" name="responseBody">
         <div>
        {{ data }}
         </div>
      </el-tab-pane>
     
    </el-tabs>
  </div>
</template>

<script setup>
import {ref,reactive,watch} from 'vue'
const activeResponse=ref("responseBody")
const props=defineProps({
  res:{
    type:Object
  }
})
const data=ref()
watch(()=>props.res,(newval)=>{
  data.value=newval
},{
  immediate:true
})
</script>
