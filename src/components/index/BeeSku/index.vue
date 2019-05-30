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
          <div class="product-img">
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
          <div class="prop-content">
            <div class="prop-title">
              数量
            </div>
            <van-stepper
              v-model="productNum"
              class="product-num"
            />
          </div>
        </div>
      </div>
      <div class="done-btn">
        <van-button
          class="done"
          @click="handleDone()"
        >
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getProductSku } from '@/api/BeeApi/product'
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
    }
  },
  data() {
    return {
      propsData: {},
      skuData: {},
      productNum: 0,
      skuName: [],
      selProps: []
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
            pid: 227,
            props: this.propsId
          })
        )
        this.propsData = res.data
        this.skuName = []
        this.getSkuName(this.propsData.props)
      } else {
        const res = await getProductSku(
          JSON.stringify({
            // pid: this.pid
            pid: 227
          })
        )
        this.propsData = res.data
      }
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
          pid: 227,
          props: this.selProps
        })
      )
      this.propsData = res.data
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
      this.$emit('update:showSku', false)
    },
    handleDone() {
      this.$emit('get-sku-id', this.propsData.sku_id)
      this.$emit('get-sku-name', this.skuName)
      this.$emit('update:propsId', this.selProps)
      this.$emit('update:showSku', false)
      // return this.propsData.sku_id
    }
  }
}
</script>

<style scoped lang="less">
.bee-sku {
  .skuPop {
    border-top-right-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
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
          .product-price {
            font-size: 0.32rem;
            color: @BeeDefault;
          }
          .sku-value {
            font-size: 0.28rem;
            color: @Grey2;
            margin-top: 0.16rem;
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
