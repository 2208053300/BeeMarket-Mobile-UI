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
          <van-col :span="12" offset="8">
            <ul class="nav flex flex-between">
              <li><a href="">首页</a></li>
              <li><a href="#" @click="scrollTo('app1')">了解APP</a></li>
              <li><a href="#" @click="scrollTo('factoryJoin')">商家入驻</a></li>
              <li><a href="#" @click="scrollTo('contact')">联系我们</a></li>
            </ul>
          </van-col>
        </van-row>
      </div>
    </header>
    <!-- top banner -->
    <van-swipe :autoplay="5000" indicator-color="white">
      <van-swipe-item>
        <img :src="require('@/assets/icon/webIndex/carousel/top_carousel_1.png')">
      </van-swipe-item>
      <van-swipe-item>
        <img :src="require('@/assets/icon/webIndex/carousel/top_carousel_1.png')">
      </van-swipe-item>
      <van-swipe-item>
        <img :src="require('@/assets/icon/webIndex/carousel/top_carousel_3.png')">
      </van-swipe-item>
    </van-swipe>
    <!-- app 介绍 -->
    <div id="app1" class="app-info container">
      <p class="title text-center" data-text="beemarket">
        蜂集市App 创新共享电商平台
      </p>
      <div class="info">
        <div class="app-carousel">
          <van-swipe :autoplay="5000" indicator-color="white">
            <van-swipe-item>
              <img :src="require('@/assets/icon/webIndex/carousel/app_carousel_1.png')">
            </van-swipe-item>
            <van-swipe-item>
              <img :src="require('@/assets/icon/webIndex/carousel/app_carousel_1.png')">
            </van-swipe-item>
            <van-swipe-item>
              <img :src="require('@/assets/icon/webIndex/carousel/app_carousel_3.png')">
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="text">
          <div>
            <p>
              蜂集市一个既能持续共享收益、又能轻松参与公益的，创新共享电商平台。依托全品类产品体系，为用户提供“海量商品、物美价优”的购物体验。
            </p>
            <p>
              蜂集市首创「共享+公益」生态商业模式，以“共创共享”为理念，“普惠四方”为愿景，创建“既能共享消费收益，又能轻松参与公益”的生态商业系统。在这里，用户不仅可以体验海量商品超值购，开启“蜂友圈”成为合伙人，还能享受“平台收益持续共享”的权益，通过“以购代捐，消费助农”轻松参与公益，以此形成用户、商家企业与社会的良性融合及联动赋能。
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品类别 -->
    <div class="product">
      <div class="container">
        <p class="title text-center" data-text="beemarket">
          全品类海量优品  购物畅享省免赚
        </p>
        <p class="sub-title text-center">
          商品覆盖日用家居、美妆个护、农副特产等20余个品类
        </p>
        <div class="cate ">
          <div class="container flex flex-around">
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_1.png')">
              </div>
              <p class="cate-name">
                农副产品
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_2.png')">
              </div>
              <p class="cate-name">
                食品粮油
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_3.png')">
              </div>
              <p class="cate-name">
                美妆护肤
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_4.png')">
              </div>
              <p class="cate-name">
                家居日用
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_5.png')">
              </div>
              <p class="cate-name">
                母婴用品
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_6.png')">
              </div>
              <p class="cate-name">
                个人清洁
              </p>
            </div>
            <div class="item text-center">
              <div class="img">
                <img :src="require('@/assets/icon/webIndex/product/product_7.png')">
              </div>
              <p class="cate-name">
                精品服饰
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-between">
          <div class="feature">
            <p class="feature-name">
              省
            </p>
            <p class="txt">
              海量优品 只打折不打烊
            </p>
            <button class="btn">
              <span>立即加入</span>
            </button>
          </div>
          <div class="feature">
            <p class="feature-name">
              免
            </p>
            <p class="txt">
              全场任选 免费赠送
            </p>
            <button class="btn">
              <span>立即加入</span>
            </button>
          </div>
          <div class="feature">
            <p class="feature-name">
              赚
            </p>
            <p class="txt">
              共享收益 持续躺赚
            </p>
            <button class="btn">
              <span>立即加入</span>
            </button>
          </div>
        </div>
        <div class="text-center">
          <button class="down-btn">
            立即下载
          </button>
        </div>
      </div>
    </div>
    <!-- 集市公益 -->
    <div class="public-benefit">
      <p class="title text-center" data-text="beemarket">
        集市公益
      </p>
      <van-swipe :autoplay="5000" indicator-color="white">
        <van-swipe-item>
          <img :src="require('@/assets/icon/webIndex/carousel/benefit_carousel_1.png')">
        </van-swipe-item>
        <van-swipe-item>
          <img :src="require('@/assets/icon/webIndex/carousel/benefit_carousel_2.png')">
        </van-swipe-item>
        <van-swipe-item>
          <img :src="require('@/assets/icon/webIndex/carousel/benefit_carousel_3.png')">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商家入驻 -->
    <div id="factoryJoin" class="factory-join">
      <div class="container">
        <p class="title text-center" data-text="beemarket">
          商家免费入驻
        </p>
        <div class="row flex flex-between flex-wrap">
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_1.png')">
              <p class="name">
                免费入驻
              </p>
              <div class="line" />
              <p class="txt">
                资质齐全 0元入驻
              </p>
            </div>
          </div>
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_2.png')">
              <p class="name">
                轻松上线
              </p>
              <div class="line" />
              <p class="txt">
                1对1服务 全程协助
              </p>
            </div>
          </div>
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_3.png')">
              <p class="name">
                运营0风险
              </p>
              <div class="line" />
              <p class="txt">
                保证金&服务费 先收益后缴纳
              </p>
            </div>
          </div>
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_4.png')">
              <p class="name">
                流量支持
              </p>
              <div class="line" />
              <p class="txt">
                新鲜入驻 流量倾斜
              </p>
            </div>
          </div>
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_5.png')">
              <p class="name">
                闪电结算
              </p>
              <div class="line" />
              <p class="txt">
                权益有保障 7天闪电结
              </p>
            </div>
          </div>
          <div class="item flex text-center">
            <div class="content">
              <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_6.png')">
              <p class="name">
                品牌扶持
              </p>
              <div class="line" />
              <p class="txt">
                生态赋能 战略投资
              </p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="down-btn" @click="goPage">
            立即咨询
          </button>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div id="contact" class="contact">
      <div class="container">
        <p class="title text-center" data-text="beemarket">
          联系我们
        </p>
        <div class="flex flex-between">
          <div class="item flex align-center">
            <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_8.png')">
            <div class="info">
              <p class="name">
                推广合作
              </p>
              <p class="tel">
                173-6522-1949
              </p>
            </div>
          </div>
          <div class="item flex align-center">
            <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_9.png')">
            <div class="info">
              <p class="name">
                商家合作
              </p>
              <p class="tel">
                151-2388-8964
              </p>
            </div>
          </div>
          <div class="item flex align-center">
            <img :src="require('@/assets/icon/webIndex/join_icon/join_icon_7.png')">
            <div class="info">
              <p class="name">
                联系客服
              </p>
              <p class="tel">
                400-0808-819
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="container">
        <van-row>
          <van-col :span="12">
            <div class="footer-logo">
              <img :src="require('@/assets/icon/webIndex/icon/footer_logo.png')">
            </div>
            <van-row>
              <van-col :span="8">
                <a href="#" class="footer-nav">了解APP</a>
              </van-col>
              <van-col :span="8">
                <a href="#" class="footer-nav">商家入驻</a>
              </van-col>
              <van-col :span="8">
                <a href="#" class="footer-nav">联系我们</a>
              </van-col>
            </van-row>
            <p class="slogen">
              <span style="margin-right: .4rem;">始于共创共享</span>
              <span>忠于普惠四方</span>
            </p>
          </van-col>
          <van-col :span="6" class="info">
            <p>重庆蜂效科技集团有限公司</p>
            <p class="flex align-center">
              <img :src="require('@/assets/icon/webIndex/icon/footer_email.png')">
              <span>kf@beemarket.net.cn</span>
            </p>
            <p class="flex align-center">
              <img :src="require('@/assets/icon/webIndex/icon/footer_address.png')">
              <span>重庆市渝北区康田·凯旋国际 F18 </span>
            </p>
          </van-col>
          <van-col :span="6" class="qr-code flex flex-between text-center">
            <div class="item">
              <img :src="require('@/assets/icon/webIndex/icon/footer_download_qr.png')">
              <p>扫码下载APP</p>
            </div>
            <div class="item">
              <img :src="require('@/assets/icon/webIndex/icon/footer_wx_qr.png')">
              <p>扫码关注公众号</p>
            </div>
          </van-col>
        </van-row>
        <van-row class="copy_right">
          <van-col :span="24" class="text-center">
            版权归重庆蜂效科技集团有限公司所有  备案号渝ICP备17008247号
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 右侧悬浮 -->
    <div class="side-bar flex flex-column flex-center">
      <div class="mini-logo">
        <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_1.png')">
      </div>
      <ul class="list flex flex-column text-center">
        <li class="item">
          <div class="info">
            <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_2.png')">
            <p>下载APP</p>
          </div>
          <div class="block flex flex-column flex-center align-center flex flex-column flex-center align-center">
            <img class="qr-img" :src="require('@/assets/icon/webIndex/icon/fixed_icon_download.png')">
            <p class="name">
              蜂集市APP
            </p>
          </div>
        </li>
        <li class="item">
          <div class="info">
            <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_3.png')">
            <p>关注我们</p>
          </div>
          <div class="block flex flex-column flex-center align-center">
            <img class="qr-img" :src="require('@/assets/icon/webIndex/icon/fixed_icon_wx.png')">
            <p class="name">
              微信扫码关注
            </p>
          </div>
        </li>
        <li class="item">
          <div class="info">
            <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_4.png')">
            <p>商家入驻</p>
          </div>
          <div class="block flex flex-column flex-center align-center">
            <p class="tel">
              151-2388-8964
            </p>
            <p class="name">
              入驻咨询
            </p>
          </div>
        </li>
        <li class="item">
          <div class="info">
            <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_5.png')">
            <p>推广合作</p>
          </div>
          <div class="block flex flex-column flex-center align-center">
            <p class="tel">
              173-6522-1949
            </p>
            <p class="name">
              推广合作
            </p>
          </div>
        </li>
        <li class="item">
          <div class="info">
            <img :src="require('@/assets/icon/webIndex/icon/fixed_icon_6.png')">
            <p>联系客服</p>
          </div>
          <div class="block flex flex-column flex-center align-center">
            <p class="tel">
              400-0808-819
            </p>
            <p class="name">
              咨询客服
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 下载二维码 -->
    <van-popup v-model="showQr">
      <img :src="require('@/assets/icon/webIndex/icon/footer_download_qr.png')" class="down-img">
    </van-popup>
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
      },
      showQr: false
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

    scrollTo(id) {
      // 用 class="nav-content" 添加锚点
      const jump = document.getElementById(id)
      const total = jump.offsetTop
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop
      console.log(total, distance)

      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      if (total > distance) {
        smoothDown()
      } else {
        const newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown() {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 0)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 0)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    },

    // 防抖动
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
    },

    goPage() {
      window.open('http://cn.mikecrm.com/6CA4KdS', '_blank')
    }
  }
}
</script>

