<template>
  <div class="params">
    <table>
      <tr>
        <td style="width: 20%; height: 32px">参数名</td>
        <td
          style="width: 15%; height: 32px"
        >
          参数值
        </td>
        <td style="width: 8%; height: 32px">类型</td>
        <td style="width: 20%; height: 32px">说明</td>
        <td v-show="label=='response'" style="color:rgba(0, 0, 0, 0.3);width: 8%;height: 32px;">Mock</td>
        <td style="width: 4%; height: 32px">操作</td>
        
      </tr>
      <tableRow
        v-for="(item, index) in params"
        :key="index"
        :item="item"
        :items="params"
        :index="index"
        :label="label"
        :circleNum="circleNum"
      />
    </table>
  </div>
</template>

<script setup>
import { reactive, ref,watch } from "vue";
import tableRow from "./tableRow.vue";
const props = defineProps({
  params: {
    type: Array,
  },
  label: {
    type: String,
  },
});


let circleNum = ref(1);
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.params {
  position: relative;
  margin: 20px 0;
  .newObject {
    display: block;
    position: absolute;
    bottom: -20px;
    left: 80px;
    color: rgb(178, 182, 192);
  }
  table {
    margin: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    td {
      text-align: center;
      color: rgb(178, 182, 192);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      input {
        border: none;
        font-size: 16px;
        height: 32px;
        width: 100%;
        color: rgba(0, 0, 0, 0.8);
        padding-left: 20px;
        &:focus {
          outline: none;
          border: 1px solid skyblue;
        }
        &:hover {
          border: 1px solid skyblue;
        }
      }
    }
  }
}
</style>