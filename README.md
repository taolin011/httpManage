项目介绍：
HTTP接口管理平台是集API文档、API调试、API Mock、API自动化测试API一体化协作，权限管理的接口管理平台

后端地址：https://github.com/taolin011/back-end.git

技术选型与相关开发文档：
- 利用1024code环境，实现前端，后端的同时开发。
- 前端技术栈选择是vue3，组件库使用element-plus。
- 后端使用express进行开发。

功能测试：
  - 完成登录操作，获取token。
  - 项目模块：修改、删除、修改项目，查看项目列表，查看项目详情
  - 接口管理：创建、修改、删除接口，查看接口列表，查看接口详情
  - Mock服务：支持多种 HTTP 请求方式，支持参数匹配和响应规则，支持复杂数据结构

项目代码介绍：
```
|—public                                                 //public
|—src                                                    //源代码
|   |—api                                                //所有请求
|   |   |—home.js                                        //获取项目列表的api
|   |   |—interface.js                                   //获取接口列表的api
|   |   |—login.js                                       //登录接口的api
|   |—assets                                             //静态资源
|   |   |—icon-font.css                                  //所用用到的图标
|   |—components                                         //公用组件
|   |   |—all-project.vue                                //接口或者项目列表
|   |—router                                             //路由
|   |   |—index.js                                       //index.js
|   |—stores                                             //仓库
|   |   |—index.js                                       //主仓库
|   |   |—userInfo.js                                    //用户相关信息
|   |—utils                                              //全局公用方法
|   |   |—request.js                                     //封装axios
|   |   |—util.js                                        //格式化
|   |—views                                              //主要界面
|   |   |—home                                           //首页，展示所有项目
|   |   |   |—index.vue                                  //index.vue
|   |   |—interface                                      //项目详情，展示项目的所有接口
|   |   |   |—index.vue                                  //index.vue
|   |   |—interfaces                                     //接口详情
|   |   |   |—components                                 //接口界面里的组件
|   |   |   |   |—document                               //接口的文档
|   |   |   |   |   |—index.vue                          //index.vue
|   |   |   |   |—measure                                //测试接口
|   |   |   |   |   |—measure.vue                        //measure.vue
|   |   |   |   |   |—params-table.vue                   //多级主表格
|   |   |   |   |   |—tableRow.vue                       //多级子表格
|   |   |   |   |   |—response.vue                       //响应组件
|   |   |   |   |—modify                                 //修改接口
|   |   |   |   |   |—index.vue                          //index.vue
|   |   |   |—index.vue                                  //index.vue    
|   |   |—layout                                         //顶栏
|   |   |   |—index.vue                                  //index.vue
|   |   |—login                                          //登录界面
|   |   |   |—index.vue                                  //|
|—App.vue                                                //App.vue
|—main.js                                                //入口文件
|—permission.js                                          //路由守卫
|—index.html                                             //index.html
|—package-json                                           //package.json
|—vite.config.js                                         //项目配置

```
