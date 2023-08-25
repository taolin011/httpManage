<template>
<div class="login-container">
    <el-form  
      class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Http接口管理</h3>
      </div>
      <el-form-item>
        <span class="svg-container">
            <i class="iconfont icon-zhanghao"></i>
        </span>
        <el-input
        v-model="input.name"
          ref="username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item >
        <span class="svg-container">
            <i class="iconfont icon-mima"></i>
        </span>
        <el-input
        v-model="input.password"
          ref="passwordRef"
        
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
       
        />
        <span class="show-pwd" @click="showPwd">
            
          <svg-icon/>
        </span>
      </el-form-item>

      <el-button style="width:100%;margin-bottom:30px;height: 40px;" @click="login">登  录</el-button>

    </el-form>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import {userStore} from '../../stores/userInfo'

const userInfo=userStore()

const input=ref({
    name:'管理员',
    password:"123456"
})

const login=()=>{
  userInfo.Login(input.value)
}
</script>

<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@bg:#283443;
@light_gray:#fff;
@cursor: #fff;

*{
  padding: 0;
  margin: 0;
}
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}
/* reset element-ui css */
.login-container {
  background-image: url(../../../public/static/2jpg.jpg);
  background-color: #2d3a4b;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper {
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 1px;
        color: @light_gray;
        height: 47px;
        caret-color: @cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @cursor !important;
        }
      }
    }
    
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
@bg:#2d3a4b;
@dark_gray:#889aa4;
@light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
