<template>
  <div class="prize-draw">
    <!-- top -->
    <div class="title">
      <p class="tip text-center">
        参与成功，等待开奖
      </p>
      <div class="shared-man text-center">
        <img :src="icon.avatar" class="share-avatar">
        <p><span>小贾</span>送出一份礼物给大家</p>
        <p>
          我从蜂集市上选了一件礼物送大家，祝大家天天开心！
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="content">
      <!-- 产品信息 -->
      <div class="product flex flex-between">
        <img :src="product.tUrl" class="product-img">
        <div class="product-info flex flex-column flex-between">
          <div>
            <p class="product-name no-wrap">
              {{ product.name }}
            </p>
            <p class="product-desc no-wrap">
              {{ product.desc }}
            </p>
          </div>
          <div class="action flex flex-between">
            <p class="product-price">
              <span class="sell-price">￥{{ product.sell_price }}</span>
              <span class="line-price">￥{{ product.line_price }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 参与者 -->
      <div class="participant bg-white">
        <p class="tip text-center">
          已有<span>12</span>人参与，<span>15</span>人参与立即开奖
        </p>
        <ul class="men flex flex-center flex-wrap">
          <li v-for="(item, index) in showMen" :key="index">
            <img :src="icon.avatar">
          </li>
        </ul>
        <!-- 头像超过15个 ，隐藏超出部分，通过点击切换显示与否 -->
        <p v-if="isShowArrow" class="text-center">
          <van-icon v-show="isMore===false" name="arrow-down" @click="showMore(true)" />
          <van-icon v-show="isMore===true" name="arrow-up" @click="showMore(false)" />
        </p>
      </div>
      <!-- 操作按钮 -->
      <van-button round class="action-btn" size="large">
        我也要免费送礼
      </van-button>
      <!-- <van-button class="action-btn" size="large">
        我要领取礼物
      </van-button> -->
    </div>
    <!-- 免费送礼商品列表 -->
    <Products />

    <!-- 抽奖弹框 -->
    <van-popup v-model="showPopup" class="draw-popup" :close-on-click-overlay="closeOnClickOverlay">
      <div class="info text-center">
        <img :src="icon.avatar" class="avatar">
        <p class="name">
          小贾
        </p>
        <p class="tip">
          发起一个送礼，满15人参与开奖
        </p>
        <p class="remark">
          我从蜂集市上选了一件礼物送大家，祝大家天天开心！
        </p>
        <van-button round class="draw-btn" @click="drawLucky">
          快来抽!
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Products from '../components/Products'
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {
    Products
  },
  props: {},
  data() {
    return {
      icon: {
        avatar: require('@/assets/icon/freeGift/freegift_wechat_popup.png')
      },
      product: {
        tUrl: require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
        name: '这是商品的名称',
        desc: '这是商品描述',
        sell_price: 20,
        line_price: 50
      },
      men: 18,
      showMen: 0,
      // 是否显示展开箭头
      isShowArrow: true,
      isMore: false,
      // 抽奖弹框
      showPopup: true,
      closeOnClickOverlay: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.men > 15) {
      this.showMen = 15
    } else {
      this.isShowArrow = false
    }
  },
  methods: {
    // 抽奖
    drawLucky() {
      this.showPopup = false
      document.querySelector('.van-overlay').style.backgroundColor = 'rgba(0,0,0,.7)'
    },

    // 显示/隐藏更多参与者头像
    showMore(type) {
      this.isMore = type
      if (type) {
        this.showMen = this.men
      } else {
        this.showMen = 15
      }
    }
  }
}
</script>

<style  lang="less">
.prize-draw{
  .van-overlay{background-color:#000; }
  p{margin: 0}
  .title{background:#F5F5F5;
    .tip{ font-size: 0.38rem;color:@BeeDefault; margin-top: 0.6rem; margin-bottom: 1rem;}
    .shared-man{
      width: 7.18rem;
      height: 1.76rem;
      margin: 0 auto;
      position: relative;
      background: url(../../../assets/icon/freeGift/freegift_details_img_text_bg.png) no-repeat;
      background-size: 7.18rem 1.76rem;
      font-size: 0.28rem;
      box-sizing: border-box;
      padding: 0.6rem 0.4rem 0;
      .share-avatar{width:.96rem;height: .96rem;position: absolute; top: -.48rem; left: 50%; transform: translateX(-50%);border-radius: 50%;}
      p:nth-of-type(1){color: #333}
      p:nth-of-type(2){color: @BeeDefault}
    }
  }

  .content{
    padding: 0.5rem 0.3rem;
    background: url(../../../assets/icon/freeGift/freegift_details_img_top.png) no-repeat;
    background-size: 100% auto;
    .product {
      background-color: white;
      border-radius: 0.1rem;
      padding: 10px;
      margin-bottom: 10px;
      .product-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .product-info {
        width:3.66rem;
        .product-name {
          margin-top: 10px;
          font-size: 0.26rem;
        }
        .product-desc {
          font-size: 0.2rem;
          color: #999;
          margin-top: 10px;
        }

      }
      .action{
         .product-price {
          margin-top: 10px;
        }
        .sell-price{ font-size: 0.4rem;color:@BeeDefault; margin-right: .1rem;}
        .line-price{ font-size: 0.22rem;color:#999; text-decoration: line-through}
      }
    }
    .participant{
      padding-top: 0.5rem;
      padding-bottom:.5rem;
      border-radius: 0.1rem;
      .tip{font-size:.3rem; margin-bottom:.2rem;}
      .men{
        padding: 0.2rem 0.3rem;
        li{
          margin-right: 0.2rem;
          margin-bottom: 0.2rem;
          &:nth-child(5n),&:last-child{margin-right: 0;}

        }
        img{
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        .van-icon{font-size: .4rem; color: #999}
      }
    }

    .action-btn{background:@BeeDefault; font-size: .34rem;color: #fff; margin-top:.4rem;}
  }

  .draw-popup{width:6.69rem; height: 7.35rem;
   background:url(../../../assets/icon/freeGift/freegift_wechat_popup.png) no-repeat;
   background-size: 100% 100%;
   p{margin: 0}
   .info{margin-top: 0.55rem;}
   .avatar{width:1rem;height:1rem ;border-radius: 50%;}
   .name{font-size:0.34rem ;color:#fff ; margin: 0.2rem auto 0.3rem;}
   .tip{font-size: .26rem; color: #fff; margin-bottom: 0.54rem;}
   .remark{font-size: .28rem;color: @BeeDefault; line-height: 1.7; margin-bottom: .88rem;padding: 0 1.1rem }
   .draw-btn{ font-size: .34rem;color: @BeeDefault;background-color:#FBFAE7; width: 4.44rem;height: 0.74rem;line-height:0.7rem ;}
  }
}
</style>
