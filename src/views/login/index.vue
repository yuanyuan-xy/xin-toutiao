<template>
  <div class="login-container">
    <el-form ref="form" :model="user" :rules="formRule" class="loginForm">
      <el-form-item>
        <div class="logo"></div>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item  prop="agree">
         <el-checkbox v-model="user.agree">我已阅读并同意服务手册</el-checkbox>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" :loading="loginLoad" @click="login" class="loginBtn">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入登陆接口
import { userLogin } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },

      // loading的状态为关闭
      loginLoad: false,

      // 表单验证规则
      formRule: {
        mobile: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { pattern: /^1[3|5|6|7|8|9]\d{9}$/, message: '电话格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意服务手册'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 验证表单正确与否
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.onLogin()
      })
    },
    async onLogin () {
      // 点击就打开loading
      this.loginLoad = true
      // 发送请求
      try {
        const res = await userLogin(this.user)
        // TODO:这里是登录成功的处理程序
        // 提示登陆成功
        this.$message({
          message: '登陆成功',
          type: 'success'
        })

        // 关闭loading
        this.loginLoad = false

        // 将token保存到本地存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        // 如果登陆成功就跳转到主页
        this.$router.push('/')
      } catch {
        // TODO:这里是失败的处理程序

        // 提示登录失败
        this.$message.error('登陆失败,账号或密码错误')

        // 关闭loading
        this.loginLoad = false
      }
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
