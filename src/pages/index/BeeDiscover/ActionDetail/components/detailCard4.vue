<template>
  <div class="card3 bg-white">
    <!-- 活动说明 -->
    <div class="action-explain">
      <p class="title">
        活动说明
      </p>
      <p class="info first">
        助力人数达成立即启动捐赠 <span> (可通过“项目进度”共同监督) </span>
      </p>
      <p class="info">
        首次参与助力获赠公益红包 <span>(可用于海量商品的任选抵扣)</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    actionDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.card3 {
  padding: 0.32rem;
   background: url(../../../../../assets/icon/discover/confirmorder_pic_description@2x.png) no-repeat right top;
   background-size: 1.32rem 1.09rem;
   background-color: #fff;
 .action-explain{

   p{margin: 0;}
   .title{font-size: .28rem; color:#333; font-weight: 600; margin-bottom: .2rem}
   .info{font-size: .24rem; color:#333;}
   .info.first{margin-bottom: .1rem; }
   span{font-size: .22rem; color:#999;}

 }
}
</style>
