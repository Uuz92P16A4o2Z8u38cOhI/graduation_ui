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

    <el-dialog title="编辑科研活动" :visible.sync="edit" width="70%" :before-close="handleClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="研究成果" name="first">
          <el-table ref="researchAreas" :data="researchAreas"   v-loading="loading" empty-text="暂无数据"
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
        <el-tab-pane label="科研论文" name="second">
          <el-table ref="thesisResults" :data="thesisResults"   v-loading="loading" empty-text="暂无数据"
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
        <el-tab-pane label="专利" name="third">
          <el-table ref="patent" :data="patent"   v-loading="loading" empty-text="暂无数据"
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
        <el-tab-pane label="著作成果" name="fourth">
          <el-table ref="achievements" :data="achievements"   v-loading="loading" empty-text="暂无数据"
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
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(4)" style="float: left"></el-button>
        </el-tab-pane>
        <el-tab-pane label="科研项目" name="five">
          <el-table ref="researchProjects" :data="researchProjects"   v-loading="loading" empty-text="暂无数据"
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
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(5)" style="float: left"></el-button>
        </el-tab-pane>
        <el-tab-pane label="科研团队" name="six">
          <el-table ref="researchTeam" :data="researchTeam"   v-loading="loading" empty-text="暂无数据"
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
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert(6)" style="float: left"></el-button>
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
        newItem:{},
        itemVisible: false,
        activeName:'first',
        edit:false,
        loading: false,

        research:{},
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
        this.$http.post(this.global.baseUrl + 'UI/api/ui/research/initInfo/' + this.$store.state.user.userId + '/' + this.$store.state.user.version).then(res =>{
          // console.log(res)

          if (res.data.data != null){
            this.research = res.data.data.research
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
      editInfo(){
        this.$message.success("修改了教师教学活动！！")
      },
      insertItem(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/research/insertResearchItem/' + this.newItem.parentId, this.newItem).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //编辑
      handleEdit(index, row) {
        this.$http.post(this.global.baseUrl + 'UI/api/ui/research/updateResearchItem/',
          row).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      //删除
      handleDelete(index, row) {
        this.$http.delete(this.global.baseUrl + 'UI/api/ui/research/deleteResearchItem/' + row.id).then(res=>{
          this.getInitInfo()
          this.$message.info(res.data.message)
        })
      },
      handleInsert(type) {
        if (type === 1){
          this.newItem.parentId = this.research.researchAreas
        }
        if (type === 2){
          this.newItem.parentId = this.research.thesisResults
        }
        if (type === 3){
          this.newItem.parentId = this.research.patent
        }if (type === 4){
          this.newItem.parentId = this.research.achievements
        }
        if (type === 5){
          this.newItem.parentId = this.research.researchProjects
        }
        if (type === 6){
          this.newItem.parentId = this.research.researchTeam
        }
        this.newItem.type = type
        this.itemVisible = true
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
