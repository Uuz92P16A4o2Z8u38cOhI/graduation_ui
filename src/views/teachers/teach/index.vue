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
            <el-table ref="research" :data="research"   v-loading="loading" empty-text="暂无数据"
                      :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
              <el-table-column prop="item"  label="内容" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.item"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEditItem(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteItem(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsertItem(1)" style="float: left"></el-button>
          </el-tab-pane>
          <el-tab-pane label="教学资源" name="second">
            <el-table ref="resources" :data="resources"   v-loading="loading" empty-text="暂无数据"
                      :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
              <el-table-column prop="item"  label="内容" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.item"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEditItem(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteItem(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsertItem(2)" style="float: left"></el-button>
          </el-tab-pane>
          <el-tab-pane label="授课信息" name="third">
            <el-tabs v-model="activeName1" type="card">
              <el-tab-pane label="本科生课程">
                <span slot="label"><i class="el-icon-notebook-1"></i> 本科生课程</span>
                <div class="table_container">
                  <el-table v-loading="loading" :data="undergraduateTable" style="width: 100%" align='center' class="table"
                            :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}" empty-text="暂无数据">
                    <el-table-column prop="courseName" label="课程名称" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.courseName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="schoolYear" label="学年" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.schoolYear"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="semester" label="学期"  :formatter="term" align='center' >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.semester" placeholder="请选择">
                          <el-option  label="第一学期" value="1"></el-option>
                          <el-option  label="第二学期" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="学时" align='center' >
                      <el-table-column prop="theoryHours" label="理论学时" align='center' width="120" >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.theoryHours"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="practiceHours" label="实践学时" align='center' width="120" >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.practiceHours"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="credit" label="学分" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.credit"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="courseNum" label="课程号" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.courseNum"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEditClass(scope.$index, scope.row)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteClass(scope.$index, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsertClass" style="float: left"></el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="研究生课程">
                <span slot="label"><i class="el-icon-notebook-2"></i> 研究生课程</span>
                <div class="table_container">
                  <el-table v-loading="loading" :data="postgraduateTable" style="width: 100%" align='center'
                            :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}" empty-text="暂无数据">
                    <el-table-column prop="courseName" label="课程名称" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.courseName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="schoolYear" label="学年" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.schoolYear"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="semester" label="学期"  :formatter="term" align='center' >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.semester" placeholder="请选择">
                          <el-option  label="第一学期" value="1"></el-option>
                          <el-option  label="第二学期" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="学时" align='center' >
                      <el-table-column prop="theoryHours" label="理论学时" align='center' width="120" >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.theoryHours"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="practiceHours" label="实践学时" align='center' width="120" >
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.practiceHours"></el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="credit" label="学分" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.credit"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="courseNum" label="课程号" align='center' >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.courseNum"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEditClass(scope.$index, scope.row)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteClass(scope.$index, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsertClass" style="float: left"></el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="教学成果" name="fourth">
            <el-table ref="achievements" :data="achievements"   v-loading="loading" empty-text="暂无数据"
                      :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
              <el-table-column prop="item"  label="内容" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.item"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-check" circle @click="handleEditItem(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDeleteItem(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsertItem(3)" style="float: left"></el-button>
          </el-tab-pane>

          <div style="text-align: center">
            <!--<el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
          <button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师教学活动?</template>
            <template v-slot:name>保存</template>
          </button-dialog>-->
          </div>
        </el-tabs>

        <el-dialog width="30%" title="新增课程" :visible.sync="classVisible" append-to-body>
          <div class="form">
            <el-form ref="newClassItem" :model="newClassItem" v-loading="loading" label-width="120px" >
              <el-form-item prop="type" label="类型:">
                <el-select v-model="newClassItem.type" placeholder="请选择">
                  <el-option  label="本科生课程" value="1"></el-option>
                  <el-option  label="研究生课程" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="courseName" label="课程名称:">
                <el-input v-model="newClassItem.courseName" clearable></el-input>
              </el-form-item>
              <el-form-item prop="schoolYear" label="学年:">
<!--                <el-date-picker v-model="newClassItem.schoolYear" type="date"  placeholder="选择日期" ></el-date-picker>-->
                <el-input v-model="newClassItem.schoolYear" clearable></el-input>
              </el-form-item>
              <el-form-item prop="semester" label="学期:">
                <el-select v-model="newClassItem.semester" placeholder="请选择">
                  <el-option  label="第一学期" value="1"></el-option>
                  <el-option  label="第二学期" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop='theoryHours' label="理论学时:">
                <el-input v-model="newClassItem.theoryHours" clearable></el-input>
              </el-form-item>
              <el-form-item prop='practiceHours' label="实践学时:">
                <el-input v-model="newClassItem.practiceHours" clearable></el-input>
              </el-form-item>
              <el-form-item prop='credit' label="学分:">
                <el-input v-model="newClassItem.credit"></el-input>
              </el-form-item>
              <el-form-item prop='courseNum' label="课程号:">
                <el-input v-model="newClassItem.courseNum"></el-input>
              </el-form-item>

              <el-form-item  class="bottom_right">
                <el-button type="primary" @click='insertClass'>提  交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>

        <el-dialog width="30%" title="新增" :visible.sync="itemVisible" append-to-body>
          <div class="form">
            <el-form ref="newItem" :model="newItem" v-loading="loading" label-width="120px" >
              <el-form-item prop="item" label="内容:">
                <el-input v-model="newItem.item" type="textarea" clearable></el-input>
              </el-form-item>

              <el-form-item  class="bottom_right">
                <el-button type="primary" @click='insertItem'>添  加</el-button>
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
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'teach',
    components:{
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        newItem:{},
        newClassItem:{},
        classVisible: false,
        itemVisible: false,
        activeName1:'',
        activeName:'first',
        edit:false,

        loading:false,
        teach:{},
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
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/initInfo/' + this.$store.state.user.version).then(res=>{
          // console.log(res)
          const data = res.data.data

          if (res.data.data != null){
            this.teach = data.teach
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
      //编辑
      handleEditItem(index, row) {
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/updateTeachItem',
          row).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //删除
      handleDeleteItem(index, row) {
        this.$http.delete(this.global.baseUrl + 'UI/api/ui/teaching/deleteTeachItem/' + row.id).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      insertItem(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/insertTeachItem/' + this.newItem.parentId, this.newItem).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      handleInsertItem(type) {
        if (type === 1){
          this.newItem.parentId = this.teach.research
          this.newItem.type = type
        }
        if (type === 2){
          this.newItem.parentId = this.teach.resources
          this.newItem.type = type
        }
        if (type === 3){
          this.newItem.parentId = this.teach.achievements
          this.newItem.type = type
        }
        this.itemVisible = true
      },
      //编辑
      handleEditClass(index, row) {
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/updateTeachClass',
          row).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //删除
      handleDeleteClass(index, row) {
        this.$http.delete(this.global.baseUrl + 'UI/api/ui/teaching/deleteTeachClass/' + row.id).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      insertClass(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/teaching/insertTeachClass/' + this.teach.classInfo, this.newClassItem).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      handleInsertClass() {
        this.classVisible = true
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
