<template>
  <el-dialog :visible.sync="isVisible" :title="dialogInfo.title" :close-on-click-modal='false'
    :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
    <div class="form">
      <el-form ref="form" :model="form" :rules="form_rules" v-loading="loading" label-width="120px" style="margin:10px;width:auto;">
        <el-form-item prop='name' label="名称:">
          <el-input type="text" v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="enname" label="英文名称:">
          <el-input v-model="form.enname" clearable></el-input>
        </el-form-item>
        <el-form-item prop='description' label="备注:">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop='type' label="类型:">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="资源角色" value="0"></el-option>
            <el-option label="菜单角色" value="1"></el-option>
          </el-select>
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
  export default {
    name: 'roleDialog',
    props: {
      dialogInfo: Object
    },
    data(){
      return {
        loading: false,
        isVisible: false,
        form: {
          id : '',
          name: '',
          enname: '',
          description : '',
          created : '',
          updated : '',
          type: '',
        },

        form_rules: {
          name   : [
            {required: true, message : '名称不能为空!',trigger : 'blur'}
          ],
          enname   : [
            { required: true, message:'英文名不能为空！',trigger: 'blur'}
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
              this.$http.put(this.global.baseUrl + 'SYS/api/sys/role/updateRole',
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
              this.$http.post(this.global.baseUrl + 'SYS/api/sys/role/insertRole',
                this.form).then((res)=>{
                  console.log(this.form)
                if (res.data.code === 200) {
                  this.$message.success(res.data.message)
                  this.loading = false
                  this.refreshTable()
                  this.closeDialog()
                }else {
                  this.$message.error(res.data.message)
                  this.loading = false
                }
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
