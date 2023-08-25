<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
       
       <el-tab-pane label="文档" name="文档">
           <document :interfaces="curapi"></document>
       </el-tab-pane>
       <el-tab-pane v-if="is" label="修改" name="修改">
           <modify :curapi="curapi"></modify>
       </el-tab-pane>
       <el-tab-pane label="测试" name="测试">
           <measure :curapi="curapi"> </measure>
       </el-tab-pane>
      
     </el-tabs>
   </template>
   
   <script setup>
   import { ref,reactive,watch } from 'vue'
   import { useRoute } from 'vue-router'
   import document from './components/document/index.vue'
   import measure from './components/measure/measure.vue'
   import modify from './components/modify/index.vue'
   import {userStore} from '../../stores/userInfo'

   const props=defineProps({
    curapi:{
        type:Object
    }
   })
   
   const route = useRoute()
   const activeName = ref(route.query.tab)
   const user=userStore()
   const is=ref(user.is)

   const goMeasure=(mockUrl)=>{
       activeName.value='测试'
       // props.interface.mockUrl=mockUrl
   }
   const handleClick = (tab,event ) => {
    
   }

   
   </script>
   
   <style scoped>
   :deep(.el-tabs__nav){
   margin-left:20px;
   }
   </style>