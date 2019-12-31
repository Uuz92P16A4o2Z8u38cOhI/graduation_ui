<template>
  <div>
    <el-menu>
      <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="item.domIcon"></i>
          <span slot="title">{{item.name}}</span>
        </template>

        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
          <template slot="title">
            <i :class="subItem.domIcon"></i>
            <span slot="title">{{subItem.name}}</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <!-- <div v-for="item in menuList" :key="item">
        <div v-if="item.children === null">
          <el-menu-item>
            <template slot="title">
              <i :class="subItem.domIcon"></i>
              <span slot="title">{{subItem.name}}</span>
            </template>
          </el-menu-item>
        </div>
        <div v-else>
          <el-submenu>
            <el-menu-item>
              <template slot="title">
                <i :class="subItem.domIcon"></i>
                <span slot="title">{{subItem.name}}</span>
              </template>
            </el-menu-item>
            <menu-tree></menu-tree>
          </el-submenu>
        </div>
      </div> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menu-tree',
  data() {
    return {
      menuList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await this.$http.post('qc/menutreeService/menuInfo')
      this.menuList = res.data
    }
  },
  created() {}
}
</script>
 
<style scoped>
</style>