<template>
<div class="home">
    <!-- 左侧导航栏 -->
<aside class="left-nav">
<div class="nav">
    <i class="iconfont icon-xiangmu_xiangmuguanli" style="font-size:20px"></i>
    <div class="span">项目管理</div>
</div>
</aside>
<!-- 中间 -->
<div class="between"> 
<div class="input">
    <el-input
       v-model="sousuo"
        placeholder="搜索"
        style="width:180px;"
      />
      <i class="iconfont icon-icon_tianjia" style="font-size:22px;margin-left:10px;cursor: pointer;"></i>
</div>
<div class="allproject">
   <allProject name="所有项目" :projects="projects"></allProject>
</div>
</div>
<!-- 内容 -->
<div class="neirong">
 <!-- 顶部 -->
 <div class="topbutton">
    <!-- 添加新项目 -->
    <el-button class="addbutton" type="primary" size="default" @click="addProject = true">创建新项目</el-button>
    <el-dialog
          v-model="addProject"
          title="添加新项目"
          width="40%"
        >
          <div class="tipone">
            <i class="iconfont icon-bitian" style="color: red;"></i>
            名称
          </div>
          <el-input v-model="newProjects.name" placeholder="请输入项目名称"/>
          <div class="tiptwo">        
            <i class="iconfont icon-bitian" style="color: red;"></i>
            描述
          </div>
          <el-input v-model="newProjects.describe" placeholder="请输入项目描述" />
          <!-- <div class="tiptwo">成员权限</div>
          <el-select v-model="newProjects.limit" class="m-2" placeholder="选择权限">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addProject = false">取消</el-button>
              <el-button type="primary" @click="createOK">
                确定
              </el-button>
            </span>
          </template>
    </el-dialog>
      <!-- 导入swagger -->
    <el-button  type="success" size="default" @click="swaggerProject = true">导入</el-button>
    <el-dialog
          v-model="swaggerProject"
          title="导入项目"
          width="40%"
        >
          <div class="swaggerTitle">
            <i class="iconfont icon-swagger1"></i>swagger
          </div>
          <div class="upload"> 
            <test />
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <div class="el-upload__text">
                点击或拖拽文件到此区域上传
              </div>
            </el-upload>
            <!-- <div :class="['drag', { 'drag-active': active }]" ref="drag">
                <p class="drag-title">未选择文件/文件夹</p>
                <p class="drag-subtile">
                    支持拖拽到此区域上传，支持选择多个文件/文件夹
                    <br />
                    单个文件夹最大支持512GB
                </p>
            </div>
    -->
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="swaggerProject = false">取消</el-button>
              <el-button type="primary" @click="swaggerProject = false">
                确定
              </el-button>
            </span>
          </template>

    </el-dialog>
    
  </div>
 <div class="table">
    <el-table  stripe :data="projects" @row-click="projectClick" >
    <el-table-column prop="name" label="名称" width="140" />
    <el-table-column prop="time" label="时间"  />
    <el-table-column prop="describe" label="介绍" />
    <el-table-column label="操作" >
        <template #default="scope">
 <el-dropdown>
    <i class="iconfont icon-gengduo" style="font-size:25px;cursor: pointer;"></i>
    <template #dropdown>
      <el-dropdown-menu>
    <el-dropdown-item @click="lookProjectMethod(scope)">查看项目信息</el-dropdown-item>
        <el-dropdown-item @click="reviseProjectMethod(scope)">修改信息</el-dropdown-item>      
        <el-dropdown-item>设置成员权限</el-dropdown-item>
        <el-dropdown-item @click="Delete(scope)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </template>

    </el-table-column>
  </el-table>
