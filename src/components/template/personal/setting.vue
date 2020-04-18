<template>
  <div class="setting" >
    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="基础信息" name="info">
        <div class="base">
          <div class="avatarUp">
            <span style="font-size: 18px">上传头像</span>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8888/api/fastdfs/upload/upload"
              name="dropFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="avatar" :src="avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>

          <div class="upDown">
            <el-card style="display: flex">
              <div class="operating" v-for="item in upDownData">
                <el-tag effect="dark" type="success">{{item.title}}</el-tag>
                <el-tooltip class="item" effect="light" content="上传excel" placement="top">
                  <span @click="uploadExcel(item.type)"><line-button>上传</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="下载excel" placement="top">
                  <span @click="downloadExcel(item.type)"><line-button style="color: #0acffe">下载</line-button></span>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="下载模板excel" placement="top">
                  <span @click="downloadModelExcel(item.type)"><line-button style="color: #e7befe">下载</line-button></span>
                </el-tooltip>
              </div>

            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主题设置" name="theme">
        <el-color-picker v-model="color" show-alpha></el-color-picker>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import lineButton from '@/components/template/hyl/button/lineButton'
  import { mapState } from 'vuex'
  export default {
    name: 'setting',
    components:{
      lineButton,
    },
    data() {
      return {
        activeName: 'info',
        imageUrl: '',

        upDownData:[{title : "基础信息", type : "BasicInfo"},{title : "教育情况", type : "Education"},{title : "工作情况", type : "Work"},
          {title : "家庭情况", type : "Family"},{title : "教学活动", type : "Teaching"},{title : "科研活动", type : "Research"},{title : "获奖信息", type : "Awards"}],


        color: 'rgba(19, 206, 102, 0.8)',
      };
    },
    computed: {
      ...mapState({
        avatar : state => state.user.avatar,
      })
    },
    created() {

    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        /*if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      uploadFile(file){
        this.$http.post('http://127.0.0.1:8888/api/fastdfs/upload/upload-', {
          file,
        },{
          headers : {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data)
        }).catch(_ => {});
      },
      //上传excel
      uploadExcel(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/easyPoi/importExcel/' + type +"/" + this.$store.state.user.userId).then(res=>{


          console.log(res)
        })
      },
      //下载excel
      downloadExcel(type){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/easyPoi/exportExcel/' + type +"/" + this.$store.state.user.userId,{},{responseType: 'blob'}).then(res=>{
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
        this.$http.post(this.global.baseUrl + 'UI/api/ui/Poi/exportModelExcel/' + type +"/" + this.$store.state.user.userId,{},{responseType:'blob'}).then(res=>{
          var blob = new Blob([res.data])
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          // const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          downloadElement.download = 'filename.xlsx'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
      },
    }
  }
</script>

<style scoped>
  .setting{
    height: 480px;
  }
  .base{
    display: flex;
  }
  .base .avatarUp {
    width: 180px;
  }
  .base .upDown{
    margin: 5px 20px;
    padding: 5px 20px;
    width: 80%;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .operating{
    border-color: #0acffe;
  }
  .operating .el-tag{
    margin: 0 4px;
  }
</style>
