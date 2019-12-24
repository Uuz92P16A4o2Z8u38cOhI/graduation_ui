<template>
  <div class="app">
    <el-container>
      <el-header>
        <header-bar/>
      </el-header>
      <el-container>
        <el-aside>
          <aside-bar/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <!--<el-footer style="height: auto">
        <footer-bar></footer-bar>
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        message : "123456789"
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./../assets/css/index.css";
</style>
