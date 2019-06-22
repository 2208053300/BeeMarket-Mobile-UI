<template>
  <!--
  购物车商品 current_status
  -3 商品下架
  -2 售罄
  -1 库存发生变化
  1 正常

 -->
  <div class="cart-list">
    <div
      v-for="(store, index) in cart.cartInfo"
      :key="index"
      class="bee-store"
    >
      <van-checkbox
        v-model="store.checked"
        :checked-color="BeeDefault"
        style="margin-top:0"
        @click="checkProduct(store.products[0].cart_id,'group',store.checked)"
      >
        <van-icon
          name="shop-o"
          style="vertical-align: text-top;"
        />
        {{ store.store_name }}
      </van-checkbox>
      <van-checkbox
        v-for="item in store.products"
        :key="item.id"
        v-model="item.checked"
        :name="item"
        :checked-color="BeeDefault"
        @click="checkProduct(item.cart_id,'one',item.checked,item.current_status)"
      >
        <van-card @click.stop="">
          <div slot="thumb" class="thumb">
            <img
              :src="item.tUrl"
              alt="商品预览图"
              @click.stop="goDetail(item.pid,item.target)"
            >
            <div v-if="[-3,-2].includes(item.current_status)" class="tip">
              <span v-if="item.current_status === -2">已售罄</span>
              <span v-if="item.current_status === -3">已下架</span>
            </div>
          </div>
          <span
            slot="title"
            class="card-title"
            @click.stop="goDetail(item.pid,item.target)"
          >{{ item.pname }}</span>
          <div
            slot="desc"
            class="card-sku"
            @click.stop="showSku(item.pid,item.props,item.number,item.cart_id)"
          >
            {{ item.props_name }}
            <van-icon name="arrow-down" />
          </div>
          <span
            slot="price"
            class="card-price"
          >
            ￥{{ item.sell_price }}
          </span>
          <!-- current_status === -2 || -3 售罄或者下架 显示移除按钮 -->

          <div v-if="[-2,-3].includes(item.current_status)" slot="num">
            <van-button round class="remove-btn" @click="removeItem(item.cart_id)">
              移除
            </van-button>
          </div>
          <!-- current_status === -1 库存值发生变化，如果原有值大于库存值，返回的为库存值，并给出提示 -->

          <div v-else slot="num">
            <van-stepper
              v-if="item.current_status === -1"
              v-model="item.number"
              :max="item.number"
              :integer="true"
              @change="changeNum(item.number,item.cart_id)"
            />

            <van-stepper
              v-if="item.current_status !== -1"
              v-model="item.number"
              :integer="true"
              @change="changeNum(item.number,item.cart_id)"
            />
          </div>
        </van-card>
        <p v-if="item.current_status === -1" class="num-change-tip">
          库存变化，数量已调至最大
        </p>
      </van-checkbox>
    </div>
    <bee-sku
      ref="beeSku"
      :pid="editPid"
      :show-sku.sync="skuShow"
      :props-id.sync="propsId"
      :p-number.sync="pNumber"
      @get-sku-id="getSkuId"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BeeSku from '@/components/index/BeeSku'
import { BeeDefault } from '@/styles/index/variables.less'
import {
  updateShopcartProductNum,
  checkShopcartProduct,
  updateShopcartProductSku,
  delShopcartProduct
} from '@/api/BeeApi/user'

export default {
  components: {
    BeeSku
  },
  props: {},
  data() {
    return {
      BeeDefault,
      skuShow: false,
      propsId: [],
      pNumber: 1,
      editCtid: 0,
      editPid: 0
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // TODO 移除
    async removeItem(cid) {
      const ctids = Array.of(cid)
      const res = await delShopcartProduct(JSON.stringify({ ctids: ctids }))
      if (res.status_code === 200) {
        this.getShopcartListData()
        this.showEdit = false
      }
    },
    // 更改选中状态
    async checkProduct(ctid, act, checked, status) {
      if ([-3, -2].includes(status)) {
        return
      }
      const res = await checkShopcartProduct({
        ctid: ctid,
        act: act,
        checked: checked ? 0 : 1
      })
      if (res.status_code === 200) {
        this.$parent.getShopcartListData()
      }
    },
    // TODO 跳转详情
    goDetail(pid, target) {
      this.$router.push({
        path: '/category/details',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    },
    // TODO 显示SKU选择器
    showSku(pid, propsId, number, ctid) {
      this.skuShow = true
      this.editPid = pid
      this.propsId = propsId
      this.pNumber = number
      this.editCtid = ctid
    },
    // 变更SKU
    async getSkuId(sid) {
      const res = await updateShopcartProductSku({
        ctid: this.editCtid,
        sid: sid,
        number: this.pNumber
      })
      if (res.status_code === 200) {
        this.$parent.getShopcartListData()
      }
    },
    // TODO 更改数量
    async changeNum(num, ctid) {
      const res = await updateShopcartProductNum({
        ctid: ctid,
        number: num
      })
      if (res.status_code === 200) {
        this.$parent.getShopcartListData()
      }
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
    box-shadow: 0 0 0.1rem 0.04rem @Grey7;
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
      // max-width: 50%;
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
    .van-card__thumb{
      .thumb{
        width:90px;
        height:90px;
        position: relative;
        .tip{
          position: absolute;
          top: 0;
          left: 0;
          width:100%;
          height: 100%;
          display: flex;
          font-size: .26rem;
          color:#fff;
          background: rgba(0, 0, 0,.5);
          span{
            margin:auto
          }
        }
      }
    }
    .num-change-tip{margin: 0.1rem auto 0; text-align: right; font-size: 0.24rem;color: red;}
    .van-card__num {
      .remove-btn{border: 1px solid @BeeDefault;color:@BeeDefault; font-size: .26rem; height: 0.46rem;line-height:  0.46rem; width: 0.92rem;}
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
