<template>
  <div class="family">
    <span class="title"><i class="iconfont icon-jiating" style="font-size: 24px" />家庭情况 <span style="font-style: oblique; font-weight: initial ">Family Situation</span> </span>

    <el-row :gutter="20">

      <el-col :span="16">
        <div class="info ">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix header-title">
              <span>家庭成员</span>
            </div>

            <div class="members user-info" v-for="m in members">
              <el-card shadow="hover"  style="width: 90%">
                <div class="user-info">
                  <el-image src="" class="user-avator" alt >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" style="font-size: 100px"></i>
                    </div>
                  </el-image>
                  <div class="user-info-cont">
                    <div class="user-info-name">{{m.name}}</div>
                    <div>
                      <span>性别: {{m.sex}}</span>
                      <span class="el-icon-date">&nbsp;出生日期：{{m.birth}}&nbsp;</span><br/>
                      <span>工作单位: {{m.job}}</span>
                      <span>政治面貌: {{m.politicalStatus}}</span>
                      <span>关系: {{m.relation}}</span>
                    </div>
                  </div>
                  <contact :email="m.email" :phone="m.phone"/>
                </div>

              </el-card>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix header-title">
              <span>基本信息</span>
            </div>
            <div class="link">
              <div style="display: flex"><span class="name" style="width: 100px">家庭人口 </span><span>{{familyBase.population}}</span></div>
              <el-divider></el-divider>
              <div style="display: flex"><span class="name" style="width: 100px">家庭地址 </span><span>{{familyBase.address}}</span></div>
              <el-divider></el-divider>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import contact from './components/contact'
  export default {
    name: 'family',
    components:{
      contact,
    },
    data(){
      return{
        familyBase: {},
        members:[],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/family/initInfo/' + this.$store.state.user.userId).then(res=>{
          console.log(res.data.data)
          this.familyBase = res.data.data.familyBase
          this.members = res.data.data.members
        })
      }
    }
  }
</script>

<style scoped>
  .family .title{
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;;
    display: block;
  }
  .family .title{
    font-size: 20px;
  }

  .header-title{
    font-size: 24px;
  }
  .info{
    padding: 10px;
  }
  .mgb20 {
    margin-bottom: 20px;
  }
  .members{
    width: 100%;
  }
  .family .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;
    margin-left: 50px;
  }
  .family .info span{
    margin-right: 10px;
  }
  .user-avator {
    width: 100px;
    height: 100px;
    /*border-radius: 50%;*/
  }
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }
</style>
