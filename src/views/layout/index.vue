<template>
<div class="bigbox">
<header class="header">
   <i class="iconfont icon-a-007_ruanjiankaifa" style="font-size:32px;margin-left:10px"></i>
   <div style="font-weight: 600;margin-left:5px">Http Open</div>
   <i class="iconfont icon-user" style="font-size:22px;margin-left:15px;margin-top:3px"></i>
   <div style="margin-left:5px">{{ name }}</div> 
</header>
 <div class="box">
        <keep-alive>
  <router-view></router-view>
</keep-alive>
 </div>
</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import {userStore} from '../../stores/userInfo'
const user=userStore()
const name=user.userInfo.name
</script>

<style lang="less">
.bigbox {
    height:100%;
    display:flex;
    flex-flow: column nowrap; 
    
}
.box {
    flex:1;
    
}
.header {
width:100%;
display: flex;   
height:50px;
align-items: center;
border-bottom: 1px solid #ededed;
}

</style>