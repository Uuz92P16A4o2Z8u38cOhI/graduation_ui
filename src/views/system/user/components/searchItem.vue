<template>
    <div class="search_container">
      <el-form :inline="true" :model='search_data' :rules="rules" ref="search_data" class="search-form">
        <el-form-item label="">
          <el-input v-model="search_data.username" placeholder="用户名" ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search_data.phone" placeholder="电话"  ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="search_data.email" placeholder="邮箱" ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size ="mini" icon="view" >查询</el-button>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button type="danger" size ="mini" icon="view" >批量删除</el-button>
          <!-- <el-button type="success" size ="mini" icon="view">导出Elcel</el-button> -->
          <el-button type="primary" size ="mini" icon="view" >添加</el-button>
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
          phone:'',
          name:''
        },
        rules: {}
      }
    },
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
