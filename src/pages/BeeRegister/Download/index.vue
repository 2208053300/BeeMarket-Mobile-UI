<template>
  <div class="app-down-body bg-white">
    <div class="app-down">
      <div class="title1 text-center">
        <h3>登录 APP 立享好礼！</h3>
      </div>

      <div class="main">
        <img src="../../../assets/icon/register/download/main_img1.png">
      </div>

      <div class="download-link">
        <a href="https://itunes.apple.com/cn/app/%E8%9C%82%E9%9B%86%E5%B8%82/id1382648901?l=zh&ls=1&mt=8">
          <img src="../../../assets/icon/register/download/ipone_img.png" alt=""><span>iPhone 下载</span>
        </a>
        <a id="android" href="{$android}"><img src="../../../assets/icon/register/download/android_img.png" alt=""><span>Android 下载</span></a>
        <!--<a id="android"><img src="/static/src/Img/android_img.png" alt="" /><span>Android 下载</span></a>-->
      </div>

      <!--<div class="logo text-center">
				<img src="/static/src/Img/logo1.png"/>
			</div>-->
      <div class="app-store-list">
        <h4 class="text-center">
          蜂集市 APP 也可以通过应用商店下载哦~
        </h4>
        <ul>
          <li><img src="../../../assets/icon/register/download/360.png" alt=""></li>
          <li><img src="../../../assets/icon/register/download/xm.png" alt=""></li>
          <li><img src="../../../assets/icon/register/download/hw.png" alt=""></li>
          <li><img src="../../../assets/icon/register/download/AppStore.png" alt=""></li>
          <li><img src="../../../assets/icon/register/download/yyb.jpg" alt=""></li>
          <li><img src="../../../assets/icon/register/download/ali.png" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/BeeApi/action'

export default {
  metaInfo: {
    title: 'app下载'
  },
  components: {},
  props: {},
  data() {
    return {

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
    async getArticleDetailData() {
      const res = await getArticleDetail({ id: this.$route.params.id })
      this.article = res.data
      this.$store.state.app.beeFooter.show = false
    },
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
.app-down-body{display: flex;}
.app-down{
//  width: 5.62rem;
    width: 85%;
    height:auto; margin: auto;
    .title{width: 5.62rem;height: 1.15rem;  background: url(../../../assets/icon/register/download/download_title_img.png) no-repeat;
           margin:0 auto 0.3rem;   background-size:100% 100%;
        h2{font-size:0.46rem ; margin-bottom: 0.1rem;
            span{color: #f5bf52;}
        }
        h3{font-size: 0.34rem;font-weight:400;}
    }
    .title1{width: 4.5rem; height:1.15rem; color:#5c5c5c ; background: url(../../../assets/icon/register/download/title_bg.png) no-repeat; display: flex;
           margin:0 auto 0.4rem;   background-size:1.55rem 1.15rem;background-position: right;  padding: 0.12rem;
         h3{font-size: 0.4rem;font-weight:400; margin: auto;}
    }
    .main{width: 100%;  padding-top: 0;padding-bottom: 0;  background: transparent;
//      height: 6.2rem;
        img{width: 100%; height: 100%;}
    }

    .download-link{ display: flex; justify-content: space-between; margin: 0.3rem auto ;
        a{display: flex; border: 0.04rem solid #f5bf52; color: #f5bf52; font-size: 0.28rem; justify-content: space-around;align-items: center;
            border-radius: 0.3rem; width: 2.68rem; padding: 0.1rem;
            &:nth-of-type(1) img{width:0.41rem ; }
            &:nth-of-type(2) img{width:0.38rem ; }
        }
    }

    .logo img{width: 2.08rem;}

    .app-store-list{ border-top: 1px solid #f5bf52; padding-top: 0.2rem; margin-bottom: 0.2rem;
        h4{font-size: 0.24rem; font-weight: 400; color: #f5bf52; margin-bottom: 0.2rem;}
        ul{display: flex;justify-content: space-between;
            li{width:calc( 100% / 6); display: flex; align-items: center;}
            img{width: 90%; }
        }
    }
}
</style>
