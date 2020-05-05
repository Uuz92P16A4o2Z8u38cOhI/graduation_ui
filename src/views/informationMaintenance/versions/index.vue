<template>
  <div class="version">
    <span class="title"><i class="el-icon-copy-document" style="font-size: 24px"></i>版本管理 <span style="font-style: oblique; font-weight: initial ">Version Management</span></span>

    <div class="version-content">

      <div class="block">
        <span style="text-align: center" v-if="this.versions.length === 0">您还没有保存的版本哦！！</span>
        <el-timeline class="timeline">
          <el-timeline-item timestamp="item.time"  v-for="item in versions" :key="item.id"
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
                    <el-button type="success" icon="el-icon-video-camera" @click="shows(item.id)" circle></el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>


      </div>

    </div>

    <el-dialog title="111" :visible.sync="insert" width="30%" :before-close="handleClose">

    </el-dialog>

    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-circle-plus-outline" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import floatIcons from '../../teachers/floatIcons'
  export default {
    name: 'version',
    components:{
      floatIcons
    },
    data() {
      return {
        insert:false,
        versions: [],
      };
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/version/selectAll/' + this.$store.state.user.userId + '/' + this.$store.state.user.version).then(res=>{
          console.log(res)
          this.versions = res.data.data
        })
      },
      edit(){

      },
      shows(id){
        this.$store.commit('setVersion', id)
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
