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
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      />
      <van-row
        class="persion-op"
        type="flex"
        align="center"
      />

      <div class="more-op">
        <van-row>
          <van-col span="8">
            <div @click="goSetting">
              <van-icon
                name="like-o"
                :color="BeeDefault"
              />
              <span>我的收藏</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="$router.push('/addressSetting')">
              <van-icon
                name="location-o"
                :color="BeeDefault"
              />
              <span>地址管理</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="goSetting">
              <van-icon
                name="browsing-history-o"
                :color="BeeDefault"
              />
              <span>历史足迹</span>
            </div>
          </van-col>
        </van-row>
        <van-row style="margin-top:0.5rem;">
          <van-col span="8">
            <div @click="goSetting">
              <van-icon
                name="service-o"
                :color="BeeDefault"
              />
              <span>客服帮助</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="goSetting">
              <van-icon
                name="question-o"
                :color="BeeDefault"
              />
              <span>关于集市</span>
            </div>
          </van-col>
          <van-col span="8">
            <div @click="goSetting">
              <van-icon
                name="setting-o"
                :color="BeeDefault"
              />
              <span>功能设置</span>
            </div>
          </van-col>
        </van-row>
      </div>
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
  methods: {
    goSetting() {
      console.log(123465)

      this.$router.push({
        path: '/functionSetting'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../styles/variables.less";
.van-nav-bar {
  background-color: transparent;
}
.container {
  width: auto;
  margin: 0 0.16rem 50px;
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
  .more-op {
    margin: 0.1rem 0;
    border-radius: 0.2rem;
    overflow: hidden;
    background-color: #fff;
    padding: 0.32rem 0;
    text-align: center;
    font-size: 0.26rem;
    .van-icon {
      display: block;
      font-size: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .van-row {
      position: relative;
      .van-col:not(:last-child) {
        border-right: 0.01rem solid @Grey4;
      }
    }
  }
}
</style>
