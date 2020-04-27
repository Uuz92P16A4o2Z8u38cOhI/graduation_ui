<template>
  <div class="vue-cropper-box">
    <div class="vue-cropper-header">
      <p class="title" style="font-size:16px">
        图片裁剪
        <Icon type="ios-close" @click="close()" />
      </p>
    </div>
    <div class="vue-cropper-operate">
      <button class="basicButton" @click="cropperChangeScale(1)">放大</button>
      <button class="basicButton" @click="cropperChangeScale(-1)">缩小</button>
      <button class="basicButton" @click="cropperRotateLeft">左旋转</button>
      <button class="basicButton" @click="cropperRotateRight">右旋转</button>
      <!-- <button class="basicButton" @click="cropperDown('blob')">下载</button> -->
      <button class="basicButton" @click="cropperFinish">确定裁剪</button>
    </div>
    <div class="vue-cropper-content" style="width:500px;height:310px">
      <vueCropper
        ref="cropper"
        :img="img"
        :outputSize="cropperOption.outputSize"
        :outputType="cropperOption.outputType"
        :info="cropperOption.info"
        :full="cropperOption.full"
        :canMove="cropperOption.canMoveBox"
        :canMoveBox="cropperOption.canMoveBox"
        :original="cropperOption.original"
        :canScale="cropperOption.canScale"
        :autoCrop="true"
        :autoCropWidth="200"
        :autoCropHeight="200"
        :fixedBox="true"
        :fixed="cropperOption.fixed"
        :fixedNumber="cropperOption.fixedNumber"
        :centerBox="cropperOption.centerBox"
        :infoTrue="cropperOption.infoTrue"
        @realTime="realTime"
        @imgLoad="imgLoad"
      ></vueCropper>
    </div>
  </div>
</template>
<script>
  import vueCropper from "vue-cropper"
  export default {
    name: 'by-cropper',
    components: { vueCropper },
    // inject: ['reload'],
    filters: {},
    props: {
      file: {
        default: () => { },
        required: true
      },
      img: {
        default: "",
        required: true
      },
      cropperOption: {
        default: () => ({
          // img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          full: false, // 输出原图比例截图 props名full
          outputType: 'png', // 裁剪生成图片的格式
          canMove: true, // 能否拖动图片
          original: false, // 上传图片是否显示原始宽高
          canMoveBox: true, // 能否拖动截图框
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 200, // 默认生成截图框宽度
          autoCropHeight: 200, // 默认生成截图框高度
          fixedBox: true, // 截图框固定大小
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        })
      }
    },
    data() {
      return {
      };
    },
    computed: {
      // computeFunction() {
      //     return value;
      // }
    },
    watch: {
    },
    created() {
      // this.init();
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.cropperOption.img = this.file
      },

      cropperChangeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },

      // 左旋转
      cropperRotateLeft() {
        this.$refs.cropper.rotateLeft();
      },

      // 右旋转
      cropperRotateRight() {
        this.$refs.cropper.rotateRight();
      },

      // 下载图片
      cropperDown(type) {
        let aLink = document.createElement('a');
        aLink.download = 'author-img';
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob(data => {
            this.downImg = window.URL.createObjectURL(data);
            aLink.href = window.URL.createObjectURL(data);
            aLink.click();
          });
        } else {
          this.$refs.cropper.getCropData(data => {
            this.downImg = data;
            aLink.href = data;
            aLink.click();
          });
        }
      },

      // 确定裁剪
      cropperFinish(type) {
        if (type === 'Blob') {
          this.$refs.cropper.getCropBlob((data) => {
            let file = data;
            file.name = this.file.name;
            this.$emit('cropperFinish', file, data);
          });

        } else {
          this.$refs.cropper.getCropData(data => {

            // 将剪裁后base64的图片转化为file格式
            let file = this.convertBase64UrlToBlob(data);
            file.name = this.file.name;

            this.$emit('cropperFinish', file, data);
          });
        }

      },

      // 将base64的图片转换为file文件
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1]); // 去掉url的头，并转换为byte
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
      },

      // 实时预览函数
      realTime(data) {
        // console.log('realTime');
      },

      // 图片已加载
      imgLoad(msg) {
        // console.log('imgLoad');
        // console.log(msg);
      },
      close() {
        this.$emit('close');
      }
    }
  };
</script>
<style lang="less" scope>
  // 基础按钮
  .basicButton {
    font-size: 16px;
    width: 100px;
    padding: 8px 10px;
    // line-height: 0.4rem;
    border: none;
    border-radius: 20px;
    color: #fff;
    background: #5cadff;
    outline: none;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
  .vue-cropper-header {
    .title {
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      margin-bottom: 10px;
      .ivu-icon .ivu-icon-ios-close {
        font-size: 20px;
      }
    }
  }
  /* 图片裁剪工具 */
  .vue-cropper-box {
    z-index: 3001;
    position: absolute;
    top: 0;
    background: #fff;

    .vue-cropper-operate {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2rem;
    }

    .vue-cropper-content {
      position: relative;
      overflow-y: auto;

      .vue-cropper {
        position: absolute;
      }
    }
  }
</style>
