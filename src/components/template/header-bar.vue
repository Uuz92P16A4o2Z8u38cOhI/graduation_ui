<template>
  <div class="header-bar">
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu  class="el-menu-demo" text-color="#fff" background-color="rgb(144,147,154)"
                active-text-color="#ffd04b" mode="horizontal" >
        <el-menu-item index="1" @click="$router.push('/')"><i class="iconfont icon-zhuye" style="color: #ffffff"/></el-menu-item>
        <el-menu-item index="2" @click="openLink(user.blog)"><i class="iconfont icon-zhuye" style="color: #ffffff"/></el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo"  text-color="#ffd04b" background-color="rgb(144,147,154)" mode="horizontal">
        <el-menu-item index="3" v-popover:popover-message>
          <!-- 我的私信 -->
          <el-badge :value="5" :max="99" class="badge">
            <li style="color:#fff;" class="el-icon-message"/>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">

          </el-popover>
        </el-menu-item>
        <el-menu-item index="4" v-popover:popover-notice>
          <!-- 系统通知 -->
          <el-badge :value="4" :max="99" class="badge">
            <li style="color:#fff;" class="el-icon-bell"/>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">

          </el-popover>
        </el-menu-item>
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info">
            <img src="" />
            {{user.name}}
          </span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <person-info :user="user"/>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
  import personInfo from '@/components/template/personal/person-info'
export default {
  name: 'header-bar',
  components: {
    personInfo,
  },
  data() {
    return {
      user: {
        name : '云龙',
        avatar: '@/assets/avatar.jpg',
        blog: 'https://www.baidu.com'
      },

    }
  },
  methods: {
    openLink(url){
      if(url.length === 0){
        this.$message.warning('您未设置博客地址')
      }else{
        window.open(url)
      }

    }
  },
  mounted() {},
  computed: {}
}
</script>

<style scoped>
.header-bar {
  /*position: fixed;*/
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-left-width: 1px;
  border-left-style: solid;
  background-color: rgb(144, 147, 154);
}
.hamburg {
  float: left;
}
.navbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin: 10px 0px 10px 10px;
  float: right;
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>
