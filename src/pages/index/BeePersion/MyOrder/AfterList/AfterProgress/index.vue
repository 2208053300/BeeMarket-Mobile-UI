<template>
  <div class="after-progress">
    <div v-for="(item, index) in afterProgressInfo" :key="index" class="status-content">
      <div class="bee-cir" />
      <div class="bee-line" />
      <div class="status-text">
        <div class="status-text1">
          {{ item.content }}
        </div>
        <div class="status-time">
          {{ item.time }}
        </div>
      </div>
    </div>
    <!-- <div class="status-content">
      <div class="bee-cir" />
      <div class="bee-line" />
      <div class="status-text">
        <div class="status-text1">
          您的订单正由平台积极处理中，请耐心等待您的订单正由平台积极处理中，请耐心等待
        </div>
        <div class="status-time">
          2018.03-20 18:33:00
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getAfterProgressDetail } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '进度详情'
  },
  components: {},
  props: {},
  data() {
    return {
      afterProgressInfo: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getAfterProgressDetail()
  },
  methods: {
    // 获取进度详情
    async getAfterProgressDetail() {
      const res = await getAfterProgressDetail({ aid: this.$route.query.aid })
      console.log('物流详情：', res)
      this.afterProgressInfo = res.data
    }
  }
}
</script>

<style scoped lang="less">
.after-progress {
  background-color: #fff;
  padding: 0 0.4rem;
  .status-content {
    display: flex;
    align-items: center;
    position: relative;
    &:first-child {
      color: @BeeDefault;
      .bee-cir{background-color: @BeeDefault;}
    }
    &:last-child {
     .bee-line{height: 0;}
     .status-text{
       border-bottom: none;
     }
    }
    &:not(:last-child) {
      margin-bottom: 0.3rem;
    }
    .bee-cir {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      background-color: #999;
      margin-right: 0.44rem;
    }
    .status-text {
      flex: 1;
      border-bottom: 0.02rem solid @Grey6;
      padding-right: 0.2rem;
      margin-top: 0.4rem;
      .status-text1 {
        font-size: 0.28rem;
      }
      .status-time {
        font-size: 0.22rem;
        color: @Grey4;
        margin-top: 0.2rem;
        padding-bottom: 0.3rem;
      }
    }
    .bee-line {
      width: 0.02rem;
      height: 1rem;
      position: absolute;
      background-color: @Grey6;
      left: 0.18rem;
      top: 74%;
    }
  }
}
</style>
