<template>
  <div class="app">
    <el-container>
      <el-aside :width="collapse?'65px':'220px'" >
        <aside-bar/>
      </el-aside>

      <el-container >
        <el-header>
          <header-bar/>
        </el-header>

        <el-main >
          <main-content/>
        </el-main>
      </el-container>

      <!--<el-footer style="height: auto">
        <footer-bar></footer-bar>
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'index',
  components: {},
  data() {
    return {

    }
  },
  methods: {
    //父传子 折叠
    /*collapseEvent(val){
      this.collapse = val
      console.log(val)
    }*/
  },
  computed : {
    ...mapState({
      collapse : state => state.app.collapse
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './../assets/css/index.css';
  .el-main{
    position: relative;
    padding: 0;
  }
</style>
