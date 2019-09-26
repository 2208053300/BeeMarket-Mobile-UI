<template>
  <div class="spokesman">
    <van-tabs v-model="active">
      <van-tab title="立即分享">
        <div class="share-desc text-center">
          <p>分享即可为集市代言</p>
          <p>分享专属海报，我为集市代言</p>
        </div>
        <!-- <div v-if="items.length" class="full-page-slide-wrapper"> -->
        <div class="full-page-slide-wrapper">
          <swiper ref="mySwiper" :options="swiperOption">
            <!-- slides -->
            <template v-for="item in items">
              <swiper-slide v-if="item.img" :key="item.id">
                <img :src="item.img" alt @click="toTopic(item)">
              </swiper-slide>
            </template>
            <div slot="pagination" class="swiper-pagination" />
          </swiper>
        </div>
        <!-- 操作 -->
        <ul class="action flex flex-between">
          <li class="text-center">
            <img :src="icons.save" alt="">
            <span>保存图片</span>
          </li>
          <li class="text-center">
            <img :src="icons.share" alt="">
            <span>立即分享</span>
          </li>
        </ul>
      </van-tab>
      <van-tab title="自己上传">
        <van-collapse v-model="collapseActive">
          <van-collapse-item title="生成流程：" name="1">
            <p>1.上传一张自己的图片</p>
            <p>1.选择海报文案</p>
            <p>1.生成专属代言海报</p>
            <p>1.分享或者保存到相册，为集市代言</p>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getOs } from '@/utils'
// import wxapi from '@/utils/wxapi'
// import { getUID } from '@/api/BeeApi/user'
// import { activityDetail } from '@/api/BeeApi/action'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  metaInfo() {
    // title: '活动模板1'
    return {
      title: '我为蜂集市代言'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {},
  data() {
    return {
      active: 0,
      icons: {
        save: require('@/assets/icon/spokesman/endorsement_immediately_icon_preservation@2x.png'),
        share: require('@/assets/icon/spokesman/endorsement_immediately_icon_wechat@2x.png'),
        text: require('@/assets/icon/spokesman/endorsement_immediately_icon_copywriting@2x.png'),
        pic: require('@/assets/icon/spokesman/endorsement_immediately_icon_replace@2x.png')
      },
      items: [
        {
          img: require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
          id: 0
        },
        {
          img: require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
          id: 1
        },
        {
          img: require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
          id: 2
        }
      ],
      collapseActive: ['1'],

      defaultIndex: 0,
      swiperOption: {

        direction: 'horizontal',
        loop: true,
        // autoplay: 5000,
        autoplay: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'slide_dot_active',
          bulletClass: 'slide_dot'
        }
      },
      osObj: getOs()
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
    // 创建之前把背景色强制设置为白色
    document.querySelector('body').style.background = 'f4f4f4'
  },
  beforeDestroy() {
    // 销毁之前把白色背景给清除掉
    document.querySelector('body').style.background = ''
  },
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false

    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare

    if (this.osObj.isWx) {
      //
    } else if (this.osObj.isIphone && this.osObj.isApp) {
      window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
    } else if (this.osObj.isAndroid && this.osObj.isApp) {
      window.beeMarket.showShareIcon(true)
    } else {
      //
    }
  },
  methods: {
    // 分享
    appShare() {
      if (this.osObj.isWx) {
        //
      } else if (this.osObj.isIphone && this.osObj.isApp) {
        window.webkit.messageHandlers.ToShare.postMessage({
          title: this.activity.share_data.title,
          desc: this.activity.share_data.desc,
          img_path: this.activity.share_data.img,
          // 地址应该放 web 站 网页
          url: this.activity.share_data.link
          // url: this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        })
      } else if (this.osObj.isAndroid && this.osObj.isApp) {
        window.beeMarket.ToShare(
          this.activity.share_data.title,
          this.activity.share_data.desc,
          this.activity.share_data.img,
          this.activity.share_data.link
          // this.$store.state.app.homeUri + '/beeActiveTpl?id=' + this.$route.query.id
        )
      } else {
        //
      }
    }
  }
}
</script>

<style  lang="less">
.spokesman {
  .van-tab span {
    font-size: 0.28rem;
    color: #666;
  }
  .van-tab--active span {
    color: @BeeDefault;
  }
  .van-tabs__line {
    background-color: @BeeDefault;
  }

  .share-desc{
    margin: 0.4rem auto;
    p{margin: 0}
    p:nth-of-type(1){
      font-size: 0.3rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.2rem
    }
    p:nth-of-type(2){
      font-size: 0.28rem;
      color: #666;
    }
  }

  .action{
    width: 96%;
    margin-left: 2%;
    background: #fff;
    border-radius: 0.3rem;
    margin-top: 0.7rem;
    padding: 0.3rem 1.6rem;
    box-sizing: border-box;
    img{width: .96rem; height: .96rem; margin-bottom: .2rem}
    span{font-size: .26rem;color: #333; display: block}
  }

  .full-page-slide-wrapper {
    width: 100%;
    height: 6.68rem;
    // background: white;
    box-sizing: content-box;
    // padding-top: 15px;
    // margin-top: 10px;
    position: relative;
    overflow: hidden;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
      }
      .swiper-slide {
        // width: calc(100% - 50px);
        width: 3.76rem;
        border-radius: 5px;
      }
      // .swiper-slide-active{width: 3.76rem;}
      .swiper-slide-prev {
        height: 90% !important;
      }
      .swiper-slide-next {
        height: 90% !important;
      }
    }
    img {
      object-fit: fill;
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
    .slide_dot {
      display: inline-block;
      margin: 5px;
      width: 3px;
      height: 3px;
      background-color: #f2f2f2;
      border-radius: 50%;
      opacity: 0.5;
    }
    .swiper-pagination {
      bottom: 0;
    }
    .slide_dot_active {
      display: inline-block;
      width: 7px;
      height: 3px;
      border-radius: 5px;
      background: white;
      opacity: 1;
    }
  }

  .van-cell{background-color:#FFFBF6;}
  .van-cell__title span{color: #666; font-size: 0.26rem}
  .van-collapse-item__content{
    background-color:#FFFBF6;
    padding: 0.2rem 0.3rem;
    p{margin: 0;line-height: 1.7; font-size: 0.24rem}
  }
}
</style>
