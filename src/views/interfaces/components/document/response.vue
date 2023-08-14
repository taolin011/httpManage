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
        {{ response.Body.data }}
      </el-tab-pane>
      <el-tab-pane label="实际请求" name="reactResponse">
        <div class="top">
          <span class="response-name">请求&nbsp;URL&nbsp;:</span>
          <span class="method">{{ response.request }}</span>
          <span class="url">{{ response.url }}</span>
        </div>
        <div class="Header">
          <span class="response-name">Header&nbsp;:</span>
          <table>
            <tr>
              <td style="width: 211px">名称</td>
              <td style="width: 971px">值</td>
            </tr>
            <tr v-for="(item, index) in response.Header" :key="index">
              <td>{{ item.attr }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </table>
        </div>
        <div class="Body">
          <span class="response-name">Body&nbsp;:</span>
          <span class="explain">
            Body&nbsp;类型&nbsp;{{ response.Body.category }}
          </span>
          <table>
            <tr>
              <td style="width: 200px">NAME</td>
              <td style="width: 971px">VALUE</td>
            </tr>
            <tr v-for="(item, index) in response.Body.data" :key="index">
              <td>{{ item.attr }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="response-checked">
      <div class="head">
        <span style="margin-right: 20px">校验响应</span>
        <el-switch
          v-model="response.checked"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
      <div class="display">
        <span>HTTP状态码：{{ response.status }}</span>
        <span>耗时：</span>
        <span v-show="response.status === 200">
          <i class="iconfont icon-zhengque" style="color: #13ce66"></i>
          返回数据结构校验通过
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
const props=defineProps({
  responseData:{
    type:Object,
    default:()=>{}
  }
})
const response=reactive(props.responseData)
const activeResponse = ref('reactResponse')
</script>
