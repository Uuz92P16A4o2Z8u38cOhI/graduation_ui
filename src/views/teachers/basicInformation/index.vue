<template>
  <div class="basicInformation">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="">
          <div class="user-info">
            <el-image :src="this.$store.state.user.avatar" class="user-avator" alt >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 120px"></i>
              </div>
            </el-image>
            <div class="user-info-cont">
              <div class="user-info-name">{{info.name}}</div>
              <div>
                <span>{{info.jobTitle}}&nbsp;&nbsp;&nbsp;{{info.degree}}&nbsp;&nbsp;&nbsp;{{info.position}}</span><br/>
                <span>性别: {{info.sex==0?'女':'男'}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
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
            <span class="name">工作单位 <span>{{this.$store.state.user.schoolName}}</span></span>
            <el-divider></el-divider>
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
            <div style="background: #000000">
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

    <el-dialog title="编辑基础信息" :visible.sync="edit" width="60%" :before-close="handleClose">
      <div class="editForm">
        <el-form ref="info" :model="info" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="info.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="info.sex">
                  <el-radio label="男" value="1" style="color: #22f7ed"></el-radio>
                  <el-radio label="女" value="0" style="color: #ff54f8"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input-number v-model="info.age" :min="1"  label="年龄"></el-input-number>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker v-model="info.birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="info.politicalStatus" placeholder="请选择">
                  <el-option  label="无" value="0"></el-option>
                  <el-option  label="团员" value="1"></el-option>
                  <el-option  label="党员" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="info.hometown"></el-input>
              </el-form-item>
              <el-form-item label="邮编">
                <el-input v-model="info.postCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单位">
                <el-input v-model="this.$store.state.user.schoolName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="学院">
                <el-input v-model="info.department"></el-input>
              </el-form-item>
              <el-form-item label="学位">
                <el-input v-model="info.degree"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-input v-model="info.position"></el-input>
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="info.jobTitle"></el-input>
              </el-form-item>
              <el-form-item label="学科">
                <el-input v-model="info.subject"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="info.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="info.email"></el-input>
              </el-form-item>
              <el-form-item label="传真">
                <el-input v-model="info.fax"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="info.address"></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input v-model="info.qq"></el-input>
              </el-form-item>
              <el-form-item label="微信">
                <el-input v-model="info.wechat"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="个人简介">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="info.introduction"></el-input>
            </el-form-item>
            <el-form-item label="研究领域">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="info.researchAreas"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div style="text-align: center">
          <button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师基础信息?</template>
            <template v-slot:name>保存</template>
          </button-dialog>
        </div>
      </div>
    </el-dialog>
    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-setting" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import floatIcons from '../floatIcons'
  import glassLightButton from '../../../components/template/h/glassLightButton'
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'basicInformation',
    components: {
      glassLightButton,
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        loading:false,
        edit: false,
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showEdit(){
        this.edit = true
      },
      editInfo(){
        this.$message.success("修改了教师基础信息！！")
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

  .icons-warp{
    cursor: pointer;
    opacity: 0;
  }
  .icons-warp:hover{
    opacity: 1;
  }
  .float i{
    font-size: 40px;
    background-color: rgba(0,0,0,0);
  }

  .editForm{

  }

</style>
