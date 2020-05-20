<template>
  <div class="info">
    <span class="title"><i class="el-icon-c-scale-to-original" style="font-size: 24px"></i>信息管理 <span style="font-style: oblique; font-weight: initial ">Information Management</span></span>

    <div class="info-content">
      <el-row :gutter="20"  class="block">
        <el-col :span="6">
          <div class="grid-content" >
            <div class="data_list" style="background-color: rgb(26, 188, 156)">
              <div class="topItem">
                <span class="title">基础信息</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('BasicInfo')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('BasicInfo')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('BasicInfo')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('BasicInfo')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(46, 204, 113)">
              <div class="topItem">
                <span class="title">受教育情况</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Education')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Education')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Education')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Education')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(52, 152, 219)">
              <div class="topItem">
                <span class="title">工作情况</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Work')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Work')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Work')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Work')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(155, 89, 182)">
              <div class="topItem">
                <span class="title">家庭情况</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Family')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Family')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Family')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Family')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"  class="block">
        <el-col :span="8">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(52, 73, 94)">
              <div class="topItem">
                <span class="title">教学活动</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Teaching')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Teaching')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Teaching')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Teaching')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(241, 196, 15)">
              <div class="topItem">
                <span class="title">科研活动</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Research')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Research')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Research')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Research')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="data_list" style="background-color: rgb(231, 76, 60)">
              <div class="topItem">
                <span class="title">获奖信息</span>
              </div>
              <div class="leftItem">
                <el-tooltip class="item" effect="light" content="导出信息" placement="top">
                  <span @click="downloadExcel('Awards')"><line-button style="color: #0acffe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadModelExcel('Awards')"><line-button style="color: #e7befe; background-color: #fffcd7;font-weight: bold">Excel</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadword('Awards')"><line-button style="color: #165bfe; background-color: #fffcd7;font-weight: bold">Word</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="导出模板信息" placement="top">
                  <span @click="downloadPDF('Awards')"><line-button style="color: rgb(231, 76, 60); background-color: #fffcd7;font-weight: bold">PDF</line-button></span>
                </el-tooltip>
              </div>
              <div class="rightItem">

              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import lineButton from '@/components/template/hyl/button/lineButton'
  export default {
    name: 'info',
    components:{
      lineButton,
    },
    methods:{
      downloadExcel(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/easyPoi/exportExcel/' + type + '/' + this.$store.state.user.version,{},{responseType: 'blob'}).then(res=>{
          var blob = new Blob([res.data])
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          downloadElement.download = filename; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      },
      //下载模板excel
      downloadModelExcel(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/Poi/exportModelExcel/' + type +"/"  + this.$store.state.user.version,{},{responseType:'blob'}).then(res=>{
          var blob = new Blob([res.data])
          console.log(res)
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          downloadElement.download = filename; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      },
      downloadword(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/easyPoi/exportModelWord/' + type +"/"  + this.$store.state.user.version,{},{responseType:'blob'}).then(res=>{
          var blob = new Blob([res.data])
          console.log(res)
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          downloadElement.download = filename; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      },
      downloadPDF(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/easyPoi/exportPDF/' + type +"/"  + this.$store.state.user.version,{},{responseType:'blob'}).then(res=>{
          var blob = new Blob([res.data])
          console.log(res)
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          downloadElement.download = filename; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      },
    },
  }
</script>

<style scoped>
  .info .title{
    font-size: 24px;
    font-weight: bold;
  }
  .info .block{
    margin: 30px 0;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
  }
  .info .info-content .grid-content{

  }

  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    color: #fff;
    /*height: 80px;*/
  }
</style>
