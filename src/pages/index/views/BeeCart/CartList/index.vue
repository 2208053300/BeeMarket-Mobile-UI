<template>
  <div>
    <van-nav-bar title="购物车">
      <div
        slot="right"
        class="nav-right"
      >
        <div v-if="!showEdit">
          <van-icon
            :color="Grey2"
            name="edit"
            size="20px"
            style="margin-right:21px"
            @click="editCart"
          />
          <van-icon
            :color="Grey2"
            name="share"
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
    <p> {{ app }}</p>
    <div
      class="container"
      :class="{hasSubmit:cart.cartSelected.length!==0}"
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
        <cart-list v-else />
      </div>
      <div class="bee-below">
        <bee-guess />
      </div>
      <van-submit-bar
        v-if="cart.cartSelected.length!==0&&!showEdit"
        :price="totalPrices"
        button-text="结算"
        style="bottom:50px"
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
import CartList from './components/CartList'
import BeeGuess from '@/pages/index/components/BeeGuess'
import { mapState, mapActions } from 'vuex'
import { getCartList } from '@/api/cart'
import { BeeDefault, Grey2 } from '../../../styles/variables.less'

export default {
  components: {
    CartList,
    BeeGuess
  },
  props: {},
  data() {
    return {
      BeeDefault,
      Grey2,
      allSelectedBox: false,
      allSelectedData: [],
      totalPrices: 0,
      showEdit: false
    }
  },
  computed: {
    ...mapState(['cart', 'app'])
  },
  watch: {
    'cart.cartSelected': {
      handler(val) {
        // NOTE 计算总价
        this.totalPrices = val.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.currentPrice * 100
        }, 0)
      },
      deep: true
    }
  },
  created() {
    this.ChangeBeeFooter({
      show: false,
      avtive: 3
    })
  },
  mounted() {
    this.$store.commit('SET_BEEFOOTER', {
      show: true,
      avtive: 3
    })
    getCartList()
      .then(res => {
        this.cart.cartInfo = res.data.cartData
        // this.allSelectedData = res.data.cartData
        res.data.cartData.map((item, index) => {
          item.product.map((item2, index2) => {
            this.allSelectedData.push(item2)
          })
        })
      })
      .catch(() => {})
  },
  methods: {
    ...mapActions(['ChangeBeeFooter']),
    // 跳转到购物车分享页面
    goSharePage() {
      this.$store.state.app.beeFooter.show = false
      this.$router.push({
        path: '/CartShare'
      })
    },
    // NOTE 全选
    allSelected() {
      if (this.allSelectedBox) {
        this.cart.cartSelected = this.allSelectedData
      } else {
        this.cart.cartSelected = []
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
    delSelected() {
      console.log(this.cart.cartSelected)
    }
  }
}
</script>

<style lang="less">
@import "../../../styles/variables.less";

.done-edit {
  color: @Grey2;
}
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
