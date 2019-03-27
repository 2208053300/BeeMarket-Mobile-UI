<template>
  <div>
    <!-- 轮播 -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- 农产品推荐 -->
    <div class="farm-recom margin-t-20 bg-white">
      <van-row>
        <van-col span="8">
          淮安农产品推荐
        </van-col>
        <van-col span="16">
          <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
      <!-- 农产品推荐列表 -->
      <ul class="farm-list margin-t-20">
        <li>
          <div class="item-box">
            <div class="img">
              <img src="" alt="">
            </div>
            <p class="title">
              商品标题
            </p>
            <p class="price">
              ￥500
            </p>
          </div>
        </li>
        <li>
          <div class="item-box">
            <div class="img">
              <img src="" alt="">
            </div>
            <p class="title">
              商品标题
            </p>
            <p class="price">
              ￥500
            </p>
          </div>
        </li>
        <li>
          <div class="item-box">
            <div class="img">
              <img src="" alt="">
            </div>
            <p class="title">
              商品标题
            </p>
            <p class="price">
              ￥500
            </p>
          </div>
        </li>
        <li>
          <div class="item-box">
            <div class="img">
              <img src="" alt="">
            </div>
            <p class="title">
              商品标题
            </p>
            <p class="price">
              ￥500
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.banner{
  background:#ddd;
  height:200px;
}
.farm-recom{
  .banner{height: 150px}
}
.farm-list{width: 100%; overflow-x: scroll; display: -webkit-box;
  li{width: 33%;padding: 0 10px ;}
  .item-box{width: 100%; background: #f3f3f3;}
}
</style>
