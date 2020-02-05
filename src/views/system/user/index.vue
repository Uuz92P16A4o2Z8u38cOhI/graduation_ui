<template>
  <div>
    <div class="query">
      <el-button type="success" round>成功按钮</el-button>

      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>

      <el-input placeholder="请输入内容" v-model="input" suffix-icon="el-icon-date" prefix-icon="el-icon-search"  clearable/>

      <el-select v-model="value" clearable placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="tables">
      <el-table ref="userTable" :data="tableData"  @selection-change="handleSelectionChange" :header-cell-style="{'color': 'rgb(144,147,154)','border-bottom': '1px rgb(103, 194, 58) solid','background-color': '#F5F7FA'}">
        <el-table-column type="selection" width="55" >
        </el-table-column>
        <el-table-column label="日期" width="120" sortable show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="400" style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1513 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1514 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1515 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
.tables{
  padding: 10px;
  margin: 10px 60px;
}
.query{
  padding: 10px;
  margin: 10px 60px;
}
.page{
  padding: 10px;
  margin: 10px 60px;
 }
</style>
