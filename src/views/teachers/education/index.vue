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
                        <i class="el-icon-school" style="color: #0acffe"></i> {{item.schoole}}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="el-icon-guide" style="color: green"></i>{{item.subject}}
                      </template>
                      <div >起讫时间                             <span class="details">{{timestamp2Date(item.startTime)}} -- {{timestamp2Date(item.endTime)}}</span></div>
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

      <el-dialog title="编辑受教育情况" :visible.sync="edit" width="70%" :before-close="handleClose">
        <el-table ref="familyInfo" :data="familyInfo"  v-loading="loading" empty-text="暂无数据"  :highlight-current-row="true"
                  :header-cell-style="{'color': 'rgb(34,247,237)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#c698fa','font-size': '20px'}">
          <el-table-column  label="起讫时间" width="320" align="center">
            <template slot-scope="scope">
              <!--<el-date-picker v-model="scope.row.startTime+','+scope.row.endTime" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>-->
              <el-date-picker :disabled="scope.row.check" v-model="scope.row.startTime" type="month" placeholder="开始月份" style="width: 120px !important;">
              </el-date-picker>
              至
              <el-date-picker v-model="scope.row.endTime" type="month" placeholder="结束月份"  style="width: 120px !important;">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="schoole" label="学习机构" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.schoole"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="subject" label="所学专业" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.subject"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="degree" label="学历" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.degree"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
          <!--<button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师受教育情况?</template>
            <template v-slot:name>保存</template>
          </button-dialog>-->
        </div>

        <el-dialog width="30%" title="添加" :visible.sync="innerVisible" append-to-body :before-close="handleClose">
          <div class="form">
            <el-form ref="form" :model="form" v-loading="loading" label-width="120px" style="margin:10px;width:auto;">
              <el-form-item label="起讫时间:">
                <el-date-picker  v-model="form.startTime" type="month" placeholder="开始月份" style="width: 120px !important;">
                </el-date-picker>
                至
                <el-date-picker v-model="form.endTime" type="month" placeholder="结束月份"  style="width: 120px !important;">
                </el-date-picker>
              </el-form-item>

              <el-form-item prop="schoole" label="学习机构:">
                <el-input v-model="form.schoole" clearable></el-input>
              </el-form-item>
              <el-form-item prop='subject' label="所学专业:">
                <el-input v-model="form.subject" clearable></el-input>
              </el-form-item>
              <el-form-item prop='degree' label="学历:">
                <el-input v-model="form.degree" clearable></el-input>
              </el-form-item>

              <el-form-item  class="bottom_right">
                <el-button type="primary" @click='insertItem'>提  交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
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
    name: 'education',
    components:{
      list,
      linesButton,
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        innerVisible: false,
        loading: false,
        edit:false,
        reverse: false,
        activeName: [0],
        familyInfo: [],
        version:'',
        form: {},
      };
    },
    mounted() {
      this.getInitInfo()
    },
    methods : {
      getInitInfo(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/education/initInfo/' + this.$store.state.user.userId + '/' + this.$store.state.user.version).then((res)=>{
          if (res.data.data != null){
            this.familyInfo = res.data.data
          }else {
            this.familyInfo = []
            this.$message.warning("您未设置教师受教育信息")
          }
        }).catch(err=>{
          this.$message.error("教师受教育信息获取失败")
        })
      },
      insertItem(){
        this.form.startTime = this.timestampDate(this.form.startTime)
        this.form.endTime = this.timestampDate(this.form.endTime)
        this.$http.post(this.global.baseUrl + 'UI/api/ui/education/insertItem/' + this.$store.state.user.userId,
        this.form).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //编辑
      handleEdit(index, row) {
        row.startTime = this.timestampDate(row.startTime)
        row.endTime = this.timestampDate(row.endTime)
        this.$http.post(this.global.baseUrl + 'UI/api/ui/education/updateItem',
          row).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //删除
      handleDelete(index, row) {
        this.$http.delete(this.global.baseUrl + 'UI/api/ui/education/deleteItem/' + row.id).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
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
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        return Y+M;
      },
      //时间格式化
      timestampDate(timestamp) {
        var date = new Date(timestamp)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
        return Y + M + D
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
        this.$message.success("修改了教师受教育情况！！")
      },

      handleInsert() {
        this.innerVisible = true
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
