<template>
  <div class="login">
    <div class="login-title">
      <div class="logo"></div>
      <div class="title">高校学院级教师基础信息管理系统</div>
    </div>
    <div class="login-box">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px">
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-key"
            v-model="loginForm.password"
            show-password
          />
        </el-form-item>

        <div class="login-checkbox">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="记住账号"/>
            <el-checkbox label="记住密码"/>
          </el-checkbox-group>
        </div>
        <div>
           <el-button class="login-btn" @click="submitForm('loginForm')" :loading="loading">登陆</el-button>
          <!--<el-button class="login-btn" @click="login" :loading="loading">登陆</el-button>-->
        </div>
        <a href="#">忘记密码？</a>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      checkList: [],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$router.push('/')
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          /*const { data: res } = this.$http.post('', this.loginForm)
          if (res) return this.$message.error('登陆失败')*/
          Cookies.set('token', 1111) // 放置token到Cookie
          // window.sessionStorage.setItem('token','111')
          window.sessionStorage.setItem('user', this.loginForm.username)
          this.login()
          this.loading = false
        } else {
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../assets/css/login.css';
</style>
