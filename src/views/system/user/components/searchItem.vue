<template>
    <div class="search_container">
      <el-form :inline="true" :model='search_data' :rules="rules" ref="search_data" class="search-form">
        <el-form-item label="">
          <el-input v-model="search_data.username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search_data.phone" placeholder="电话" type=""  clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search_data.email" placeholder="邮箱" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size ="mini" icon="el-icon-search" @click="searchData()">查询</el-button>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button type="danger" size ="mini" icon="view"  @click=" multipleDelete">批量删除</el-button>
          <!-- <el-button type="success" size ="mini" icon="view">导出Elcel</el-button> -->
          <el-button type="primary" size ="mini" icon="view" @click="insertData()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>

  export default {
    name: 'searchItem',
    data(){
      return {
        search_data:{
          username:'',
          password: '',
          phone:'',
          email :''
        },
        dialogInfo: {
          title : '新增角色',
          type : 'add',
          show : true,
          row: {},
        },
        rules: {}
      }
    },
    methods : {
      //给父组件查询表单信息
      searchData(){
        this.$emit("searchList",this.search_data)
      },
      //新增按钮
      insertData(){
        this.dialogInfo.show = true
        this.dialogInfo.title = '新增角色'
        this.dialogInfo.type = 'add'
        this.dialogInfo.rows = {}
        this.$emit('insertList',this.dialogInfo)
      },
      //批量删除
      multipleDelete(){
        this.$emit('multipleDeleteButton')
      }
    }
  }
</script>

<style scoped>
  .search_container{
    margin-bottom: 10px;
  }
  .search-form .el-form-item{
    margin: 10px;
  }
  .btnRight{
    float: right;
    margin-right: 0  !important;
  }
</style>