<style scoped  lang="less">
.web-index {
  // position: fixed;
  // top: 0;
  // left: 0;
  // height: auto;
  min-width: 12rem;
  width: 100%;
  // overflow-x: scroll;
  background: #fff;
  // *{
  //   transition: all 0.2s linear;
  // }
}
.container {
  width: 12rem;
  margin: 0 auto;
}
// @media screen and (max-width: 1199px) {
//   .container {
//     width: 90%;
//     margin: 0 auto;
//   }
// }
a {
  color: #333;
}
.title{
  position: relative;
  margin: 0 auto .4rem;
  font-size: .3rem;
  color: #000;
  z-index: 2;
  &::before{
    content: attr(data-text);
    position: absolute;
    top: -.3rem;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
    font-size: .6rem;
    color: #F0F0F0;
    z-index: -1;
  }
  &::after{
    content: '';
    position: absolute;
    bottom: -.1rem;
    left: 50%;
    transform: translateX(-50%);
    width: .6rem;
    height: 2px;
    background: #FFB413;

  }
}
.header {
  border-top: 4px solid #f1a11d;
  .logo {
    max-width: 1.6rem;
    padding: 0.3rem 0;
  }
  .nav {
    padding: 0.4rem 0;
    a {
      font-size: 0.16rem;
      font-weight: 600;
      padding-bottom: 0.05rem;
    }
    a:active,a:hover{
      border-bottom: 0.03rem solid #FA9822;
    }
  }
}
.app-info{
  padding-top: .6rem;
  margin-bottom: .6rem;
  .title{
    width: 4rem;
  }
  .info{
    display: flex;
    flex-wrap: wrap;
  }
  .app-carousel{
    width: 65%;
    border-radius: 0.15rem;
    margin-right: .2rem;
  }
  .text{
    margin:0;
    flex: 1;
    font-size: 0.16rem;
    color: #333;
    background:rgba(245,245,245,1);
    line-height: 2.5;
    display: flex;
    padding: .4rem;
    box-sizing: border-box;
    border-radius: .15rem;
    height: 3.6rem;
    div{
      margin: auto;
      height: 2.49rem;
      overflow-y: scroll;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar { width: 0 !important }
      &::-webkit-scrollbar {display:none}
    }
  }
}
@media screen and (max-width: 1199px) {
  .app-info{
     .app-carousel{
      width: 100%;
    }
    .text{
      width: 100%;
      padding: .4rem;
      line-height: 1.6;
      margin-top: .2rem;
    }
  }

}
.product{
  background: #F5F5F5;
  padding-top: .6rem;
  padding-bottom: .6rem;
  .title{
    width:4.38rem;
    margin-bottom: .2rem;
  }
  .sub-title{
    font-size: .14rem;
    color:#999;
    margin-bottom: .6rem;
  }
  .cate{
    .item{width: .9rem;}
    .img{
      width:.9rem;
      height: .9rem;
      margin-bottom: .1rem;
    }
    .cate-name{
      font-size: .16rem;
      color: #333;
      margin: 0;
    }
  }
  .feature{
    width: 3.8rem;
    height: 2.5rem;
    box-sizing: border-box;
    padding: .33rem .22rem;
    color: #fff;
    font-size: .16rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: .6rem;
    p{margin: 0;}
    .feature-name{
      font-size: .36rem;
    }
    .txt{
     margin: 0.16rem 0 .28rem;
    }
    .btn{
      border: none;
      width:.92rem;
      height: .32rem;
      display: flex;
      border-radius: 0.3rem;
      background-color: transparent;
      border: 1px solid #fff;
      span{
        margin: auto;
      }
    }
    &:nth-of-type(1){
      background-image: url(../../../assets/icon/webIndex/product/product_bg_1.png);
    }
    &:nth-of-type(2){
      background-image: url(../../../assets/icon/webIndex/product/product_bg_2.png);
    }
    &:nth-of-type(3){
      background-image: url(../../../assets/icon/webIndex/product/product_bg_3.png);
    }
  }

}
.down-btn{
  font-size: .16rem;
  color: #fff;
  width:160px;
  height:40px;
  margin: .6rem auto 0;
  background:linear-gradient(90deg,rgba(255,169,46,1),rgba(250,152,34,1));
  border-radius:20px;
  border: none;
  box-shadow: 0 0 0.1rem rgba(251, 156, 37, .5);
}