</div>
  <!-- 查看项目信息 -->
  <el-dialog
      v-model="lookProject"
      title="项目基本信息"
      width="40%"
    >
      <div class="tipone">名称</div>
      <div class="word">{{ curProject.name }}</div>
      <div class="tiptwo">描述</div>
      <div class="word">{{ curProject.describe }}</div>
    </el-dialog>
  <!-- 修改项目信息 -->
  <el-dialog
    v-model="reviseProject"
    title="修改项目"
    width="40%"
  >
    <div class="tipone">
      <i class="iconfont icon-bitian" style="color: red;"></i>
      名称
    </div>
    <el-input v-model="revisingProject.name" placeholder="请输入项目名称"/>
    <div class="tiptwo">
      <i class="iconfont icon-bitian" style="color: red;"></i>
      描述
    </div>
    <el-input v-model="revisingProject.describe" placeholder="请输入项目描述" />
    <!-- <div class="tiptwo">成员权限</div>
    <el-select v-model="projects.limit" class="m-2" placeholder="选择权限">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reviseProject = false">取消</el-button>
        <el-button type="primary" @click="reviseOK">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>



</div>
</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import allProject from '../../components/all-project.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const sousuo=ref('')

const router=useRouter()

const projects=reactive([{
    id:1000001,
    name:"项目1",
    time:"2023:8:3:14.07",
    describe:"1.0.0"
},
{
    id:1000002,
    name:"项目2",  
    time:"2023:8:3:14.07",
    describe:"1.0.0"
},
{
    id:1000003,
    name:"项目3",   
    time:"2023:8:3:14.07",
    describe:"1.0.0"
  },
  {
    id:1000004,
    name:"项目4",  
    time:"2023:8:3:14.07",
    describe:"1.0.0"
}
])
const projectClick=(row)=>{   
  router.push({ name: 'interface', params: { id: row.id } })

}
//删除
const Delete=(scope)=>{
    ElMessageBox.confirm(
    '确定删除该项目？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      projects.splice(scope.$index,1)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}

const addProject = ref(false)
const reviseProject = ref(false)
const lookProject = ref(false)
const swaggerProject = ref(false)
const newProjects=ref({
    id:'',
    name:"",
    time:"",
    describe:""    
})
const revisingProject=ref({
    id:'1000001',
    name:"项目1",
    time:"2023:8:3:14.07",
    describe:"1.0.0"
})
const curProject=ref({
   id:"",
  name:"",
  time:"",
  describe:""
})
const index=ref(0)
  
  const lookProjectMethod=(scope)=>{
    lookProject.value=true
    curProject.value=scope.row
  }
const reviseProjectMethod=(scope)=>{
  reviseProject.value=true
  //深拷贝
  revisingProject.value.name=scope.row.name
  revisingProject.value.describe=scope.row.describe
  index.value=scope.$index
}
  const reviseOK=()=>{
    projects[index.value].name=revisingProject.value.name
    projects[index.value].describe=revisingProject.value.describe
    reviseProject.value=false
  }
  const createOK=()=>{
    newProjects.value.id=projects[projects.length-1].id++
    newProjects.value.time=new Date()
    projects.push(newProjects.value)
    addProject.value=false
  }
// const options = [
//   {
//     value: '管理',
//     label: '管理',
//   },
//   {
//     value: '只读',
//     label: '只读',
//   },
//   {
//     value: '读写',
//     label: '读写',
//   },
// ]

</script>

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
    .topbutton{
        padding:10px;
        border-bottom: 1px solid #ededed;
    }
}
.table {
    width:100%;
    cursor: pointer;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.tipone {
  font-size: 16px;
  margin-bottom: 10px;
}
.tiptwo {
  font-size: 16px;
  margin-top: 35px;
  margin-bottom: 10px;
}
.word {
  width: 93%;
  word-wrap: break-word;
  padding: 15px;
  background-color: rgb(245, 247, 250);
}
.swaggerTitle {
  display: inline-block;
  width: 120px;
  height: 40px;
  position: relative;
  top: -20px;
  padding-top: 10px;
  padding-left: 20px;
  border: 1px solid rgb(118, 209, 252);
  border-radius: 5px;
  cursor: pointer;
}
.swaggerTitle i {
  position: relative;
  top: 5px;
  font-size: 25px;
  color: green;
  margin-right: 10px;

}
.el-upload__text{
  padding-top: 60px;
  padding-bottom: 60px;
}
.addbutton {
  margin-right: 10px;
}
</style>

