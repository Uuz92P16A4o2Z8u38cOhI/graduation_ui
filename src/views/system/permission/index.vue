<template>
  <div class="permissionContain">
    <div class="container">
      <searchItem @searchList="searchItems" @insertList="addItems"></searchItem>
    </div>
    <div class="container">
      <el-table ref="tableData" :data="tableData"  @selection-change="handleSelectionChange" :header-cell-style="{'color': 'rgb(144,147,154)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#F5F7FA'}">
        <el-table-column type="selection"  align='center' width="60px">
        </el-table-column>
        <el-table-column prop="name" label="名称"  align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="enname" label="英文名称" width="120"  sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="url" label="授权路径"  sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="备注" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" align='center' width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <permissionDialog :dialogInfo="dialogInfo" @closeDialog="hideDialog"/>
    </div>
  </div>
</template>

<script>
  import searchItem from './components/searchItem'
  import permissionDialog from './components/permissionDialog'
  export default {
    name: 'permission',
    components: {
      searchItem,
      permissionDialog
    },
    data() {
      return {
        tableData: [],
        search_data:{
          name:'',
          enname:'',
          url:'',
          description :''
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
        multipleSelection: []
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
        console.log(this.multipleSelection)
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
        console.log(index, row);
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

      //加载数据
      getData() {
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/permission/allPermission/' + this.pageInfo.pageNum + "/" + this.pageInfo.pageSize,
          this.search_data).then((res) => {
            this.tableData = res.data.data.list;
            this.pageInfo.total = res.data.data.total;
        })
      }
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
