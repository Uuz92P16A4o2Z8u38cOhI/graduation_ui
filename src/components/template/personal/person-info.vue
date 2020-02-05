<template>
  <div class="personal-panel">
    <div class="personal-desc">
      <div class="avatar-container">
        <img class="avatar" :src="require('@/assets/avatar.jpg')" alt="头像"/>
      </div>
      <div class="name-role">
        <span class="sender">{{ 'user.nickName' }} - {{ 'user.role' }}</span>
      </div>
      <div class="registe-info">
          <span class="registe-info">
            <li class="el-icon-timer"/>
            {{ '登录时间' }}
          </span>
      </div>
    </div>
    <div class="personal-relation">
      <span class="relation-item el-icon-user">联系人</span>
      <span class="relation-item el-icon-chat-dot-round">群组</span>
      <span class="relation-item el-icon-news">动态</span>
    </div>
    <div class="main-operation">
        <span class="main-operation-item" @click="openPersonCenter">
            <el-button size="small" icon="el-icon-setting"> 个人中心</el-button>
        </span>
      <span class="main-operation-item" @click="openUpdatePasswordDialog">
          <el-button size="small" icon="el-icon-help"> 修改密码</el-button>
        </span>
    </div>
    <div class="other-operation">
      <div class="other-operation-item" @click="">
        <li class="el-icon-edit-outline"/>
        备忘笔记
      </div>
    </div>
    <div class="personal-footer" @click="logout">
      <li class="el-icon-switch-button"/>
      退出登录
    </div>
    <!--修改密码界面-->
    <el-dialog title="修改密码" width="40%" :visible.sync="updatePwdDialogVisible" :close-on-click-modal="false"
               :modal="false">
      <el-form :model="updatePwdDataForm" label-width="100px" :rules="updatePwdDataFormRules" ref="updatePwdDataForm"
               :size="size">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="updatePwdDataForm.password" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="updatePwdDataForm.newPassword" type="password" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="comfirmPassword">
          <el-input v-model="updatePwdDataForm.comfirmPassword" type="password" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="updatePwdDialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="updatePassword" :loading="updatePwdLoading">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: 'persion-info',
    props: {
      user: {
        type: Object,
        default: {
          nickName: 'admin',
          avatar: '@/assets/logo.png',
          role: '超级管理员',
          registeInfo: '注册时间：2018-12-25 '
        }
      }
    },
    data() {
      return {
        size: 'small',
        updatePwdDialogVisible: false,
        updatePwdLoading: false,
        updatePwdDataForm: {
          password: '',
          newPassword: '',
          comfirmPassword: ''
        },
        updatePwdDataFormRules: {
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          comfirmPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        Cookies.remove('token')
        this.$router.push('/login')
      },
      // 打开个人中心
      openPersonCenter() {
        alert('待开发')
      },
      // 打开修改密码对话框
      openUpdatePasswordDialog() {
        this.updatePwdDialogVisible = true
      },
      // 修改密码
      updatePassword() {
        this.$refs.updatePwdDataForm.validate((valid) => {
          if (valid) {
            if (this.updatePwdDataForm.newPassword !== this.updatePwdDataForm.comfirmPassword) {
              this.$message({ message: '新密码与确认新密码不一致', type: 'error' })
              return
            }
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.updatePwdLoading = true
              let params = {
                password: this.updatePwdDataForm.password,
                newPassword: this.updatePwdDataForm.newPassword
              }
              this.$api.user.updatePassword(params).then((res) => {
                this.updatePwdLoading = false
                if (res.code === 200) {
                  this.$message({ message: '操作成功', type: 'success' })
                  this.$refs['updatePwdDataForm'].resetFields()
                  this.logout()
                } else {
                  this.$message({ message: '操作失败, ' + res.msg, type: 'error' })
                }
                this.updatePwdDialogVisible = false
              })
            })
          }
        })
      }
    },
    // 时间格式化
    dateFormat(date) {
      return format(date)
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .personal-panel {
    font-size: 14px;
    width: 280px;
    text-align: center;
    border-color: rgba(180, 190, 190, 0.2);
    border-width: 1px;
    border-style: solid;
    background: rgb(65, 255, 250);
    margin: -14px;
  }

  .personal-desc {
    padding: 15px;
    color: #fff;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 90px;
  }

  .name-role {
    font-size: 16px;
    padding: 5px;
  }

  .personal-relation {
    font-size: 16px;
    padding: 12px;
    margin-right: 1px;
    background: rgba(200, 209, 204, 0.3);
  }

  .relation-item {
    padding: 12px;
  }

  .relation-item:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
  }

  .main-operation {
    padding: 8px;
    margin-right: 1px;
    /* background: rgba(175, 182, 179, 0.3); */
    border-color: rgba(201, 206, 206, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .main-operation-item {
    margin: 5px;
  }

  .other-operation {
    padding: 15px;
    margin-right: 1px;
    text-align: left;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .other-operation-item {
    padding: 12px;
  }

  .other-operation-item:hover {
    cursor: pointer;
    background: #9e94941e;
    color: rgb(19, 138, 156);
  }

  .personal-footer {
    margin-right: 1px;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .personal-footer:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
  }
</style>
