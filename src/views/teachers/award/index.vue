<template>
  <div class="award" >
    <span class="title"><i class="iconfont icon-huojiang" style="font-size: 24px"></i>获奖信息 <span style="font-style: oblique; font-weight: initial ">Awards Information</span></span>

    <div class="award-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class=" header-title">
              <span class="title">教学获奖</span>
            </div>
            <div v-if=" academicHonorsList === undefined || academicHonorsList.length === 0" style="text-align: center"> <span >暂无数据</span></div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item :title="item.itemName" :name="item.id" v-for="item in academicHonorsList" :key="item.id">
                <div >{{item.itemContent}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class="clearfix header-title">
              <span class="title">科研获奖</span>
            </div>
            <div>
              <div v-if=" scientificAwardsList === undefined || scientificAwardsList.length === 0" style="text-align: center"> <span >暂无数据</span></div>
              <ol>
                <li v-for="item in scientificAwardsList"><span class="name">{{item.itemName}}</span><span class="content">{{item.itemContent}}</span></li>
              </ol>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="hover" class="mgb20" style="">
            <div slot="header" class="clearfix header-title">
              <span class="title"> 其他获奖</span>
            </div>
            <div>
              <div v-if=" otherAwardsList === undefined || otherAwardsList.length === 0" style="text-align: center"> <span >暂无数据</span></div>
              <ol>
                <li v-for="item in otherAwardsList"><span class="name">{{item.itemName}}</span><span class="content">{{item.itemContent}}</span></li>
              </ol>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="(honoraryTitleList !== undefined && honoraryTitleList.length !== 0)||(honorWallList !== undefined && honorWallList.length !== 0)">
      <list :honoraryTitle="honoraryTitleList" :honorWall="honorWallList"></list>
    </div>
<!--    -->
    <el-dialog title="编辑教学活动" :visible.sync="edit" width="70%" :before-close="handleClose">
      <el-tabs v-model="activeName1">
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
  import list from './components/list'
  import floatIcons from '../floatIcons'
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'award',
    components:{
      list,
      floatIcons,
      buttonDialog,
    },
    data(){
      return {
        activeName1:'',
        edit:false,
        loading: false,

        activeName: [1],
        academicHonorsList: [],
        scientificAwardsList: [],
        otherAwardsList: [],
        honoraryTitleList: [],
        honorWallList: [],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      },
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/awards/initInfo/' + this.$store.state.user.userId).then(res =>{
          // console.log(res.data.data)
          const infoData = res.data.data
          if (res.data.data != null){
            this.academicHonorsList = infoData.academicHonorsList;
            this.scientificAwardsList = infoData.scientificAwardsList;
            this.otherAwardsList = infoData.otherAwardsList;
            this.honoraryTitleList = infoData.honoraryTitleList;
            this.honorWallList = infoData.honorWallList;
          }else {
            this.$message.warning("您未设置教师获奖情况信息")
          }
        }).catch(err=>{
          this.$message.error("教师获奖情况信息获取失败")
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
    }

  }
</script>

<style scoped>
 .award .title{
   font-size: 24px;
   font-weight: bold;
 }
 .award .mgb20 {
   margin-bottom: 20px;
 }
 .award .award-content{
   margin: 10px 0;
 }
  .award .award-content .title{
    font-size: 20px;
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
