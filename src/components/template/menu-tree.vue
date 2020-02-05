<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
    <template slot="title">
      <i :class="menu.icon" />
      <span slot="title">{{menu.name}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
    <i :class="menu.icon" />
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
  import  '@/assets/icon/menu/iconfont.css'
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleRoute(menu) {
      // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu.path)
      if (!path) {
        path = menu.path
      }
      /*if(path.startsWith("/service/")){
        this.$router.push('/service/index')
      }*/
      // 通过菜单URL跳转至指定路由
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
</style>
