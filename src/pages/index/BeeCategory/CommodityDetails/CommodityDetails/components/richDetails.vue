<template>
  <div
    v-lazy-container="{ selector: 'img' }"
    class="rich-details"
  >
    <!-- TODO 没有商品详情富文本时显示 -->
    暂无商品详情
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
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
}
</style>