.public-benefit{
  padding:.6rem 0 0;
  .title{
    width: 1.2rem;
    margin-bottom: .5rem;
  }
}
.factory-join{
  background: #f5f5f5;
  padding: 0.6rem 0;
  .title{width: 1.8rem; margin-bottom: .6rem;}
  .item{
    width:2.8rem;
    height:2.19rem;
    background:rgba(255,255,255,1);
    border-radius:0.05rem;
    margin-right: 1.7rem;
    margin-bottom: .6rem;
    p{margin: 0;}
    .content{margin: auto}
    img{
      width: .77rem;
      height: .62rem;
      margin-bottom: .18rem
    }
    .name{
      font-size: .18rem;
      color: #333;
      font-weight: 600;
    }
    .line{
      width:.26rem;
      height:.02rem;
      margin: 0.1rem auto .15rem;
      background:rgba(250,153,35,1);
    }
    .txt{
      font-size: .14rem;
      color: #666;
    }
    &:nth-of-type(3n){
      margin-right: 0;
    }
  }
  .down-btn{
    margin-top: 0;
  }
}
.contact{
  padding: 0.6rem 0;

  .title{
    width: 1.2rem;
    margin-bottom: .6rem;
  }
  .item{
    p{margin: 0;}
    color: #333;
    img{width: .77rem; height:.62rem; margin-right: .1rem;}
    .name{font-size: .18rem;margin-bottom: .1rem;}
    .tel{font-size: .2rem}
  }
}
.footer{
  background:#000;
  padding: 0.4rem 0 0.15rem;
  .footer-logo{
    width:1.6rem;
    height: .44rem;
    margin-bottom: .37rem;
  }
  .footer-nav{
    font-size: .14rem;
    color: #fff;
    position: relative;
    opacity: .6;
    &::after{
      content: '';
      position: absolute;
      bottom: -.05rem;
      left: 0;
      width:.24rem;
      height:.03rem;
      background:rgba(250,153,35,1);
      border-radius:.02rem
    }
  }
  .slogen{
    font-size: .16rem;
    color: #fff;
    opacity: .6;
    margin-top: 0.34rem;
    margin-bottom: 0;
  }
  .info{
    margin-top: .3rem;
    p{font-size: .14rem;color:#fff; opacity: .6;}
    img{margin-right: 0.1rem;}
    p:nth-of-type(2) img{
      width:.18rem;
      height: .14rem;

    }
    p:nth-of-type(3) img{
      width:.15rem;
      height: .17rem;
    }
  }
  .qr-code{
    margin-top: .15rem;
   img{
     width:1.08rem;
     height: 1.08rem;
   }
   p{ font-size: .14rem; color: #fff; margin: 0.1rem auto;}
  }
  .copy_right{
    font-size: 0.14rem;
    color: #fff;
    opacity: .6;
    margin-top: .5rem;
  }
}
.side-bar{
  position: fixed;
  top: 50%;
  right: 1rem;
  z-index: 5;
  height: 5.2rem;
  width: .64rem;
  transform: translateY(-50%);
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, .1);
  p{margin: 0;}
  .mini-logo{
    display: flex;
    margin-bottom: .3rem;
    img{
      margin: auto;
      width: .38rem;
      height: .42rem;
    }
  }
  .list{}
  .item{
    position: relative;
    border-top: 1px solid #f5f5f5;
    background-color: #fff;
    padding: 0.1rem 0;

    &:hover{
      background-color: #F9C920;
      .block{
        display: flex;
      }
    }
    .info{
      img{max-width: .28rem;max-height: .29rem; margin-bottom: .1rem;}
      p{font-size: .12rem;color: #333;}
    }
    .block{
      display: none;
      position: absolute;
      top: 0;
      right: .64rem;
      width: 1.96rem;
      height: 1.46rem;
      background: #F9C920;
      border-radius: 0.05rem 0 0 0.05rem;
      p{margin-top: .1rem;}
      .qr-img{width: 0.68rem;height: .68rem;}
      .tel{font-size: .2rem;color:#333;}
      .name{font-size: .16rem;color:#333;}
    }
  }
}
.down-img{
	width: 1.08rem;
	height: 1.08rem;
}

</style>
