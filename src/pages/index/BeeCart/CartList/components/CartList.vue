<template>
  <div class="cart-list">
    <div
      v-for="(store, index) in cart.cartInfo"
      :key="index"
      class="bee-store"
    >
      <van-checkbox
        v-model="allSelectedBox[index]"
        :checked-color="BeeDefault"
        style="margin-top:0"
        @click="allSelected(index,store.product,allSelectedBox[index])"
      >
        <van-icon
          name="shop-o"
          style="vertical-align: text-top;"
        />
        {{ store.storeName }}
      </van-checkbox>
      <van-checkbox-group v-model="cart.cartSelected">
        <van-checkbox
          v-for="item in store.product"
          :key="item.id"
          :name="item"
          :checked-color="BeeDefault"
          @click="changeAll(index,store.product,allSelectedBox[index])"
        >
          <van-card @click.stop="">
            <img
              slot="thumb"
              :src="item.previewImg"
              alt="商品预览图"
              @click.stop="showDetails(item.id)"
            >
            <span
              slot="title"
              class="card-title"
              @click.stop="showDetails(item.id)"
            >{{ item.name }}</span>
            <div
              slot="desc"
              class="card-sku"
              @click.stop="showSku(item.id)"
            >
              {{ item.sku }}
              <van-icon name="arrow-down" />
            </div>
            <span
              slot="price"
              class="card-price"
            >
              ￥{{ item.currentPrice }}
            </span>
            <van-stepper
              slot="num"
              v-model="item.num"
              @click.stop="changeNum"
            />
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <!-- <bee-sku :show-base="beeskuShow" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import BeeSku from '../../../../components/BeeSku'
import { BeeDefault } from '@/styles/index/variables.less'

export default {
  components: {
    // BeeSku
  },
  props: {},
  data() {
    return {
      BeeDefault,
      allSelectedBox: [],
      beeskuShow: false
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  watch: {},
  created() {},
  mounted() {
    for (let index = 0; index < this.cart.cartInfo.length; index++) {
      this.$set(this.allSelectedBox, index, false)
    }
  },
  methods: {
    // NOTE 全选
    allSelected(index, val, isAll) {
      const addVal = val.filter(item => {
        return this.cart.cartSelected.indexOf(item) === -1
      })
      if (isAll) {
        this.cart.cartSelected.push(...addVal)
      } else if (addVal.length === 0) {
        // NOTE 如果已经全选
        val.map(item1 => {
          this.cart.cartSelected.map((item2, index) => {
            if (item2 === item1) {
              this.cart.cartSelected.splice(index, 1)
            }
          })
        })
      }
    },
    // FIXME 有点小问题，选中子类全选可能出错
    changeAll(index, val, isAll) {
      if (isAll) {
        this.allSelectedBox[index] = false
        return
      }
      const addVal = val.filter(item => {
        return this.cart.cartSelected.indexOf(item) === -1
      })
      if (addVal.length === 0) {
        this.allSelectedBox[index] = true
      }
    },
    // TODO 跳转详情
    showDetails(id) {
      console.log(id)
      this.$router.push({
        path: '/category/details'
      })
    },
    // TODO 显示SKU选择器
    showSku(id) {
      this.beeskuShow = true
    },
    changeNum() {
      console.log(123)
    }
  }
}
</script>

<style lang="less">
.cart-list {
  margin: 0.2rem 0.3rem 0;
  .bee-store {
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    padding: 0.3rem 0.2rem;
    .van-card {
      background-color: #ffffff;
      padding: 0;
    }
    .van-checkbox {
      margin-top: 0.4rem;
      .van-checkbox__label {
        width: 90%;
      }
      .van-card__bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
    .card-price {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 0.28rem;
      color: @Grey2;
      font-weight: normal;
    }
    .card-title {
      width: 100%;
      font-size: 0.28rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-sku {
      max-width: 50%;
      border-radius: 0.05rem;
      background-color: @GreyBg;
      font-size: 0.24rem;
      color: @Grey2;
      align-self: flex-start;
      padding: 0.03rem;
      .van-icon {
        vertical-align: text-top;
      }
    }
    .van-card__num {
      .van-stepper {
        // NOTE 覆盖步进器样式
        .van-stepper__minus {
          height: 0.4rem;
          background-color: #fff;
          margin: 0;
          padding: 0.22rem;
          border: 0.01rem solid rgb(226, 226, 226);
          border-right: none;
          border-top-left-radius: 45%;
          border-bottom-left-radius: 45%;
          color: #c5c5c5;
        }
        .van-stepper__input {
          height: 0.4rem;
          background-color: #fff;
          margin: 0;
          border: 0.01rem solid rgb(156, 156, 156);
          font-size: 0.2rem;
          color: @Grey2;
        }
        .van-stepper__plus {
          height: 0.4rem;
          background-color: #fff;
          margin: 0;
          padding: 0.22rem;
          border: 0.01rem solid rgb(156, 156, 156);
          border-left: none;
          border-top-right-radius: 45%;
          border-bottom-right-radius: 45%;
          color: @Grey2;
        }
      }
    }
  }
}
</style>
