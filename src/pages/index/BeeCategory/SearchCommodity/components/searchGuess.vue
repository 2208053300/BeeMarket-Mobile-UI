<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item,index) in guessData"
        :key="index"
        :title="item"
        @click="confirmSearch(item)"
      />
      <!-- :value="item.name" -->
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
    },
    guessData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // guessData: [
      //   {
      //     id: 1,
      //     name: 'tet'
      //   },
      //   {
      //     id: 2,
      //     name: 'tet1'
      //   },
      //   {
      //     id: 3,
      //     name: 'tet2'
      //   }
      // ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // TODO 通过传入的关键字获取商品猜想
    confirmSearch(item) {
      console.log(item)
      this.$emit('getConfirmWold', item)
      this.$parent.isShowGuess1 = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
