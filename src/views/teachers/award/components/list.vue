
<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-medal" style="font-size: 20px"/>
        <span class="title">荣誉称号：</span>
      </div>
      <div v-if=" honoraryTitle == null || honoraryTitle.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div class="area el-scrollbar">
        <div class="item" v-for="item in honoraryTitle" :key="item.id">

        </div>
      </div>
    </el-card>

    <el-card class="box-card" v-if="honorWall !== null && honorWall.length !== 0">
      <div slot="header" class="clearfix">
        <i class="el-icon-medal-1" style="font-size: 20px"/>
        <span class="title">荣誉墙：</span>
      </div>
      <div class="carousel">
        <el-carousel indicator-position="outside" >
          <el-carousel-item v-for="item in honorWall" :key="item">
            <h3>{{ item.itemName }}</h3>
            <span>{{item.itemContent}}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    name:'list',
    props:['honoraryTitle' , 'honorWall'],
    data() {
      return {

      };
    }
  }
</script>

<style scoped>
.container {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 6px;
}
.container .area{
  overflow: auto;
  height: 100%;
}
.container .box-card{
  margin-bottom: 30px;
}
.container .box-card .title{
  font-size: 20px;
  font-weight: bold;
}
  .container .carousel{

  }
</style>

