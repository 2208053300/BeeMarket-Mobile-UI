<template>
  <div class="gift-bar flex flex-column align-center" @click="$emit('open-list')">
    <div v-if="giftPackage.showTip" class="tips">
      <span v-if="giftPackage.selectedTotalAmount===0">
        任意搭配满<span class="money-text"> {{ maxMoney }} 元</span>，自动生成礼包！
      </span>
      <span v-if="giftPackage.selectedTotalAmount>0 && giftPackage.selectedTotalAmount < maxMoney">
        还差 <span class="money-text"> {{ tipMoneyText }} 元</span>，自动生成礼包！
      </span>
      <span v-if="giftPackage.selectedTotalAmount >= maxMoney">礼包已生成</span>
    </div>
    <div class="bar-body">
      <!-- 礼包图标 -->
      <div class="package">
        <img
          :src="giftPackage.selectedTotalNum > 0 ? beeIcon.lightPackage : beeIcon.packages"
        >
        <span v-if="giftPackage.selectedTotalNum > 0" class="badge">
          {{ giftPackage.selectedTotalNum }}
        </span>
      </div>
      <div class="selected-price">
        ￥{{ giftPackage.selectedTotalAmount }}
      </div>
      <div class="nothing">
        <span v-if="giftPackage.selectedTotalNum <= 0">
          未选购商品
        </span>
      </div>
      <div
        class="go-settlement"
        :class="{'can-settlement':canSettlement}"
        @click.stop="goSettlement"
      >
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        lightPackage: require('@/assets/icon/giftPackage/farm_pic_ceremony_n@2x.png'),
        packages: require('@/assets/icon/giftPackage/farm_pic_ceremony_d@2x.png')
      },
      maxMoney: 599
    }
  },
  computed: {
    ...mapState(['giftPackage']),
    canSettlement() {
      return this.giftPackage.selectedTotalAmount >= this.maxMoney
    },
    tipMoneyText() {
      return (this.maxMoney - this.giftPackage.selectedTotalAmount).toFixed(2)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 去结算
    goSettlement() {
      if (this.canSettlement) {
        if (window.location.href === '/') {
          this.$router.push('/category/details/confirmOrder?target=pgpackage')
        } else {
          window.location.href = '/#/category/details/confirmOrder?target=pgpackage'
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.gift-bar {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.36rem 0.2rem 0.36rem;
  .tips {
    width: 6.08rem;
    height: 0.64rem;
    padding-bottom: 0.08rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
    color: #484848;
    background: rgba(255, 244, 229, 0.9);
    border: 1px solid rgba(255, 198, 128, 0.9);
    border-top-left-radius: 0.16rem;
    border-top-right-radius: 0.16rem;
    .money-text {
      color: @BeeDefault;
    }
  }
  .bar-body {
    width: 6.8rem;
    height: 1rem;
    position: relative;
    top: -0.08rem;
    margin-bottom: -0.08rem;
    background: rgba(68, 68, 68, 0.9);
    border-radius: 10rem;
    display: flex;
    align-items: center;
    .package {
      margin-left: 0.52rem;
      position: relative;
      top: -0.14rem;
      img {
        width: 0.96rem;
      }
      .badge {
        top: 0;
        right: -0.24rem;
        position: absolute;
        color: white;
        padding: 0.04rem;
        display: inline-block;
        background: @Red1;
        border-radius: 0.5rem;
        border: 0.04rem solid white;
        min-width: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.24rem;
      }
    }
    .selected-price {
      text-align: left;
      font-size: 0.4rem;
      color: white;
      font-weight: bold;
      width: 1.64rem;
      padding-left: 0.2rem;
    }
    .nothing {
      color: @Grey1;
      font-size: 0.28rem;
      text-align: left;
      flex-grow: 1;
    }
    .go-settlement {
      position: relative;
      right: -1px;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-size: 0.32rem;
      text-align: center;
      line-height: 1rem;
      width: 1.96rem;
      height: 100%;
      color: @Grey1;
    }
    .can-settlement {
      background: linear-gradient(to right, #ffbd2f, #ffa42f);
      color: white;
    }
  }
}
</style>
