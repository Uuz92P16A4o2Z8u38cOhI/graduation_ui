<template>
  <div class="basicInformation">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="">
          <div class="user-info">
            <el-image :src="info.avatatUrl" class="user-avator" alt >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 120px"></i>
              </div>
            </el-image>
            <div class="user-info-cont">
              <div class="user-info-name">{{info.name}}</div>
              <div>
                <span>{{info.jobTitle}}&nbsp;&nbsp;&nbsp;{{info.degree}}&nbsp;&nbsp;&nbsp;{{info.position}}</span><br/>
                <span>性别: {{info.sex}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>年龄: {{info.age}}</span>
              </div>
            </div>
          </div>

          <div class="info">
            <span class="el-icon-date">&nbsp;出生日期：&nbsp;{{timestamp2Date(info.birthday)}}</span><br/>
            <span>政治面貌:&nbsp;{{info.politicalStatus}}</span><br/>
            <span>籍贯:&nbsp;{{info.hometown}}</span>
          </div>

        </el-card>

        <el-card shadow="hover" class="mgb20">
          <div slot="header" class="clearfix header-title">
            <span>个人信息</span>
          </div>
          <div class="link">
            <span class="name">学院 <span>{{info.department}}</span></span>
            <el-divider></el-divider>
            <span class="name">学位 <span>{{info.degree}}</span></span>
            <el-divider></el-divider>
            <span class="name">职称 <span>{{info.position}}</span></span>
            <el-divider></el-divider>
            <span class="name">职务 <span>{{info.jobTitle}}</span></span>
            <el-divider></el-divider>
            <span class="name">学科 <span>{{info.subject}}</span></span>
            <el-divider></el-divider>
          </div>
        </el-card>

        <el-card shadow="hover" class="mgb20">
          <div slot="header" class="clearfix header-title">
            <span>联系方式</span>
          </div>
          <div class="link">
            <span class="el-icon-phone-outline name">电话 <span>{{info.phone}}</span></span>
            <el-divider></el-divider>
            <span class="el-icon-message name">邮箱 <span>{{info.email}}</span></span>
            <el-divider></el-divider>
            <span class="el-icon-printer name">传真 <span>{{info.fax}}</span></span>
            <el-divider></el-divider>
            <span class="el-icon-location-information name">地址 <span>{{info.address}}</span></span>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-card shadow="hover" style="margin-bottom: 20px">
            <div slot="header" class="clearfix header-title">
              <span>个人简介</span>
            </div>
            <div class="personal-profile">
              {{info.introduction}}
              <br/>
              <br/>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-bottom: 20px">
            <div slot="header" class="clearfix header-title">
              <span>研究领域</span>
            </div>
            <div class="personal-profile">
                {{info.researchAreas}}
              <br/>
              <br/>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'basicInformation',
    data() {
      return {
        info:{},
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init(){
        this.$http.get(this.global.baseUrl+'UI/api/ui/basicInfo/queryByPeopleId/'+this.$store.state.user.userId).then((res)=>{
          // console.log(res.data)
          this.info = res.data.data
        })
      },


      //时间格式化
      timestamp2Date(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        /*var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());*/
        return Y+M+D;
      },
    }
  }
</script>

<style scoped>
  .basicInformation{
    margin: 10px;
    padding: 4px;
  }
  .basicInformation .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .basicInformation .info span{
    margin-right: 10px;
  }
  .user-avator {
    width: 120px;
    height: 120px;
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

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .header-title{
    font-size: 24px;
  }

  .personal-profile{
    font-size: 20px;
  }
  .link span{
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
  .link .name span{
    font-weight: initial;
    margin-left: 30px;
  }
</style>
