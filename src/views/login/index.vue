<template>
  <div class="login-container">
    <el-form ref="form" :model="user" class="loginForm">
      <el-form-item>
        <div class="logo"></div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
         <el-checkbox v-model="checked">我已阅读并同意服务手册</el-checkbox>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" :loading="loginLoad" @click="login" class="loginBtn">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入axios
import reuqest from '@/utils/request'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },

      // 单选按钮是否选中
      checked: false,

      // loading的状态为关闭
      loginLoad: false
    }
  },
  methods: {
    login () {
      // 点击就打开loading
      this.loginLoad = true

      // 定义接口所需要的参数
      const user = this.user

      // 发送请求
      reuqest({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        // 提示登陆成功
        this.$message({
          message: '登陆成功',
          type: 'success'
        })

        // 关闭loading
        this.loginLoad = false
      }).catch(err => {
        console.log('报错了', err)

        // 提示登录失败
        this.$message.error('登陆失败,账号或密码错误')

        // 关闭loading
        this.loginLoad = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url('./background-img2.jpg') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .loginForm {
        padding: 50px;
        background-color: #fff;
        min-width: 300px;
      }
      .loginBtn {
          width: 100%;
      }
      .logo {
          width: 259px;
          height: 57px;
          background: url('./logo_index.png') no-repeat;
      }
  }
</style>
