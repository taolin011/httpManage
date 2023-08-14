<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
       
       <el-tab-pane label="文档" name="文档">
           <document :interfaces="props.interface" @goMeasure="goMeasure"></document>
       </el-tab-pane>
       <el-tab-pane label="修改" name="修改">
           <modify :interfaces="props.interface"></modify>
       </el-tab-pane>
       <el-tab-pane label="测试" name="测试">
           <measure :interfaces="props.interface"></measure>
       </el-tab-pane>
      
     </el-tabs>
   </template>
   
   <script setup>
   import { ref,reactive } from 'vue'
   import { useRoute } from 'vue-router'
   import document from './components/document/index.vue'
   import measure from './components/measure/measure.vue'
   import modify from './components/modify/index.vue'
   const route = useRoute()
   const activeName = ref(route.query.tab)
   
   const goMeasure=(mockUrl)=>{
       activeName.value='测试'
       // props.interface.mockUrl=mockUrl
   }
   const handleClick = (tab,event ) => {
    
   }
   const props=defineProps({
       interface:{
           type:Object
       }
   })
   console.log(props.interface,2333);
   </script>
   
   <style scoped>
   :deep(.el-tabs__nav){
   margin-left:20px;
   }
   </style>