<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="item in guessData"
        :key="item"
        title="单元格"
        value="内容"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    searchKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      guessData: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // TODO 通过传入的关键字获取商品猜想
  }
}
</script>

<style scoped lang="less">
</style>
