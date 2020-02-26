<template>
  <div class="userContain">
    <div class="container">
      <searchItem></searchItem>
    </div>
    <div class="container">
      <el-table ref="tableData" :data="tableData"  @selection-change="handleSelectionChange" :header-cell-style="{'color': 'rgb(144,147,154)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#F5F7FA'}">
        <el-table-column type="selection"  align='center' width="60px">
        </el-table-column>
        <el-table-column prop="username" label="用户名"  align='center' sortable show-overflow-tooltip>

        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align='center' sortable show-overflow-tooltip>
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
    </div>

  </div>
</template>

<script>
  import searchItem from './components/searchItem'
  import pageInfo from './components/pageInfo'
  export default {
    name: 'user',
    components: {
      pageInfo,
      searchItem
    },
    data() {
      return {
        tableData: [],
        pageInfo : {
          total: 0,
          pageNum: 1,
          pageSize: 10,
        },
        multipleSelection: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 上下分页
      handleCurrentChange(val){
        this.pageInfo.pageNumber = val;
        this.getData()
      },
      // 每页显示多少条
      handleSizeChange(val){
        this.pageInfo.pageSize = val;
        this.getData();
      },

      //加载数据
      getData(){
        this.$http.get(this.global.baseUrl + 'SYS/api/sys/user/allUser/'+this.pageInfo.pageNum +"/"+ this.pageInfo.pageSize ).then((res)=>{
          this.tableData = res.data;
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
