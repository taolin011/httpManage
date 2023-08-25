<template>
  <tr>
    <td>
      <input
        :style="{
          width: '100%',
          height: '32px',
          paddingLeft: circleNum * 20 + 'px',
        }"
        v-model="item.attr"
      />
    </td>
    <td>
      <input style="width: 100%; height: 32px" v-model="item.attrValue" />
    </td>
    <td>
      <el-select
        v-model="item.typeValue"
        class="m-2 selected"
        placeholder="Select"
        style="width: 100%; height: 32px"
        @change="changeValue('item')"
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
      <input style="width: 100%; height: 32px" v-model="item.summary" />
    </td>
    <td
      v-show="label == 'response'"
      style="color: rgba(0, 0, 0, 0.3); width: 8%; height: 32px"
    >
      <el-select v-model="item.mock" class="m-2" placeholder="Select">
        <el-option
          v-for="items in MockOptions"
          :key="items.value"
          :label="items.label"
          :value="items.value"
        />
      </el-select>
    </td>
    <td style="height: 32px">
      <el-dropdown :hide-on-click="false">
        <i
          class="iconfont icon-icon_tianjia"
          style="cursor: pointer; margin-right: 10px; vertical-align: top"
        ></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toNext()">添加相邻节点</el-dropdown-item>
            <el-dropdown-item
              v-if="item.typeValue === 'object'"
              @click="toChild()"
              >添加子节点</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <i
        class="iconfont icon-remove"
        style="cursor: pointer; vertical-align: top"
        @click="removeParams()"
      ></i>
    </td>
  </tr>

  <!-- 递归 -->
  <tableRow
    v-for="(child, index) in item.children"
    :key="index"
    :item="child"
    :items="item.children"
    :label="props.label"
    :circleNum="circleNum + 1"
    :addNewParams="addChild"
  ></tableRow>

</template>

<script setup>
import { reactive, ref, watch } from "vue";
const emit = defineEmits(["addNewParams"]);

const props = defineProps({
  item: {
    type: Object,
  },
  items: {
    type: Array,
  },
  label: {
    type: String,
  },
  circleNum: {
    type: Number,
  },
  index: {
    type: Number,
  },
});
//mock选项
const MockOptions = [
  {
    label: "@int  随机整数",
    value: "@int",
  },
  {
    label: "@float 随机浮点数",
    value: "@float",
  },
  {
    label: "@cname  随机中文姓名",
    value: "@cname",
  },
  {
    label: "@image  随机图片url",
    value: "@image",
  },
  {
    label: "@sentence  随机句子",
    value: "@sentence",
  },
  {
    label: "@paragraph 随机段落",
    value: "@paragraph",
  },
  {
    label: "@date  随机日期",
    value: "@date",
  },
  {
    label: "@phone 随机手机号",
    value: "@phone",
  },
  {
    label: "@email 随机邮箱",
    value: "@email",
  },
  {
    label: "",
    value: "",
  },
];

