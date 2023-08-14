<template>
  <div class="params">
    <table>
      <tr>
        <td style="width: 365px; height: 32px">参数名</td>
        <td style="width: 365px; height: 32px">参数值</td>
        <td style="width: 120px; height: 32px">类型</td>
        <td style="width: 550px; height: 32px">说明</td>
        <td style="width: 40px; height: 32px">操作</td>
      </tr>
      <tr v-for="(item, index) in params" :key="index">
        <td><input v-model="item.attr" /></td>
        <td><input v-model="item.attrValue" /></td>
        <td>
          <el-select
            v-model="item.typeValue"
            class="m-2 selected"
            placeholder="Select"
            size="default"
          >
            <el-option
              v-for="(opt, index) in typeOptions"
              :key="index"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </td>
        <td>
          <input v-model="item.declare" />
        </td>
        <td>
          <i
            class="iconfont icon-remove"
            style="cursor: pointer"
            @click="removeParams(index)"
          ></i>
        </td>
      </tr>
      <tr>
        <td>
          <input v-model="addParams.attr" />
        </td>
        <td>
          <input v-model="addParams.attrValue" />
        </td>
        <td>
          <el-select
            v-model="addParams.typeValue"
            class="m-2"
            placeholder="Select"
            size="default"
          >
            <el-option
              v-for="(opt, index) in typeOptions"
              :key="index"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </td>
        <td>
          <input v-model="addParams.declare" />
        </td>
        <td>
          <i
            class="iconfont icon-icon_tianjia"
            style="cursor: pointer"
            @click="addNewParams"
          ></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  measureParams: {
    type: Array,
  },
})
const params = reactive(props.measureParams)
const typeOptions = [
  {
    label: 'string',
    value: 'string',
  },
  {
    label: 'number',
    value: 'number',
  },
  {
    label: 'boolean',
    value: 'boolean',
  },
  {
    label: 'array',
    value: 'array',
  },
]
const addParams = reactive({
  attr: '',
  attrValue: '',
  type: '',
  typeValue: '',
  declare: '',
})
const clearAdd = () => {
  addParams.attr = ''
  addParams.attrValue = ''
  addParams.type = ''
  addParams.typeValue = ''
  addParams.declare = ''
}
const addNewParams = () => {
  if(addParams.attr === '' || addParams.attrValue === '' || addParams.typeValue === ''){
    alert('请填写完整')
    return
  }else{
    measureParams.push({
    attr: addParams.attr,
    attrValue: addParams.attrValue,
    type: addParams.type,
    typeValue: addParams.typeValue,
    declare: addParams.declare,
  })
  clearAdd()
  }
}
const removeParams = (index) => {
  params.splice(index, 1)
}
</script>

<style lang="less" scoped>
*{
    box-sizing: border-box;
}
.params {

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