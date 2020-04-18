<template>
  <button class="btn btn-primary btn-ghost btn-shine"
          :value="content"
          :class="{disabled: !canClick}"
          @click="setTime">
  </button>
</template>

<script>
  export default {
    name: 'glassLightButton',
    data () {
      return{
        content: '获取手机验证码', // 按钮里显示的内容
        totalTime: 90, // 记录具体倒计时时间
        canClick: true // 添加canClick
      }
    },
    methods:{
      // 验证码读秒
      setTime () {
        if (!this.canClick) return // 如果是false 直接return出去
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 90
            this.canClick = true // 这里重新开启
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato);

  body {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: #1A1E23;
  }

  .btn {
    --hue: 190;
    position: relative;
    padding: 1rem 3rem;
    font-size: 1rem;
    line-height: 1.5;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    background-color: hsl(var(--hue), 100%, 41%);
    border: 1px solid hsl(var(--hue), 100%, 41%);
    outline: transparent;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: 0.25s;

    &:hover {
      background: hsl(var(--hue), 100%, 31%);
    }

    &-primary {
      --hue: 187;
    }

    &-ghost {
      color: hsl(var(--hue), 100%, 41%);
      background-color: transparent;
      border-color: hsl(var(--hue), 100%, 41%);

      &:hover {
        color: white;
      }
    }

    &-shine {
      color: white;

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            120deg,
            transparent,
            hsla(var(--hue), 100%, 41%, 0.5),
            transparent
        );
        transform: translateX(-100%);
        transition: 0.6s;
      }

      &:hover {
        background: transparent;
        box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
      }

      &:hover::before {
        transform: translateX(100%);
      }
    }
  }

</style>
