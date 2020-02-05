<template>
  <div>
    这是受教育情况信息页面
    <div class="block">
      <i class="el-icon-sort" @click="changeReverse" />
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'education',
    data() {
      return {
        reverse: false,
        activities: [{
          content: '大学',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '高中',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '初中',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '小学',
          timestamp: '2018-04-03 20:46'
        }]
      };
    },
    methods : {
      changeReverse(){
        this.reverse = !this.reverse;
      }
    }
  }
</script>

<style scoped>

</style>
