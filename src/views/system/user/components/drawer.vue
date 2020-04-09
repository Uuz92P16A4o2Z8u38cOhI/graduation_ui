<template>
    <div class="drawer">
      <el-drawer title="用户角色管理" :visible.sync="drawer" :before-close="handleClose">
        <el-card class="card">
          <el-tree :data="adminData" show-checkbox default-expand-all node-key="id"
                   :default-checked-keys="checked" ref="tree" highlight-current :props="defaultProps"
                   empty-text="没有可展示角色">
          </el-tree>
        </el-card>
        <el-card class="card">
          <el-tree :data="webData" show-checkbox default-expand-all node-key="id"
                   :default-checked-keys="checked" ref="tree" highlight-current :props="defaultProps"
                   empty-text="没有可展示角色">
          </el-tree>
        </el-card>


      </el-drawer>
    </div>
</template>

<script>
  export default {
    name: 'drawer',
    props:{
      drawer: Boolean,
      userId: Number,
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        adminData:[],
        webData:[],
        checked:[],
      };
    },
    mounted() {

    },
    watch:{
      userId(val){
        this.initInfo()
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('closeDrawer')
          })
          .catch(_ => {});
      },

      initInfo(){
        this.$http.post(this.global.baseUrl + "SYS/api/sys/role/queryByUserId/" + this.userId).then(res=>{
          this.adminData = res.data.data.sortAdminList
          this.webData = res.data.data.sortWebList
          this.checked = res.data.data.ids
        })
      }
    }
  }
</script>

<style scoped>
.card{
  padding: 10px;
  margin: 30px 20px;
}
</style>
