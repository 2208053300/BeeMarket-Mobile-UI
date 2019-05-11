<template>
  <div class="communication-record">
    <div class="audit-status">
      <div class="status-title ">
        <span>商家审核</span>
        <span class="time">2019-04-01</span>
      </div>
      <div class="status-detail">
        <div class="status-text">
          审核结果：<span class="bee-text">拒绝</span>
        </div>
        <!-- TODO 如果商家通过不显示 -->
        <div class="status-text">
          拒绝原因：<span>图片不清晰</span>
        </div>
        <div class="status-text">
          商家备注：<span>呵呵呵呵</span>
        </div>
      </div>
    </div>
    <div class="buyer-desc">
      <div class="desc-title ">
        <span>买家描述</span>
        <span class="time">2019-04-01</span>
      </div>
      <div class="desc-detail">
        <div class="desc-text">
          申请原因：<span>七天无理由退货</span>
        </div>
        <div class="desc-text">
          问题描述：<span>哈哈哈哈</span>
        </div>
      </div>
      <div class="desc-img">
        <div class="img-content">
          <img
            src=""
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '沟通记录'
  },
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
.communication-record {
  .audit-status {
    padding: 0.32rem 0.32rem 0.6rem;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .status-title {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-between;
      .time {
        font-size: 0.24rem;
        color: @Grey1;
      }
    }
    .status-detail {
      margin-top: 0.3rem;
      .status-text {
        font-size: 0.26rem;
        color: @Grey2;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
        span {
          color: @ProductName;
        }
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
  .buyer-desc {
    padding: 0.3rem 0.32rem 1rem;
    background-color: #fff;
    .desc-title {
      display: flex;
      font-size: 0.26rem;
      justify-content: space-between;
      .time {
        font-size: 0.24rem;
        color: @Grey1;
      }
    }
    .desc-detail {
      margin: 0.3rem 0 0.7rem;
      .desc-text {
        font-size: 0.26rem;
        color: @Grey2;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
        span {
          color: @ProductName;
        }
      }
    }
    .desc-img {
      display: grid;
      grid-template-columns: repeat(3, 2rem);
      grid-template-rows: 2rem;
      grid-gap: 0.3rem;
      .img-content {
        border-radius: 0.2rem;
        overflow: hidden;
      }
    }
  }
}
</style>
