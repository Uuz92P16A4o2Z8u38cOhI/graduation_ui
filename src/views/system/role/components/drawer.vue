<template>
    <div class="drawer">
      <el-drawer title="角色资源管理" :visible.sync="drawer" :before-close="handleClose">
        <el-tabs type="border-card" style="height: 100%">
          <el-tab-pane label="后端资源" v-if="type === 0">
            <div class="btn">
              <button-dialog @checkedRole="updateRolePermission">
                <template v-slot:title>确定更新?</template>
                <template v-slot:name>更新角色资源</template>
              </button-dialog>
            </div>
            <el-scrollbar>
              <div style="max-height: 720px">
                <el-tree :data="roleResourceTree" show-checkbox default-expand-all node-key="id" :default-checked-keys="pIds"
                         ref="resourceTree" highlight-current :props="defaultProps" empty-text="暂时无数据">
                </el-tree>
              </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="目录资源" v-if="type === 1">
            <div class="btn">
              <button-dialog @checkedRole="updateRoleMenu">
                <template v-slot:title>确定更新?</template>
                <template v-slot:name>更新角色菜单</template>
              </button-dialog>
            </div>
            <el-scrollbar>
              <div style="max-height: 720px">
                <el-tree :data="roleMenuTree" show-checkbox default-expand-all node-key="id" :default-checked-keys="mIds"
                         ref="menuTree" highlight-current :props="defaultProps" empty-text="暂时无数据">
                </el-tree>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
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
      type: Number,
    },
    data() {
      return {
        roleResourceTree: [],
        roleMenuTree: [],
        mIds: [],
        pIds: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      };
    },
    watch:{
      userId(val){
        // console.log(val)
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
        this.$http.post(this.global.baseUrl + "SYS/api/sys/permission/tree/" + this.userId).then(res=>{
          this.roleResourceTree = res.data.data.sortPermissionList
          this.roleMenuTree = res.data.data.sortMenuList
          this.mIds = res.data.data.mIds
          this.pIds = res.data.data.pIds
        })
      },
      updateRolePermission(){
        var ids = this.$refs.resourceTree.getCheckedKeys()
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/permission/multipleInsertRolePermission/' + this.userId,
          ids).then(res=>{
          this.$message.success(res.data.message)
        })
      },
      updateRoleMenu() {
        var ids = this.$refs.menuTree.getCheckedKeys()
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/permission/multipleInsertRoleMenu/' + this.userId,
          ids).then(res=>{
          this.$message.success(res.data.message)
        })
      },
    }
  }
</script>

<style scoped>
  .el-drawer__header{
    margin-bottom: 0 !important;
    padding: 20px !important;
    background: #0acffe;
  }
  .btn{
    margin: 0 200px 10px ;
  }
</style>
