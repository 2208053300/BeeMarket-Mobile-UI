<template>
  <div class="spokesman">
    <van-tabs
      v-model="active"
      :sticky="true"
      @click="onClickTabs"
    >
      <van-tab title="立即分享" />

      <van-tab title="自己上传" />
    </van-tabs>
    <template v-if="active1">
      <div class="share-desc text-center">
        <p>分享即可为集市代言</p>
        <p>分享专属海报，我为集市代言</p>
      </div>
      <div class="full-page-slide-wrapper">
        <keep-alive>
          <swiper
            ref="mySwiper"
            :options="swiperOption"
          >
            <!-- slides -->

            <swiper-slide
              v-for="(item,index) in posterImages"
              :key="index"
            >
              <!-- <img :src="item.img" alt @click="toTopic(item)"> -->
              <img :src="item">
              <div class="qrcode-content2">
                <img
                  class="qrcode"
                  :src="qrcodeBase64"
                  alt=""
                >
              </div>
            </swiper-slide>
            <div
              slot="pagination"
              class="swiper-pagination"
            />
          </swiper>
        </keep-alive>
      </div>
      <!-- 操作 -->
      <p
        v-if="osObj.isWx"
        class="wx-tip text-center"
      >
        请长按保存图片
      </p>
      <ul
        v-else
        class="action flex flex-between"
      >
        <li
          class="text-center"
          @click="saveImg2"
        >
          <img
            :src="icons.save"
            alt=""
          >
          <span>保存图片</span>
        </li>
        <li
          class="text-center"
          @click="saveImg2"
        >
          <img
            :src="icons.share"
            alt=""
          >
          <span>立即分享</span>
        </li>
      </ul>
    </template>
    <template v-if="!active1">
      <van-collapse v-model="collapseActive">
        <van-collapse-item
          title="生成流程："
          name="1"
        >
          <p>1.上传一张自己的图片</p>
          <p>2.选择海报文案</p>
          <p>3.生成专属代言海报</p>
          <p>4.分享或者保存到相册，为集市代言</p>
        </van-collapse-item>
        <!-- 上传图片 -->
      </van-collapse>
      <div
        class="comment-imgs"
        :class="{ hasImg: commentImgs||share_ori }"
      >
        <van-uploader :after-read="onRead">
          <template v-if="commentImgs||share_ori">
            <div
              class="comment-img"
              :style="{backgroundImage:'url('+commentImgs.content||share_ori+')'}"
            >
              <!-- <img :src="commentImgs.content"> -->
              <img
                :src="wenan[activeText]"
                alt=""
                class="wenan"
              >
              <div class="qrcode-content">
                <img
                  class="qrcode"
                  :src="qrcodeBase64"
                  alt=""
                >
              </div>
            </div>
          </template>
          <template v-else>
            <van-icon
              name="photograph"
              size="0.5rem"
            />
            <div class="img-num">
              <span class="upload-text">添加图片</span>
            </div>
          </template>
        </van-uploader>
        <div class="share-content">
          <img
            v-if="share_img && showEnd"
            class="share-img"
            :src="share_img"
          >
        </div>
        <p
          v-if="!commentImgs||!share_ori"
          class="text-center tip"
        >
          您还没有上传图片，点击上传吧
        </p>
        <div
          v-if="(commentImgs||share_ori) && !showEnd"
          class="poster-text"
        >
          <div
            v-for="(item, index) in posterText"
            :key="index"
            class="text-item"
            :class="{ activeItem: activeText === index }"
            @click="activeText = index"
          >
            <van-icon
              v-if="activeText === index"
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
                {{ item.text1 }}
              </p>
              <p class="text1">
                {{ item.text2 }}
              </p>
              <p class="text1">
                {{ item.text3 }}
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
                  :src="icons.pic"
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
                  :src="icons.text"
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
                    :src="icons.save"
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
                  :src="icons.share"
                  alt=""
                >
              </div>
              <span>立即分享</span>
            </div>
          </div>
        </div>
        <div
          v-if="(commentImgs||share_ori) && !showEnd"
          class="next-step"
          @click="doneText"
        >
          下一步
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getOs } from '@/utils'
// import wxapi from '@/utils/wxapi'
import {
  getQrcode,
  getTemplates,
  getIsset,
  getOrigin,
  postGenerated,
  postCustom
} from '@/api/BeeApi/promote'
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
      active: 0,
      active1: true,
      icons: {
        save: require('@/assets/icon/spokesman/endorsement_immediately_icon_preservation@2x.png'),
        share: require('@/assets/icon/spokesman/endorsement_immediately_icon_wechat@2x.png'),
        text: require('@/assets/icon/spokesman/endorsement_immediately_icon_copywriting@2x.png'),
        pic: require('@/assets/icon/spokesman/endorsement_immediately_icon_replace@2x.png')
      },
      posterImages: [
        require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
        require('@/assets/icon/freeGift/freegift_wechat_popup.png'),
        require('@/assets/icon/freeGift/freegift_wechat_popup.png')
      ],
      wenan: {
        0: require('@/assets/icon/spokesman/文案一.png'),
        1: require('@/assets/icon/spokesman/文案二.png'),
        2: require('@/assets/icon/spokesman/文案三.png'),
        3: require('@/assets/icon/spokesman/文案四.png')
      },
      collapseActive: ['1'],

      defaultIndex: 0,
      swiperOption: {
        direction: 'horizontal',
        loop: true,
        // autoplay: 5000,
        observer: true,
        observerParents: true,
        observeSlideChildren: true,
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
          text1: '不套路，不营销，',
          text2: '海量优品，自由选购',
          text3: '2019最大风口，我在蜂集市等你'
        },
        {
          text1: '零风险，零门槛',
          text2: '我用一部手机，轻松创业',
          text3: '既能朝九晚五，亦有诗和远方'
        },
        {
          text1: '不捐钱，不捐物',
          text2: '照样轻松做公益',
          text3: '消费助农，我在行动'
        },
        {
          text1: '爱宝贝，爱家人',
          text2: '假冒伪劣零容忍',
          text3: '能省能赚，宝妈首选'
        }
      ],
      activeText: 0,
      showEnd: false,
      share_img: '',
      qrcodeBase64: '',
      share_ori: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
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

    this.getTemplatesData()
    this.getQrcodeData()
    this.getIssetData()
    // app 调用本地 方法，需将该方法挂载到window
    window.appShare = this.appShare
  },
  methods: {
    // 获取模板
    async getTemplatesData() {
      const res = await getTemplates()
      this.posterImages.push(res.data)
    },
    // 获取用户二维码
    async getQrcodeData() {
      const res = await getQrcode()
      this.qrcodeBase64 = 'data:image/jpeg;base64,' + res.data.qrCode
    },
    async getIssetData() {
      const res = await getIsset()
      if (res.data.image_url) {
        this.share_img = res.data.image_url
        // 如果已经上传过图片，获取原图可直接更改文案
        const res2 = await getOrigin()
        this.share_ori = res2.data.image_url
        this.active = 1
        this.showEnd = true
      }
    },
    // 点击标签页
    onClickTabs(name, title) {
      if (title === '立即分享') {
        this.active1 = true
      } else {
        this.active1 = false
      }
    },

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

    async onRead(file) {
      this.commentImgs = file
      this.collapseActive = []
      try {
        console.log(file)

        await postCustom({ image: file.file })
      } catch (error) {
        this.$toast('上传图片失败！')
      }
    },
    async doneText() {
      // 点击下一步，生成海报
      this.showEnd = true
      const imgDom = document.querySelector('.van-uploader')
      try {
        const canvasImg = await html2canvas(imgDom, {
          scrollX: 0,
          scrollY: 0,
          x: imgDom.offsetLeft,
          y:
            imgDom.offsetTop +
            document.querySelector('.comment-imgs').offsetTop,
          // 必须获得其距离顶部距离，避免滚动偏移
          backgroundColor: null
        })
        const img = canvasImg.toDataURL('image/png')
        this.$toast('生成专属海报成功！')
        this.share_img = img
      } catch (error) {
        console.log(error)
        this.$toast('生成专属海报失败！')
      }
    },
    async saveImg(e) {
      // APP保存图片与微信保存图片
      if (this.osObj.isApp) {
        e.preventDefault()
        const baseString = this.share_img.slice(22)
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
      try {
        await postGenerated({ image: this.share_img })
      } catch (error) {
        this.$toast('上传图片失败！')
      }
    },
    async createImg() {
      const imgDom = document.querySelector('.swiper-slide-active')
      try {
        const canvasImg = await html2canvas(imgDom, {
          // scrollX: 0,
          // scrollY: 0,
          // x: imgDom.offsetLeft,
          y: document.querySelector('.full-page-slide-wrapper').offsetTop,
          // 必须获得其距离顶部距离，避免滚动偏移
          backgroundColor: null
        })
        const img = canvasImg.toDataURL('image/png')
        this.$toast('生成专属海报成功！')
        this.share_img = img
        console.log(this.share_img)
      } catch (error) {
        console.log(error)
        this.$toast('生成专属海报失败！')
      }
    },
    async saveImg2(e) {
      await this.createImg()
      // APP保存图片与微信保存图片
      if (this.osObj.isApp) {
        e.preventDefault()
        const baseString = this.share_img.slice(22)
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
    shareImm(e) {
      // TODO 立即分享，需要注入分享信息后调用
      if (this.osObj.isApp) {
        e.preventDefault()
        const baseString = this.share_img.slice(22)
        if (this.osObj.isAndroid) {
          window.beeMarket.ToShareImgBase64(baseString)
        } else if (this.osObj.isIphone) {
          window.webkit.messageHandlers.ToShareImgBase64.postMessage({
            data: baseString
          })
        }
      } else {
        this.$toast('请长按海报保存到本地！')
      }
    },
    async shareImm2(e) {
      await this.createImg()
      // TODO 立即分享，需要注入分享信息后调用
      if (this.osObj.isApp) {
        e.preventDefault()
        const baseString = this.share_img.slice(22)
        if (this.osObj.isAndroid) {
          window.beeMarket.ToShareImgBase64(baseString)
        } else if (this.osObj.isIphone) {
          window.webkit.messageHandlers.ToShareImgBase64.postMessage({
            data: baseString
          })
        }
      } else {
        this.$toast('请长按海报保存到本地！')
      }
    }
  }
}
</script>

<style  lang="less">
.spokesman {
  .wx-tip {
    font-size: 0.28rem;
    color: #666;
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

    box-sizing: content-box;

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
        width: 3.76rem;
        border-radius: 5px;

        transform: scaleY(0.9);
        transition: all 0.3s linear;
        .qrcode-content2 {
          position: absolute;
          bottom: 0.3rem;
          right: 0.3rem;
          background-color: #fff;
          width: 0.7rem;
          height: 0.7rem;
          .qrcode {
            border-radius: 0;
          }
        }
      }
      .swiper-slide-active,
      .swiper-slide-duplicate-active {
        height: 100%;
        transform: scaleY(1);
      }
      // .swiper-slide-prev {

      // }
      // .swiper-slide-next {

      // }
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
      border-radius: 0.05rem;
      background-size: cover;
      background-position: center;
      width: 3.8rem;
      height: 6.68rem;
      .wenan {
        position: absolute;
        left: 0;
        top: 0;
      }
      .qrcode-content {
        position: absolute;
        bottom: 0.5rem;
        right: 0.3rem;
        background-color: #fff;
        width: 0.7rem;
        height: 0.7rem;
        .qrcode {
          width: 100%;
          height: 100%;
        }
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
      min-width: 2rem;
      min-height: 2rem;
      text-align: center;
      margin: 2.82rem auto 0.4rem;
      margin-top: 2.82rem;
      box-sizing: border-box;
      border: 0.04rem dashed @Grey6;
      .van-uploader__wrapper {
        min-width: 2rem;
        min-height: 2rem;
        .van-icon {
          margin-bottom: 0.1rem;
          font-size: 0.3rem;
          color: #666;
        }
        .upload-text {
          font-size: 0.28rem;
          color: #666;
        }
      }
    }
    .van-uploader__input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .tip {
    font-size: 0.28rem;
    color: #999;
    display: block;
  }
  .poster-text {
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
          font-size: 0.26rem;
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
    margin-top: 0.96rem;
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
    width: 100%;
    height: 0.98rem;
    background-color: @BeeDefault;
    font-size: 0.36rem;
    color: #fff;
    line-height: 0.98rem;
    text-align: center;
    margin-top: 0.92rem;
  }
}
</style>
