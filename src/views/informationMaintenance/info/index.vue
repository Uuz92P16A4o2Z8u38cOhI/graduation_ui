<template>
  <div class="info">
    <span class="title"><i class="el-icon-c-scale-to-original" style="font-size: 24px"></i>信息管理 <span style="font-style: oblique; font-weight: initial ">Information Management</span></span>

    <div class="info-content">
      <el-row :gutter="20"  class="block">
        <el-col :span="6">
          <div class="grid-content" >
            <div class="data_list" style="background-color: rgb(26, 188, 156)">
              <div class="topItem">
                <span class="title">基础信息</span>
              </div>
              <div class="leftItem">
                <span @click="downloadModelExcel(item.type)"><line-button style="color: #fe1e00">下载</line-button></span>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(26, 188, 156)">
              <div class="topItem">
                <span class="title">基础信息</span>
              </div>
              <div class="leftItem">

              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">

          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"  class="block">
        <el-col :span="8">
          <div class="grid-content">

          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">

          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import lineButton from '@/components/template/hyl/button/lineButton'
  export default {
    name: 'info',
    components:{
      lineButton,
    },
  }
</script>

<style scoped>
  .info .title{
    font-size: 24px;
    font-weight: bold;
  }
  .info .block{
    margin: 30px 0;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
  }
  .info .info-content .grid-content{

  }

  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    color: #fff;
    height: 80px;
  }
</style>
