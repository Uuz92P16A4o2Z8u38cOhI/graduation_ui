<template>
  <div class="education">
    <div class="timelines">
      <span @click="changeReverse" class="title"><i class="iconfont icon-jiaoyu" style="font-size: 28px" />教育经历 <span style="font-style: oblique; font-weight: initial ">Education Experience</span> </span>

      <el-timeline :reverse="reverse" class="timeline" >
        <el-timeline-item timestamp="2018/4/12——2018/4/12" placement="top" size="large" icon="el-icon-time" color="#909399">
          <el-card>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="学校 - 学历 " name="1" class="collapse">
                <div >起讫时间                             <span class="details">2022/5/4</span></div>
                <div style="background: #E9E9E9;">所学专业 <span class="details">qwqw</span></div>
                <div >学习机构                             <span class="details">wqwq</span></div>
                <div style="background: #E9E9E9;">学历     <span class="details" style="margin-left: 75px">qwqw</span></div>
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
    name: 'education',
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
 .education .timelines{
  /*margin: 10px;
  padding: 10px;*/
  width: 60%;
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

</style>
