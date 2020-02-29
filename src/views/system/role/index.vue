<template>
  <div class="roleContain">
    <div class="container">
      <searchItem @searchList="searchItems" @insertList="addItems" @multipleDeleteButton="multipleDelete"></searchItem>
    </div>
    <div class="container">
      <el-table ref="tableData" :data="tableData"  @selection-change="handleSelectionChange" v-loading="loading" empty-text="暂无数据"
                :header-cell-style="{'color': 'rgb(144,147,154)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#F5F7FA'}">
        <el-table-column type="selection"  align='center' width="60px">
        </el-table-column>
        <el-table-column prop="name" label="名称"  align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="enname" label="英文名称" width="120"  sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="备注" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updated" label="更新时间" align='center' sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="资源管理" align='center' width="100px">
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
      <roleDialog :dialogInfo="dialogInfo" @closeDialog="hideDialog" @refreshTable="getData"/>
      <drawer :drawer=drawerShow ></drawer>
    </div>
  </div>
</template>

<script>
  import searchItem from './components/searchItem'
  import roleDialog from './components/roleDialog'
  import drawer from './components/drawer'

  export default {
    name: 'role',
    components: {
      searchItem,
      roleDialog,
      drawer,
    },
    data() {
      return {
        drawerShow: false,
        loading : true,
        tableData: [],
        search_data:{
          id: '',
          name:'',
          enname:'',
          url:'',
          description :'',
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
        console.log(index,row)
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
        this.$http.delete(this.global.baseUrl + 'SYS/api/sys/permission/deletePermission/' + row.id).then((res)=>{
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
          this.$http.post(this.global.baseUrl + 'SYS/api/sys/permission/multipleDeletePermission',
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

      //加载数据
      getData() {
        this.loading = true
        this.$http.post(this.global.baseUrl + 'SYS/api/sys/permission/allPermission/' + this.pageInfo.pageNum + "/" + this.pageInfo.pageSize,
          this.search_data).then((res) => {
          this.tableData = res.data.data.list;
          this.pageInfo.total = res.data.data.total;
        })
        this.loading = false
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
