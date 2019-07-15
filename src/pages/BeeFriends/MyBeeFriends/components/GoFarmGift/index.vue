<template>
  <div class="farm-gift">
    <van-popup
      v-model="showGift"
      :close-on-click-overlay="false"
      class="farm-card"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div
        class="farm-content"
        :style="{backgroundImage:'url('+beeIcon.bee_popups+')'}"
      >
        <div class="action-button">
          <div
            class="btn1"
            @click="goFarmRule"
          />
          <div
            class="btn1 btn2"
            @click="goFarm"
          />
        </div>
        <div
          class="close-btn"
          @click="handleClose"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOs } from '@/utils'
export default {
  components: {},
  props: {
    showGift: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beeIcon: {
        bee_popups: require('@/assets/icon/beeFriends/home/bee_popups@2x.png')
      },
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:showGift', false)
    },
    goFarmRule() {
      if (this.osObj.isWx) {
        this.$router.push({
          path: '/beeGiftPackage',
          query: {
            showRule: 1
          }
        })
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToProducePackage.postMessage({ alertRule: true })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToPackage(true)
      } else {
        this.$router.push({
          path: '/beeGiftPackage',
          query: {
            showRule: 1
          }
        })
      }
    },
    goFarm() {
      this.$emit('update:showGift', false)
      if (this.osObj.isWx) {
        this.$router.push('/beeGiftPackage')
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToProducePackage.postMessage('')
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToPackage()
      } else {
        this.$router.push('/beeGiftPackage')
      }
    }
  }
}
</script>

<style scoped lang="less">
.farm-gift {
  .farm-card {
    border-radius: 0.1rem;
    background-color: transparent;
    .farm-content {
      height: 6.99rem;
      width: 6.06rem;
      background-size: contain;
      position: relative;
      background-repeat: no-repeat;
      .action-button {
        position: absolute;
        bottom: 0.6rem;
        width: 100%;
        padding: 0 0.4rem;
        height: 0.8rem;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.2rem;
      }
      .close-btn {
        position: absolute;
        top: 0.3rem;
        right: 0.4rem;
        height: 0.5rem;
        width: 0.5rem;
      }
    }
  }
}
</style>
