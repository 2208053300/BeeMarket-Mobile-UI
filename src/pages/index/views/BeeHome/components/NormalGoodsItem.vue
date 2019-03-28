<template>
  <div class="goods-item bg-gray">
    <img :src="src">
    <p class="title no-wrap">
      {{ name }}
    </p>
    <p class="price flex flex-between">
      <span>${{ price }}</span>
      <del>${{ delPrice }}</del>
    </p>
    <van-button v-if="tag" type="primary" size="mini">
      {{ tag }}
    </van-button>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    src: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    delPrice: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.goods-item{border: 1px solid #ddd}
p{margin: 0}
</style>
