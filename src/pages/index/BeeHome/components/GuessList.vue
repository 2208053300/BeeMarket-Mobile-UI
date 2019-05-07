<template>
  <div class="guess bg-white">
    <p class="title">
      猜您喜欢
    </p>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="item">
        <NormalGoodsItem
          :src="item.img"
          :name="item.name"
          :price="item.price"
          :del-price="item.delPrice"
          :tag="item.tag"
        />
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
  props: {},
  data() {
    return {
      list: [
        {
          img: 'http://temp.im/640x260',
          name: '商品名',
          price: '120',
          delPrice: '120',
          tag: '热销'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名2',
          price: '120',
          delPrice: '120',
          tag: '热销'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名3',
          price: '120',
          delPrice: '120',
          tag: ''
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名4',
          price: '120',
          delPrice: '120',
          tag: '热销'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">

.title{margin: 0; padding: 0.2rem}
.list {
  padding: 0 0.1rem;
  column-width: 3.52rem;
  column-gap: 0.1rem;
  -webkit-column-count: 2; /* Chrome, Safari, Opera */
  -moz-column-count: 2; /* Firefox */
  column-count: 2;
  break-inside: avoid;
}
 .item{width: 3.52rem; display: block;height:100%;overflow: auto; margin-bottom: 0.2rem}
</style>
