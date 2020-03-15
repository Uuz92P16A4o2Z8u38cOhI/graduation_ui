<template>
  <div class="research">
    <span class="title"><i class="iconfont icon-keyan" style="font-size: 24px" />科研活动 <span style="font-style: oblique; font-weight: initial ">Research Activities</span> </span>

    <div class="block">
      <span class="title">研究领域(研究成果)</span>

    </div>
    <div class="block">
      <span class="title">论文成果</span>

    </div>
    <div class="block">
      <span class="title">专利</span>

    </div>
    <div class="block">
      <span class="title">著作成果</span>

    </div>
    <div class="block">
      <span class="title">科研项目</span>

    </div>
    <div class="block">
      <span class="title">科研团队</span>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'research'
  }
</script>

<style scoped>
.research .title{
  font-size: 24px;
  font-weight: bold;
}
.research .block{
  margin: 30px 0;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.research .block .title{
  font-size: 20px;
}
</style>
