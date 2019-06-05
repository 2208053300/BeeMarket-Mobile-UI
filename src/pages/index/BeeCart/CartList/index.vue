<template>
  <div>
    <van-nav-bar
      title="购物车"
      fixed
    >
      <div
        slot="right"
        class="nav-right"
      >
        <div v-if="!showEdit">
          <van-icon
            :name="beeIcon.nav_icon_edit"
            size="20px"
            style="margin-right:21px"
            @click="editCart"
          />
          <van-icon
            :name="beeIcon.nav_icon_share"
            size="20px"
            @click="goSharePage"
          />
        </div>
        <span
          v-else
          class="done-edit"
          @click="editCart"
        >完成</span>
      </div>
    </van-nav-bar>
    <div
      class="cart-container"
      :class="{hasSubmit:cart.cartSelected.length!==0}"
    >
      <div class="bee-above">
        <div
          v-if="cart.cartInfo.length===0"
          class="null-cart"
        >
          <div
            class="null-img"
            :style="{backgroundImage:'url('+beeIcon.shopping_cart_pic_no+')'}"
          />
          <span class="null-text">购物车空空如也</span>
          <van-button
            type="default"
            class="add-btn"
          >
            去添加
          </van-button>
        </div>
        <cart-list
          v-else
          ref="cartList"
        />
      </div>
      <div class="bee-below">
        <bee-guess :guess-data="guessData" />
      </div>
      <van-submit-bar
        v-if="cart.cartSelected.length!==0&&!showEdit"
        :price="totalPrices"
        button-text="结算"
        style="bottom:50px"
        @submit="confirmOrderData"
      >
        <van-checkbox
          v-model="allSelectedBox"
          :checked-color="BeeDefault"
          style="margin-left: 0.3rem;"
          @click="allSelected"
        >
          全选
        </van-checkbox>
        <!-- <span slot="tip">
          你的收货地址不支持同城送, <span>修改地址</span>
        </span> -->
      </van-submit-bar>
      <div
        v-if="showEdit"
        class="bee-edit-bar"
      >
        <van-checkbox
          v-model="allSelectedBox"
          :checked-color="BeeDefault"
          style="margin-left: 0.3rem;"
          @click="allSelected"
        >
          全选
        </van-checkbox>
        <div class="right-button">
          <van-button
            round
            class="btn-star"
            @click="starSelected"
          >
            移入关注
          </van-button>
          <van-button
            round
            class="btn-del"
            @click="delSelected"
          >
            删除
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopcartList, delShopcartProduct } from '@/api/BeeApi/user'
import { confirmOrder } from '@/api/BeeApi/order'
import CartList from './components/CartList'
import BeeGuess from '@/components/index/BeeGuess'
import { mapState } from 'vuex'
import { BeeDefault, Grey2 } from '@/styles/index/variables.less'

