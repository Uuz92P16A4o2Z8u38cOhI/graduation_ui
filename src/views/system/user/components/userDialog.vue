<template>
  <el-dialog :visible.sync="isVisible" :title="dialogInfo.title" :close-on-click-modal='false'
    :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
    <div class="form">
      <el-form ref="form" :model="form" :rules="form_rules" v-loading="loading" label-width="120px" style="margin:10px;width:auto;">
        <el-form-item prop='username' label="用户名:">
          <el-input type="text" v-model="form.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:">
          <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话:">
          <el-input v-model="form.phone" clearable></el-input>
        </el-form-item>
        <el-form-item prop='email' label="邮箱:">
          <el-input v-model="form.email" clearable></el-input>
        </el-form-item>

        <el-form-item  class="bottom_right">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import * as mutils from '@/utils/validate'
  export default {
    name: 'roleDialog',
    props: {
      dialogInfo: Object
    },
    data(){
      let validateEmail = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入邮箱~'));
          return;
        }
        let emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(value)) {
          callback(new Error('邮箱格式不正确！'))
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入手机号码~'));
        }{
          let phoneRegex = /^1[34578]\d{9}$/;
          if (!phoneRegex.test(value)) {
            callback(new Error('手机号码格式不正确！'))
          } else {
            callback();
          }
        }
      };

      return {
        loading: false,
        isVisible: false,
        form: {
          id : '',
          username: '',
          password : '',
          phone: '',
          email : '',
          created : '',
          updated : '',
        },

        form_rules: {
          username   : [
            {required: true, message : '用户名不能为空!',trigger : 'blur'}
          ],
          password   : [
            { required: true, message:'不能为空！',trigger: 'blur'}
          ],
          phone   : [
            { required: true, validator: validatePhone, trigger : 'blur'}
          ],
          email   : [
            { required: true ,validator: validateEmail,trigger: 'blur'}
          ],
        },
      }
    },
    mounted() {
    },
    computed : {
      isShow() {
          return this.dialogInfo.show
      }
    },
    watch : {
      isShow(val) {
          this.isVisible = val
        if(this.dialogInfo.type === 'edit'){
          this.form = this.dialogInfo.row
        }
      },
      isVisible(val){
        this.dialogInfo.show = val
      }
    },
    methods : {
      closeDialog(){
          this.$emit('closeDialog');
      },
      onSubmit(form){
          this.loading = true
        this.$refs[form].validate(async vaild =>{
          if (vaild){  //表单验证
            if(this.dialogInfo.type === 'edit'){  //编辑
              this.$http.put(this.global.baseUrl + 'SYS/api/sys/user/updateUser',
              this.form).then((res)=>{
                if (res.data.code === 200){
                  this.$message.success(res.data.message)
                  this.loading = false
                  this.refreshTable()
                  this.closeDialog()
                }else {
                  this.$message.error(res.data.message)
                  this.loading = false
                }

              })

            }else{  //新增
              this.$http.post(this.global.baseUrl + 'SYS/api/sys/user/insertUser',
                this.form).then((res)=>{
                if (res.data.code === 200) {
                  this.$message.success(res.data.message)
                  this.loading = false
                  this.refreshTable()
                  this.closeDialog()
                }else {
                  this.$message.error(res.data.message)
                  this.loading = false
                }
              }).catch(err=>{
                this.$message.error('新增用户失败,请检查用户名、电话、邮箱是否已经使用过！')
                this.loading = false
              })
            }

          }
        })
      },
      //刷新父表格
      refreshTable(){
          this.$emit('refreshTable')
      }
    }
  }
</script>

<style scoped>
  .bottom_right{
    text-align: right;
  }
</style>
