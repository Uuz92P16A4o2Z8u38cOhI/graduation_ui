<template>
  <div class="teach">
    <span class="title"><i class="el-icon-reading" style="font-size: 24px" />教学活动 <span style="font-style: oblique; font-weight: initial ">Teaching Activities</span> </span>
    <div class="teach block">
      <span class="title">教学研究</span>
      <div v-if="research === undefined || research.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol>
          <li v-for="item in research"> {{item.item}}</li>
        </ol>
      </div>
    </div>
    <div class="teach block">
      <span class="title">教学资源</span>
      <div v-if="resources === undefined || resources.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol>
          <li v-for="item in resources"> {{item.item}}</li>
        </ol>
      </div>
    </div>
    <div class="class-info block">
      <span class="title">授课信息</span>
      <el-tabs type="border-card">
        <el-tab-pane label="本科生课程">
          <span slot="label"><i class="el-icon-notebook-1"></i> 本科生课程</span>
          <div class="table_container">
            <el-table v-loading="loading" :data="undergraduateTable" style="width: 100%" align='center' class="table"
                      :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}" empty-text="暂无数据">
              <el-table-column prop="courseName" label="课程名称" align='center' sortable/>
              <el-table-column prop="schoolYear" label="学年" align='center' sortable/>
              <el-table-column prop="semester" :formatter="term" label="学期" align='center' sortable/>
              <el-table-column label="学时" align='center' >
                <el-table-column  label="总学时" align='center' width="120" sortable>
                  <template slot-scope="scope">
                    <span style="color: red">{{scope.row.theoryHours + scope.row.practiceHours}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="theoryHours" label="理论学时" align='center' width="120" sortable/>
                <el-table-column prop="practiceHours" label="实践学时" align='center' width="120" sortable/>
              </el-table-column>
              <el-table-column prop="credit" label="学分" align='center' sortable/>
              <el-table-column prop="courseNum" label="课程号" align='center' sortable/>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="研究生课程">
          <span slot="label"><i class="el-icon-notebook-2"></i> 研究生课程</span>
          <el-table v-loading="loading" :data="postgraduateTable" style="width: 100%" align='center'
                    :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}" empty-text="暂无数据">
            <el-table-column prop="courseName" label="课程名称" align='center' sortable/>
            <el-table-column prop="schoolYear" label="学年" align='center' sortable/>
            <el-table-column prop="semester" label="学期"  :formatter="term" align='center' sortable/>
            <el-table-column label="学时" align='center' >
              <el-table-column  label="总学时" align='center' width="120" sortable>
                <template slot-scope="scope">
                  <span style="color: red">{{scope.row.theoryHours + scope.row.practiceHours}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="theoryHours" label="理论学时" align='center' width="120" sortable/>
              <el-table-column prop="practiceHours" label="实践学时" align='center' width="120" sortable/>
            </el-table-column>
            <el-table-column prop="credit" label="学分" align='center' sortable/>
            <el-table-column prop="courseNum" label="课程号" align='center' sortable/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="teach block">
      <span class="title">教学成果</span>
      <div>
        <div v-if="achievements === undefined || achievements.length === 0" style="text-align: center"> <span >暂无数据</span></div>
        <ol>
          <li v-for="item in achievements"> {{item.item}}</li>
        </ol>
      </div>

      <el-dialog title="编辑教学活动" :visible.sync="edit" width="70%" :before-close="handleClose">
        <el-tabs v-model="activeName">
          <el-tab-pane label="教学研究" name="first">

          </el-tab-pane>
          <el-tab-pane label="教学资源" name="second">

          </el-tab-pane>
          <el-tab-pane label="授课信息" name="third">

          </el-tab-pane>
          <el-tab-pane label="教学成果" name="fourth">

          </el-tab-pane>
        </el-tabs>

        <div style="text-align: center">
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
          <button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师教学活动?</template>
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
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'teach',
    components:{
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        activeName:'',
        edit:false,

        loading:false,
        undergraduateTable: [],
        postgraduateTable: [],

        research: [],
        resources: [],
        achievements: [],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods: {
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/initInfo/' + this.$store.state.user.userId).then(res=>{
          const data = res.data.data

          if (res.data.data != null){
            this.undergraduateTable = data.undergraduate
            this.postgraduateTable = data.postgraduate
            this.research = data.research
            this.resources = data.resources
            this.achievements = data.achievements
          }else {
            this.$message.warning("您未设置教师教学活动信息")
          }
        }).catch(err=>{
          this.$message.error("教师教学活动信息获取失败")
        })
      },
      term(val){
        if (val.semester === 1){
          return "第一学期"
        }else {
          return "第二学期"
        }
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
        this.$message.success("修改了教师教学活动！！")
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
  .teach .title{
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;;
    display: block;
  }
  .teach .block{
    margin: 30px 0;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
  }
  .teach .block .title{
    font-size: 20px;
  }
  .teach .research{

}
  .teach .resources{

  }
  .teach .class-info{

  }
  .teach .class-info .table_container .table {

  }
  .teach .results{

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
