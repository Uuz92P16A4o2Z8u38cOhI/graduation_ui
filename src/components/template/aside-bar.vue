<template>
    <div class="aside-bar menu-bar-container" >
      <!-- logo -->
      <div class="logo" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" @click="onCollapsed" :style="{'background-color': themeColor}">
        <img v-if="collapse" :src="schoolIcon" alt="折叠" />
        <div class="title">{{collapse?'':appName}}</div>
      </div>
      <!-- 导航菜单 -->
      <el-menu ref="navmenu" default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
               :background-color="themeColor" text-color="#ffffff" active-text-color="#ffd04b"
               :collapse="collapse" :collapse-transition="false" :unique-opened="true"  >
        <!-- 导航菜单树组件，动态加载菜单 -->
        <menu-tree v-for="item in navTree" :key="item.id" :menu="item" />
      </el-menu>
    </div>
</template>

<script>
import MenuTree from '@/components/template/menu-tree'
import {mapState} from 'vuex'
import Cookies from 'js-cookie'
import router from '../../router'
export default {
  name: 'aside-bar',
  components: {
    MenuTree
  },
  data(){
    return {
      appName: '高校学院级教师基础信息管理系统',
      menuList:[],
    }
  },
  computed: {
    ...mapState({
      schoolIcon : state => state.user.schoolIcon,
      collapse : state => state.app.collapse,
      navTree : state => state.menu.navTree,
      themeColor : state => state.app.themeColor,
      userId : state => state.user.userId
    }),
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
  watch: {
    $route: 'handleRoute',
    userId(val){
      if (typeof (val) !== "undefined"){
        this.schoolInfo();
        this.getMenu();
      }
    }
  },
  created() {
    this.handleRoute(this.$route)
  },
  mounted() {
    /*if (this.navTree.length  === 0){
      this.getMenu();
    }*/
    // this.schoolInfo();
    // this.getMenu();
  },
  methods: {
    onCollapsed: function() {
      this.$store.commit('onCollapse');
    },
    /*isCollapsed() {
      this.collapse = !this.collapse
      this.$emit("myCollapse",this.collapse)
    },*/
    schoolInfo(){
      this.$http.post(this.global.baseUrl + 'UI/api/ui/basicInfo/querySchoolInfo/' + this.$store.state.user.userId).then(res=>{
        this.$store.commit('setSchoolIcon', this.global.imgUrl + res.data.data.icon)
      }).catch(err=>{
        console.log(err);
        this.$message.error('学校信息获取失败')
      })
    },
    getMenu(){
      this.$http.post(this.global.baseUrl+"SYS/api/sys/menu/menuInfo/"+this.$store.state.user.userId).then((res)=>{
      /*this.$http.get(this.global.baseUrl+"UI/api/ui/menuTree/menuInfo").then((res)=>{*/
        this.menuList = res.data;
        this.$store.commit('setNavTree', res.data)
        // console.log(res.data);
      }).catch ((err)=>{
        console.log(err);
        this.$message.error('菜单请求失败')
      })
    },


    // 路由操作处理
    handleRoute (route) {
      // tab标签页选中, 如果不存在则先添加
      var tab = this.mainTabs.filter(item => item.name === route.name)[0]
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        }
        this.mainTabs = this.mainTabs.concat(tab)
      }
      this.mainTabsActiveName = tab.name
      // 切换标签页时同步更新高亮菜单
      if(this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = '' + route.meta.index
        this.$refs.navmenu.initOpenedMenu()
      }
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
  /*background: rgb(144,147,154);*/
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
