<template>
  <div style="height: 100%">
    <h1>服务治理列表</h1>

    <iframe :src="url" scrolling="auto" width="100%" height="100%" frameborder="0" ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'service',
    data(){
      return{
        url: '',
      }
    }
  }
</script>

<style scoped>

</style>
