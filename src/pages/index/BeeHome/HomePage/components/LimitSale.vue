<template>
  <div
    class="bg-white"
    style="padding-bottom:0.2rem"
    @click="$router.push('/beelimit')"
  >
    <van-row class="title">
      <van-col span="12">
        限量蜂抢
      </van-col>
      <van-col
        span="12"
        class="text-right"
      >
        更多 >
      </van-col>
    </van-row>
    <NormalGoodsListHor />
  </div>
</template>

<script>
import NormalGoodsListHor from './NormalGoodsListHor'
export default {
  components: {
    NormalGoodsListHor
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.title {
  padding: 0.2rem;
}
</style>
