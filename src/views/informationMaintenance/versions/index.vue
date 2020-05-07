<template>
  <div class="version">
    <span class="title"><i class="el-icon-copy-document" style="font-size: 24px"></i>版本管理 <span style="font-style: oblique; font-weight: initial ">Version Management</span></span>

    <div class="version-content">

      <div class="block">
        <span style="text-align: center" v-if="this.versions.length === 0">您还没有保存的版本哦！！</span>
        <el-timeline class="timeline">
          <el-timeline-item :timestamp="timestamp2Date(item.time)"  v-for="item in versions" :key="item.id"
                            placement="top" size="large" icon="el-icon-star-on" color="#909399">
            <el-card >
              <el-row :gutter="20">
                <el-col :span="16" class="col">
                  <div class="info">
                    <h4>版本名称 : {{item.name}}</h4>
                    <span>版本号 : {{item.sign}}</span>
                    <p><u>备注信息 : {{item.remarks}}</u></p>
                  </div>
                </el-col>
                <el-col :span="8" class="col">
                  <div class="operating">
<!--                    <el-button type="primary" icon="el-icon-edit" @click="edit(item.id)" circle></el-button>-->
                    <el-button type="success" icon="el-icon-video-camera" @click="shows(item.id, item.name, item.sign)" circle></el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>


      </div>

    </div>

    <el-dialog title="新增版本" :visible.sync="insert" width="30%" :before-close="handleClose">
      <div class="form" style="text-align: center">
        <el-form ref="newItem" :model="newItem" v-loading="loading" label-width="120px" >
          <el-form-item prop="item" label="版本名称:">
            <el-input v-model="newItem.name"  clearable></el-input>
          </el-form-item>
          <el-form-item prop="item" label="版本号:">
            <el-input v-model="newItem.sign"  clearable></el-input>
          </el-form-item>
          <el-form-item prop="item" label="备注信息:">
            <el-input v-model="newItem.remarks" type="textarea"  clearable></el-input>
          </el-form-item>
          <button-dialog @checkedRole="saveVersion">
            <template v-slot:title>确定保存此版本？?</template>
            <template v-slot:name>版本保存</template>
          </button-dialog>
        </el-form>
      </div>
    </el-dialog>

    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-circle-plus-outline" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  import floatIcons from '../../teachers/floatIcons'
  export default {
    name: 'version',
    components:{
      floatIcons,
      buttonDialog,
    },
    data() {
      return {
        loading: false,
        insert:false,
        versions: [],
        newItem: {},
      };
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/version/selectAll/' + this.$store.state.user.userId ).then(res=>{
          // console.log(res)
          this.versions = res.data.data
        })
      },
      saveVersion(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/version/save/' + this.$store.state.user.userId,
        this.newItem).then(res=>{
          this.$message.info(res.data.message)
          this.getInitInfo()
        })
      },
      edit(){

      },
      shows(id, name, sign){
        this.$store.commit('setVersion', id)
        this.$store.commit('setVersionName', name + '<' + sign + '>')
      },
      showEdit(){
        this.insert = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      }
    },

  }
</script>

<style scoped>
  .version .title{
    font-size: 24px;
    font-weight: bold;
  }
  .version .version-content{

  }
  .version .version-content .block{
    margin: 30px;
  }

  .version .version-content .info h4{
    font-size: 18px;
    margin: 10px;
  }
  .version .version-content .info span{
    font-size: 16px;
    color: rgb(41, 128, 185);
  }
  .version .version-content .info p{

  }
  .version .version-content .operating{
    text-align: center;
  }
  .version .timeline{
    margin: 30px 10px;
    padding: 10px;
    background: #ffffff;
    border-radius: 3px;
  }

  .col{
    /*background-color: rgb(236, 240, 241);*/
    border-radius: 10px;
    border-style: groove;
    border-color: rgba(170, 222, 164, 0.07);
  }


  .icons-warp{
    cursor: pointer;
    opacity: 0;
  }
  .icons-warp:hover{
    opacity: 1;
  }
  .float i{
    font-size: 40px;
    background-color: rgba(0,0,0,0);
  }
</style>
