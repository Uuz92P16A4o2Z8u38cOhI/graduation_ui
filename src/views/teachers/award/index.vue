<template>
  <div class="award" >
    <span class="title"><i class="iconfont icon-huojiang" style="font-size: 24px"></i>获奖信息 <span style="font-style: oblique; font-weight: initial ">Awards Information</span></span>

    <div class="award-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class=" header-title">
              <span class="title">学术荣誉</span>
            </div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="荣誉名称" name="1" >
                <div >荣誉详情</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class="clearfix header-title">
              <span class="title">科研奖励</span>
            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class="clearfix header-title">
              <span class="title"> 其他获奖</span>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>
    <list></list>
  </div>
</template>

<script>
  import list from './components/list'
  export default {
    name: 'award',
    components:{
      list,
    },
    data(){
      return {
        activeName: [1],
      }
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      }
    }

  }
</script>

<style scoped>
 .award .title{
   font-size: 24px;
   font-weight: bold;
 }
 .award .mgb20 {
   margin-bottom: 20px;
 }
 .award .award-content{
   margin: 10px 0;
 }
  .award .award-content .title{
    font-size: 20px;
  }
</style>
