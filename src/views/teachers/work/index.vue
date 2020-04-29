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
                        <i class="el-icon-office-building" style="color: #0acffe"></i>{{item.workUnit}}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="el-icon-data-line" style="color: green"></i>{{item.position}}
                      </template>
                      <div >起讫时间                              <span class="details">{{timestamp2Date(item.startTime)}} -- {{timestamp2Date(item.endTime)}}</span></div>
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

      <el-dialog title="编辑工作情况" :visible.sync="edit" width="70%" :before-close="handleClose">
        <el-table ref="workInfo" :data="workInfo"  @selection-change="handleSelectionChange" v-loading="loading" empty-text="暂无数据"
                  :header-cell-style="{'color': 'rgb(17,247,41)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#faea54','font-size': '20px'}">
          <el-table-column  label="起讫时间" width="320" align="center">
            <template slot-scope="scope">
              <!--<el-date-picker v-model="scope.row.startTime+','+scope.row.endTime" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>-->
              <el-date-picker v-model="scope.row.startTime" type="month" placeholder="开始月份" style="width: 120px !important;">
              </el-date-picker>
              至
              <el-date-picker v-model="scope.row.endTime" type="month" placeholder="结束月份"  style="width: 120px !important;">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="workUnit" label="工作单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.workUnit"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="position" label="职位(职称)" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.position"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="college" label="学院" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.college"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="subject" label="学科" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.subject"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
          <button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师工作情况?</template>
            <template v-slot:name>保存</template>
          </button-dialog>
        </div>
      </el-dialog>
    </div>
    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-setting" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import floatIcons from '../floatIcons'
  import list from "./components/logList";
  import linesButton from '@/components/template/hyl/button/linesButton'
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'work',
    components:{
      list,
      linesButton,
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        loading: false,
        edit:false,
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
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
        /*var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());*/
        return Y+M;
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showEdit(){
        this.edit = true
      },
      editInfo(){
        this.$message.success("修改了教师工作情况！！")
      },
      //编辑
      handleEdit(index, row) {
        alert(row)
      },
      //删除
      handleDelete(index, row) {
        alert(row,index)
      },
      handleInsert() {
        alert(1111)
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
</style>
