<template>
  <div class="product-collected">
    <div>
      <van-icon
        name="search"
        size="20px"
        style="margin-right:0.3rem;"
      />
      <span @click="editProduct">编辑</span>
    </div>
    <div class="product-container">
      <van-checkbox-group v-model="editData">
        <div
          v-for="product in productList"
          :key="product.productName"
          class="bee-product"
          :class="{productEdit:editStatus}"
        >
          <div
            slot="left"
            class="left-checkbox"
          >
            <van-checkbox
              :name="product"
              :checked-color="BeeDefault"
            />
          </div>
          <van-card>
            <div
              slot="thumb"
              class="card-img"
            >
              <img
                :src="product.productImg"
                alt="商品预览图"
              >
              <div
                v-if="product.status===1||product.status===2"
                class="product-masking"
              >
                <span v-if="product.status===1">下架</span>
                <span v-else>售罄</span>
              </div>
            </div>
            <span
              slot="price"
              class="card-price"
            >
              ￥{{ product.price }}
            </span>
            <div
              v-show="product.type"
              slot="desc"
              class="card-sku"
            >
              限量商品
            </div>
            <span
              slot="title"
              class="card-title"
            >{{ product.productName }}</span>
            <van-button
              slot="num"
              class="card-num"
            >
              找相似
            </van-button>
          </van-card>
        </div>
      </van-checkbox-group>
    </div>
    <div
      v-if="editStatus"
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
          class="btn-cancel"
          @click="cancelCollected"
        >
          取消收藏
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  filters: {
    // isLimit(value) {
    //   if (value) {
    //     return '限量商品'
    //   } else {
    //     return
    //   }
    // }
  },
  props: {
    productList: {
      type: Array,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      BeeDefault,
      editData: [],
      editStatus: false,
      allSelectedBox: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    allSelected() {
      if (this.allSelectedBox) {
        this.editData = this.productList
      } else {
        this.editData = []
      }
    },
    cancelCollected() {
      // TODO 取消收藏
      console.log(this.editData)
    },
    editProduct() {
      // TODO 判断是店铺还是商品收藏编辑
      this.editStatus = !this.editStatus
    }
  }
}
</script>

<style lang="less">

.product-collected {
  padding-top: 0.66rem;
  overflow: hidden;
  .product-container {
    margin: 0 0.15rem 0.3rem;
    .productEdit {
      left: 0.8rem;
    }
    .bee-product {
      margin-top: 0.2rem;
      position: relative;
      .left-checkbox {
        position: absolute;
        left: -0.7rem;
        top: 45%;
      }
      .van-card {
        border-radius: 0.2rem;
        background-color: #ffffff;
        padding: 0.3rem 0.15rem;

        .card-price {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 0.3rem;
          color: @BeeDefault;
          font-weight: normal;
        }
        .card-title {
          width: 100%;
          font-size: 0.26rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-img {
          border-radius: 0.1rem;
          overflow: hidden;
          position: relative;
          .product-masking {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: #ffffff;
            font-size: 0.26rem;
            display: flex;
            align-items: center;
            span {
              margin: auto;
            }
          }
        }
        .card-sku {
          max-width: 50%;
          border-radius: 0.05rem;
          background-color: #ff3f3f;
          font-size: 0.24rem;
          color: #ffffff;
          align-self: flex-start;
          padding: 0.03rem;
          margin-top: 0.3rem;
        }
        .card-num {
          width: 1.4rem;
          height: 0.5rem;
          line-height: 0.4rem;
          color: @Grey1;
          font-size: 0.24rem;
          border-radius: 0.23rem;
          border: 0.01rem solid @Grey1;
        }
      }
    }
  }
  .bee-edit-bar {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
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
      height: 100%;
      .btn-cancel {
        height: 100%;
        width: 2.34rem;
        color: #ffffff;
        border-color: @BeeDefault;
        background-color: @BeeDefault;
        font-size: 0.3rem;
      }
    }
  }
}
</style>
