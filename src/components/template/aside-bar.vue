<template>
    <div class="aside-bar menu-bar-container">
      <!-- logo -->
      <div class="logo" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" @click="isCollapsed" >
        <img v-if="collapse" src="@/assets/logo.png" alt="折叠" />
        <div class="title">{{collapse?'':appName}}</div>
      </div>
      <!-- 导航菜单 -->
      <el-menu ref="navmenu" default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
        :collapse="collapse" :collapse-transition="false" :unique-opened="true" background-color="#296983">
        <!-- 导航菜单树组件，动态加载菜单 -->
        <menu-tree v-for="item in menuList" :key="item.id" :menu="item" />
      </el-menu>
    </div>
</template>

<script>
import MenuTree from '@/components/template/menu-tree'
export default {
  name: 'aside-bar',
  components: {
    MenuTree
  },
  data(){
    return {
      appName: '高校学院级教师基础信息管理系统',
      collapse: false,
      menuList:[],
    }
  },
  computed: {},
  watch: {

  },
  created() {

  },
  mounted() {
    this.getMenu();
  },
  methods: {
    isCollapsed() {
      this.collapse = !this.collapse
      this.$emit("myCollapse",this.collapse)
    },
    getMenu(){
      this.$http.get("/static/menu.json").then((res)=>{
        this.menuList = res.data.data;
        console.log(res.data);
      }).catch ((err)=>{
        console.log(err);
        this.$message.error('菜单请求失败')
      })
    }

  }
}
</script>

<style scoped>
  .aside-bar{
    width: auto;
  }
.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1020;
}
.menu-bar-container .el-menu {
  position: absolute;
  top: 60px;
  bottom: 0px;
  text-align: left;
}
.menu-bar-container .logo {
  position: absolute;
  top: 0;
  height: 60px;
  line-height: 60px;
  background: #644c2e;
  cursor: pointer;
}
.menu-bar-container .menu-bar-width {
  width: 220px;
}
.menu-bar-container .menu-bar-collapse-width {
  width: 65px;
}
.menu-bar-container img {
  width: 40px;
  height: 40px;
  border-radius: 0;
  margin: 10px 10px 10px 10px;
  float: left;
}
.menu-bar-container div {
  font-size: 22px;
  color: white;
  text-align: left;
}
.menu-bar-container .logo .title{
  font-size: 14px;
  text-align: center;
}
</style>
