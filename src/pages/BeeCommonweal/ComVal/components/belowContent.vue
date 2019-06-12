<template>
  <div class="below-content">
    <div
      class="cart1"
      @click="goTaskList"
    >
      <div class="cart-img">
        <img
          :src="beeIcon.mine_public_icon_task"
          alt=""
        >
      </div>
      <p class="part-text1">
        蜂任务
      </p>
      <span class="part-text2">完成任务</span>
      <span class="part-text3">领取相应公益值</span>
    </div>
    <bee-guess :guess-data="comVal.charity_products" />
  </div>
</template>

<script>
import BeeGuess from '@/components/index/BeeGuess'
import { getOs } from '@/utils'

export default {
  components: {
    BeeGuess
  },
  props: {
    comVal: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      beeIcon: {
        mine_public_icon_publicwelfare: require('@/assets/icon/common/commonweal/mine_public_icon_publicwelfare.png'),
        mine_public_icon_task: require('@/assets/icon/common/commonweal/mine_public_icon_task.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goTaskList() {
      const osObj = getOs()
      if (osObj.isWx) {
        // FIXME 跳转线上地址
        this.$router.push({
          path: '/beeTask'
        })
      } else if (osObj.isIphone) {
        window.webkit.messageHandlers.ToBeeTask.postMessage('')
      } else if (osObj.isAndroid) {
        window.beeMarket.ToBeeTask()
      } else {
        this.$router.push({
          path: '/beeTask'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.below-content {
  position: relative;
  top: -2rem;
  .cart1 {
    margin: 0.16rem;
    height: 2.7rem;
    background-color: #fffefd;
    border-radius: 0.16rem;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.5rem 0 0.25rem;
    text-align: center;
    .cart-img {
      height: 0.8rem;
      width: 0.8rem;
      margin: auto;
    }
    .part-text1 {
      font-size: 0.28rem;
      padding: 0;
      margin: 0.15rem 0 0.07rem;
    }
    .part-text2 {
      font-size: 0.24rem;
      color: @Grey1;
    }
    .part-text3 {
      font-size: 0.24rem;
      color: @Grey1;
      display: block;
    }
  }
}
</style>
