<template>
  <div>
    <van-nav-bar>
      <div
        slot="right"
        class="nav-right"
      >
        <div>
          <van-icon
            color="#ffffff"
            name="chat-o"
            size="20px"
            style="margin-right:0.5rem;"
          />
          <van-icon
            color="#ffffff"
            name="qr"
            size="20px"
          />
        </div>
      </div>
    </van-nav-bar>
    <div class="container">
      <van-row
        class="head-user"
        type="flex"
        align="center"
      >
        <van-col span="4">
          <div class="head-img">
            <img
              src="@/assets/logo.png"
              alt="头像"
            >
          </div>
        </van-col>
        <van-col
          span="16"
          offset="2"
        >
          <span class="head-name">
            哈哈哈哈哈哈哈哈哈哈哈哈
          </span>
          <div class="head-type">
            <van-icon name="vip-card-o" />
            <span>合伙人</span>
          </div>
        </van-col>
      </van-row>
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      />
      <bee-order />
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '../../../styles/variables.less'
import BeeOrder from './components/BeeOrder'
export default {
  components: {
    BeeOrder
  },
  props: {},
  data() {
    return {
      BeeDefault
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
@import "../../../styles/variables.less";
.van-nav-bar {
  background-color: transparent;
}
.container {
  width: auto;
  margin: 0 0.16rem;
  .van-row {
    margin: 0.1rem 0;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .head-user {
    height: 1.58rem;
    background-color: transparent;
    .head-img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      margin-left: 0.16rem;
    }
    .head-name {
      font-size: 0.36rem;
      color: #ffffff;
    }
    .head-type {
      font-size: 0.18rem;
      color: #ffffff;
      background-color: #7f5723;
      display: inline-block;
      margin-top: 0.2rem;
      padding: 0.06rem 0.3rem;
      border-radius: 0.5rem;
      .van-icon {
        vertical-align: text-top;
        margin-right: 0.06rem;
      }
    }
  }
  .persion-op {
    height: 1.58rem;
    background-color: #fff;
  }
}
</style>
