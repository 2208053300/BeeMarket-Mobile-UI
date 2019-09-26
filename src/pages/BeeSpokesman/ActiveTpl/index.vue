<template>
  <div class="spokesman">
    <van-tabs
      v-model="active"
      :sticky="true"
    >
      <van-tab title="立即分享">
        <div class="share-desc text-center">
          <p>分享即可为集市代言</p>
          <p>分享专属海报，我为集市代言</p>
        </div>
        <!-- <div v-if="items.length" class="full-page-slide-wrapper"> -->
        <div class="full-page-slide-wrapper">
          <swiper
            ref="mySwiper"
            :options="swiperOption"
          >
            <!-- slides -->
            <template v-for="item in items">
              <swiper-slide
                v-if="item.img"
                :key="item.id"
              >
                <!-- <img :src="item.img" alt @click="toTopic(item)"> -->
                <img :src="item.img">
              </swiper-slide>
            </template>
            <div
              slot="pagination"
              class="swiper-pagination"
            />
          </swiper>
        </div>
        <!-- 操作 -->
        <ul class="action flex flex-between">
          <li class="text-center">
            <img
              :src="icons.save"
              alt=""
            >
            <span>保存图片</span>
          </li>
          <li class="text-center">
            <img
              :src="icons.share"
              alt=""
            >
            <span>立即分享</span>
          </li>
        </ul>
      </van-tab>
      <van-tab title="自己上传">
        <van-collapse v-model="collapseActive">
          <van-collapse-item
            title="生成流程："
            name="1"
          >
            <p>1.上传一张自己的图片</p>
            <p>1.选择海报文案</p>
            <p>1.生成专属代言海报</p>
            <p>1.分享或者保存到相册，为集市代言</p>
          </van-collapse-item>
          <!-- 上传图片 -->
        </van-collapse>
        <div
          class="comment-imgs"
          :class="{hasImg:commentImgs}"
        >
          <van-uploader :after-read="onRead">
            <template v-if="commentImgs">
              <div class="comment-img">
                <img :src="commentImgs.content">
              </div>
            </template>
            <template v-else>
              <van-icon name="photograph" />
              <div class="img-num">
                <span class="upload-text">添加图片</span>
              </div>
            </template>
          </van-uploader>
          <div class="share-content">
            <img
              v-if="share_img&&showEnd"
              class="share-img"
              :src="share_img"
            >
          </div>
          <p
            v-if="!commentImgs"
            class="text-center tip"
          >
            您还没有上传图片，点击上传吧
          </p>
          <div
            v-if="commentImgs&&!showEnd"
            class="poster-text"
          >
            <div
              v-for="(item,index) in posterText"
              :key="index"
              class="text-item"
              :class="{activeItem:activeText===index}"
              @click="activeText=index"
            >
              <van-icon
                v-if="activeText===index"
                name="checked"
                color="#ffa42f"
              />
              <van-icon
                v-else
                name="circle"
                color="#999999"
              />
              <div class="text-content">
                <p class="text1">
                  123
                </p>
                <p class="text1">
                  456
                </p>
                <p class="text1">
                  789
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="showEnd"
            class="last-step"
          >
            <div class="action-content">
              <div
                class="action-item"
                @click="changeBg()"
              >
                <div class="img-content">
                  <img
                    src=""
                    alt=""
                  >
                </div>
                <span>更换图片</span>
              </div>
              <div
                class="action-item"
                @click="changeText"
              >
                <div class="img-content">
                  <img
                    src=""
                    alt=""
                  >
                </div>
                <span>更换文案</span>
              </div>
              <div
                class="action-item"
                @click="saveImg"
              >
                <a
                  :href="share_img"
                  download=""
                >
                  <div class="img-content">
                    <img
                      src=""
                      alt=""
                    >
                  </div>
                  <span>保存图片</span>
                </a>
              </div>
              <div
                class="action-item"
                @click="shareImm"
              >
                <div class="img-content">
                  <img
                    src=""
                    alt=""
                  >
                </div>
                <span>立即分享</span>
              </div>
            </div>
          </div>
          <div
            v-if="commentImgs&&!showEnd"
            class="next-step"
            @click="doneText"
          >
            下一步
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getOs } from '@/utils'
// import wxapi from '@/utils/wxapi'
// import { getUID } from '@/api/BeeApi/user'
// import { activityDetail } from '@/api/BeeApi/action'
import html2canvas from 'html2canvas/dist/html2canvas.min.js'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  metaInfo() {
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
      active: 1,
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
      osObj: getOs(),
      commentImgs: null,
      posterText: [
        {
          text1: '132',
          text2: '456',
          text3: '789'
        },
        {
          text1: '132',
          text2: '456',
          text3: '789'
        }
      ],
      activeText: 0,
      showEnd: false,
      share_img: ''
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
    },

    onRead(file) {
      console.log(file)
      this.commentImgs = file
      this.collapseActive = []
    },
    async doneText() {
      // 点击下一步，生成海报
      this.showEnd = true
      const imgDom = document.querySelector('.comment-img')
      try {
        const canvasImg = await html2canvas(imgDom)
        const img = canvasImg.toDataURL('image/png')
        this.$toast('生成专属海报成功！')
        this.share_img = img
      } catch (error) {
        console.log(error)
        this.$toast('生成专属海报失败！')
      }
    },
    saveImg(e) {
      // APP保存图片与微信保存图片
      if (this.osObj.isApp) {
        e.preventDefault()
        const baseString = this.share_img.slice(23)
        if (this.osObj.isAndroid) {
          window.beeMarket.SaveShareImgBase64(baseString)
        } else if (this.osObj.isIphone) {
          window.webkit.messageHandlers.ToSaveShareImgBase64.postMessage({
            data: baseString
          })
        }
      } else if (this.osObj.isWx) {
        this.$toast('请长按海报保存到本地！')
      }
    },
    changeBg() {
      // 更换背景
      this.commentImgs = null
      this.showEnd = false
      this.collapseActive = ['1']
    },
    changeText() {
      // 更换文字
      this.showEnd = false
    },
    shareImm() {
      // TODO 立即分享，需要注入分享信息后调用
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
  height: 100%;
  .van-tabs {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 0.98rem;
    .van-tabs__content {
      height: 100%;
      .van-tab__pane {
        height: 100%;
      }
    }
  }
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

  .share-desc {
    margin: 0.4rem auto;
    p {
      margin: 0;
    }
    p:nth-of-type(1) {
      font-size: 0.3rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.2rem;
    }
    p:nth-of-type(2) {
      font-size: 0.28rem;
      color: #666;
    }
  }

  .action {
    width: 96%;
    margin-left: 2%;
    background: #fff;
    border-radius: 0.3rem;
    margin-top: 0.7rem;
    padding: 0.3rem 1.6rem;
    box-sizing: border-box;
    img {
      width: 0.96rem;
      height: 0.96rem;
      margin-bottom: 0.2rem;
    }
    span {
      font-size: 0.26rem;
      color: #333;
      display: block;
    }
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
        transition: height 0.2s linear;
      }
      .swiper-slide-active {
        height: 100%;
      }
      .swiper-slide-prev {
        height: 90% !important;
        // transition: height 0.2s linear;
      }
      .swiper-slide-next {
        height: 90% !important;
        // transition: height 0.2s linear;
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

  .van-cell {
    background-color: #fffbf6;
  }
  .van-cell__title span {
    color: #666;
    font-size: 0.26rem;
  }
  .van-collapse-item__content {
    background-color: #fffbf6;
    padding: 0.2rem 0.3rem;
    p {
      margin: 0;
      line-height: 1.7;
      font-size: 0.24rem;
    }
  }
  .comment-imgs.hasImg {
    .van-uploader {
      margin-top: 1.1rem;
      border: none;
      width: 3.8rem;
    }
    .tip {
      display: none;
    }
  }
  .comment-imgs {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .share-content {
      position: absolute;
      left: 0;
      top: 1.1rem;
      width: 100%;
      text-align: center;
      .share-img {
        width: 3.8rem;
        height: 6.68rem;
      }
    }
    .comment-img {
      text-align: center;
      position: relative;
      border-radius: 0.08rem;
      background-color: @Grey7;
      overflow: hidden;
      img {
        border-radius: 0.05rem;
        width: 3.8rem;
        height: 6.68rem;
        margin: 0 auto;
      }
    }
    .upload-img {
      display: flex;
      box-sizing: border-box;
      border-radius: 0.1rem;
      text-align: center;
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }

    .van-uploader {
      width: 2rem;
      height: 2rem;
      text-align: center;
      margin: 0 auto;
      margin-top: 2.82rem;
      box-sizing: border-box;
      border: 0.04rem dashed @Grey6;
      .van-uploader__wrapper {
        height: 100%;
        .van-icon {
          padding-top: 0.5rem;
        }
      }
    }
    .van-uploader__input-wrapper {
      width: 100%;
    }
  }
  .tip {
    font-size: 0.28rem;
    color: #999;
    display: block;
  }
  .poster-text {
    position: absolute;
    bottom: 1.9rem;
    left: 0;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    .text-item {
      width: 4.72rem;
      height: 1.28rem;
      border-radius: 0.08rem;
      border: 0.02rem solid @Grey1;
      display: inline-flex;
      align-items: center;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-left: 0.2rem;
      .van-icon {
        font-size: 0.4rem;
      }
      .text-content {
        margin-left: 0.2rem;
        p {
          margin: 0;
          padding: 0;
        }
        .text1 {
          color: @Grey1;
        }
      }
    }
    .activeItem {
      border-color: @ProductName;
      .text-content {
        .text1 {
          color: @ProductName;
        }
      }
    }
  }
  .last-step {
    position: absolute;
    bottom: 0.6rem;
    width: 100%;
    .action-content {
      margin: 0 0.2rem;
      background-color: #fff;
      border-radius: 0.2rem;
      padding: 0.3rem 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      text-align: center;
      .action-item {
        font-size: 0.26rem;
        a {
          color: #333;
        }
        .img-content {
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 auto 0.2rem;
        }
      }
    }
  }
  .next-step {
    position: absolute;
    width: 100%;
    height: 0.98rem;
    background-color: @BeeDefault;
    font-size: 0.36rem;
    color: #fff;
    line-height: 0.98rem;
    text-align: center;
    bottom: 0;
    left: 0;
  }
}
</style>
