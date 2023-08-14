<template>
  <div class="message">
    <span class="interface-name">{{ interfaces.name }}</span>
    <div class="path">
      <span class="method">{{ interfaces.request }}</span>
      <span class="url">/{{ interfaces.url }}</span>
      <span class="state">
        <i class="iconfont icon-dian"></i>
        {{ interfaces.state }}
      </span>
    </div>
    <ul class="main-message">
      <li>
        创建时间
        <span>{{ interfaces.time }}</span>
      </li>
      <li>
        更新时间
        <span>{{ interfaces.update_time }}</span>
      </li>
      <li>
        修改者
        <span>{{ interfaces.updater }}</span>
      </li>
      <li>
        创建者
        <span>{{ interfaces.creator }}</span>
      </li>
      <li>
        目录
        <span>{{ interfaces.group }}</span>
      </li>
    </ul>
    <div class="mock">
      <span class="mock-name" style="display: block">Mock</span>
      <el-button type="primary" class="btn" plain size="large" @click="isMock=!isMock">
        本地Mock
      </el-button>
      <table class="mock-table" v-show="isMock">
        <tr>
          <th style="width: 360px; height: 44px">名称</th>
          <th style="width: 360px; height: 44px">来源</th>
          <th style="width: 582px; height: 44px">URL参数</th>
          <th style="width: 239px; height: 44px">操作</th>
        </tr>
        <tr>
          <td style="width: 360px; height: 44px">成功(200)</td>
          <td style="width: 360px; height: 44px">接口响应</td>
          <td style="width: 582px; height: 44px">{{ interfaces.mockUrl }}</td>
          <td style="color:#00c3ee;cursor: pointer;" @click="goMeasure">快捷操作</td>
        </tr>
      </table>
    </div>
    <div class="request">
      <span class="request-name">请求参数</span>
      <table class="request-body">
        <tr>
          <td
            style="
              width: 980px;
              height: 40px;
              font-size: 16px;
              text-align: center;
            "
          >
            Body请求参数(application/json)
          </td>
          <td
            style="
              width: 450px;
              height: 40px;
              font-size: 16px;
              text-align: center;
            "
          >
            示例
          </td>
        </tr>
        <tr>
          <td class="params" style="height: 200px">
            <ul>
              <li v-for="(item, index) in interfaces.params" :key="index">
                <span class="attr">{{ item.attr }}</span>
                <span>{{ item.type }}</span>
                <span class="isMust">{{ item.isMust }}</span>
              </li>
            </ul>
          </td>
          <td class="example">
            <span>
              {{ interfaces.example }}
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div class="response">
      <span class="response-name">返回响应</span>
      <div class="response-body">
        <span class="tab">成功(200)</span>
        <table class="response-table">
          <tr>
            <td style="text-align: center; width: 1000px; height: 40px">
              数据结构
            </td>
            <td style="text-align: center; width: 450px; height: 40px">示例</td>
          </tr>
          <tr>
            <td style="width: 1000px; height: 200px">
              <ul>
                <li v-for="(item, index) in interfaces.response" :key="index">
                  <span class="attr">{{ item.attr }}</span>
                  <span class="type">{{ item.type }}</span>
                </li>
              </ul>
            </td>
            <td style="width: 450px; height: 200px">
              {{ interfaces.responseExample }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const interfaces = {
  group: '默认',
  id: '2000001',
  name: '接口2',
  time: '2023:8:3:14.07',
  update_time: '2023:8:3:14.07',
  state: '开发中',
  request: 'GET',
  url: 'dog',
  mockUrl:'	http://127.0.0.1:4523/m1/3084499-0-default/dog',
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
const isMock = ref(false)
const props = defineProps({
  interfaces: {
    type: Object,
  },
})
const emit=defineEmits(['goMeasure'])
const goMeasure = () => {
  emit('goMeasure',interfaces.mockUrl)
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.message {
  font-family: 思源黑体;
  margin: 20px;
  .interface-name {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.7);
  }
  .path {
    margin-top: 20px;
    width: 211px;
    margin-left: 27px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-size: 16px;
    .method {
      width: 50px;
      height: 32px;

      background: rgb(76, 175, 80);
      border-radius: 8px;
      text-align: center;
      line-height: 32px;
      font-weight: 700;
      color: rgb(255, 255, 255);
    }
  }
  .main-message {
    margin: 16px 15px;
    width: 829px;
    height: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 16px;
    li {
      span {
        margin-left: 10px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 400;
      }
    }
  }
  .mock {
    margin: 50px 0;
    .mock-name {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.7);
    }
    .btn {
      margin: 30px 27px;
      letter-spacing: 2px;
      font-size: 16px;
    }
    .mock-table {
      margin: 0 7px;
      width: 1524px;
      height: 91x;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      font-size: 16px;
      th {
        font-weight: 400;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        border-right: 1px solid rgba(0, 0, 0, 0.15);
        color: rgba(0, 0, 0, 0.8);
        &:nth-last-child(1) {
          border-right: none;
        }
      }
      td {
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
        border-right: 1px solid rgba(0, 0, 0, 0.15);
      }
    }
  }
  .request {
    .request-name {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.7);
    }
    .request-body {
      margin: 20px 27px;
      border-top: 1px solid rgba(0, 0, 0, 0.15);
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      td {
        border-right: 1px solid rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        color: rgba(0, 0, 0, 0.8);
        padding:20px;
      }
      .params {
        vertical-align: top;
        ul {
          li {
            width: 250px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 14px;
            margin: 10px 0;
            .attr {
              display: block;
              width: 51.57px;
              height: 18px;
              background: rgba(88, 176, 255, 0.1);
              border-radius: 8px;
              line-height: 18px;
              color: rgb(88, 176, 255);
              text-align: center;
            }
            .isMust {
              width: 100px;
              color: rgb(250, 140, 22);
            }
          }
        }
      }
      .example {
        vertical-align: top;
        span {
          display: block;
        }
      }
    }
  }
  .response {
    margin-top: 35px;
    .response-name {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.7);
    }
    .response-body {
      margin: 20px 27px;
      .tab {
        display: block;
        width: 82.39px;
        height: 41px;
        text-align: center;
        line-height: 41px;
        color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        border-right: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 5px 5px 0px 0px;
      }
      .response-table {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        tr {
          color: rgba(0, 0, 0, 0.8);
          font-size: 16px;
          td {
            vertical-align: top;
            border-right: 1px solid rgba(0, 0, 0, 0.15);
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            padding: 20px;
            ul {
              li {
                width: 180px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 14px;
                margin:15px 0;
                .attr {
                  display: block;
                  width: 51.57px;
                  height: 18px;
                  background: rgba(88, 176, 255, 0.1);
                  border-radius: 8px;
                  line-height: 18px;
                  color: rgb(88, 176, 255);
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>