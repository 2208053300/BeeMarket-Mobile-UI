<template>
  <div class="my-earn">
    <div class="earn-header">
      <div class="head-img">
        <div class="img-content">
          <img
            src=""
            alt=""
          >
        </div>
        <span class="user-name">用户名用户名</span>
      </div>
      <div class="earn-tab">
        <div class="tab-content">
          <div class="type-img">
            <img
              :src="beeIcon.bee_firends_income_icon_growingup"
              alt=""
            >
          </div>
          <span class="num">111</span>
          <p class="type-text">
            成长值
          </p>
        </div>
        <div class="tab-content">
          <div class="type-img">
            <img
              :src="beeIcon.bee_firends_income_icon_gold"
              alt=""
            >
          </div>
          <span class="num">111</span>
          <p class="type-text">
            余额数
          </p>
        </div>
      </div>
    </div>
    <div class="earn-detail">
      <div class="detail-title">
        <div class="title-img">
          <img
            :src="beeIcon.bee_firends_income_icon_growingup"
            alt=""
          >
        </div>
        <span class="title-text">增长详情</span>
      </div>
      <div class="detail-content">
        <div class="detail-card">
          <div class="info-time">
            2019-06-09
          </div>
          <div class="info-text">
            哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
          </div>
          <div class="circle" />
        </div>
        <div class="detail-card">
          <div class="info-time">
            2019-06-09
          </div>
          <div class="info-text">
            哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
          </div>
          <div class="circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        bee_firends_income_icon_growingup: require('@/assets/icon/beeFriends/info/bee_firends_income_icon_growingup.png'),
        bee_firends_income_icon_gold: require('@/assets/icon/beeFriends/info/bee_firends_income_icon_gold.png')
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
.my-earn {
  .earn-header {
    height: 4.3rem;
    background-color: @BeeDefault;
    .head-img {
      padding-top: 1.3rem;
      text-align: center;
      .img-content {
        margin: 0 auto 0.18rem;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.04rem solid rgba(255, 255, 255, 0.2);
        background-color: #000;
      }
      .user-name {
        font-size: 0.3rem;
        color: #fff;
      }
    }
    .earn-tab {
      margin-top: 0.2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .tab-content {
        text-align: center;
        .type-img {
          // width: 100%;
          height:  0.38rem;
          display: inline-block;
          margin-right: 0.15rem;
        }
        .num {
          font-size: 0.46rem;
          color: #fff;
          vertical-align: middle;
        }
        .type-text {
          font-size: 0.24rem;
          color: #fff;
          margin: 0;
          padding: 0;
          margin-top: 0.04rem;
        }
      }
    }
  }
  .earn-detail {
    padding: 0.3rem 0 0.3rem 0.6rem;
    background-color: #fff;
    min-height: 9rem;
    .detail-title {
      .title-img {
        height: 0.54rem;
        width: 0.44rem;
        display: inline-block;
        margin-right: 0.1rem;
      }
      .title-text {
        font-size: 0.26rem;
        vertical-align: middle;
      }
    }
    .detail-content{
      padding: 0.38rem 0 0 0.32rem;
      margin-left: 0.2rem;
      border-left: 0.02rem solid #EBEBEB;
      .detail-card{
        background-color: #FFF8EC;
        padding: 0.23rem 0.64rem 0.2rem 0.46rem;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        margin-bottom: 0.2rem;
        position: relative;
        .info-time{
          font-size: 0.24rem;
          color: @Grey1;
        }
        .info-text{
          font-size: 0.26rem;
          margin-top: 0.14rem;
          line-height: 0.36rem;
        }
        .circle{
          width: 0.22rem;
          height: 0.22rem;
          box-sizing: border-box;
          border: 0.05rem solid #FFAA16;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          left: -0.46rem;
          top: 0.6rem;
        }
      }
    }
  }
}
</style>
