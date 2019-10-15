<template>
  <div class="swiper-box" :class="{block: block===true}" :style="{backgroundColor:bgColor, color:fontColor}">
    <van-swipe
      :autoplay="3000"
      :show-indicators="showIndicators"
      vertical
      class="swiper"
    >
      <van-swipe-item v-for="(item, index) in swiperData" :key="index" class="no-wrap">
        <img
          :src="item.img"
          alt=""
          class="swiper-img"
        ><span>{{ item.desc }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  components: {},
  props: {

    block: {
      type: Boolean,
      default: true
    },
    // 0-首页 1-限时蜂抢 2-免费送礼 3-蜂友圈 4-农礼包
    type: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.46)'
    },
    fontColor: {
      type: String,
      default: '#333'
    }
  },
  data() {
    return {
      // 不显示顶部轮播导航
      showIndicators: false,
      swiperData: [
        {
          img: require('@/assets/icon/freeGift/crown.png'),
          desc: '恭喜你中奖了'
        },
        {
          img: require('@/assets/icon/freeGift/crown.png'),
          desc: '恭喜你中奖了'
        },
        {
          img: require('@/assets/icon/freeGift/crown.png'),
          desc: '恭喜你中奖了'
        },
        {
          img: require('@/assets/icon/freeGift/crown.png'),
          desc: '恭喜你中奖了'
        }
      ]

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (document.querySelector('.fixed-header')) {
      document.querySelector('.block').style.top = '46px'
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.swiper-box {
  background-color: rgba(0, 0, 0, 0.46);
  padding: 0 0.3rem;
  position: fixed;
  top: 0.3rem;
  left: 0.2rem;
  width: 3.79rem;
  z-index: 999;
  border-radius: 20px;
  color:#333;
  .swiper {
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.24rem;

  }
  &.block{
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
  }
  &.bgYellow{
    background-color: #FFEAB0;

  }

  .swiper-img {
    width: 0.44rem;
    height: 0.44rem;
    margin-right: 0.1rem;
    border-radius: 50%;
  }
}
</style>
