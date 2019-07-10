<template>
  <div>
    <van-popup
      v-model="visible"
      position="center"
      class="package-build"
      :close-on-click-overlay="false"
      @close="handleClose()"
      @click-overlay="handleClose()"
    >
      <div style="position: relative">
        <img :src="beeIcon.background" style="width: 5.78rem;height: 7.5rem">
        <div class="btns">
          <div class="btn-1" @click="handleClose">
            继续逛逛
          </div>
          <div class="btn-2" @click="goSettlement">
            去结算
          </div>
        </div>
      </div>
      <div style="text-align: center;padding-top: 0.6rem">
        <img :src="beeIcon.close" style="width: 0.5rem" @click="handleClose">
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      beeIcon: {
        background: require('@/assets/icon/giftPackage/farm_popups_pic_content@2x.png'),
        close: require('@/assets/icon/giftPackage/farm_popups_icon_cancel@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    goSettlement() {
      this.handleClose()
      if (window.location.href === '/') {
        this.$router.push('/category/details/confirmOrder?res=giftPackage')
      } else {
        window.location.href = '/#/category/details/confirmOrder?res=giftPackage'
      }
    }
  }
}
</script>

<style scoped lang="less">
.package-build {
  text-align: center;
  background: transparent;
  .btns {
    position: absolute;
    bottom: 0.76rem;
    display: flex;
    padding: 0 0.34rem;
    .btn-1 {
      margin-right: 0.3rem;
      width: 2.4rem;
      line-height: 0.68rem;
      padding-bottom: 0.12rem;
      background: url('../../../assets/icon/giftPackage/farm_popups_button_goon@2x.png') no-repeat;
      background-size: contain;
      color: @Grey12;
      border-radius: 5rem;
    }
    .btn-2 {
      color: white;
      width: 2.4rem;
      padding-bottom: 0.12rem;
      line-height: 0.68rem;
      background: url('../../../assets/icon/giftPackage/farm_popups_button_settlement@2x.png') no-repeat;
      background-size: contain;
      border-radius: 5rem;
    }
  }
}
</style>
