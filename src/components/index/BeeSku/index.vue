<template>
  <div class="bee-sku">
    <van-popup
      v-model="showSku"
      @open="getProductSkuData"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div class="sku-content">
        123
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
    }
  },
  data() {
    return {
      skuData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getProductSkuData() {
      const res = await getProductSku({ pid: this.pid })
      this.skuData = res.data
    },
    handleClose() {
      this.$emit('update:showSku', false)
    }
  }
}
</script>

<style scoped lang="less">
.bee-sku {
}
</style>
