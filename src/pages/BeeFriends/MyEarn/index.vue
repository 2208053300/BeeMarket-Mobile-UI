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
              src=""
              alt=""
            >
          </div>
          <span class="num" />
          <p class="type-text">
            成长值
          </p>
        </div>
        <div class="tab-content">
          <div class="type-img">
            <img
              src=""
              alt=""
            >
          </div>
          <span class="num" />
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
            src=""
            alt=""
          >
        </div>
        <span class="title-text">增长详情</span>
      </div>
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
      margin-top: 0.3rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .tab-content {
        text-align: center;
      }
      .type-text {
        font-size: 0.24rem;
        color: #fff;
      }
    }
  }
  .earn-detail {
    padding: 0.3rem 0 0.3rem 0.6rem;
    background-color: #fff;
    min-height: 9rem;
    .detail-title {
      .title-text {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
