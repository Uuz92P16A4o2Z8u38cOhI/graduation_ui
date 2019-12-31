<template>
  <div class="header-bar">
    <el-row>
      <el-col :span="6">
        <div class="index-logo">
          <img src="./../../assets/logo.png" alt="logo" />
          <!-- <div class="index-logo-pic"></div> -->
          <span class="index-title">高校学院级教师基础信息管理系统</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="menu">

        </div>
      </el-col>
      <el-col :span="6">

        <div class="userInfo">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "header-bar"
    }
</script>

<style scoped>
  .header-bar{

  }
  .index-logo-pic {
    width: 50px;
    background-image: url("");
  }
  .el-col div{
    min-height: 88px;
  }
  .header-bar .index-logo{
    background-color: aquamarine;
  }
  .header-bar .index-logo img{
    height: 80px;
    width: 80px;
  }
  .header-bar .menu{
    background-color: aliceblue;
  }
  .header-bar .userInfo{
    background-color: aqua;
  }
  .index-title{
    font-size: 25px;
    margin: 8px;
  }
</style>
