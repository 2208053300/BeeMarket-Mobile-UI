<template>
  <div>
    <van-nav-bar title="购物车">
      <div
        slot="right"
        class="nav-right"
      >
        <!-- <van-icon
          name="edit"
          size="20px"
          style="margin-right:21px"
        />
        <van-icon
          name="share"
          size="20px"
        /> -->
      </div>
    </van-nav-bar>
    <div
      class="container"
      :class="{hasSubmit:cartSelected.length!==0}"
    >
      <div class="bee-above">
        <div
          v-if="cart.cartInfo.length===0"
          class="null-cart"
        >
          <div class="null-img" />
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
        />
      </div>
      <div class="bee-below">
        <bee-guess />
      </div>
      <van-submit-bar
        v-if="cartSelected.length!==0"
        :price="3050"
        button-text="结算"
        style="bottom:50px"
      >
        <van-checkbox>全选</van-checkbox>
        <!-- <span slot="tip">
          你的收货地址不支持同城送, <span>修改地址</span>
        </span> -->
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import CartList from './components/CartList'
import BeeGuess from './components/BeeGuess'
import { mapState } from 'vuex'
import { getCartList } from '@/api/cart'

export default {
  components: {
    CartList,
    BeeGuess
  },
  props: {},
  data() {
    return {
      cartSelected: []
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  watch: {},
  created() {},
  mounted() {
    getCartList()
      .then(res => {
        this.cart.cartInfo = res.data.cartData
      })
      .catch(() => {})
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../styles/variables.less";

.container {
  margin-bottom: 60px;
  .bee-below {
    width: 100%;
  }
  .bee-above {
    .null-cart {
      text-align: center;
      .null-img {
        width: 50%;
        height: 4rem;
        margin: 0.82rem auto 0.3rem;
        background-color: #fff;
      }
      .null-text {
        font-size: 0.28rem;
        color: rgb(122, 122, 122);
        display: block;
      }
      .add-btn {
        font-size: 0.26rem;
        border: 1px solid @BeeDefault;
        border-radius: 0.1rem;
        color: @BeeDefault;
        height: 0.54rem;
        line-height: 0.54rem;
        width: 1.8rem;
        margin: 1.2rem 0 1rem;
      }
    }
  }
}
.hasSubmit {
  margin-bottom: 110px;
}
</style>
