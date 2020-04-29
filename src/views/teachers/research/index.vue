<template>
  <div class="research">
    <span class="title"><i class="iconfont icon-keyan" style="font-size: 24px" />科研活动 <span style="font-style: oblique; font-weight: initial ">Research Activities</span> </span>

    <div class="block researchAreas">
      <span class="title">研究领域(研究成果)</span>
      <div v-if="researchAreas == null || researchAreas.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
            <li v-for="item in researchAreas">
              <span class="title">{{item.itemName}}</span>
              <span class="content">{{item.itemContent}}</span>
            </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研论文</span>
      <div v-if="thesisResults == null || thesisResults.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in thesisResults">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">专利</span>
      <div v-if="patent == null || patent.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in patent">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">著作成果</span>
      <div v-if="achievements == null || achievements.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in achievements">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研项目</span>
      <div v-if="researchProjects == null || researchProjects.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in researchProjects">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>

    <div class="block">
      <span class="title">科研团队</span>
      <div v-if="researchTeam == null || researchTeam.length == 0" style="text-align: center"> <span >暂无数据</span></div>
      <div>
        <ol class="items">
          <li v-for="item in researchTeam">
            <span class="title">{{item.itemName}}</span>
            <span class="content">{{item.itemContent}}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'research',
    data(){
      return{
        researchProjects: [],
        patent: [],
        achievements: [],
        thesisResults: [],
        researchTeam: [],
        researchAreas: [],
      }
    },
    mounted() {
      this.getInitInfo()
    },
    methods:{
      getInitInfo(){
        this.$http.post(this.global.baseUrl + 'UI/api/ui/research/initInfo/' + this.$store.state.user.userId).then(res =>{
          // console.log(res)
          this.researchProjects = res.data.data.researchProjects
          this.patent = res.data.data.patent
          this.achievements = res.data.data.achievements
          this.thesisResults = res.data.data.thesisResults
          this.researchTeam = res.data.data.researchTeam
          this.researchAreas = res.data.data.researchAreas
        })
      }
    },

  }
</script>

<style scoped>
.research .title{
  font-size: 24px;
  font-weight: bold;
}
.research .block{
  margin: 30px 0;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
}
.research .block .title{
  font-size: 20px;
}

.research .researchAreas {

}
.research .researchAreas .items{

}
.research .researchAreas .items .title{
  font-size: 18px;
}
.research .researchAreas .items .content{

}
</style>
