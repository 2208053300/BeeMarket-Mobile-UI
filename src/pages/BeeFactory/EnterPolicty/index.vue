<template>
  <div class="factory-policcy">
    <img v-for="(item, index) in icon" :key="index" :src="item">
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: '入驻协议'
  },
  components: {},
  props: {},
  data() {
    return {
      // 所需图片
      icon: {
        rzzc1: require('@/assets/icon/joinFactory/rzzc_1.jpg'),
        rzzc2: require('@/assets/icon/joinFactory/rzzc_2.jpg'),
        rzzc3: require('@/assets/icon/joinFactory/rzzc_3.jpg'),
        rzzc4: require('@/assets/icon/joinFactory/rzzc_4.jpg'),
        rzzc5: require('@/assets/icon/joinFactory/rzzc_5.jpg'),
        rzzc6: require('@/assets/icon/joinFactory/rzzc_6.jpg'),
        rzzc7: require('@/assets/icon/joinFactory/rzzc_7.jpg'),
        rzzc8: require('@/assets/icon/joinFactory/rzzc_8.jpg'),
        rzzc9: require('@/assets/icon/joinFactory/rzzc_9.png')
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'white'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    goProduct(pid) {
      // 判断是否来自webApp
      if (this.$route.query.origin) {
        window.location.href = `/#/category/details?pid=${pid}`
      } else {
        console.log('本地应用')
        this.$router.push({
          path: '/category/details',
          query: { pid }
        })
      }
    }

  }
}
</script>

<style  lang="less">

</style>
