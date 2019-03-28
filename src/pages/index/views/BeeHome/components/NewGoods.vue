<template>
  <div style="padding: 0 0.2rem;">
    <van-row class="title">
      <van-col span="12">
        新品首发
      </van-col>
    </van-row>
    <van-row gutter="20">
      <van-col v-for="(item, index) in list" :key="index" span="8" class="margin-b-20">
        <NormalGoodsItem :name="item.name" :src="item.src" :price="item.price" :del-price="item.delPrice" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import NormalGoodsItem from './NormalGoodsItem'
export default {
  components: {
    NormalGoodsItem
  },
  props: {

  },
  data() {
    return {
      list: [
        {
          src: 'http://temp.im/640x260',
          name: '商品名',
          price: '120',
          delPrice: '120'
        },
        {
          src: 'http://temp.im/640x260',
          name: '商品名2',
          price: '120',
          delPrice: '120'
        },
        {
          src: 'http://temp.im/640x260',
          name: '商品名3',
          price: '120',
          delPrice: '120'
        },
        {
          src: 'http://temp.im/640x260',
          name: '商品名4',
          price: '120',
          delPrice: '120'
        },
        {
          src: 'http://temp.im/640x260',
          name: '商品名3',
          price: '120',
          delPrice: '120'
        },
        {
          src: 'http://temp.im/640x260',
          name: '商品名4',
          price: '120',
          delPrice: '120'
        }

      ]
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
.title{padding: 0.2rem 0.2rem 0.2rem 0}
</style>
