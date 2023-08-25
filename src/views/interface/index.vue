<style scoped lang="less">
.icon-search{
position:absolute;
z-index:999;
margin-top:6px;
margin-left:15px;
}
.home{
    height:100%;
    display: flex;
    
}
.left-nav{
    height:100%;
    display: flex;
    flex-direction: column;
    width:91px;
    border-right: 1px solid #ededed;
}
.nav{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 13px 0;
    width:91px;
    background-color: rgba(51, 51, 51, 0.1);;
}
.span {
    margin-top: 2px;
    font-weight: bold;
    font-size: 12px;
}
.between {
    height:100%;
    width:239px;
    border-right:1px solid #ededed;
    
}
.input {
    display: flex;
    padding:10px;
    position: relative;
    border-bottom:1px solid #ededed ;
     align-items: center; 
     
}
.neirong {
    flex:1;
    .navbar {
        height:50px;
       display: flex;
        background-color: #fafafa;
        line-height:50px;
        border-bottom:1px solid #ededed;
        .navs {
            font-size:14px;
            padding-left:20px;
            width:180px;
            background-color: #ffffff;
            font-weight:400;
            
            position: relative;
            cursor: pointer;
            margin-right:3px;
            .navsspan {
                color:#b6b6b6;position: absolute;right:20px;
            }
        }
    }
}
.clickcolor{
    border-top:2px solid #7371fc;
}
.table {
    width:100%;
    border-top:1px solid #ededed;
    cursor: pointer;
}
.topbutton{
        padding:10px;
        border-bottom: 1px solid #ededed;
    }
</style>

<template>
<div class="home">
    <!-- 左侧导航栏 -->
<aside class="left-nav">
<div class="nav">
    <i class="iconfont icon-xiangmu_xiangmuguanli" style="font-size:20px"></i>
    <div class="span">API管理</div>
</div>
</aside>
<!-- 中间 -->
<div class="between"> 
<div class="input">
  <el-button type="primary" size="default" @click="newGroup = true">创建新分组</el-button>
  <el-button  type="success" size="default" @click="router.push('/home')">返回项目</el-button>
</div>
  <!-- 创建新分组 -->
      <el-dialog
        v-model="newGroup"
        title="创建分组"
        width="30%"
        :before-close="handleClose"
      >
        <el-form label-width="80px">
          <el-form-item label="分组名称">
            <el-input v-model="newGroupName" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              @click="
                newGroup = false;
                newGroupName = '';
              "
              >取消</el-button
            >
            <el-button type="primary" @click="createNewGroup"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
<div class="allproject">
   <allProject @clickOK="clickOK" @navchange="tableclick" name="所有API" :projects="interfaces"></allProject>
</div>
</div>
<div class="neirong">
 <!-- 顶部 -->
 <!-- 导航栏 -->
 <ul class="navbar">
    <li class="navs" :class="{clickcolor:item.isClick}" @click="changeNav(item)" v-for="(item,index) in navbar">{{ item.name }}
    <span class="navsspan" v-if="index!==0" @click.stop="closeNav(index)">x</span>
    </li>
 </ul>
 <!-- 按钮 -->
 <!-- 以下为内容，默认为API列表，点击接口后跳转路由进入接口interfaces路由 -->
 <!-- 小于2000000，即为1000000多为一级页面 -->
<div v-if="route.name=='interface'">
    <!-- <div class="topbutton"> -->
 <!-- <el-button type="primary" size="default" @click="">创建API</el-button> -->
 <!-- </div> -->
 <!-- 表格 -->
 <div class="table">
    <el-table stripe :data="interfacesArray" @row-click="tableclick">
    <el-table-column prop="group" label="组名" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="state" label="状态"  />
    <el-table-column prop="method" label="协议" />
    <el-table-column prop="path" label="path" />
    <el-table-column prop="creator.name" label="创建者" />
    <el-table-column prop="updater.name" label="最近更新者" />
    <el-table-column prop="createdTimeStamp" label="最近更新时间" />
    <el-table-column label="操作" >
        
        <template #default="scope">
 <el-dropdown>
    <i class="iconfont icon-gengduo" style="font-size:25px;cursor: pointer;"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="tableclick(scope.row, '文档')">查看API信息</el-dropdown-item>
        <el-dropdown-item v-if="is" @click="tableclick(scope.row,'修改')">修改信息</el-dropdown-item>
        <el-dropdown-item v-if="is" @click="Delete(scope)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </template>

    </el-table-column>
  </el-table>
