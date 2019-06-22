<template>
  <div class="bee-about">
    <img
      v-for="(img, index) in icon"
      :key="index"
      v-lazy="img"
      :src="img"
    >
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '关于集市'
  },
  components: {},
  props: {},
  data() {
    return {
      icon: [
        require('@/assets/icon/aboutBeeMarket/关于集市_改_01.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_02.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_03.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_04.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_05.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_06.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_07.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_08.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_09.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_10.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_11.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_12.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_13.jpg'),
        require('@/assets/icon/aboutBeeMarket/关于集市_改_14.jpg')
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 如果有store说明改页面作为组件在webApp显示
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.bee-about {
  img {
    transition: 300ms linear;
    opacity: 0;
  }
  img[lazy=loaded] {
    opacity: 1;
  }
}
</style>
