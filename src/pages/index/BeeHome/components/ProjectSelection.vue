<template>
  <div class="bg-white" style="padding-bottom: 0.2rem;">
    <p class="title">
      专题精选
    </p>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="item">
        <div class="item-box">
          <img :src="item.img">
          <p class="title">
            {{ item.name }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      list: [
        {
          img: 'http://temp.im/640x260',
          name: '商品名'
        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名2'

        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名3'

        },
        {
          img: 'http://temp.im/640x260',
          name: '商品名4'
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
.list{width: 100%; overflow-x: scroll; display: -webkit-box;
  .item{width: 40%; padding: 0 10px;}
  .item-box{border: 1px solid #ddd;}
}
.title{padding:0.2rem; margin: 0}
</style>
