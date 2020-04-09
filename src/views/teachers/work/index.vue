<template>
  <div class="work">
    <div class="timelines">
      <span class="title"><i class="el-icon-data-analysis" style="font-size: 28px;" />工作经历  <span style="font-style: oblique; font-weight: initial;">Work Experience</span> </span>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="timeline">
<!--            <el-switch style="margin-bottom: 5px" v-model="reverse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->
            <span @click="reverse = !reverse"><lines-button><i class="el-icon-sort"></i></lines-button></span>
            <el-timeline :reverse="reverse"  >
              <el-timeline-item :timestamp="timestamp2Date(item.startTime)" v-for="item in workInfo" :key="item.id"
                                placement="top" size="large" icon="el-icon-time" color="#909399">
                <el-card>
                  <el-collapse v-model="activeName" accordion >
                    <el-collapse-item  :name="item.id" class="collapse">
                      <template slot="title">
                        {{item.workUnit}} -- {{item.position}}
                      </template>
                      <div >起讫时间                              <span class="details">{{item.startTime}} -- {{item.endTime}}</span></div>
                      <div style="background: #E9E9E9;">职位(职称)<span class="details">{{item.position}}</span></div>
                      <div >工作单位                              <span class="details">{{item.workUnit}}</span></div>
                      <div style="background: #E9E9E9;">学院      <span class="details" style="margin-left: 75px">{{item.college}}</span></div>
                      <div >学科                                  <span class="details" style="margin-left: 75px">{{item.subject}}</span></div>
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
  import list from "./components/logList";
  import linesButton from '@/components/template/hyl/button/linesButton'
  export default {
    name: 'work',
    components:{
      list,
      linesButton,
    },
    data() {
      return {
        reverse: false,
        activeName: [1],
        workInfo: [],
        version:'',
      };
    },
    mounted() {
      this.getInitInfo()
    },
    methods : {
      getInitInfo(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/work/initInfo/' + this.$store.state.user.userId).then((res)=>{
          this.workInfo = res.data.data
          // console.log(res.data.data)

        })
      },
      getOneVersion(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/work/version/' + this.version.version + '/' + this.$store.state.user.userId).then(res=>{
          this.workInfo = res.data.data
          console.log(res)

        })
      },
      getVersion(ev){
        this.version = ev
        console.log(this.version)
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
  .work .timelines{
    /*margin: 10px;
    padding: 10px;
    width: 60%;*/
  }
  .work .timelines .title{
    font-size: 24px;
    font-weight: bold;
  }
  .work .timelines .timeline{
    margin: 30px 10px;
    padding: 10px;
    background: #ffffff;
    border-radius: 3px;
  }
  .work .timelines .timeline .collapse div{
    font-size: 22px;

  }
  .work .timelines .timeline .collapse > div  .details{
    margin-left: 30px;
  }
  .work .versions{
    margin: 30px 10px;
    background: #ffffff;
    border-radius: 3px;
  }
</style>
