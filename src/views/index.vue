<template>
    <div>
      <!--<h1 style="text-align: center">欢迎使用高校学院级教师基础信息管理系统</h1>-->
      <textNeon style="text-align: center"/>
      <h2>系统简介</h2>
      在高校日常管理过程中，教师经常被要求重复性填写繁琐的Word或Excel格式的个人信息表格，
      通常这些信息包括个人基础信息、受教育情况、工作情况、家庭情况、教学活动相关信息、科研活动相关信息、获奖信息等。
      一方面，重复填写这些信息增加了教师的工作量；另一方面，这些信息需要根据实际情况进行更新。<br/>
      ***大学教师个人主页系统是为***大学的教职员工提供展示教学和科研信息的平台，
      一方面可以方便访者查找教师相关的个人简历信息、科研成果和研究方向，另一方面教师网上风采展示，
      也是树立和打造高校品牌的重要支撑。
      <h2>功能介绍</h2>
      1、系统实现对教师个人基础信息、受教育情况、工作情况、家庭情况、教学活动相关信息、科研活动相关信息、获奖信息等管理。<br/>
      2、系统支持组织机构管理，可以根据学校实际情况由管理员设置行政机构和教学单位的情况。<br/>
      3、系统支持管理员的多级授权，能够实现基于角色的资源管理。<br/>
      4、考虑到可扩展性，可以提供统一的数据访问接口，实现与其他系统的信息交换。<br/>
      5、系统支持定制模板，实现可定制化的信息导出，导出格式支持Word和Excel。<br/>

      <el-carousel indicator-position="outside"    style="background-color: #52e7d3">
        <el-carousel-item v-for="item in titles" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!--<div>
        组件
        <aList/>
        <backButton/>
        <checkList/>
        <contact/>
        <frostedGlass/>
        <glassLightButton/>
        <hdialog/>
        <lineButton/>
        <linesButton/>
        <loadingDot/>
        <loadingMoon/>
        <scene/>
        <showJson/>
        <snowBack/>
        <textNeon/>
        <textScreen/>
      </div>-->
    </div>
</template>

<script>
  import aList from '@/components/template/h/aList'
  import backButton from '@/components/template/h/backButton'
  import checkList from '@/components/template/h/checkList'
  import contact from '@/components/template/h/contact'
  import frostedGlass from '@/components/template/h/frostedGlass'
  import glassLightButton from '@/components/template/h/glassLightButton'
  import hdialog from '@/components/template/h/hdialog'
  import lineButton from '@/components/template/h/lineButton'
  import linesButton from '@/components/template/h/linesButton'
  import loadingDot from '@/components/template/h/loadingDot'
  import loadingMoon from '@/components/template/h/loadingMoon'
  import scene from '@/components/template/h/scene'
  import showJson from '@/components/template/h/showJson'
  import snowBack from '@/components/template/h/snowBack'
  import textNeon from '@/components/template/h/textNeon'
  import textScreen from '@/components/template/h/textScreen'
  export default {
    name: 'home',
    components:{
      aList,
      backButton,
      checkList,
      contact,
      frostedGlass,
      glassLightButton,
      hdialog,
      lineButton,
      linesButton,
      loadingDot,
      loadingMoon,
      scene,
      showJson,
      snowBack,
      textNeon,
      textScreen,
    },
    data()  {
        return  {
          news:[],
          titles:['系统简介','功能介绍','使用情况'],
          contents:[],
        }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
</style>
