<template>
  <div class="basicInformation">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="">
          <div class="user-info">
            <el-image src="" class="user-avator" alt >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 120px"></i>
              </div>
            </el-image>
            <div class="user-info-cont">
              <div class="user-info-name">姓名</div>
              <div>
                <span>硕士生导师</span><br/>
                <span>性别:</span>
                <span>年龄:</span>
              </div>
            </div>
          </div>

          <div class="info">
            <span class="el-icon-date">&nbsp;出生日期：</span><br/>
            <span>政治面貌:</span><br/>
            <span>籍贯:</span>
          </div>

        </el-card>

        <el-card shadow="hover" class="mgb20">
          <div slot="header" class="clearfix header-title">
            <span>个人信息</span>
          </div>
          <div class="link">
            <span class="name">学院 <span>船舶工程学院</span></span>
            <el-divider></el-divider>
            <span class="name">学位 <span></span></span>
            <el-divider></el-divider>
            <span class="name">职称 <span></span></span>
            <el-divider></el-divider>
            <span class="name">职务 <span></span></span>
            <el-divider></el-divider>
            <span class="name">学科 <span></span></span>
            <el-divider></el-divider>
          </div>
        </el-card>

        <el-card shadow="hover" class="mgb20">
          <div slot="header" class="clearfix header-title">
            <span>联系方式</span>
          </div>
          <div class="link">
            <span class="el-icon-phone-outline name">电话 <span></span></span>
            <el-divider></el-divider>
            <span class="el-icon-message name">邮箱 <span></span></span>
            <el-divider></el-divider>
            <span class="el-icon-printer name">传真 <span></span></span>
            <el-divider></el-divider>
            <span class="el-icon-location-information name">地址 <span></span></span>
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
              张鲁，博士，副研究员，硕士生导师。主要研究领域：多自由度磁悬浮平面电机及相关技术、直线电机及相关技术、磁悬浮相关技术、高速电机系统等；在《IEEE Transactions on Magnetics》、《Journal of Applied Physics》、《Energies》、《中国电机工程学报》、《电工技术学报》等国内外学术刊物上发表论文40余篇，其中SCI/EI检索28篇；获授权国家发明专利36项；美国发明专利2项；获教育部技术发明二等奖1项；以负责人或主要参与人身份主持、参与国家自然科学基金、国家自然科学基金重点项目、国家科技重大专项、中国博士后基金特别资助项目、中国博士后基金面上项目、黑龙江省自然科学基金等项目20多项。
              <br/>
              <br/>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-bottom: 20px">
            <div slot="header" class="clearfix header-title">
              <span>研究领域</span>
            </div>
            <div class="personal-profile">

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
        user:'',

      }
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
