<template>
  <el-dialog :visible.sync="isVisible" :title="dialogInfo.title" :close-on-click-modal='false'
    :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
    <div class="form">
      <el-form ref="form" :model="form" :rules="form_rules" label-width="120px" style="margin:10px;width:auto;">
        <el-form-item prop='name' label="名称:">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="enname" label="英文名称:">
          <el-input v-model="form.enname" ></el-input>
        </el-form-item>
        <el-form-item prop='url'  label="url:">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop='description' label="备注:">
          <el-input v-model="form.description" type="textarea"></el-input>
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
    name: 'permissionDialog',
    props: {
      dialogInfo: Object
    },
    data(){
      return {
        isVisible: false,
        form: {
          id : '',
          name: '',
          enname: '',
          url: '',
          description : '',
          created : '',
          updated : '',
        },

        form_rules: {
          name   : [
            {required: true, message : '名称不能为空!',trigger : 'blur'}
          ],
          enname   : [
            { required: true, message:'英文名不能为空！',trigger: 'blur'}
          ],
          url   : [
            { required: true, message:'资源路径不能为空！',trigger: 'blur'}
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
        this.$refs[form].validate(async vaild =>{
          if (vaild){  //表单验证
            if(this.dialogInfo.type === 'edit'){  //编辑
              console.log(this.form)

            }else{  //新增
              console.log(this.form)
            }

          }
        })
      }
    }
  }
</script>

<style scoped>
  .bottom_right{
    text-align: right;
  }
</style>
