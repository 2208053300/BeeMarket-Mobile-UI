<template>
  <div class="factory-policcy">
    <img v-for="(item, index) in icon" :key="index" :src="item">
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: '入驻政策'
  },
  components: {},
  props: {},
  data() {
    return {
      // 所需图片
      icon: {
        rzzc1: require('@/assets/icon/joinFactory/rzzc_1.png'),
        rzzc2: require('@/assets/icon/joinFactory/rzzc_2.png'),
        rzzc3: require('@/assets/icon/joinFactory/rzzc_3.png'),
        rzzc4: require('@/assets/icon/joinFactory/rzzc_4.png'),
        rzzc5: require('@/assets/icon/joinFactory/rzzc_5.png'),
        rzzc6: require('@/assets/icon/joinFactory/rzzc_6.png'),
        rzzc7: require('@/assets/icon/joinFactory/rzzc_7.png')
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