//添加节点是否为子节点
const target = ref(true);
//是否显示子节点
const showChild = ref(false);
//缩进
const toNext = () => {
  target.value = false;
  addItem();
};
const toChild = () => {
  target.value = true;
  addItem();
};
const addParams = reactive({
  attr: "",
  attrValue: "",
  type: "",
  typeValue: "",
  summary: "",
  mock: "",
  children: [],
});
const typeOptions = [
  {
    label: "Person",
    value: "Person",
  },
  {
    label: "Article",
    value: "Article",
  },
  {
    label: "Tag",
    value: "Tag",
  },
  {
    label: "object",
    value: "object",
  },
  {
    label: "null",
    value: "null",
  },
  {
    label: "array",
    value: "array",
  },
  {
    label: "any",
    value: "any",
  },
  {
    label: "string",
    value: "string",
  },
  {
    label: "number",
    value: "number",
  },
  {
    label: "boolean",
    value: "boolean",
  },
];
if (props.label !== "response" && props.label !== "object") {
  typeOptions.splice(0, 7);
}
const clearAdd = () => {
  addParams.attr = "";
  addParams.attrValue = "";
  addParams.type = "";
  addParams.typeValue = "";
  addParams.summary = "";
};
const pushParams = (item = []) => {
  item.push({
    attr: addParams.attr,
    attrValue: addParams.attrValue,
    type: addParams.type,
    typeValue: addParams.typeValue,
    summary: addParams.summary,
    children: [],
  });
};
const removeParams = () => {
  if (props.circleNum === 1 && props.items.length === 1) {
    return;
  } else {
    props.items.splice(props.index, 1);
  }
};
const addChild = () => {
  pushParams(props.item.children);
  clearAdd();
};
const addNewParams = () => {
  pushParams(props.items);
  clearAdd();
};
const addItem = () => {
  if (!target.value) {
    addNewParams();
  } else {
    addChild();
  }
};
//监听mock值的变化
const Person = [
  {
    attr: "person",
    attrValue: "",
    typeValue: "object",
    mock: "",
    children: [
      {
        attr: "private",
        attrValue: "",
        typeValue: "object",
        mock: "",
        children: [
          {
            attr: "name",
            attrValue: "",
            typeValue: "string",
            mock: "@cname",
            children: [],
          },
          {
            attr: "birthday",
            attrValue: "",
            typeValue: "string",
            mock: "@date",
            children: [],
          },
        ],
      },
      {
        attr: "phoneNumber",
        attrValue: "",
        typeValue: "number",
        mock: "@phone",
        children: [],
      },
      {
        attr: "email",
        attrValue: "",
        typeValue: "string",
        mock: "@email",
        children: [],
      },
    ],
  },
];
const Article = [
  {
    attr: "article",
    attrValue: "",
    typeValue: "object",
    mock: "",
    children: [
      {
        attr: "title",
        attrValue: "",
        typeValue: "string",
        mock: "@sentence",
        children: [],
      },
      {
        attr: "content",
        attrValue: "",
        typeValue: "string",
        mock: "@paragraph",
        children: [],
      },
      {
        attr: "author",
        attrValue: "",
        typeValue: "string",
        mock: "@cname",
        children: [],
      },
      {
        attr: "tag",
        attrValue: "",
        typeValue: "Tag",
        mock: "",
        children: [],
      },
      {
        attr: "date",
        attrValue: "",
        typeValue: "string",
        mock: "@date",
        children: [],
      },
      {
        attr: "id",
        attrValue: "",
        typeValue: "number",
        mock: "@int",
        children: [],
      },
    ],
  },
];
const Tag = [
  {
    attr: "tag",
    attrValue: "",
    typeValue: "object",
    children: [
      {
        attr: "name",
        attrValue: "",
        typeValue: "string",
        mock: "@cname",
        children: [],
      },
      {
        attr: "id",
        attrValue: "",
        typeValue: "number",
        mock: "@int",
        children: [],
      },
    ],
  },
];
const changeValue = (item) => {
  console.log(item);
  switch (item) {
    case "item":
      props.item.children = [];
      props.item.mock = "";
      switch (props.item.typeValue) {
        case "Person":
        props.items.splice(props.index, 1,Person[0]);
          break;
        case "Article":
        props.items.splice(props.index, 1,Article[0]);
          break;
        case "Tag":
        props.items.splice(props.index, 1,Tag[0]);
          break;
        default:
          break;
      }
      break;
    case "addParams":
      switch (addParams.typeValue) {
        case "Person":
          break;
        case "Article":
          break;
        case "Tag":
          break;
        default:
          break;
      }
      break;
  }
};
</script>

<style lang="less" scoped>
td {
  position: relative;
  text-align: center;
  color: rgb(178, 182, 192);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid skyblue;
  }
  input {
    box-sizing: border-box;
    padding-left: 20px;
    border: none;
    font-size: 16px;
    height: 32px;
    width: 100%;
    color: rgba(0, 0, 0, 0.8);
    &:focus {
      outline: none;
      border: 1px solid skyblue;
    }
  }
}
</style>