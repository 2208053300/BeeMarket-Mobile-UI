<template>
  <div class="store-license">
    <div class="license-content">
      <span>根据国家工商总局《网络交易管理办发》要求对网店营业执照信息公示如下：</span>
      <div class="license-img">
        <img
          :src="licenseUrl"
          alt="经营许可"
        >
      </div>
    </div>
    <div class="license-explain">
      <span>注：以上营业执照信息来源于卖家自行申报及工商系统数据，具体以工商部门登记为准。经营者需确保信息真实有效，平台也将定期核查。如与实际不符，为免违规，请联系当地工商部门或平台客服更新。
      </span>
    </div>
  </div>
</template>

<script>
import { getStoreLicense } from '@/api/BeeApi/store'
export default {
  metaInfo: {
    title: '经营许可'
  },
  components: {},
  props: {},
  data() {
    return {
      licenseUrl: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getStoreLicenseData()
  },
  methods: {
    async getStoreLicenseData() {
      const res = await getStoreLicense({ mid: this.$route.query.mid })
      this.licenseUrl = res.data.license
    }
  }
}
</script>

<style scoped lang="less">
.store-license {
  padding: 46px 0 60px;
  margin: 0.2rem 0.3rem;
  box-sizing: border-box;
  .license-content {
    background-color: #fff;
    padding: 0.32rem 0.2rem;
    border-radius: 0.2rem;
    margin-bottom: 0.32rem;
    font-size: 0.28rem;
    .license-img {
      margin-top: 0.32rem;
      max-width: 6.52rem;
      min-width: 6.52rem;
    }
  }
  .license-explain {
    font-size: 0.22rem;
    color: @Red1;
    text-indent: 2em;
  }
}
</style>
