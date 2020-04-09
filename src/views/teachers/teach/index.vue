<template>
  <div class="teach">
    <span class="title"><i class="el-icon-reading" style="font-size: 24px" />教学活动 <span style="font-style: oblique; font-weight: initial ">Teaching Activities</span> </span>
    <div class="teach block">
      <span class="title">教学研究</span>

    </div>
    <div class="teach block">
      <span class="title">教学资源</span>

    </div>
    <div class="class-info block">
      <span class="title">授课信息</span>
      <el-tabs type="border-card">
        <el-tab-pane label="本科生课程">
          <span slot="label"><i class="el-icon-notebook-1"></i> 本科生课程</span>
          <div class="table_container">
            <el-table v-loading="loading" :data="undergraduateTable" style="width: 100%" align='center' class="table"
                      :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}">
              <el-table-column prop="name" label="课程名称" align='center' sortable/>
              <el-table-column prop="name" label="学年" align='center' sortable/>
              <el-table-column prop="name" label="学期" align='center' sortable/>
              <el-table-column prop="name" label="学时" align='center' sortable/>
              <el-table-column prop="name" label="学分" align='center' sortable/>
              <el-table-column prop="name" label="课程号" align='center' sortable/>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="研究生课程">
          <span slot="label"><i class="el-icon-notebook-2"></i> 研究生课程</span>
          <el-table v-loading="loading" :data="postgraduateTable" style="width: 100%" align='center'
                    :header-cell-style="{'color': 'rgb(18,104,154)','font-size':'18px',
                      'border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#d9f3fa'}">
            <el-table-column prop="name" label="课程名称" align='center' sortable/>
            <el-table-column prop="name" label="学年" align='center' sortable/>
            <el-table-column prop="name" label="学期" align='center' sortable/>
            <el-table-column prop="name" label="学时" align='center' sortable/>
            <el-table-column prop="name" label="学分" align='center' sortable/>
            <el-table-column prop="name" label="课程号" align='center' sortable/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="teach block">
      <span class="title">教学成果</span>

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
