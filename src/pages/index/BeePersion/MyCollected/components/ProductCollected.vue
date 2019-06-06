<template>
  <div class="product-collected">
    <div style="background: #fafafa;padding:0.2rem 0.3rem;text-align: right">
      <span @click="editProduct">{{ editStatus ? '完成' : '编辑' }}</span>
    </div>
    <div class="product-container">
      <van-checkbox-group v-model="editData">
        <van-pull-refresh v-model="loading" @refresh="$emit('change')">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="$emit('load')"
        >
          <div
            v-for="product in productList"
            :key="product.product_id"
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
                  :src="product.thumb_url"
                  alt="商品预览图"
                >
                <div
                  v-if="!product.is_upper||!product.is_stock"
                  class="product-masking"
                >
                  <span v-if="!product.is_upper">下架</span>
                  <span v-if="!product.is_stock">售罄</span>
                </div>
              </div>
              <span
                slot="price"
                class="card-price"
              >
                ￥{{ product.selling_price }}
              </span>
              <div slot="desc" class="tags">
                <div v-if="product.zone" class="from-area">
                  {{ product.zone }}
                </div>
                <div
                  v-if="product.is_hot"
                  class="bee-tag hotTag"
                >
                  热销
                </div>
                <div
                  v-for="(tag, index) in product.tag_name"
                  :key="index"
                  class="bee-tag"
                >
                  {{ tag }}
                </div>
              </div>
              <span
                slot="title"
                class="card-title"
              >{{ product.product_name }}</span>
            </van-card>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-checkbox-group>
    </div>
    <div
      class="bee-edit-bar"
      :class="{'show-bar': editStatus}"
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
import { cancelCollect } from '@/api/BeeApi/user'
export default {
  components: {},
  filters: {},
  props: {
    productList: {
      type: Array,
      default: () => {
        return
      }
    },
    finished: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      BeeDefault,
      editData: [],
      editStatus: false,
      allSelectedBox: false,
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    allSelected() {
      if (this.allSelectedBox) {
        this.editData = []
      } else {
        this.editData = this.productList
      }
    },
    async cancelCollected() {
      const ids = this.editData.map(data => {
        return data.product_id
      })
      if (ids.length === 0) {
        this.$toast.fail('请至少选择一个商品')
        return
      }
      const res = await cancelCollect({
        content_ids: JSON.stringify(ids),
        type: 1
      })
      if (res.code) {
        this.$emit('change')
      }
    },
    editProduct() {
      this.editStatus = !this.editStatus
    }
  }
}
</script>

<style lang="less">
.product-collected {
  overflow: hidden;
  .product-container {
    margin: 0 0.15rem 0.3rem;
    .productEdit {
      transform: translateX(0.8rem);
    }
    .bee-product {
      transition: all 200ms linear;
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
        .tags {
          margin-top: 0.3rem;
          display: flex;
          .from-area {
            font-size: 0.2rem;
            color: @Red1;
            border-radius: 0.04rem;
            border: 0.02rem solid @Red1;
            padding: 0.05rem 0.04rem;
            margin-right: 0.12rem;
          }
          .bee-tag {
            display: inline-block;
            font-size: 0.2rem;
            color: @BeeDefault;
            border: 0.02rem solid @BeeDefault;
            border-radius: 0.2rem;
            padding: 0.05rem 0.1rem;
            &:not(:last-child) {
              margin-right: 0.12rem;
            }
          }
          .hotTag {
            border-color: #ffffff;
            color: #ffffff;
            background: linear-gradient(to right, @BeeDefault, #ff7116);
          }
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
    bottom: -1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    transition: all 200ms linear;
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
  .show-bar {
    transform: translateY(-1rem);
  }
}
</style>
