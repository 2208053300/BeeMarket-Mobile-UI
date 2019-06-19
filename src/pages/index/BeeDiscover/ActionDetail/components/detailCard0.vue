<template>
  <div class="card0 bg-white flex flex-column flex-between" :style="{ backgroundImage: 'url(' + actionDetails.background_image_url + ')' }">
    <div class="top-img text-center">
      <img :src="beeIcon.topImg">
    </div>
    <div class="name text-center">
      <div class="app-show">
        <img :src="beeIcon.nameDefaultImg" class="img-default">
        <p class="text">
          “我为公益代言”
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  filters: {
    getPercent(val) {
      return val.toFixed(2) * 100
    }
  },
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
      showPercent: false,
      BeeDefault,
      beeIcon: {
        topImg: require('@/assets/icon/discover/confirmorder_pic_word_top@2x.png'),
        nameDefaultImg: require('@/assets/icon/discover/confirmorder_pic_avatar_bee@2x.png'),
        initiate: require('@/assets/icon/discover/publicwelfare_icon_initiate@2x.png'),
        participate: require('@/assets/icon/discover/publicwelfare_icon_participate@2x.png'),
        aim: require('@/assets/icon/discover/publicwelfare_icon_aim@2x.png')
      }
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
.card0 {
  height: 6.12rem;
  margin-top: 20px;
  border-radius: 0.1rem;
  padding: 0.4rem 0.2rem 0.2rem ;
  background-size:100% 100%;
  .top-img{width:3.58rem;height: 0.98rem; margin: 0 auto;}
  .name{
    position: relative;
    background: rgba(255, 255, 255, .7);
    border-radius: 0.1rem;
    height: 2.2rem;
    p{margin: 0;}
    .app-show{
      position: absolute;
      top: -0.24rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .share-show{
      position: absolute;
      top: -0.24rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .text{font-size: 0.36rem;font-weight: 400;}
    .nickyname{font-size: 0.4rem;font-weight: 600; margin-bottom: 0.2rem;}
    .avatar{border-radius: 50%;width:1rem;height: 1rem; margin-bottom: 0.2rem;}
    .img-default{width: 1.3rem;height: 1.58rem; margin-bottom: 0.24rem;}
  }
}
</style>
