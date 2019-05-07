<template>
  <div>
    <div class="farm-recom margin-t-20 bg-white">
      <van-row>
        <van-col span="8">
          淮安农产品推荐
        </van-col>
        <van-col span="16">
          <Carousel style="height:1.5rem;" />
        </van-col>
      </van-row>
      <!-- 农产品推荐列表 -->
      <FarmListHor :list="list" />
    </div>
  </div>
</template>

<script>
import FarmListHor from './FarmListHor'
import Carousel from './Carousel'
export default {
  components: {
    FarmListHor,
    Carousel
  },
  props: {

  },
  data() {
    return {
      list: [
        {
          img: 'http://temp.im/640x260',
          name: '商品名',
          price: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名2',
          price: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名3',
          price: '120'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名4',
          price: '120'
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
.farm-recom{
  padding: 0.2rem;
  .banner{height: 150px}
}

</style>
