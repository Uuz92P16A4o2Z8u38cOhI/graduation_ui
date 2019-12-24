<template>
  <li>
        <span @click="toggle">
            {{ data.name }}
        </span>
    <ul v-show="open" v-if="hasChild">
      <menu-tree v-for="(item, index) in data.children" :data="item" :key="index"></menu-tree>
    </ul>
  </li>
</template>

<script>
    export default {
      name: "menu-tree",
      props: {
        data: {
          type: Object, //校验父组件传过来的数据是佛正确
          required: true //是否为必传数据
        }
      },
      data() {
        return {
          open: false
        }
      },
      computed: {
        hasChild() {
          return this.data.children && this.data.children.length //判断当前子组件有没有数据
        }
      },
      methods: {
        toggle() {
          if(this.hasChild) {
            this.open = !this.open
          }
        }
      }
    }
</script>

<style scoped>

</style>
