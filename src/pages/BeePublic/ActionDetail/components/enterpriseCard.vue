<template>
  <div class="enterprise-pop">
    <van-popup
      v-model="showDetail"
      class="enterprise-card"
      :close-on-click-overlay="false"
      @click-overlay="handleClose"
    >
      <div
        v-if="companyInfo"
        class="enterprise-content"
        :style="{backgroundImage:'url('+beeIcon.confirmorder_popups_pic_shading+')'}"
      >
        <div class="info-card">
          企业信息
        </div>
        <div class="enterprise-logo">
          <!-- <img
            :src="companyInfo.love_company_logo"
            alt="Logo"
          > -->
          <span class="company-name">
            {{ companyInfo.company_name }}
          </span>
        </div>
        <!-- eslint-disable-next-line -->
        <div class="desc-content" v-html="changeText(companyInfo.company_desc)"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    companyInfo: {
      type: Object,
      default: () => {}
    },
    showDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beeIcon: {
        confirmorder_popups_pic_shading: require('@/assets/icon/discover/confirmorder_popups_pic_shading@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:showDetail', false)
    },
    changeText(val) {
      const c = /[ ]/g
      val = val.replace(c, '&nbsp;')
      const n = /[\r\n]/g
      return val.replace(n, '<br/>')
    }
  }
}
</script>

<style scoped lang="less">
.enterprise-pop {
  .enterprise-card {
    border-radius: 0.08rem;
    .enterprise-content {
      height: 7.2rem;
      width: 5.76rem;
      background-color: #fff;
      background-size: contain;
      background-position: 0 0;
      position: relative;
      box-sizing: border-box;
      .info-card {
        font-size: 0.32rem;
        width: 1.56rem;
        height: 0.48rem;
        border-radius: 0 0.3rem 0.3rem 0;
        line-height: 0.48rem;
        color: #fff;
        text-align: center;
        background-color: @BeeDefault;
        position: absolute;
        left: 0;
        top: 0.2rem;
      }
      .enterprise-logo {
        padding: 0.92rem 0 0.24rem;
        margin: auto;
        height: 1.04rem;
        line-height: 1.04rem;
        border-radius: 0.04rem;
        text-align: center;
        font-size: 0.36rem;
        color: @BeeDefault;
      }
      .desc-content {
        border-top-left-radius: 0.8rem;
        height: 5rem;
        background-color: @BeeDefault;
        box-sizing: border-box;
        padding: 0.52rem;
        text-indent: 2em;
        overflow-y: scroll;
        color: #fff;
      }
    }
  }
}
</style>
