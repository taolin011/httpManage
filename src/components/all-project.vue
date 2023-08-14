<template>
    <div class="baseproject">
        <i :class="{rotate:!arrow}" @click="Rotate" v-if="projects[0].id" class="iconfont icon-arrow-down" style="font-size:12px"></i>
        <i v-if="projects[0].id" class="iconfont icon-menu" style="margin:0 10px;"></i>
        <i v-else class="iconfont icon-gengduo" style="font-size:18px;margin-left:20px;margin-right:10px;"></i>
        <div class="span">{{ name }}</div>
        <div v-if="projects[0].id" class="span">({{ projects.length }})</div>
    </div>
    <ul :class="{height:!arrow}" style="overflow: hidden;" v-if="projects[0].id">
        <li class="li" v-for="(item,index) in projects" @click="router.push({name:'interface',params:{id:item.id}})">
         {{ item.name }}
        </li>
    </ul>
    <ul v-else v-for="(item,index) in projects">
        <div v-if="item[0]" class="baseproject" style="background-color: #ffffff;">
        <i v-if="item[0]" :class="{rotate:!item[0].arrow}" @click="Rotate2(item)" class="iconfont icon-arrow-down" style="font-size:12px"></i>
        <i  class="iconfont icon-menu" style="margin:0 10px;"></i>
        <div class="span" @click="console.log(typeof item)">{{ item[0].group }}</div>
        <div class="span">({{ item.length }})</div>
        <span class="addBtn" @click="newApi(item)">+</span>
        </div>
        <div v-if="item[0]" :class="{height:!item[0].arrow}" style="overflow: hidden;">
            <li  v-for="(items,indexs) in item" :key="items.id" >
        <div class="li" @click="navchange(items)">
            {{ items.name }}
        </div>
        </li>
        </div>
    </ul>
    </template>
    
    <script setup>
    import { ref,reactive, watch, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    const props=defineProps({
        name:{
            type:String
        },
        projects:{
            type:Array,
            default:()=>[]
        }
    })
    const router=useRouter()
    const emits=defineEmits(['navchange'])
    
    
    
    const navchange=(item)=>{
    emits('navchange',item)
    }
    
    let count = 5
    const newApi = (item) => {
        
        count++
        let id = String(2000000 + count)
        let name = "接口" + count
        let obj = {
            group:"默认",
            id:id,
            name:name,
            time:"2023:8:3:14.07",
            state:'开发中',
            request:"get",
            url:"http",
            creator:"张三",
            updater:"李四",
            arrow:true,
        }
        item.push(obj)
        emits('navchange', obj)
    }
    
    //箭头展开和收缩
    // true则为展开
    const arrow=ref(true)
    const Rotate=()=>{
        arrow.value=!arrow.value
        console.log(arrow.value);
    }
    
    const Rotate2=(item)=>{
    item[0].arrow=!item[0].arrow
    console.log(item[0].arrow);
    }
    
    
    </script>
    
    <style scoped lang="less">
    .baseproject {
        height:30px;
        width:100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left:10px;
        background-color: hsl(0, 0%, 95.1%);
        cursor: pointer;
        .addBtn {
            margin-left: auto;
            margin-right: 10px;
            font-size: 20px;
            color: #999999;
        }
    }
    .span{
        font-size:12px;
    }
    .height{
        height: 0 !important;
        transition: 0.3 all;
    }
    .rotate{
        transform: rotate(90deg);
    }
    .li {
        height:30px;
        font-size:13px;
        line-height:30px;
        width:100%;
        padding-left:60px;
        box-sizing: border-box;
        cursor: pointer;
        transition: 0.3s all ;
    }
    .li:hover{
        background-color: hsl(0, 0%, 95.1%);
    }
    </style>