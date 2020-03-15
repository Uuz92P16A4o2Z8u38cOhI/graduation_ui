<template>
    <div class="drawer">
      <el-drawer title="角色资源管理" :visible.sync="drawer" :before-close="handleClose">
        <el-tabs type="border-card" style="height: 100%">
          <el-tab-pane label="后端资源">
            <el-tree :data="roleResourceTree" show-checkbox default-expand-all node-key="id"
                     ref="tree" highlight-current :props="defaultProps">
            </el-tree>
          </el-tab-pane>
          <el-tab-pane label="目录资源">
            <el-tree :data="roleMenuTree" show-checkbox default-expand-all node-key="id"
                     ref="tree" highlight-current :props="defaultProps">
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
</template>

<script>
  export default {
    name: 'drawer',
    props:{
      drawer: Boolean,
    },
    data() {
      return {
        roleResourceTree: [],
        roleMenuTree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('closeDrawer')
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>
  .el-drawer__header{
    margin-bottom: 0 !important;
    padding: 20px !important;
    background: #0acffe;
  }
</style>
