<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      class="gift-list"
      :close-on-click-overlay="false"
      @close="handleClose()"
      @click-overlay="handleClose()"
    >
      <p class="tips">
        <span v-if="giftPackage.package_type === 1 && giftPackage.lack_package_balance === 0">
          任意搭配满<span class="money-text"> {{ maxMoney }} 元</span>，自动生成礼包！
        </span>
        <span v-if="giftPackage.package_type === 1 && giftPackage.lack_package_balance > 0">
          还差 <span class="money-text"> {{ giftPackage.lack_package_balance }} 元</span>，自动生成礼包！
        </span>
        <span v-if="giftPackage.package_type === 2">礼包已生成</span>
        <span v-if="giftPackage.package_type === 3">让农产品走出大山，走进千家万户</span>
      </p>
      <div class="list-header">
        <img :src="beeIcon.farm_shopcart_pic_text" style="width: 2.27rem">
        <div class="clear-package" @click="clearPackage">
          <img :src="beeIcon.farm_shopcart_icon_delete">
          <span>清空礼包</span>
        </div>
      </div>
      <div class="list">
        <div v-for="(product, index) in giftPackage.productList" :key="index" class="list-item">
          <img :src="product.tUrl" class="t-url">
          <div class="info">
            <div style="width: 4.5rem;">
              <p class="p-name no-wrap">
                {{ product.pname }}
              </p>
              <span class="p-props-name">
                {{ product.props_name }}
              </span>
            </div>
            <div class="product-operating">
              <span class="price">￥{{ product.sell_price }}</span>
              <!-- 加减按钮 -->
              <div class="p-add-remove">
                <img :src="beeIcon.minus" @click.stop="minus(product, index)">
                <span>{{ product.number }}</span>
                <img :src="beeIcon.plus" @click.stop="plus(product)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { packageEdit, packageEmpty } from '@/api/BeeApi/giftPackage'
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      maxMoney: 599,
      beeIcon: {
        farm_shopcart_pic_text: require('@/assets/icon/giftPackage/farm_shopcart_pic_text@2x.png'),
        farm_shopcart_icon_delete: require('@/assets/icon/giftPackage/farm_shopcart_icon_delete@2x.png'),
        minus: require('@/assets/icon/giftPackage/farm_icon_minus_small@2x.png'),
        plus: require('@/assets/icon/giftPackage/farm_details_icon_plus_big@2x.png')
      }
    }
  },
  computed: {
    ...mapState(['giftPackage'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    async clearPackage() {
      await packageEmpty()
      await this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
      this.$emit('gift-change')
      this.handleClose()
    },
    // 减少数量
    async minus(product, index) {
      product.number--
      if (product.number === 0) {
        this.giftPackage.productList.splice(index, 1)
        if (this.giftPackage.productList.length === 0) {
          this.handleClose()
        }
      }
      this.$store.commit(
        'SET_SELECTED_TOTAL_NUM',
        this.giftPackage.selectedTotalNum - 1
      )
      this.$store.commit(
        'SET_SELECTED_TOTAL_AMOUNT',
        this.giftPackage.selectedTotalAmount - product.sell_price
      )
      this.edit(product)
    },
    // 编辑数量
    async edit(product) {
      this.$emit('gift-change')
      await packageEdit({
        gid: product.gid,
        number: product.number
      })
      await this.$store.dispatch('GET_GIFT_PACKAGE_INFO')
      if (this.giftPackage.selectedTotalNum === 0) {
        this.handleClose()
      }
    },
    // 添加数量
    plus(product) {
      product.number++
      this.$store.commit(
        'SET_SELECTED_TOTAL_NUM',
        parseFloat(this.giftPackage.selectedTotalNum) + 1
      )
      this.$store.commit(
        'SET_SELECTED_TOTAL_AMOUNT',
        this.giftPackage.selectedTotalAmount + parseFloat(product.sell_price)
      )
      this.edit(product)
    }
  }
}
</script>

<style scoped lang="less">
.gift-list {
  border-top-right-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  max-height: 70vh;
  padding-bottom: 1.4rem;
  .tips {
    flex-shrink: 0;
    margin: 0;
    font-size: 0.24rem;
    color: #484848;
    background: #fff4e5;
    text-align: center;
    line-height: 0.6rem;
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    .money-text {
      color: @BeeDefault;
    }
  }
  .list-header {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @GreyBg;
    padding: 0.12rem 0.3rem 0.12rem 0;
    .clear-package {
      img {
        width: 0.24rem;
      }
      span {
        margin-left: 0.12rem;
        font-size: 0.24rem;
        color: @Grey2;
      }
    }
  }
  .list {
    overflow-y: scroll;
    flex-grow: 1;
    padding: 0.2rem 0.3rem;
    background: @GreyBg;
    .list-item {
      box-sizing: border-box;
      height: 2.28rem;
      background: white;
      border-radius: 0.2rem;
      padding: 0.3rem 0.24rem;
      display: flex;
      margin-bottom: 0.2rem;
      .t-url {
        flex-shrink: 0;
        width: 1.68rem;
        height: 1.68rem;
      }
      .info {
        text-align: left;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.12rem 0.24rem;
        .p-name {
          margin: 0 0 0.12rem;
          font-size: 0.28rem;
          color: @Grey12;
        }
        .p-props-name {
          color: @Grey1;
          background: @GreyBg;
          padding: 0.08rem;
          border-radius: 0.04rem;
          font-size: 0.24rem;
        }
        .product-operating {
          align-items: flex-end;
          display: flex;
          justify-content: space-between;
          .price {
            color: @Grey2;
            font-size: 0.28rem;
          }
          .p-add-remove {
            display: flex;
            align-items: center;
            font-size: 0.3rem;
            color: @Grey12;
            span {
              margin: 0 0.2rem;
            }
            img {
              width: 0.4rem;
            }
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
