<template>
    <div class="drawer">
      <el-drawer title="用户角色管理" :visible.sync="drawer" :before-close="handleClose">
        <el-tree :data="data" show-checkbox default-expand-all node-key="id"
          ref="tree" highlight-current :props="defaultProps">
        </el-tree>
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

</style>
