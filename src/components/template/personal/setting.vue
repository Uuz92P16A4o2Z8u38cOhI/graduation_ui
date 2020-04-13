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
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </div>

          <div class="upDown">
            <el-card style="display: flex">
              <div class="operating">
                <line-button>上传</line-button>
                <line-button style="color: #0acffe">下载</line-button>
              </div>

            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主题设置" name="theme">主题设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import lineButton from '@/components/template/hyl/button/lineButton'
  export default {
    name: 'setting',
    components:{
      lineButton,
    },
    data() {
      return {
        activeName: 'info',
        imageUrl: ''
      };
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
      }
    }
  }
</script>

<style scoped>
  .setting{
    height: 450px;
  }
  .base{
    display: flex;
  }
  .base .avatarUp {
    width: 180px;
  }
  .base .upDown{
    margin: 20px;
    padding: 20px;
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
</style>
