
<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-medal" style="font-size: 20px"/>
        <span class="title">荣誉称号：</span>
      </div>
      <div class="area el-scrollbar">
        <div class="item" v-for="item in honorData" :key="item.id">

        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-medal-1" style="font-size: 20px"/>
        <span class="title">荣誉墙：</span>
      </div>
      <div class="carousel">
        <el-carousel indicator-position="outside" >
          <el-carousel-item v-for="item in trophyList" :key="item">
            <h3>{{ item }}</h3>

          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    name:'list',
    data() {
      return {
        honorData:[],
        trophyList:[1,2,3],
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

