<template>
  <div class="award" >
    <span class="title"><i class="iconfont icon-huojiang" style="font-size: 24px"></i>获奖信息 <span style="font-style: oblique; font-weight: initial ">Awards Information</span></span>

    <div class="award-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class=" header-title">
              <span class="title">教学获奖</span>
            </div>
            <div v-if=" academicHonorsList == null || academicHonorsList.length == 0" style="text-align: center"> <span >暂无数据</span></div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item :title="item.itemName" :name="item.id" v-for="item in academicHonorsList" :key="item.id">
                <div >{{item.itemContent}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class="clearfix header-title">
              <span class="title">科研获奖</span>
            </div>
            <div>
              <div v-if=" scientificAwardsList == null || scientificAwardsList.length == 0" style="text-align: center"> <span >暂无数据</span></div>
              <ol>
                <li v-for="item in scientificAwardsList"><span class="name">{{item.itemName}}</span><span class="content">{{item.itemContent}}</span></li>
              </ol>
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
            <div>
              <div v-if=" otherAwardsList == null || otherAwardsList.length == 0" style="text-align: center"> <span >暂无数据</span></div>
              <ol>
                <li v-for="item in otherAwardsList"><span class="name">{{item.itemName}}</span><span class="content">{{item.itemContent}}</span></li>
              </ol>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="(honoraryTitleList !== null && honoraryTitleList.length !== 0)||(honorWallList !== null && honorWallList.length !== 0)">
      <list :honoraryTitle="honoraryTitleList" :honorWall="honorWallList"></list>
    </div>
<!--    -->
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
        academicHonorsList: [],
        scientificAwardsList: [],
        otherAwardsList: [],
        honoraryTitleList: [],
        honorWallList: [],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      },
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/awards/initInfo/' + this.$store.state.user.userId).then(res =>{
          console.log(res.data.data)
          const infoData = res.data.data
          this.academicHonorsList = infoData.academicHonorsList;
          this.scientificAwardsList = infoData.scientificAwardsList;
          this.otherAwardsList = infoData.otherAwardsList;
          this.honoraryTitleList = infoData.honoraryTitleList;
          this.honorWallList = infoData.honorWallList;
        })
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
