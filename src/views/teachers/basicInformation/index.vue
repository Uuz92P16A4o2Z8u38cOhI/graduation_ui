<template>
  <div class="basicInformation">
    <div class="avatar">
      <div class="avatarPic">
        <span class="title">{{user.name}}</span>
        <el-avatar shape="square" :size="150" :fit="fit" :src="user.avatarUrl"/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'basicInformation',
    data() {
      return {
        user:'',

      }
    }
  }
</script>

<style scoped>
  .basicInformation{
    margin: 10px;
    padding: 4px;
  }
  .basicInformation .avatar .avatarPic{
    width: 150px;
    height: 150px;
    padding: 0;
    margin: 30px;
    border: #b4d5d6 solid;
  }
</style>
