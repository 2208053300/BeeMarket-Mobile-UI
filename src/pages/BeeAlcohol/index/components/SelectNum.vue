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
        选择购买数量
      </div>
      <div class="plus-minus">
        <div class="minus" :class="{ 'opacity': number<=1 }" @click="number > 1 && number--">
          <svg t="1574733815691" class="icon" :class="{'icon-opacity': number<=1 }" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24" width="24" height="24"><path d="M906.278 538.233h-788.556c-14.061 0-25.437-11.732-25.437-26.233s11.377-26.233 25.437-26.233h788.556c14.061 0 25.437 11.732 25.437 26.233s-11.377 26.233-25.437 26.233z" fill="" p-id="1205" /></svg>
        </div>
        <div class="number">
          {{ number }}
        </div>
        <div class="plus" :class="{ 'opacity': number >= maxNumber }" @click="number<maxNumber && number++">
          <svg t="1574734368286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325" width="24" height="24"><path d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z" fill="" p-id="1326" /></svg>
        </div>
      </div>
      <p class="tips">
        {{ maxTips }}
      </p>
      <div style="text-align: center">
        <button @click="confirmOrder()">
          确定
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { maxNumber } from '@/api/BeeApi/alcohol'

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
      maxNumber: 10
    }
  },
  computed: {
    maxTips() {
      if (this.maxNumber < 10) {
        return `每人限购10件，您已购买${10 - this.maxNumber}件`
      } else {
        return '每人限购10件'
      }
    }
  },
  mounted() {
    this.getMaxNumber()
  },
  methods: {
    handleClose() {
      this.$emit('update', false)
    },
    confirmOrder() {
      this.handleClose()
      this.$router.push({
        name: 'alcoholConfirmOrder',
        query: {
          number: this.number
        }
      })
    },
    async getMaxNumber() {
      const res = await maxNumber()
      this.maxNumber = res.data.count
    }
  }
}
</script>

<style lang="less" scoped>
.select-num {
  background-color: #CB271B;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  .title {
    color: white;
    font-size: 0.32rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    text-align: center;
  }
  button {
    padding: 0;
    border: unset;
    margin-top: 0.8rem;
    margin-bottom: 0.2rem;
    width:6.30rem;
    height:0.90rem;
    background:linear-gradient(180deg,rgba(255,220,31,1),rgba(253,150,11,1));
    border-radius:0.45rem;
    font-size:0.32rem;
    font-weight:bold;
    color:white;
    text-shadow:0 2px 5px rgba(214,63,3,0.55);
  }
  .plus-minus {
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
      margin-right: 2px;
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
      margin-left: 2px;
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