export default {
  metaInfo() {
    return {
      title: '限量蜂抢'
    }
  },
  components: {
    CartList,
    BeeGuess
  },
  props: {},
  data() {
    return {
      BeeDefault,
      Grey2,
      allSelectedBox: true,
      totalPrices: 0,
      showEdit: false,
      beeIcon: {
        nav_icon_edit: require('@/assets/icon/cart/nav_icon_edit@2x.png'),
        nav_icon_share: require('@/assets/icon/cart/nav_icon_share@2x.png'),
        shopping_cart_pic_no: require('@/assets/icon/cart/shopping_cart_pic_no@2x.png')
      },
      guessData: []
    }
  },
  computed: {
    ...mapState(['cart', 'app'])
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = false
    this.$store.state.app.beeFooter.show = true
    // TODO 如果本地缓存直接读取，如果无缓存从后台获取
    this.getShopcartListData()
  },
  methods: {
    async getShopcartListData() {
      const res = await getShopcartList()
      this.cart.cartInfo = res.data.shopcart
      // 猜你喜欢
      this.guessData = res.data.guess
      // 获取全选状态
      this.cart.cartInfo.map(item => {
        if (!item.checked) {
          this.allSelectedBox = false
        }
        // 获取已选商品对象
        this.cart.cartSelected = item.products.filter(item2 => {
          return item2.checked
        })
      })
      // 总价
      this.totalPrices = 0
      this.cart.cartSelected.map(item => {
        this.totalPrices += item.sell_price * item.number * 100
      })
    },
    // 结算购物车已选商品
    async confirmOrderData() {
      const ctids = this.cart.cartSelected.map(item => {
        return item.cart_id
      })
      const res = await confirmOrder(
        JSON.stringify({
          ctids: ctids
        })
      )
      if (res.status_code === 200) {
        this.$store.state.order.orderDetail = res.data
        this.$store.state.order.addrDetail = res.data.addr
        this.$router.push('/category/details/confirmOrder')
      }
    },
    // 跳转到购物车分享页面
    goSharePage() {
      this.$router.push({
        path: '/CartShare'
      })
    },
    // NOTE 全选
    allSelected() {
      // 如果已经全选
      if (this.allSelectedBox) {
        this.$refs.cartList.checkProduct(
          this.cart.cartInfo[0].products[0].cart_id,
          'all',
          1
        )
      } else {
        this.$refs.cartList.checkProduct(
          this.cart.cartInfo[0].products[0].cart_id,
          'all',
          0
        )
      }
    },
    editCart() {
      this.showEdit = !this.showEdit
    },
    // TODO 移入关注
    starSelected() {
      console.log(this.cart.cartSelected)
    },
    // TODO 删除选中
    async delSelected() {
      const ctids = this.cart.cartSelected.map(item => {
        return item.cart_id
      })
      const res = await delShopcartProduct(JSON.stringify({ ctids: ctids }))
      if (res.status_code === 200) {
        this.getShopcartListData()
      }
    }
  }
}
</script>

<style lang="less">
.done-edit {
  color: @Grey2;
}
.cart-container {
  margin: 50px 0 60px;
  .bee-below {
    width: 100%;
  }
  .bee-above {
    .null-cart {
      text-align: center;
      padding-top: 0.82rem;
      .null-img {
        width: 4rem;
        height: 3.6rem;
        margin: 0 auto 0.3rem;
        background-size: 100% 100%;
      }
      .null-text {
        font-size: 0.28rem;
        color: rgb(122, 122, 122);
        display: block;
      }
      .add-btn {
        font-size: 0.26rem;
        border: 1px solid @BeeDefault;
        background-color: transparent;
        border-radius: 0.1rem;
        color: @BeeDefault;
        height: 0.54rem;
        line-height: 0.54rem;
        width: 1.8rem;
        margin: 1.2rem 0 1rem;
      }
    }
  }
  // NOTE 底部结算栏样式
  .van-submit-bar {
    .van-submit-bar__bar {
      .van-checkbox .van-checkbox__label {
        font-size: 0.28rem;
        color: @Grey2;
      }
    }
    .van-submit-bar__text {
      color: @Grey2;
      font-size: 0.24rem;
      .van-submit-bar__price {
        color: @BeeDefault;
        font-size: 0.28rem;
      }
    }
    .van-button {
      background-color: @BeeDefault;
      border-color: @BeeDefault;
      font-size: 0.32rem;
    }
  }
  .bee-edit-bar {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 50px;
    display: flex;
    align-items: center;
    .van-checkbox {
      flex: 1;
      .van-checkbox__label {
        font-size: 0.28rem;
        color: @Grey2;
      }
    }
    .right-button {
      display: inline-block;
      justify-self: flex-end;
      .btn-star {
        height: 0.76rem;
        line-height: 0.76rem;
        width: 2.1rem;
        color: @BeeDefault;
        border-color: @BeeDefault;
        font-size: 0.28rem;
      }
      .btn-del {
        height: 0.76rem;
        line-height: 0.76rem;
        width: 1.4rem;
        margin: 0 0.3rem 0 0.2rem;
        color: @Grey2;
        font-size: 0.28rem;
        border-color: @Grey1;
      }
    }
  }
}
.hasSubmit {
  margin-bottom: 110px;
}
</style>
