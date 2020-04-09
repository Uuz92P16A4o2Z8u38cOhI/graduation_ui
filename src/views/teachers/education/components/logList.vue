
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="header-title">
        <span>版本管理：</span>
      </div>

      <div class="logArea el-scrollbar">
        <div class="item" v-for="i in versions">
          <p class="timeArea">
            <span class="title">上传时间：</span>
            <span class="title time">{{timestamp2Date(i.uploadTime)}}</span>
          </p>
          <div class="versions">
            <span class="title">版本号：</span>
            <span class="title time">{{i.version}}</span>
          </div>
          <div class="operating">
            <span class="title">操作：</span>
            <span @click="view(i)"><line-button><div>查看</div></line-button></span>
            <span><line-button style="color: #0acffe"><div>下载</div></line-button></span>
          </div>
          <el-divider/>
        </div>
      </div>

  </el-card>
  </div>
</template>

<script>
  import lineButton from '@/components/template/hyl/button/lineButton'
  export default {
    name:'logList',
    components:{
      lineButton,
    },
    data() {
      return {
        versions : [],
      };
    },
    mounted() {
      this.getVersions()
    },
    methods :{
      //获取所有版本号
      getVersions(){
        this.$http.get(this.global.baseUrl + 'UI/api/ui/education/allVersion/' + this.$store.state.user.userId).then(res=>{
          this.versions = res.data.data
        })
      },
      view(param){
        this.$emit('version',param)
      },


      //时间格式化
      timestamp2Date(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
      },
    }
  }
</script>

<style scoped>
.logContainer{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    height:600px;
    max-height: 600px;
    overflow: hidden;
    border-radius: 6px;
}
.logContainer .header-title{
  font-size: 20px;
}
.logContainer .logArea{
  overflow: auto;
  height: 100%;
}

.logContainer .item .title{
  font-size: 16px;
}

.logContainer .item .time{
  color:#87DE75;
}


</style>

