<template>
  <div class="teach">
    <span class="title"><i class="el-icon-reading" style="font-size: 24px" />教学活动 <span style="font-style: oblique; font-weight: initial ">Teaching Activities</span> </span>
    <div class="teach block">
      <span class="title">教学研究</span>
      <div v-if="research == null || research.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol>
          <li v-for="item in research"> {{item.item}}</li>
        </ol>
      </div>
    </div>
    <div class="teach block">
      <span class="title">教学资源</span>
      <div v-if="resources == null || resources.length == 0" style="text-align: center"> <span >暂无数据</span></div>
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
              <el-table-column prop="semester" label="学期" align='center' sortable/>
              <el-table-column prop="hours" label="学时" align='center' sortable/>
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
            <el-table-column prop="semester" label="学期" align='center' sortable/>
            <el-table-column prop="hours" label="学时" align='center' sortable/>
            <el-table-column prop="credit" label="学分" align='center' sortable/>
            <el-table-column prop="courseNum" label="课程号" align='center' sortable/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="teach block">
      <span class="title">教学成果</span>
      <div>
        <div v-if="achievements == null || achievements.length == 0" style="text-align: center"> <span >暂无数据</span></div>
        <ol>
          <li v-for="item in achievements"> {{item.item}}</li>
        </ol>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: 'teach',
    data() {
      return {
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
          this.undergraduateTable = data.undergraduate
          this.postgraduateTable = data.postgraduate
          this.research = data.research
          this.resources = data.resources
          this.achievements = data.achievements
        })
      }
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
</style>
