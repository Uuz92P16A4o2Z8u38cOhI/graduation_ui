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
  import Cookies from 'js-cookie'
  import qs from 'qs'
  import router from '../router'
export default {
  name: 'index',
  components: {},
  data() {
    return {

    }
  },
  beforeCreate() {
    const token = Cookies.get('access_token')
    this.$http.post('http://client:secret@localhost:9055/oauth/check_token', qs.stringify({"token" : token})).then((res) => {
      const userInfo = JSON.parse(res.data.user_name)
      this.$store.commit('setUserId',userInfo.id)
    }).catch ((err)=>{
      console.log(err)
      this.$message.error('用户身份错误 请重新登陆！')
      router.push('/login')
    })
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
      collapse : state => state.app.collapse,
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
    background: #f0f2f5;
  }
</style>
