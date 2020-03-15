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
          <el-input placeholder="密码" prefix-icon="el-icon-key" v-model="loginForm.password" show-password/>
        </el-form-item>
        <!--<el-form-item prop="remember" style="margin: -20px 0 0; text-align: left; padding-left: 50px">
          <el-switch v-model="loginForm.remember" id="remember" name="remember" active-text="记住密码"></el-switch>
        </el-form-item>-->

        <!--<div class="login-checkbox">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="记住账号"/>
            <el-checkbox label="记住密码"/>
          </el-checkbox-group>
        </div>-->
        <div>
           <el-button class="login-btn" @click="submitForm('loginForm')" :loading="loading">登陆</el-button>
          <!--<el-button class="login-btn" @click="login" :loading="loading">登陆</el-button>-->
        </div>
      </el-form>

      <span @click="dialogVisible =true" class="newPassword">忘记密码？</span>
      <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" width="30%">
        <div class="pwdarea">
          <p class="title">修改密码</p>
          <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
            <el-form-item label="原密码" prop="password">
              <el-input type="password" v-model="pwdForm.password" auto-complete="off" size="mini" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="mini" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="surepassword">
              <el-input type="password" v-model="pwdForm.surepassword" auto-complete="off" size="mini" placeholder="请输入确认新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPasswordForm('pwdForm')">提交</el-button>
              <el-button @click="resetForm('pwdForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
  import qs from 'qs'
  import router from '../router'
export default {
  name: 'login',
  data() {
    // validateField:对部分表单字段进行校验的方法
    let validateNewpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.pwdForm.surepassword !== '') {
          this.$refs.pwdForm.validateField('surepassword');
        }
        callback();
      }
    };
    let validateSurepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.pwdForm.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password',
        client_id: "client",
        client_secret: "secret",
        remember : false,
      },
      dialogVisible: false,
      pwdForm : {
        password : '',
        newpassword : '',
        surepassword : '',
      },
      // checkList: [],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      pwdRules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newpassword: [
          { required: true, validator:validateNewpassword, trigger: 'blur' },
        ],
        surepassword: [
          { required: true, validator:validateSurepassword, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$http.post('http://127.0.0.1:9055/user/login', qs.stringify(this.loginForm),{
        headers:{'Content-Type': "application/x-www-form-urlencoded"}
      }).then((res)=>{
        console.log(res.data)
        if (res.data.code === 401){
          this.$message.error("用户名或密码错误！")
        }
      }).catch(err => {
        this.loading = false
      })
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.login()
          this.getToken()
          this.loading = false
        } else {
          this.loading = false
          return false
        }
      })
    },
    getToken() {
      //获取授权码
      this.$http.post(this.global.baseUrl+'OAUTH/oauth/token',qs.stringify(this.loginForm),{
        headers:{'Content-Type': "application/x-www-form-urlencoded"}
      }).then((res)=>{
        // if (res.data) return this.$message.error('登陆失败')
        Cookies.set('access_token',res.data.access_token)
        // window.sessionStorage.setItem('user', this.loginForm.username)
        this.$router.push('/')
      }).catch ((err)=>{
        console.log(err);
        // this.$message.error('用户身份出错   请重新登陆！')
        this.$router.push("/login")
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../assets/css/login.css';
</style>
