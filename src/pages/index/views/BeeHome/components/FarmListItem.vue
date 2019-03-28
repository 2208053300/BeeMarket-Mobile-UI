<template>
  <div class="goods-item">
    <img :src="src">
    <p class="title">
      {{ name }}
    </p>
    <p class="price">
      ${{ price }}
    </p>
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
.goods-item{background: #f3f3f3;
  img{width: 100%; height: 1.5rem}
}
p{margin: 0}
</style>
