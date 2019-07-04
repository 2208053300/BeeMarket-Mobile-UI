<template>
  <div class="card3 bg-white">
    <!-- 活动说明 -->
    <div class="action-explain">
      <p class="title">
        活动说明
      </p>
      <p class="info">
        助力人数达成立即启动捐赠 <span> （可通过“项目进度”共同监督） </span>
      </p>
      <p class="info">
        首次参与助力获赠公益红包 <span>（可用于海量商品的任选抵扣）</span>
      </p>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {
    actionDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      BeeDefault,
      bottomImg: require('@/assets/icon/discover/confirmorder_pic_word@2x.png'),
      infoBg: require('@/assets/icon/discover/confirmorder_popups_pic_shading@2x.png'),
      closeImg: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png'),
      // 协作企业前两个固定logo
      beeLogo: require('@/assets/icon/discover/confirmorder_pic_bee@2x.png'),
      qlLogo: require('@/assets/icon/discover/confirmorder_pic_qilin@2x.png'),
      // 是否显示爱心企业信息弹框
      show: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.card3 {
  padding: 0.32rem;
 .action-explain{
   .title{font-size: .28rem; color:#333; font-weight: 600;}
   .info{font-size: ; color:; font-weight: 600;}
   span{font-size: ; color:; font-weight: 600;}

 }
}
</style>
