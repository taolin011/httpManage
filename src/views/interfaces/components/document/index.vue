<template>
  <div class="message">
    <span class="interface-name">{{ interfaces.name }}</span>
    <div class="path">
      <span class="method">{{ interfaces.method }}</span>
      <span class="url">{{ interfaces.path }}</span>
      <span class="state">
        <i class="iconfont icon-dian"></i>
        {{ interfaces.state }}
      </span>
    </div>
    <ul class="main-message">
      <li>
        最近更新时间:
        <span>{{ interfaces.createdTimeStamp }}</span>
      </li>
      <li>
        最近修改者:
        <span>{{ interfaces.updater.name }}</span>
      </li>
      <li>
        创建者:
        <span>{{ interfaces.creator.name }}</span>
      </li>
      <li>
        目录:
        <span>{{ interfaces.group }}</span>
      </li>
    </ul>
    <div class="mock">
     
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
              width: 1400px;
              height: 40px;
              font-size: 16px;
              font-weight: 600;
              padding-left: 20px;
            "
          >
            query请求参数
          </td>
          
        </tr>
        <tr>
          <td class="params">
            <ul>
              <li v-for="(item, index) in interfaces.query" :key="index">
                <span class="attr">{{ item.attr }}</span>
                <span style="color: rgba(0, 0, 0, 0.6);">{{ item.typeValue }}</span>
                <span class="isMust">{{ item.summary }}</span>
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
  <!-- params请求参数 -->
    <div class="request">
      <table class="request-body">
        <tr>
          <td
            style="
              width: 1400px;
              height: 40px;
              font-size: 16px;
              font-weight: 600;
              padding-left: 20px;
            "
          >
            params请求参数
          </td>
          
        </tr>
        <tr>
          <td class="params">
            <ul>
              <li v-for="(item, index) in interfaces.params" :key="index">
                <span class="attr">{{ item.attr }}</span>
                <span style="color: rgba(0, 0, 0, 0.6);">{{ item.typeValue }}</span>
                <span class="isMust">{{ item.summary }}</span>
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <!-- body请求参数 -->
    <div class="request">
      <table class="request-body">
        <tr>
          <td
            style="
              width: 1400px;
              height: 40px;
              font-size: 16px;
              font-weight: 600;
              padding-left: 20px;
            "
          >
            body请求参数(application/json)
          </td>
          
        </tr>
        <tr>
          <td class="params">
            <ul>
              <li v-for="(item, index) in interfaces.body" :key="index">
                <span class="attr">{{ item.attr }}</span>
                <span style="color: rgba(0, 0, 0, 0.6);">{{ item.typeValue }}</span>
                <span class="isMust">{{ item.summary }}</span>
              </li>
            </ul>
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
            <td style=" width: 1400px; height: 40px;padding-left: 20px;">
              数据结构
            </td>
          </tr>
          <tr>
            <td>
              <ul>
                <li v-for="(item, index) in interfaces.response[0].body" :key="index">
                  <span class="attr">{{ item.attr }}</span>
                  <span class="type">{{ item.typeValue }}</span>
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const props=defineProps({
  interfaces:{
    type:Object
  }
})

const isMock = ref(false)

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
    width: 1200px;
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
      margin: 20px 30px;
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