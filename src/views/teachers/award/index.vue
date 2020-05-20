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
        <el-tab-pane label="教学获奖" name="first">
          <el-table ref="academicHonorsList" :data="academicHonorsList"   v-loading="loading" empty-text="暂无数据"
                    :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
            <el-table-column prop="itemName"  label="名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemName"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="itemContent"  label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemContent"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(1)" style="float: left"></el-button>
        </el-tab-pane>
        <el-tab-pane label="科研获奖" name="second">
          <el-table ref="scientificAwardsList" :data="scientificAwardsList"   v-loading="loading" empty-text="暂无数据"
                    :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
            <el-table-column prop="itemName"  label="名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemName"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="itemContent"  label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemContent"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(2)" style="float: left"></el-button>
        </el-tab-pane>
        <el-tab-pane label="其他获奖" name="third">
          <el-table ref="otherAwardsList" :data="otherAwardsList"   v-loading="loading" empty-text="暂无数据"
                    :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
            <el-table-column prop="itemName"  label="名称" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemName"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="itemContent"  label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemContent"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(3)" style="float: left"></el-button>
        </el-tab-pane>
      </el-tabs>

      <!--<div style="text-align: center">
        <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
        <button-dialog @checkedRole="editInfo">
          <template v-slot:title>确定修改教师教学活动?</template>
          <template v-slot:name>保存</template>
        </button-dialog>
      </div>-->

      <el-dialog width="30%" title="新增" :visible.sync="itemVisible" append-to-body>
        <div class="form">
          <el-form ref="newItem" :model="newItem" v-loading="loading" label-width="120px" >
            <el-form-item prop="item" label="名称:">
              <el-input v-model="newItem.itemName" type="textarea" clearable></el-input>
            </el-form-item>
            <el-form-item prop="item" label="内容:">
              <el-input v-model="newItem.itemContent" type="textarea" clearable></el-input>
            </el-form-item>
            <el-form-item  class="bottom_right">
              <el-button type="primary" @click='insertItem'>添  加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
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
        newItem:{},
        itemVisible: false,
        activeName1:'first',
        edit:false,
        loading: false,

        activeName: [1],
        awards:{},
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
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/awards/initInfo/' + this.$store.state.user.version).then(res =>{
          // console.log(res.data.data)
          const infoData = res.data.data
          if (res.data.data != null){
            this.awards = infoData.awards
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
      editInfo(){
        this.$message.success("修改了教师教学活动！！")
      },
      insertItem(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/awards/insertAwardsItem/' + this.newItem.parentId, this.newItem).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //编辑
      handleEdit(index, row) {
        this.$http.post(this.global.baseUrl + 'UI/api/ui/awards/updateAwardsItem',
          row).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //删除
      handleDelete(index, row) {
        this.$http.delete(this.global.baseUrl + 'UI/api/ui/awards/deleteAwardsItem/' + row.id).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      handleInsert(type) {
        if (type === 1){
          this.newItem.parentId = this.awards.academicHonors
        }
        if (type === 2){
          this.newItem.parentId = this.awards.scientificAwards
        }
        if (type === 3){
          this.newItem.parentId = this.awards.otherAwards
        }if (type === 4){
          this.newItem.parentId = this.awards.honoraryTitle
        }
        if (type === 5){
          this.newItem.parentId = this.awards.honorWall
        }
        this.newItem.type = type
        this.itemVisible = true
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
