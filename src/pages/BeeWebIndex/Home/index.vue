<template>
  <div class="web-index">
    <header class="header">
      <div class="container">
        <van-row>
          <van-col :span="4">
            <div class="logo">
              <img class="logo-img" :src="img.headerLogo" alt="">
            </div>
          </van-col>
          <van-col :span="16" offset="4">
            <ul class="nav flex flex-end">
              <li><a href="#">首页</a></li>
              <li><a href="#">了解APP</a></li>
              <li><a href="#">商家入驻</a></li>
              <li><a href="#">联系我们</a></li>
            </ul>
          </van-col>
        </van-row>
      </div>
    </header>
    <!-- banner -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: '蜂集市'
    }
  },
  components: {},
  props: {},
  data() {
    return {
      img: {
        headerLogo: require('@/assets/icon/webIndex/logo2.png')
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  beforeDestroy() {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    debounce(func, wait, immediate) {
      var timeout, args, context, timestamp, result
      var later = function() {
        // 据上一次触发时间间隔
        var last = new Date() - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null
          }
        }
      }

      return function() {
        context = this
        args = arguments
        timestamp = new Date()
        var callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }

        return result
      }
    }
  }
}
</script>

<style scoped  lang="less">
.web-indx {
  width: 100%;
}
.container {
  width: 11.9rem;
  margin: 0 auto;
}
a {
  color: #333;
}
.header {
  border-top: 4px solid #f1a11d;
  .logo {
    max-width: 1.6rem;
    padding: 0.3rem 0;
  }
  .nav {
    padding: 0.4rem 0;
    li{margin-left: 1.25rem}
    a {
      font-size: 0.16rem;
      font-weight: 600;
    }
  }
}
</style>
