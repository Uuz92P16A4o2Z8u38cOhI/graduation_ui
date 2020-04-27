<template>
  <div class="unit">
    <span class="title"><i class="iconfont icon-jiaoxuedanwei" style="font-size: 24px" />教学单位 </span>

    <div class="content">
      <el-row :gutter="12">
        <el-col :span="8" v-for="item in unitList" :key="item.id">
          <el-card shadow="hover" @click="drawer = true">
            <el-image :src='item.icon' alt class="image" @click="drawer = true">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 50px"></i>
              </div>
            </el-image>
            <!-- <img :src="item.icon" class="image" @click="drawer = true"> -->
            <span class="title" @click="drawer = true" >{{item.name}}</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-drawer title="学院教师" :visible.sync="drawer" :before-close="handleClose" size="50%" >
      <el-scrollbar>
        <span style="float: right; margin-right: 40px">
          <el-button style="background-color: #0acffe" @click="handleClose1('effect-1')"/>
          <el-button style="background-color: #fe5bab" @click="handleClose1('effect-2')"/>
          <el-button style="background-color: #e1fe68" @click="handleClose1('effect-3')"/>
        </span>
        <el-col :span="24" style="max-height:740px">
          <el-col :span="8" v-for="i in 20" :key="i">
            <el-card style="margin: 10px" shadow="hover">
              <div class="single-member" :class="effect">
                <div class="member-image">
                  <img src="http://192.168.91.128:8888/group1/M00/00/00/wKhbgF6dZJaAT5uTAAAICOJst0s557.gif" alt="Member">
                </div>
                <div class="member-info">
                  <h3>name</h3>
                  <h5>position</h5>
                  <div class="social-touch">
                    <el-link class="fb-touch" :underline="false"><i class="el-icon-edit"></i></el-link>
                    <el-link class="tweet-touch" :underline="false"><i class="el-icon-share"></i></el-link>
                    <el-link class="linkedin-touch" :underline="false"><i class="el-icon-delete"></i></el-link>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'unit',
    data() {
      return {
        unitList: [],
        drawer: false,
        innerDrawer: false,
        effect : 'effect-1',
      };
    },
    mounted() {
      this.getAllUnit();
    },
    methods: {
      handleClose1(val){
        this.effect = val
      },
      handleClose(done) {
        this.$confirm('确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getAllUnit(){
        const id = 10621
        this.$http.get(this.global.baseUrl +'UI/api/ui/teachUnit/queryAll/'+ id).then((res)=>{
          this.unitList = res.data.data;
          //console.log(res.data);
          for(var i = 0; i < this.unitList.length; i++){
            if (this.unitList[i].icon !== null && this.unitList[i].icon !== ''){
              this.unitList[i].icon = this.global.imgUrl + this.unitList[i].icon
            }
          }
        }).catch (err => {
          console.log(err);
          this.$message.eerror("请求出现错误");
        });
      }
    }
  }
</script>

<style scoped>
  .unit .title{
    font-size: 24px;
    font-weight: bold;
  }
  .el-card{
    margin: 10px 2px;
    /*text-align: center;*/
  }
  .content{
    margin: 20px 30px;
  }
  .content .image {
    height: 50px;
    width: 50px;
    display: inline-block;
    cursor: pointer;
  }
  .content .title{
    display: inline-block;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
  }


  /*= common css to all effects =*/
  .single-member{width: 280px; float: left; margin:  -8px ; background-color: #fff; text-align: center; position: relative;}
  .member-image img{max-width: 100%; vertical-align: middle;}
  h3 {font-size: 24px; font-weight: normal; margin: 10px 0 0; text-transform: uppercase;}
  h5 {font-size: 16px; font-weight: 300; margin: 0 0 15px; line-height: 22px;}
  p {font-size: 14px; font-weight: 300; line-height: 22px; padding: 0 30px; margin-bottom: 10px;}
  .social-touch .el-link{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px;  background-repeat: no-repeat; opacity: 0.7; transition: 0.3s;}
  .social-touch .el-link:hover{opacity: 1; transition: 0.3s; }
  .social-touch i{font-size: 24px; color: #fefefa; padding-top: 2px}
  .fb-touch{background-position: 0 0;}
  .tweet-touch{background-position: -35px 0;}
  .linkedin-touch{background-position: -71px 0;}
  .icon-colored .fb-touch{background-position: 0 -27px;}
  .icon-colored .tweet-touch{background-position: -35px -27px;}
  .icon-colored .linkedin-touch{background-position: -71px -27px;}
  /*= common css to all effects end =*/
  /*= effect-1 css =*/
  .effect-1{border-radius: 5px 5px 0 0; padding-bottom: 40px;margin-top: 70px;}
  .effect-1 .member-image {border: 2px solid #fff; border-radius: 60px 0; display: inline-block; margin-top: -72px; overflow: hidden; transition: 0.3s;}
  .effect-1 .social-touch{background-color: #e13157; position: absolute; left: 0; bottom: 0; height: 5px; overflow: hidden; padding: 5px 0 0; width: 100%; transition: 0.3s;}
  .effect-1 .member-image img{transition: 0.3s; border-radius: 60px 0;}
  .effect-1:hover .member-image{border-color: #e13157; transition: 0.3s; border-radius: 50%;}
  .effect-1:hover .social-touch{padding: 6px 0; height: 38px; transition: 0.3s;}
  /*= effect-1 css end =*/
  /*= effect-2 css =*/
  .effect-2{max-height: 302px; min-height: 302px; overflow: hidden;}
  .effect-2 h3{padding-top: 7px; line-height: 33px;}
  .effect-2 .member-image{border-bottom: 5px solid #1fb554; height: 212px; overflow: hidden; width: 100%; transition: 0.4s; display: inline-block; float: none; vertical-align: middle;}
  .effect-2 .member-info{transition: 0.4s;}
  .effect-2 .member-image img{width: 100%; vertical-align: bottom;}
  .effect-2 .social-touch{background-color: #1fb554; float: left; left: 0; bottom: 0; overflow: hidden; padding: 5px 0; width: 100%; transition: 0.4s;}
  .effect-2:hover .member-image{height: 81px; transition: 0.4s;}
  /*= effect-2 css end =*/
  /*= effect-3 css =*/
  .effect-3{max-height: 302px; min-height: 302px; overflow: hidden;}
  .effect-3 h3{padding-top: 7px; line-height: 33px;}
  .effect-3 .member-image{border-bottom: 5px solid #e5642b; transition: 0.4s; height: 212px; width: 100%; display: inline-block; float: none; vertical-align: middle;}
  .effect-3 .member-info{transition: 0.4s;}
  .effect-3 .member-image img{width: 100%; vertical-align: bottom;}
  .effect-3 .social-touch{background-color: #e5642b; float: left; left: 0; bottom: 0; overflow: hidden; padding: 5px 0; width: 100%; transition: 0.4s;}
  .effect-3:hover .member-image{border-bottom: 0; border-radius: 0 0 50px 50px; height: 81px; display: inline-block; overflow: hidden; width: 109px; transition: 0.4s;}
  /*= effect-3 css end =*/
</style>
