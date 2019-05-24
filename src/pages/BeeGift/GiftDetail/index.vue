<template>
  <div class="gift-detail">
    <van-notice-bar
      v-if="giftDetail.status===1"
      text="这是您赠送好友的订单，不能自己领取"
      mode="closeable"
      :color="Grey1"
      background="#FFFBF6"
    />
    <gift-header :gift-detail="giftDetail" />
    <gift-list :gift-detail="giftDetail" />
    <div
      v-if="giftDetail.status!==3"
      class="bee-tips"
    >
      <span>注：</span>
      <div class="tips-content">
        <span
          v-if="giftDetail.status===0"
          class="text1"
        >您也可以选择转赠他人，礼物将由他人接收</span>
        <span
          v-if="giftDetail.status===1"
          class="text1"
        >1.您也可以选择转赠他人，礼物将由他人接收</span>
        <p
          v-if="giftDetail.status===1"
          class="text1"
        >
          2.如果好友在剩余时间内未领取，您可以选择自己领取
        </p>
        <span
          v-if="giftDetail.status===2"
          class="text1"
        >
          如果好友在剩余时间内未领取，您可以选择自己领取
        </span>
      </div>
    </div>
    <gift-footer
      v-if="giftDetail.status!==3"
      :gift-detail="giftDetail"
    />
  </div>
</template>

<script>
import giftHeader from './components/giftHeader'
import giftFooter from './components/giftFooter'
import giftList from './components/giftList'
import { getBeeGiftList } from '@/api/other'
import { Grey1 } from '@/styles/index/variables.less'
export default {
  components: {
    giftHeader,
    giftFooter,
    giftList
  },
  props: {},
  data() {
    return {
      Grey1,
      giftDetail: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getBeeGiftListData()
  },
  methods: {
    async getBeeGiftListData() {
      const res = await getBeeGiftList()
      this.giftDetail = res.data.gift
    }
  }
}
</script>

<style scoped lang="less">
.gift-detail {
  padding-top: 46px;
  margin-bottom: 120px;
  .van-notice-bar {
  }
  .bee-tips {
    font-size: 0.24rem;
    margin-top: 0.3rem;
    padding-left: 0.3rem;
    display: flex;
    .text1 {
      font-size: 0.2rem;
      color: @Grey1;
    }
  }
}
</style>
