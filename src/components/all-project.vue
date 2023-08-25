<template>
  <div class="baseproject">
    <i
      :class="{ rotate: !arrow }"
      @click="Rotate"
      v-show="name=='所有项目'"
      class="iconfont icon-arrow-down"
      style="font-size: 12px"
    ></i>
    <i
      v-if="name=='所有项目'"
      class="iconfont icon-menu"
      style="margin: 0 10px"
    ></i>
    <i
      v-else
      class="iconfont icon-gengduo"
      style="font-size: 18px; margin-left: 20px; margin-right: 10px"
    ></i>
    <div class="span">{{ name }}</div>
    <div v-if="name=='所有项目'" class="span">
      ({{ projects.length }})
    </div>
  </div>
  <ul
    :class="{ height: !arrow }"
    style="overflow: hidden"
    v-if="name=='所有项目'"
  >
    <li
      class="li"
      v-for="(item, index) in projects"
      :key="index"
      @click="emits('changeNav',item)"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul v-else v-for="(item, index) in projects">
    <div v-if="item[0]" class="baseproject" style="background-color: #ffffff">
      <i
        v-if="item[0]"
        :class="{ rotate: !item[0].arrow }"
        @click="Rotate2(item)"
        class="iconfont icon-arrow-down"
        style="font-size: 12px"
      ></i>
      <i class="iconfont icon-menu" style="margin: 0 10px"></i>
      <div class="span" @click="console.log(typeof item)">
        {{ item[0].group }}
      </div>
      <div class="span">({{ panduanchangdu(item) }})</div>
      <!-- 添加接口 -->
      <span v-if="is" class="addBtn" @click="(createApi = true), newApi(item)">+</span>
    </div>
    <div
      v-if="item[0]"
      :class="{ height: !item[0].arrow }"
      style="overflow: hidden"
    >
      <li v-for="(items, indexs) in item" :key="items.id">
        <div class="li" @click="navchange(items)">
          {{ items.name }}
        </div>
      </li>
    </div>
  </ul>
  <!-- 添加接口 -->
  <el-dialog v-model="createApi" title="添加接口" width="60%">
    <div class="modify">
      <div class="a">
        <el-select v-model="data.method" class="method">
          <el-option
            v-for="item in methods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 接口状态 -->
        <el-select v-model="data.state" style="width: 100px; margin-left: 10px">
          <el-option
            v-for="item in interfaceState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="data.path" class="url" />
      </div>

      <div class="label">接口名称</div>
      <el-input v-model="data.name" style="width: 60%"></el-input>
      <div class="label">说明</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="data.description"
        style="width: 60%"
      ></el-input>
      <div style="margin-top: 1rem">请求参数</div>
      <el-tabs
        v-model="activeName"
        class="params-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Params" name="params">
          <span>Query参数</span>
          <params-table :params="data.query" label="query" />
          <br />
          <span>params参数</span>
          <params-table :params="data.params" label="params" />
        </el-tab-pane>
        <el-tab-pane label="Body" name="body">
          <params-table :params="data.body" label="object" />
        </el-tab-pane>
      </el-tabs>
      <div class="response">
        <span style="margin-bottom: 10px; display: block">返回响应</span>
        <el-tabs type="border-card">
          <el-tab-pane label="成功">
            <params-table label="response" :params="data.response[0].body" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(createApi = false), (createApiOK = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="createApiOK(), (createApi = false)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    
    <script setup>
import { ref, reactive, watch, onMounted } from "vue";
import {userStore} from '../stores/userInfo'
import { useRoute, useRouter } from "vue-router";
import paramsTable from "../views/interfaces/components/measure/params-table.vue";
const props = defineProps({
  name: {
    type: String,
  },
  projects: {
    type: Array,
    default: [
    ],
  },
});
const activeName=ref('params')
const user=userStore()
const is=ref(user.is)
const route=useRoute()
const router = useRouter();
const emits = defineEmits(["navchange", "clickOK",'changeNav']);
console.log(route.query.is);
const navchange = (item) => {
  emits("navchange", item);
};


const interfaceState = [
  {
    value: "开发中",
    label: "开发中",
  },
  {
    value: "已完成",
    label: "已完成",
  },
];
const methods = [
  {
    value: "get",
    label: "get",
  },
  {
    value: "post",
    label: "post",
  },
  {
    value: "put",
    label: "put",
  },
  {
    value: "patch",
    label: "patch",
  },
  {
    value: "delete",
    label: "delete",
  },
];

//新建接口的数据，绑定好
const data = reactive({
  group: "",
  name: "",
  method: "",
  path: "",
  description: "接口描述",
  state: "",
  body: [
    {
      attr: "",
      attrValue: "",
      typeValue: "",
      summary: "",
      children: [],
    },
  ],
  response: [
    {
      statusCode:200,
      body:[
        {
          attr: "",
          attrValue: "",
          typeValue: "",
          mock:'',
          summary: "",
          children: [],
        },
      ],
      summary: "响应成功",

    },
  ],
  params: [
    {
      attr: "",
      attrValue: "",
      typeValue: "",
      summary: "",
      children: [],
    },
  ],
  query: [
    {
      attr: "",
      attrValue: "",
      typeValue: " ",
      summary: "",
      children: [],
    },
  ],
});

//
const panduanchangdu = (item) => {
  if (Reflect.has(item[0], "name")) {
    return item.length;
  } else {
    return 0;
  }
};

const createApi = ref(false);
const newApi = (item) => {
  data.group = item[0].group;
};
//发送请求后，清空数据
const clearGroup = () => {
  data.group = "";
  data.name = "";
  data.method = "";
  data.path = "";
  data.state = "";
  data.description = "";
  data.body=[{
    attr: "",
    attrValue: "",
    typeValue: "",
    summary: "",
    children: [],
  }],
  data.response=[{
    statusCode:200,
    body:[
      {
        attr: "",
        attrValue: "",
        typeValue: "",
        mock:'',
        summary: "",
        children: [],
      },
    ],
    summary: "响应成功",

  }],
  data.params=[{
    attr: "",
    attrValue: "",
    typeValue: "",
    summary: "",
    children: [],
  }],
  data.query=[{
    attr: "",
    attrValue: "",
    typeValue: " ",
    summary: "",
    children: [],
  }]
};
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
//发送请求
const createApiOK = () => {
  clearMockAndRequest(data)
  console.log("data:", data);
  emits("clickOK", data);
  clearGroup();
  createApi.value = false;
};
defineExpose({
  createApi,
  data,
});

//箭头展开和收缩
// true则为展开
const arrow = ref(true);
const Rotate = () => {
  arrow.value = !arrow.value;
  console.log(arrow.value);
};

const Rotate2 = (item) => {
  item[0].arrow = !item[0].arrow;
  console.log(item[0].arrow);
};
</script>
    
    <style scoped lang="less">
.baseproject {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: hsl(0, 0%, 95.1%);
  cursor: pointer;
  .addBtn {
    margin-left: auto;
    margin-right: 10px;
    font-size: 20px;
    color: #999999;
  }
}
.span {
  font-size: 12px;
}
.height {
  height: 0 !important;
  transition: 0.3 all;
}
.rotate {
  transform: rotate(90deg);
}
.li {
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  width: 100%;
  padding-left: 60px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s all;
}
.li:hover {
  background-color: hsl(0, 0%, 95.1%);
}

.modify {
  padding: 0 1rem;
  overflow: auto;
  .a {
    .method {
      width: 100px;
      background: rgb(248, 248, 248);
    }
    .url {
      width: 70%;
      height: 2rem;
      margin: 0 1rem;
    }
  }

  .label {
    margin: 0.5rem 0;
  }
  :deep(.el-tabs__nav) {
    margin-left: 0px;
  }
}
</style>