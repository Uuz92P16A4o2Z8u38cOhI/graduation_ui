<template>
  <div class="userContain">
    <div class="container">
      <searchItem @searchList="searchItems" @insertList="addItems" @multipleDeleteButton="multipleDelete"></searchItem>
    </div>
    <div class="container">
      <el-table ref="tableData" :data="tableData"  @selection-change="handleSelectionChange" v-loading="loading" empty-text="暂无数据"
                :header-cell-style="{'color': 'rgb(144,147,154)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#F5F7FA'}">
        <el-table-column type="selection"  align='center' width="60px">
        </el-table-column>
        <el-table-column prop="username" label="用户名"  align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120"  sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" align='center' :formatter="formatCreatedDate" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" align='center' :formatter="formatUpdateDate" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="角色管理" align='center' width="100px">
          <template slot-scope="scope">
            <span @click="handleRole(scope.$index, scope.row)" style="color: #0acffe; font-size: 24px; cursor:pointer">
              <i class="el-icon-more-outline"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="300px">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="[10, 20, 50, 100,1000]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
        </el-pagination>
      </div>
      <userDialog :dialogInfo="dialogInfo" @closeDialog="hideDialog" @refreshTable="getData"/>
      <drawer :drawer=drawerShow @closeDrawer="closeDrawer" :userId="onUserId"></drawer>
    </div>
  </div>
</template>

<script>
  import searchItem from './components/searchItem'
  import userDialog from './components/userDialog'
  import drawer from './components/drawer'
  export default {
    name: 'user',
    components: {
      searchItem,
      userDialog,
      drawer,
    },
    data() {
      return {
        onUserId : '0',
        drawerShow: false,
        loading : true,
        tableData: [],
        search_data:{
          id: '',
          username:'',
          phone:'',
          email:'',
          created : '',
          updated : '',
        },
        pageInfo : {
          total: 0,
          pageNum: 1,
          pageSize: 10,
        },
        dialogInfo: {
          title : '',
          type : '',
          show : false,
          row: {},
        },
        multipleSelection: [],
        multipleSelectionArray : []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      //查询表单数据
      searchItems(ev){
        this.search_data=ev
        this.getData()
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //查看角色资源
      handleRole(index, row){
        this.drawerShow = true
        // console.log(index,row)
        this.onUserId = row.id
      },
      //编辑
      handleEdit(index, row) {
        this.dialogInfo.show = true
        this.dialogInfo.type = 'edit'
        this.dialogInfo.title = '编辑资源'
        this.dialogInfo.row = row
      },
      //新增
      addItems(ev){
        this.dialogInfo = ev
      },
      //删除
      handleDelete(index, row) {
        this.$http.delete(this.global.baseUrl + 'SYS/api/sys/user/deleteUser/' + row.id).then((res)=>{
          if (res.data.code === 200){
            this.$message.success(res.data.message)
            this.getData()
          }else {
            this.$message.error(res.data.message)
          }
        })
      },
      //批量删除
      multipleDelete(){
        this.multipleSelectionArray = []
        this.multipleSelection.forEach(v => {
          this.multipleSelectionArray.push(v.id)
        })
        if (this.multipleSelectionArray.length === 0){
          this.$message.error("请选择需要删除的数据！")
        }else {
          this.$http.post(this.global.baseUrl + 'SYS/api/sys/user/multipleDeleteUser',
            this.multipleSelectionArray).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },
      // 上下分页
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val;
        this.getData()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.getData()
      },
      //隐藏dialog
      hideDialog(){
        this.dialogInfo.show = false
        this.dialogInfo.row = {}
      },
      //关闭drawer
      closeDrawer(){
        this.drawerShow = false
      },
      //加载数据
      getData() {
        this.loading = true
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/user/allUser/' + this.pageInfo.pageNum + "/" + this.pageInfo.pageSize,
          this.search_data).then((res) => {
          this.tableData = res.data.data.list;
          this.pageInfo.total = parseInt(res.data.data.total);
        })
        this.loading = false
      },
      //时间格式化
      formatCreatedDate(row, column) {
        let date = new Date(parseInt(row.created));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      formatUpdateDate(row, column) {
        let date = new Date(parseInt(row.updated));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
    }
  }
</script>

<style scoped>
  .container{
    padding: 10px;
    background: #fff;
    border-radius: 8px;;
    margin-bottom: 10px;
  }
  .query{
    padding: 10px;
    margin: 10px 60px;
  }
  .page{
    text-align: right;
    padding: 20px 18px;
  }
</style>
