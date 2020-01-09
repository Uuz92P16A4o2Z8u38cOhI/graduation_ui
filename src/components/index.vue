<template>
  <div class="app">
    <el-container>
      <el-aside :width="collapse?'65px':'220px'" >
        <aside-bar @myCollapse="collapseEvent"/>
      </el-aside>

      <el-container >
        <el-header>
          <header-bar />
        </el-header>

        <el-main style="background: #665456">
          <router-view />
        </el-main>
      </el-container>

      <!--<el-footer style="height: auto">
        <footer-bar></footer-bar>
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
export default {
  name: 'index',
  components: {},
  data() {
    return {
      collapse: false,
    }
  },
  methods: {

    logout() {
      window.sessionStorage.clear()
      Cookies.clear()
      this.$router.push('/login')
    },

    collapseEvent(val){
      this.collapse = val
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../assets/css/index.css';
</style>
