<template>
  <div class="active-list">
    <div class="title">
      <img :src="icon.dotLeft" alt="---" style="margin-right: 0.32rem">
      激活明细
      <img :src="icon.dotRight" alt="---" style="margin-left: 0.32rem">
    </div>
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="item">
        <img :src="item.head_image_url" alt="" style="border-radius: 10rem">
        <div class="item-text">
          <span class="nick">{{ item.nickname }}</span>
          <span class="desc">{{ getText(item) }}</span>
        </div>
        <button v-if="[1,3].includes(item.status)" class="orange-btn" @click="toBalance(item.id)">
          提现
        </button>
        <button v-if="item.status === 0" class="white-btn">
          在路上
        </button>
        <button v-if="item.status === 2" class="gray-btn">
          已提现
        </button>
        <button v-if="item.status === -1" class="gray-btn">
          已失效
        </button>
      </div>
    </div>
    <van-popup v-model="showTips" class="download-tip flex">
      <div class="info text-center">
        <img :src="icon.tipImg" class="tip-img" alt="交易提示">
        <!--eslint-disable-next-line-->
        <p class="txt" v-html="tipsText"/>
        <button class="download-btn" @click="showTips = false">
          <span>知道了</span>
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { withdrawCheck } from '@/api/BeeApi/alcohol'
import { getOs } from '@/utils'

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      icon: {
        dotLeft: require('@/assets/icon/alcohol/redpack_dot-left.png'),
        dotRight: require('@/assets/icon/alcohol/redpack_dot-right.png'),
        tipImg: require('@/assets/icon/beeFriends/info/tip_img.png')
      },
      showTips: false,
      tipsText: ''
    }
  },
  methods: {
    getText(item) {
      let text = ''
      text += item.sku_type === 1 ? '参与“整箱装”，' : '参与“体验装”，'
      if ([0, 1].includes(item.status)) {
        text += `为您激活${item.amount}元。`
      } else if (item.status === 2) {
        text += `提现到账${item.amount}元。`
      } else if (item.status === 3) {
        // 已提现 =  总额 - 剩余
        let withdrawn = item.amount - item.remain_amount
        withdrawn = String(withdrawn).includes('.') ? withdrawn.toFixed(2) : withdrawn
        text += `提现到账${withdrawn}元，\r\n剩余${item.remain_amount}元未提现。`
      } else if (item.status === -1) {
        text += `${item.amount}元已失效。`
      }
      return text
    },
    // 转余额
    async toBalance(id) {
      if (getOs().isWx) {
        this.$router.push({ name: 'cashTip' })
        return
      }
      const res = await withdrawCheck()
      if (res.data === 1) {
        this.tipsText = res.message
        this.showTips = true
      } else {
        window.location.href = '/beeFriends#/pay?id=' + id
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  height: auto;
  width: auto;
}
.active-list {
  background:linear-gradient(0deg, rgba(245, 93, 52, 0.6), rgba(242, 63, 50, 0.6));
  border-radius:16px;
  width: 7.1rem;
  max-height: 14.5rem;
  margin: 0.24rem auto;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.36rem;
    padding-bottom: 0.2rem;
    font-size: 0.34rem;
    font-weight: 500;
    color: white;
    img {
      width: 0.58rem;
      height: auto;
    }
  }

  .list {
    padding: 0 0.2rem 0.2rem;
    max-height: 12rem;
    overflow: scroll;
    .item {
      display: grid;
      padding: 0.4rem 0.3rem 0.2rem 0.1rem;
      grid-template-columns: 0.7rem 1fr 1.2rem;
      border-bottom: rgba(255, 255, 255, 0.11) 1px solid;
      align-items: center;
      min-height: 1.1rem;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
      .item-text {
        padding: 0 0.2rem;
        color: white;
        .nick {
          font-size: 0.28rem;
          font-weight: 500;
          display: block;
        }
        .desc {
          white-space: pre-wrap;
          display: block;
          margin-top: 0.14rem;
          font-size: 0.22rem;
          font-weight:500;
          opacity: 0.5;
          line-height: 1.4;
        }
      }
      button {
        border: none;
        width: 1.2rem;
        line-height: 0.46rem;
        padding: 0;
        font-size: 0.26rem;
        border-radius: 0.12rem;
        font-weight: 500;
      }
      .gray-btn {
        background: #CCCCCC;
        color: white;
      }
      .white-btn {
        background: white;
        color: #E6402C;
      }
      .orange-btn {
        background: linear-gradient(180deg,rgba(255,220,31,1),rgba(253,150,11,1));
        color: white;
        position: relative;
        z-index: 10;
      }
    }
  }

  .download-tip {
    background: #fff;
    width: 5.8rem;
    height: 5.2rem;
    border-radius: .1rem;
    .info{
      margin: auto;
    }
    .tip-img{
      width: 3.21rem;
      height: .63rem;
    }
    .txt{
      font-size: .28rem;
      color: #333;
      line-height: 1.5;
      margin: .9rem auto .62rem;
      white-space: pre-wrap;
    }
    .download-btn {
      border: none;
      color: #fff;
      width: 3.2rem;
      height: 0.72rem;
      background: linear-gradient(
        180deg,
        rgba(255, 220, 31, 1),
        rgba(253, 150, 11, 1)
      );
      border-radius: 0.5rem;
      font-size: 0.32rem;
      span {
        display: block;
        height: 100%;
        width: 100%;
        line-height: 0.72rem;
      }
    }
  }
}
</style>
