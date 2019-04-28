<template>
  <div>
    <ul class="farm-list">
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
.farm-list{width: 100%; overflow-x: scroll; display: -webkit-box;
  .item{width: 33%; padding: 0 10px;}
}
</style>
