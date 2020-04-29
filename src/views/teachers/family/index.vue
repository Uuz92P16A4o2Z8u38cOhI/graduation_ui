<template>
  <div class="family">
    <span class="title"><i class="iconfont icon-jiating" style="font-size: 24px" />家庭情况 <span style="font-style: oblique; font-weight: initial ">Family Situation</span> </span>

    <el-row :gutter="20">

      <el-col :span="16">
        <div class="info ">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix header-title">
              <span>家庭成员</span>
            </div>

            <div class="members user-info" v-for="m in members">
              <el-card shadow="hover"  style="width: 90%">
                <div class="user-info">
                  <el-image src="" class="user-avator" alt >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" style="font-size: 100px"></i>
                    </div>
                  </el-image>
                  <div class="user-info-cont">
                    <div class="user-info-name">{{m.name}}</div>
                    <div>
                      <span>性别: {{m.sex===0?'女':'男'}}</span>
                      <span class="el-icon-date">&nbsp;出生日期：{{timestamp2Date(m.birth)}}&nbsp;</span><br/>
                      <span>工作单位: {{m.job}}</span>
                      <span>政治面貌: {{m.politicalStatus==0?"无":(m.politicalStatus==1?"团员":"党员")}}</span>
                      <span>关系: {{m.relation}}</span>
                    </div>
                  </div>
                  <contact :email="m.email" :phone="m.phone"/>
                </div>

              </el-card>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info">
          <el-card shadow="hover" class="mgb20">
            <div slot="header" class="clearfix header-title">
              <span>基本信息</span>
            </div>
            <div class="link">
              <div style="display: flex">
                <span class="name" style="width: 100px">家庭人口 </span><span>{{familyBase.population}}</span>
              </div>
              <el-divider></el-divider>
              <div style="display: flex">
                <span class="name" style="width: 100px">家庭地址 </span><span>{{familyBase.address}}</span>
              </div>
              <el-divider></el-divider>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog title="编辑工作情况" :visible.sync="edit" width="70%" :before-close="handleClose">
        <div>
            <span style="font-size: 18px">家庭人口</span>
            <el-input-number v-model="familyBase.population" :min="1"  label="家庭人口"></el-input-number>
            <span style="font-size: 18px">家庭地址</span>
            <el-input v-model="familyBase.address"></el-input>
        </div>
        <el-table ref="members" :data="members"  @selection-change="handleSelectionChange" v-loading="loading" empty-text="暂无数据"
                  :header-cell-style="{'color': 'rgb(247,50,98)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#67fab4','font-size': '20px'}">
          <el-table-column prop="name"  label="姓名" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.sex" placeholder="请选择">
                <el-option  label="女" value="0"></el-option>
                <el-option  label="男" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="birth" label="出生日期" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.birth"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="工作单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.job"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="politicalStatus" label="政治面貌" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.politicalStatus" placeholder="请选择">
                <el-option  label="无" value="0"></el-option>
                <el-option  label="团员" value="1"></el-option>
                <el-option  label="党员" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="relation" label="关系" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.relation"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.email"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.phone"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-button size="mini" type="danger" icon="el-icon-plus" circle @click="handleInsert" style="float: left"></el-button>
          <button-dialog @checkedRole="editInfo">
            <template v-slot:title>确定修改教师工作情况?</template>
            <template v-slot:name>保存</template>
          </button-dialog>
        </div>
      </el-dialog>
    </div>

    <float-icons padding="10 10 60 10" class="icons-warp">
      <div class="float">
        <i class="el-icon-setting" @click="showEdit"></i>
      </div>
    </float-icons>
  </div>
</template>

<script>
  import contact from './components/contact'
  import floatIcons from '../floatIcons'
  import buttonDialog from '../../../components/template/hyl/button/buttonDialog'
  export default {
    name: 'family',
    components:{
      contact,
      floatIcons,
      buttonDialog,
    },
    data(){
      return{
        loading: false,
        edit:false,
        familyBase: {},
        members:[],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/family/initInfo/' + this.$store.state.user.userId).then(res=>{
          // console.log(res.data.data)
          this.familyBase = res.data.data.familyBase
          this.members = res.data.data.members
        })
      },

      //时间格式化
      timestamp2Date(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        /*var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());*/
        return Y+M+D;
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
        this.$message.success("修改了教师工作情况！！")
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
  .family .title{
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;;
    display: block;
  }
  .family .title{
    font-size: 20px;
  }

  .header-title{
    font-size: 24px;
  }
  .info{
    padding: 10px;
  }
  .mgb20 {
    margin-bottom: 20px;
  }
  .members{
    width: 100%;
  }
  .family .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    margin-right: 50px;
    margin-left: 50px;
  }
  .family .info span{
    margin-right: 10px;
  }
  .user-avator {
    width: 100px;
    height: 100px;
    /*border-radius: 50%;*/
  }
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
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
