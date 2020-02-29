<template>
    <div class="drawer">
      <el-drawer title="角色资源" :visible.sync="drawer" :before-close="handleClose">
        <span>我来啦!</span>
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
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style scoped>

</style>
