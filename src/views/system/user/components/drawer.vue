<template>
    <div class="drawer">
      <el-drawer title="用户角色管理" :visible.sync="drawer" :before-close="handleClose">
        <div class="upRole">
          <button-dialog @checkedRole="updateUserRole">
            <template v-slot:title>确定更新?</template>
            <template v-slot:name>更新用户角色</template>
          </button-dialog>
        </div>

        <el-card class="card">
          <el-tree :data="adminData" show-checkbox default-expand-all node-key="id"
                   :default-checked-keys="checked" ref="adminTree" highlight-current :props="defaultProps"
                   empty-text="没有可展示角色">
          </el-tree>
        </el-card>
        <el-card class="card">
          <el-tree :data="webData" show-checkbox default-expand-all node-key="id"
                   :default-checked-keys="checked" ref="webTree" highlight-current :props="defaultProps"
                   empty-text="没有可展示角色">
          </el-tree>
        </el-card>


      </el-drawer>
    </div>
</template>

<script>
  import buttonDialog from '../../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'drawer',
    components:{
      buttonDialog,
    },
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
      },
      updateUserRole(){
        var ids = this.$refs.adminTree.getCheckedKeys()
        var b = this.$refs.webTree.getCheckedKeys()
        ids.push.apply(ids, b)
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/role/multipleInsertUserRole/' + this.userId,
        ids).then(res=>{
          this.$message.success(res.data.message)
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
  .upRole{
    text-align: center;
  }
</style>
