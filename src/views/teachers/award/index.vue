<template>
  <div>
    这是获奖信息页面
    <div class="block">
      <i class="el-icon-sort" @click="changeReverse" />
      <el-timeline :reverse="reverse">
        <el-timeline-item timestamp="2018/4/12" placement="top" >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'award',
    data(){
      return {
        reverse: false,
      }
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      }
    }

  }
</script>

<style scoped>

</style>