</div>
</div>

<router-view v-else :curapi="curapi"></router-view>

</div>
</div>
</template>

<script setup>
import { ref,reactive, onMounted,watch } from 'vue'
import allProject from '../../components/all-project.vue'
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import {getApis,addApi,deleteApi} from '../../api/interface'
import {formatDate24} from '../../utils/util'
import {userStore} from '../../stores/userInfo.js'

const route=useRoute()
const user=userStore()


const router=useRouter()
const is=ref(true)
is.value=user.is

const interfacesArray=ref()
const curapi=ref()



//转二维
const transformInterfaces=(interfacesArray)=>{
  const map=new Map()
  interfaces.value=[]
  interfacesArray.forEach(item=>{
    if(map.has(item.group)){
      map.get(item.group).push(item)
    }else{
      map.set(item.group,[item])
    }
  })
  map.forEach((val,key)=>{
    interfaces.value.push(val)
  })
}



const currentInterface=ref()
const ProjectId=ref(route.params.id)
const sousuo=ref('')
const baseId=route.params.id
const GetApis=async()=>{
   const data=await getApis(baseId)
   interfacesArray.value=data.apis
  interfacesArray.value.forEach((item)=>{
    item.createdTimeStamp=formatDate24(item.createdTimeStamp)
  })
   transformInterfaces(interfacesArray.value)

   console.log(interfacesArray.value,'997asda');
}
GetApis()



//新加api
const clickOK=async(data)=>{
    await addApi(data,baseId)
    GetApis()
}



  const newGroup = ref(false);
const newGroupName = ref("");
const createNewGroup = () => {
  if (newGroupName.value.trim()) {
    const name = newGroupName.value.trim();
    interfaces.value.push([{ group: name }]);
    newGroup.value = false;
    newGroupName.value = "";
  } else {
    ElMessage({
      type: "error",
      message: "分组名不能为空",
    });
  }
};

const interfaces=ref([])




//将二维数组手动拆成一维数组以便elementui的table组件遍历



onMounted(()=>{
    
})
//导航栏
//点击后跳转


console.log(route.name);
//删除
const Delete=(scope)=>{
  
  
             ElMessageBox.confirm(
    '确定删除该接口？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      try {
       await deleteApi(scope.row.id)
      GetApis(baseId)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      } catch (error) {
        
      }
     
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
       
    
}


//导航栏
const navbar=ref([{
    name:'API列表', //展示用
    routename:'interface', //跳转路由用
    routeId:ProjectId.value, //跳转路由用
    isClick:true, //是否被选中即有颜色
}])

//关闭导航栏
const closeNav=(index)=>{
 navbar.value.splice(index,1)
 let ok=true
navbar.value.forEach((item)=>{
  item.isClick=false
})
   navbar.value[0].isClick=true
 router.push({
    name:'interface',
    params:{
        id:'1000001'
    }
})

}





//表格点击事件
const tableclick=(row, tab='文档')=>{
  curapi.value=row
  console.log('@@@curapi',curapi.value);
  let tabs
  if(tab!=='修改'&&tab!=='文档'){
    tabs='文档'
  }else{
    tabs=tab
  }
    let isRepeat=false
    //将点击的推到导航栏上
    navbar.value.forEach((item)=>{
        item.isClick=false
        //将其他的颜色去掉
        if(item.routeId==row.id){
           isRepeat=true
           item.isClick=true 
        }
        //避免重复添加
    })
    currentInterface.value=row
    
    //
    if(!isRepeat){
        navbar.value.push({name:row.name,routename:'interfaces',routeId:row.id,isClick:true})
    }
    //跳转
    router.push({name:'interfaces',params:{id:row.id}, query:{tab:tabs}})
}

//点击导航栏切换导航栏事件
const changeNav=(item)=>{
   interfacesArray.value.forEach((items)=>{
    if(item.routeId==items.id){
      curapi.value=items
    }
   })
   if(item.routename=='interface'){
    router.push({name:'interface',params:{id:baseId}})
   }else{
    router.push({name:'interfaces',params:{id:item.routeId},query:{tab:'文档'}})
   }
   navbar.value.forEach((item)=>{
        item.isClick=false
        //将其他的颜色去掉
    })
    item.isClick=true
    
}
</script>

