<template>
  <div
    v-lazy-container="{ selector: 'img' }"
    class="rich-details"
  >
    <!-- TODO 没有商品详情富文本时显示 -->
    <div class="no-details">
      <img
        :src="beeIcon.product_detail_pic_nodetails"
        alt=""
      >
      暂无商品详情
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      beeIcon: {
        product_detail_pic_nodetails: require('@/assets/icon/product/product_detail_pic_nodetails@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this)
  },
  methods: {}
}
</script>

<style scoped lang="less">
.rich-details {
  margin-top: 0.2rem;
  background-color: #fff;
  padding: 0.32rem;
  .no-details{
    padding: 1.5rem 2rem;
    text-align: center;
    font-size: 0.28rem;
    color: @Grey2;
    img{
      margin-bottom: 0.2rem;
    }
  }
}
</style>
