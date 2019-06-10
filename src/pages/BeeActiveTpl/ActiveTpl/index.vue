<template>
  <div class="active-tpl">
    <!-- 导航 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in navList" :key="index" :title="item.name" />
    </van-tabs>
    <!-- 顶部大图 -->
    <div class="top-img">
      <img src="">
    </div>
    <!-- 标题图片 -->
    <img src="" class="title-img">
    <!-- 主商品 -->
    <img src="" alt="" class="main-pro1">
    <!-- 两个主商品 -->
    <img src="" alt="" class="main-pro2">
    <img src="" alt="" class="main-pro2">
    <!-- 四个商品列表 -->
    <ul class="pro-list flex flex-between flex-wrap">
      <li class="item">
        <div class="pro">
          <div class="pro-img">
            <img src="" alt="">
          </div>
          <div class="info text-center flex flex-column">
            <span class="desc no-wrap">商品描述商品描述商品描述商品描述商品描述商品描述</span>
            <span class="name  no-wrap">商品名称</span>
            <span class="price "><span class="mark">￥</span>366</span>
            <div class="action">
              <van-button class="buy-btn">
                立即购买
              </van-button>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="pro">
          <div class="pro-img">
            <img src="" alt="">
          </div>
          <div class="info text-center flex flex-column">
            <span class="desc no-wrap">商品描述商品描述商品描述商品描述商品描述商品描述</span>
            <span class="name  no-wrap">商品名称</span>
            <span class="price "><span class="mark">￥</span>366</span>
            <div class="action">
              <van-button class="buy-btn">
                立即购买
              </van-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/BeeApi/action'

export default {
  metaInfo: {
    title: '文章详情'
  },
  components: {},
  props: {},
  data() {
    return {
      article: {},
      finished: false,
      // 导航选中选
      active: 3,
      navList: [
        {
          id: 1,
          name: '导航名称'
        },
        {
          id: 3,
          name: '导航名称3'
        },
        {
          id: 2,
          name: '导航名称2'
        },
        {
          id: 1,
          name: '导航名称'
        },
        {
          id: 3,
          name: '导航名称3'
        },
        {
          id: 2,
          name: '导航名称2'
        }
      ]

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
    // this.getArticleDetailData()
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
.active-tpl{
  .van-tab{
    color:rgb(51, 51, 51);
    font-size: 0.28rem;
  }
  .van-tab--active{
    color:#fff ;
    background:@BeeDefault ;
  }
  .van-tabs__line{
     background:@BeeDefault ;
  }
  .top-img{
    width: 100%;
    height: 8.88rem;
  }
  .title-img{
    height: 1.56rem;
  }
  .main-pro1{
    width: 100%;
    height: 6.04rem;
  }
  .main-pro2{
    width: 100%;
    height: 4.72rem;
  }
  .pro-list{
    background: #FAEEE8;
    padding: 0.2rem;
    .item{width:3.48rem; margin-bottom: 0.15rem;
      .pro-img{width: 3.48rem; height: 3.48rem; background: #D4BAAB;border-top-left-radius: 0.1rem;border-top-right-radius: 0.1rem;}
      .info{ padding: 0.3rem;background:#fff; border-bottom-left-radius: 0.1rem;border-bottom-right-radius: 0.1rem;}
      .desc{font-size: 0.2rem;color:#999 ; margin-bottom: 0.1rem;}
      .name{font-size: 0.28rem;color:#333 ;}
      .price{
        color: @BeeDefault;
        font-size: 0.36rem;
        margin: 0.15rem auto 0.2rem;
        .mark{font-size: 0.24rem}
      }
      .buy-btn{
        border-radius: 0.1rem;
        padding: 0 0.6rem;
        background: @BeeDefault;
        color: #fff;
        font-size: 0.24rem;
      }
    }

  }
}
</style>
