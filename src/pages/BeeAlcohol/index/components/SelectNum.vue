<template>
  <van-popup
    v-model="visible"
    position="bottom"
    class="select-num"
    :close-on-click-overlay="false"
    @close="handleClose()"
    @click-overlay="handleClose()"
  >
    <div>
      <div class="title">
        茅台贵宾陈酿【VIP30】
      </div>
      <div class="price">
        ￥{{ selectedPrice }}
      </div>
      <div class="sku">
        <div
          class="sku-item"
          :class="{ 'sku-item-choice': selectedPrice === completePrice }"
          @click="checkout(completePrice)"
        >
          整箱装(6瓶) <br>
          补贴可得10000元
        </div>
        <div
          class="sku-item"
          :class="{ 'sku-item-choice': selectedPrice === experiencePrice }"
          @click="checkout(experiencePrice)"
        >
          体验装(2瓶) <br>
          补贴可得3000元
        </div>
      </div>
      <div class="plus-minus">
        <div class="minus" :class="{ 'opacity': number<=1 }" @click="number > 1 && number--">
          <svg t="1574733815691" class="icon" :class="{'icon-opacity': number<=1 }" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24" width="24" height="24"><path d="M906.278 538.233h-788.556c-14.061 0-25.437-11.732-25.437-26.233s11.377-26.233 25.437-26.233h788.556c14.061 0 25.437 11.732 25.437 26.233s-11.377 26.233-25.437 26.233z" fill="" p-id="1205" /></svg>
        </div>
        <div class="number">
          {{ number }}
        </div>
        <div class="plus" :class="{ 'opacity': !canAdd }" @click="canAdd && number++">
          <svg t="1574734368286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325" width="24" height="24"><path d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z" fill="" p-id="1326" /></svg>
        </div>
      </div>
      <div style="text-align: center">
        <button :class="{'button-disable': number===0}" @click="confirmOrder()">
          确定
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { maxNumber } from '@/api/BeeApi/alcohol'
import { getProductSku } from '@/api/BeeApi/product'
export default {
  model: {
    prop: 'visible',
    event: 'update'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: 1,
      completeMaxNumber: 10,
      experienceMaxNumber: 10,
      selectedPrice: 4800,
      complete: {
        price: 4800,
        skuId: 0
      },
      experience: {
        price: 1600,
        skuId: 1
      }
    }
  },
  computed: {
    canAdd() {
      const maxNumber = this.selectedPrice === this.completePrice ? this.completeMaxNumber : this.experienceMaxNumber
      if (maxNumber === -1) {
        return true
      } else {
        if (maxNumber === 0) {
          return false
        }
        return this.number < maxNumber
      }
    },
    completePrice() {
      return 4800
    },
    experiencePrice() {
      return 1600
    }
  },
  mounted() {
    this.loadSku()
    this.getMaxNumber()
  },
  methods: {
    handleClose() {
      this.$emit('update', false)
    },
    confirmOrder() {
      if (this.number === 0) {
        return
      }
      this.handleClose()
      this.$router.push({
        name: 'alcoholConfirmOrder',
        query: {
          sid: this.selectedPrice === this.completePrice ? this.complete.skuId : this.experience.skuId,
          number: this.number
        }
      })
    },
    async getMaxNumber() {
      const res = await maxNumber()
      this.completeMaxNumber = res.data.count
      this.experienceMaxNumber = res.data.other_count
      if (this.completeMaxNumber === 0) {
        this.number = 0
      }
    },
    async loadSku() {
      // 获取所有属性
      const res1 = await getProductSku({
        product_type: 'liquor'
      })
      const propId = res1.data.props[0].prop_id
      const valueIds = res1.data.props[0].values.map(item => item.value_id)
      // 获取获取两个sku—id
      const sku1 = await getProductSku({
        product_type: 'liquor',
        props: [{ prop_id: propId, value_id: valueIds[0] }]
      })
      if (sku1.data.section_price === 4800) {
        this.complete.skuId = sku1.data.sku_id
      } else {
        this.experience.skuId = sku1.data.sku_id
      }

      const sku2 = await getProductSku({
        product_type: 'liquor',
        props: [{ prop_id: propId, value_id: valueIds[1] }]
      })
      if (sku2.data.section_price === 4800) {
        this.complete.skuId = sku2.data.sku_id
      } else {
        this.experience.skuId = sku2.data.sku_id
      }
    },
    checkout(price) {
      this.selectedPrice = price
      this.number = 1
      if (this.selectedPrice === this.completePrice && this.completeMaxNumber === 0) {
        this.number = 0
      }
      if (this.selectedPrice === this.experiencePrice && this.experienceMaxNumber === 0) {
        this.number = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.select-num {
  text-align: center;
  background:linear-gradient(0deg,rgba(192,19,14,1),rgba(235,89,62,1));
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .title {
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(255,232,127,1);
    line-height: 31px;
    text-shadow: 0 5px 5px rgba(205,23,18,0.58);
    padding-top: 0.38rem;
    padding-bottom: 0.47rem;
  }
  .price {
    margin-bottom: 0.4rem;
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(255,255,255,1);
    text-shadow: 0 2px 5px rgba(214,63,3,0.55);
  }
  .sku {
    padding: 0 0.85rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.3rem;
    .sku-item {
      padding: 0.18rem 0.4rem;
      border: 0.02rem solid white;
      opacity: 0.5;
      border-radius: 0.1rem;
      font-size: 0.24rem;
      font-weight: 500;
      color: white;
      line-height: 0.36rem;
    }
    .sku-item-choice {
      background: white;
      border: none;
      color:rgba(212,52,36,1);
      opacity: 1;
    }
  }
  button {
    padding: 0;
    border: unset;
    margin-top: 0.6rem;
    margin-bottom: 0.4rem;
    width:6.30rem;
    height:0.90rem;
    background:linear-gradient(180deg,rgba(255,220,31,1),rgba(253,150,11,1));
    border-radius:0.45rem;
    font-size:0.32rem;
    font-weight:bold;
    color:white;
    text-shadow:0 2px 5px rgba(214,63,3,0.55);
  }
  .button-disable {
    background: gray;
  }
  .plus-minus {
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
    .icon {
      width: 0.26rem;
      height: 0.26rem;
      fill: #CB271B;
    }
    .icon-opacity {
      opacity:0.3;
    }
    .minus {
      width: 1rem;
      height: 0.66rem;
      background:rgba(255,255,255,1);
      border-radius:33px 0 0 33px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1px;
    }
    .opacity {
      opacity:0.5;
    }
    .number {
      min-width: 1rem;
      line-height: 0.66rem;
      background: rgba(255,255,255,1);
      text-align: center;
      font-size:0.32rem;
      font-weight:500;
      color:rgba(203,39,27,1);
    }
    .plus {
      min-width: 1rem;
      line-height: 0.66rem;
      background:rgba(255,255,255,1);
      border-radius:0px 33px 33px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1px;
    }
  }
  .tips {
    color: rgba(255, 255, 255, 0.69);
    font-size: 0.14rem;
    text-align: center;
    margin-bottom: 0;
  }
}
</style>
