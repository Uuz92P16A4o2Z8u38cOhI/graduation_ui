<template>
  <div class="education">
    <div class="timelines">
      <span class="title"><i class="iconfont icon-jiaoyu" style="font-size: 28px" />教育经历 <span style="font-style: oblique; font-weight: initial ">Education Experience</span> </span>

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="timeline">
            <!--            <el-switch style="margin-bottom: 5px" v-model="reverse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->
            <span @click="reverse = !reverse"><lines-button ><i class="el-icon-sort"></i></lines-button></span>
            <el-timeline :reverse="reverse" class="timeline" >
              <el-timeline-item :timestamp="timestamp2Date(item.startTime)" v-for="item in familyInfo" :key="item.id"
                                placement="top" size="large" icon="el-icon-time" color="#909399">
                <el-card>
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item  :name="item.id" class="collapse">
                      <template slot="title">
                        {{item.schoole}} -- {{item.subject}}
                      </template>
                      <div >起讫时间                             <span class="details">{{item.startTime}} -- {{item.endTime}}</span></div>
                      <div style="background: #E9E9E9;">所学专业 <span class="details">{{item.subject}}</span></div>
                      <div >学习机构                             <span class="details">{{item.schoole}}</span></div>
                      <div style="background: #E9E9E9;">学历     <span class="details" style="margin-left: 75px">{{item.degree}}</span></div>
                    </el-collapse-item>
                  </el-collapse>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="versions">
            <list @version="getVersion"></list>
          </div>
        </el-col>
      </el-row>


    </div>
  </div>
</template>

<script>
  import {format} from '../../../utils/datetime'
  import list from "./components/logList";
  import linesButton from '@/components/template/hyl/button/linesButton'
  export default {
    name: 'education',
    components:{
      list,
      linesButton,
    },
    data() {
      return {
        reverse: false,
        activeName: [0],
        familyInfo: [],
        version:'',
      };
    },
    mounted() {
      this.getInitInfo()
    },
    methods : {
      getInitInfo(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/education/initInfo/' + this.$store.state.user.userId).then((res)=>{
          this.familyInfo = res.data.data
          // console.log(res.data.data)

        })
      },
      getOneVersion(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/education/version/' + this.version.version + '/' + this.$store.state.user.userId).then(res=>{
          this.familyInfo = res.data.data
          // console.log(res)

        })
      },
      getVersion(ev){
        this.version = ev
        this.getOneVersion()
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
 .education .timelines{
  /*margin: 10px;
  padding: 10px;
  width: 60%;*/
}
 .education .timelines .title{
   font-size: 24px;
   font-weight: bold;
 }
 .education .timelines .timeline{
   margin: 30px 10px;
   padding: 10px;
   background: #ffffff;
   border-radius: 3px;
 }
 .education .timelines .timeline .collapse div{
    font-size: 22px;

 }
 .education .timelines .timeline .collapse > div  .details{
    margin-left: 30px;
 }

 .education .versions{
   margin: 30px 10px;
   background: #ffffff;
   border-radius: 3px;
 }
</style>
