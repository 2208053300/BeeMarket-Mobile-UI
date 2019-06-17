<template>
  <div class="below-content">
    <div class="rookie-enjoy">
      <div class="enjoy-title">
        <span>新手专享 双重好礼</span>
      </div>
      <div class="enjoy-content">
        <div class="left-content">
          <div class="left-text1">
            点点手指
          </div>
          <div class="left-text1">
            <van-icon name="plus" />
          </div>
          <div class="left-text1">
            3.6亿豪礼送
          </div>
        </div>
        <div class="right-content">
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_participate"
                alt="参与助力"
              >
            </div>
            <span class="img-text">参与助力</span>
          </div>
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_complete_material"
                alt="完善资料"
              >
            </div>
            <span class="img-text">完善资料</span>
          </div>
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_talent"
                alt="成为达人"
              >
            </div>
            <span class="img-text">成为达人</span>
          </div>
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_evaluation"
                alt="评价商品"
              >
            </div>
            <span class="img-text">评价商品</span>
          </div>
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_initiate"
                alt="发起助力"
              >
            </div>
            <span class="img-text">发起助力</span>
          </div>
          <div class="img-item">
            <div class="img-content">
              <img
                :src="beeIcon.bee_commonweal_icon_liqueur"
                alt="免费领酒"
              >
            </div>
            <span class="img-text">免费领酒</span>
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <van-button
          class="goTask"
          round
          @click="goTaskList"
        >
          进入新手专享
        </van-button>
      </div>
    </div>
    <bee-guess :guess-data="comVal.charity_products" />
  </div>
</template>

<script>
import BeeGuess from '@/components/index/BeeGuess'
import { getOs } from '@/utils'

export default {
  metaInfo() {
    return {
      title: '我的公益值'
    }
  },
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
        bee_commonweal_icon_participate: require('@/assets/icon/common/commonweal/bee_commonweal_icon_participate.png'),
        bee_commonweal_icon_complete_material: require('@/assets/icon/common/commonweal/bee_commonweal_icon_complete_material.png'),
        bee_commonweal_icon_talent: require('@/assets/icon/common/commonweal/bee_commonweal_icon_talent.png'),
        bee_commonweal_icon_evaluation: require('@/assets/icon/common/commonweal/bee_commonweal_icon_evaluation.png'),
        bee_commonweal_icon_initiate: require('@/assets/icon/common/commonweal/bee_commonweal_icon_initiate.png'),
        bee_commonweal_icon_liqueur: require('@/assets/icon/common/commonweal/bee_commonweal_icon_liqueur.png')
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
      } else if (osObj.isIphone && osObj.isApp) {
        window.webkit.messageHandlers.ToBeeTask.postMessage('')
      } else if (osObj.isAndroid && osObj.isApp) {
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
  top: -0.8rem;
  .rookie-enjoy {
    height: 4.46rem;
    background-color: #fff;
    border-radius: 0.16rem;
    padding: 0.3rem 0 0.9rem 0.26rem;
    box-sizing: border-box;
    margin: 0 0.16rem 0.6rem;
    position: relative;
    .enjoy-title {
      font-size: 0.32rem;
      text-align: center;
      font-weight: bold;
    }
    .enjoy-content {
      margin-top: 0.45rem;
      display: flex;
      align-items: center;
      .left-content {
        width: 0.71rem;
        font-size: 0.24rem;
        color: @Grey2;
        text-align: center;
        line-height: 0.34rem;
      }
      .right-content {
        flex: 1;
        padding: 0 0.3rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-row-gap: 0.4rem;
        grid-column-gap: 0.3rem;
        .img-item {
          text-align: center;
          .img-content {
            margin: auto;
            width: 0.66rem;
            height: 0.72rem;
          }
          .img-text {
            font-size: 0.2rem;
            color: #bda490;
          }
        }
      }
    }
    .bottom-btn {
      position: relative;
      bottom: -0.3rem;
      text-align: center;
      margin-top: 0.2rem;
      .goTask {
        margin: auto;
        width: 4.57rem;
        height: 0.71rem;
        line-height: 0.71rem;
        color: #fff;
        font-size: 0.3rem;
        padding: 0;
        border: none;
        background-color: @BeeDefault;
      }
    }
  }
}
</style>
