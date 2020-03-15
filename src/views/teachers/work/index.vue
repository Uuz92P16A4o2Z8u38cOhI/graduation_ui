<template>
  <div class="work">
    <div class="timelines">
      <span @click="changeReverse" class="title"><i class="el-icon-data-analysis" style="font-size: 28px;" />工作经历  <span style="font-style: oblique; font-weight: initial;">Work Experience</span> </span>

      <el-timeline :reverse="reverse" class="timeline" >
        <el-timeline-item timestamp="2018/4/12——2018/4/12" placement="top" size="large" icon="el-icon-time" color="#909399">
          <el-card>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="工作地点 - 职位 " name="1" class="collapse">
                <div >起讫时间                              <span class="details">2022/5/4</span></div>
                <div style="background: #E9E9E9;">职位(职称)<span class="details">qwqw</span></div>
                <div >工作单位                              <span class="details">wqwq</span></div>
                <div style="background: #E9E9E9;">学院      <span class="details" style="margin-left: 75px">qwqw</span></div>
                <div >学科                                  <span class="details" style="margin-left: 75px">qwqw</span></div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'work',
    data() {
      return {
        reverse: false,
        activeName: [1],
      };
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      }
    }
  }
</script>

<style scoped>
  .work .timelines{
    /*margin: 10px;
    padding: 10px;*/
    width: 60%;
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
</style>
