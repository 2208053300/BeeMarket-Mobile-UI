<template>
  <div style="padding:0.2rem;">
    <img src="http://temp.im/640x260" class="main-img">
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="item">
        <NormalGoodsItem :src="item.img" :name="item.name" :price="item.price" :del-price="item.delPrice" />
      </li>
    </ul>
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
          img: 'http://temp.im/640x260',
          name: '商品名',
          price: '120',
          delPrice: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名2',
          price: '120',
          delPrice: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名3',
          price: '120',
          delPrice: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名4',
          price: '120',
          delPrice: '120'
        }]
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
.list{width: 100%; overflow-x: scroll; display: -webkit-box;
  .item{width: 40%; padding: 0 10px;}
  .item-box{border: 1px solid #ddd;}
}
.title{padding:0.2rem; margin: 0}
.main-img{height: 2rem; margin-bottom: 0.2rem}
</style>
