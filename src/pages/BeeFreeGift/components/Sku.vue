<template>
  <div class="bee-sku">
    <van-popup
      v-model="showSku"
      position="bottom"
      class="skuPop"
      :close-on-click-overlay="false"
      @open="getProductPropsData()"
      @close="handleClose()"
      @click-overlay="handleClose()"
    >
      <div class="sku-content">
        <div class="product-header">
          <div
            class="product-img"
            @click="showPreview=true"
          >
            <img
              :src="propsData.tUrl"
              alt=""
            >
          </div>
          <div class="product-detail">
            <div class="product-price">
              价格：￥{{ propsData.section_price }}
            </div>
            <div class="sku-value">
              已选择：{{ skuName.join(',') }}
            </div>
            <div
              class="cancel-sku"
              @click="handleClose()"
            >
              <img
                :src="beeIcon.shopping_cart_icon_cancel"
                alt=""
              >
            </div>
          </div>
        </div>
        <div class="sku-detail">
          <div
            v-for="item in propsData.props"
            :key="item.prop_id"
            class="prop-content"
          >
            <div class="prop-title">
              {{ item.prop_name }}
            </div>
            <div class="prop-value">
              <div
                v-for="item2 in item.values"
                :key="item2.value_id"
                :class="[{valueContent2:item2.selected},{valueContent3:item2.disable}]"
                class="value-content"
                @click="getProductSkuData(item,item2)"
              >
                {{ item2.value_name }}
              </div>
            </div>
          </div>
          <p
            v-if="selectType===2&&propsData.person_num"
            class="gift-num"
          >
            分享<span class="num">{{ propsData.person_num }}</span>人参与，立即开奖~
          </p>
        </div>
      </div>
      <div class="done-btn">
        <van-button
          class="done"
          @click="handleDone()"
        >
          免费送礼
        </van-button>
      </div>
      <van-image-preview
        v-model="showPreview"
        :images="[propsData.qUrl]"
        class="previewImg"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProductSku } from '@/api/BeeApi/product'

import { postSku } from '@/api/BeeApi/freeGift'
export default {
  components: {},
  props: {
    showSku: {
      type: Boolean,
      default: false
    },
    pid: {
      type: Number,
      default: 0
    },
    propsId: {
      type: Array,
      default: () => {
        return {}
      }
    },
    pNumber: {
      type: Number,
      default: 1
    },
    limitNum: {
      type: Number,
      default: 99
    },
    selectType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      propsData: {},
      skuData: {},
      productNum: 1,
      skuName: [],
      selProps: [],
      beeIcon: {
        shopping_cart_icon_cancel: require('@/assets/icon/cart/shopping_cart_icon_cancel@2x.png')
      },
      showPreview: false,
      sid: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 第一次打开时，获取基础选项
    async getProductPropsData() {
      // 如果已经选过了，传入sku信息
      if (this.propsId) {
        const res = await getProductSku(
          JSON.stringify({
            pid: this.pid,
            props: this.propsId
          })
        )
        this.propsData = res.data
        // sku_id
        this.sid = res.data.sku_id
        this.$parent.sid = this.sid
        this.skuName = []
        this.getSkuName(this.propsData.props)
      } else {
        const res = await getProductSku(
          JSON.stringify({
            pid: this.pid
          })
        )
        this.propsData = res.data
        // sku_id
        this.sid = res.data.sku_id
        this.$parent.sid = this.sid
      }
      // sku数量
      this.productNum = this.pNumber ? this.pNumber : 1
    },
    async getProductSkuData(prop, values) {
      this.skuName = []
      // 删除该属性中已选的选项
      prop.values.map(item => {
        if (item.selected) {
          delete item.selected
        }
      })
      values.selected = 1
      // 获取选中的属性
      this.selProps = []
      this.propsData.props.map(item => {
        item.values.map(item2 => {
          if (item2.selected) {
            this.selProps.push({
              prop_id: item.prop_id,
              value_id: item2.value_id
            })
          }
        })
      })
      const res = await getProductSku(
        JSON.stringify({
          pid: this.pid,
          props: this.selProps
        })
      )
      this.propsData = res.data
      // sku_id
      this.sid = res.data.sku_id
      this.$parent.sid = this.sid

      this.getSkuName(this.propsData.props)
    },
    getSkuName(props) {
      props.map(item => {
        item.values.map(item2 => {
          if (item2.selected) {
            this.skuName.push(item2.value_name)
          }
        })
      })
    },
    handleClose() {
      // this.$emit('update:showSku', false)
      this.$parent.showSku = false
    },
    async handleDone() {
      console.log('免费送礼')
      if (!this.sid) {
        this.$toast('请先选择规格！')
        return
      }
      try {
        const res = await postSku({ sid: this.sid })
        if (res.status_code === 200) {
          this.$parent.showSku = false
          this.$parent.showGift = true
          this.$parent.nowProduct = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less">
.bee-sku {
  .skuPop {
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    overflow: initial;
    .sku-content {
      padding: 0.4rem 0.3rem 0.3rem;
      max-height: 8rem;
      .product-header {
        display: flex;
        .product-img {
          height: 1.8rem;
          width: 1.8rem;
          border-radius: 0.04rem;
          margin-right: 0.16rem;
        }
        .product-detail {
          flex: 1;
          border-bottom: 0.02rem solid @Grey6;
          padding: 0.52rem 0;
          position: relative;
          .product-price {
            font-size: 0.32rem;
            color: @BeeDefault;
          }
          .sku-value {
            font-size: 0.28rem;
            color: @Grey2;
            margin-top: 0.16rem;
          }
          .cancel-sku {
            position: absolute;
            top: 0;
            right: 0;
            height: 0.3rem;
            width: 0.3rem;
          }
        }
      }
      .sku-detail {
        overflow-y: scroll;
        .prop-content {
          margin-top: 0.4rem;
          .prop-title {
            font-size: 0.3rem;
          }
          .prop-value {
            .value-content {
              margin: 0.24rem 0.24rem 0 0;
              border-radius: 0.3rem;
              border: 0.02rem solid @Grey1;
              font-size: 0.24rem;
              display: inline-block;
              padding: 0.12rem 0.2rem;
            }
            .valueContent2 {
              color: @BeeDefault3;
              border: 0.02rem solid @BeeDefault;
            }
            .valueContent3 {
              color: rgba(51, 51, 51, 0.2rem);
              border: 0.02rem solid rgba(153, 153, 153, 0.2);
            }
          }
          .product-num {
            margin-top: 0.12rem;
          }
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
          .gift-num {
          margin-top: 0.6rem;
          text-align: center;
          font-size: 0.28rem;
          color: @BeeDefault;
          .num {
            font-size: 0.44rem;
            margin: 0 0.04rem 0 0.06rem;
            font-weight: bold;
          }
        }
      }
    }
    .done-btn {
      .done {
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        background-color: @BeeDefault;
        border: none;
        color: #ffffff;
        font-size: 0.3rem;
      }
    }
  }
}
</style>
