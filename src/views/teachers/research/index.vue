<template>
  <div class="research">
    <span class="title"><i class="iconfont icon-keyan" style="font-size: 24px" />科研活动 <span style="font-style: oblique; font-weight: initial ">Research Activities</span> </span>

    <div class="block researchAreas">
      <span class="title">研究领域(研究成果)</span>
      <div v-if="researchAreas === undefined || researchAreas.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
            <li v-for="item in researchAreas">
              <span class="title">{{item.itemName}}</span>
              <span class="content">{{item.itemContent}}</span>
            </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研论文</span>
      <div v-if="thesisResults === undefined || thesisResults.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in thesisResults">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">专利</span>
      <div v-if="patent === undefined || patent.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in patent">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">著作成果</span>
      <div v-if="achievements === undefined || achievements.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in achievements">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研项目</span>
      <div v-if="researchProjects === undefined || researchProjects.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in researchProjects">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研团队</span>
      <div v-if="researchTeam === undefined || researchTeam.length === 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in researchTeam">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <el-dialog title="编辑教学活动" :visible.sync="edit" width="70%" :before-close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="教学研究" name="first">

        </el-tab-pane>
        <el-tab-pane label="教学资源" name="second">

        </el-tab-pane>
        <el-tab-pane label="授课信息" name="third">

        </el-tab-pane>
        <el-tab-pane label="教学成果" name="fourth">

        </el-tab-pane>
      </el-tabs>

      <div style="text-align: center">
        <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
        <button-dialog @checkedRole="editInfo">
          <template v-slot:title>确定修改教师教学活动?</template>
          <template v-slot:name>保存</template>
        </button-dialog>
      </div>
    </el-dialog>

    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-setting" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import floatIcons from '../floatIcons'
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'research',
    components:{
      floatIcons,
      buttonDialog,
    },
    data(){
      return{
        activeName:'',
        edit:false,
        loading: false,

        researchProjects: [],
        patent: [],
        achievements: [],
        thesisResults: [],
        researchTeam: [],
        researchAreas: [],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/research/initInfo/' + this.$store.state.user.userId).then(res =>{
          // console.log(res)

          if (res.data.data != null){
            this.researchProjects = res.data.data.researchProjects
            this.patent = res.data.data.patent
            this.achievements = res.data.data.achievements
            this.thesisResults = res.data.data.thesisResults
            this.researchTeam = res.data.data.researchTeam
            this.researchAreas = res.data.data.researchAreas
          }else {
            this.$message.warning("您未设置教师科研活动信息")
          }
        }).catch(err=>{
          this.$message.error("教师科研活动信息获取失败")
        })
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showEdit(){
        this.edit = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showEdit(){
        this.edit = true
      },
      editInfo(){
        this.$message.success("修改了教师教学活动！！")
      },
      //编辑
      handleEdit(index, row) {
        alert(row)
      },
      //删除
      handleDelete(index, row) {
        alert(row,index)
      },
      handleInsert() {
        alert(1111)
      },
    },

  }
</script>

<style scoped>
.research .title{
  font-size: 24px;
  font-weight: bold;
}
.research .block{
  margin: 30px 0;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.research .block .title{
  font-size: 20px;
}

.research .researchAreas {

}
.research .researchAreas .items{

}
.research .researchAreas .items .title{
  font-size: 18px;
}
.research .researchAreas .items .content{

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
