<template>
  <div>
    教学单位
    <div class="content">
      <el-row :gutter="12">
        <el-col :span="8" v-for="item in unitList" :key="item.id">
          <el-card shadow="hover" @click="drawer = true">
            <img :src="item.icon" class="image" @click="drawer = true">
            <span class="title" @click="drawer = true" >{{item.name}}</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-drawer
      title="内容"
      :visible.sync="drawer"
      :before-close="handleClose"
      size="50%">
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'unit',
    data() {
      return {
        unitList: [],
        drawer: false,
        innerDrawer: false,
      };
    },
    mounted() {
      this.getAllUnit();
    },
    methods: {
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getAllUnit(){
        const id = 10621
        this.$http.get(this.global.baseUrl +'UI/api/ui/teachUnit/queryAll/'+ id).then((res)=>{
          this.unitList = res.data;
          //console.log(res.data);
        }).catch (err => {
          console.log(err);
          this.$message.eerror("请求出现错误");
        });
      }
    }
  }
</script>

<style scoped>
  .el-card{
    margin: 10px 2px;
    /*text-align: center;*/
  }
  .content{
    margin: 20px 30px;
  }
  .image {
    height: 50px;
    display: inline-block;
    cursor: pointer;
  }
  .title{
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;
  }
</style>
