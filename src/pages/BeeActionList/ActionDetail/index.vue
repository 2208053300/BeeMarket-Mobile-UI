<template>
  <div class="action-details">
    <!-- <div class="action-img">
      <img :src="actionDetails.background_image_url" alt="">
    </div> -->
    <div class="details-content">
      <detail-card0
        class="details-card"
        :action-details="actionDetails"
      />
      <detail-card1
        class="details-card"
        :action-details="actionDetails"
      />
      <detail-card2
        class="details-card"
        :action-details="actionDetails"
      />
      <detail-card4
        class="details-card"
        :action-details="actionDetails"
      />
      <detail-card3
        class="details-card"
        :action-details="actionDetails"
      />
    </div>
    <div class="footer-action">
      <div
        v-if="actionDetails.current_is_join"
        class="helped-text"
      >
        <!-- 您已参与了该项目的助力，分享给更多好友，一起助力吧! -->
        您已参与了助力，分享给更多好友，一起助力吧!
      </div>
      <div class="action-button not-help">
        <!-- <van-button class="share-help">
          发起助力
        </van-button> -->
        <van-button
          v-if="!actionDetails.is_join"
          class="go-help"
          @click="goHelp"
        >
          <span>参与并发起助力</span>
        </van-button>
        <van-button
          v-else
          class="go-help"
          @click="goHelp1"
        >
          <span>发起助力</span>
        </van-button>
      </div>
    </div>

    <van-popup
      v-model="helpSuccess"
      class="share-modal"
      @closed="closed"
    >
      <!-- position="top" -->
      <div
        class="text-right"
        style="padding:0.2rem 0.2rem 0 0"
      >
        <img
          :src="beeIcon.shareTip"
          class="shareTip"
        >
      </div>
      <!-- <div class="share-bg">
        <div
          ref="shareImg"
          class="share-content"
          :style="{backgroundImage:'url('+actionDetails.share_image+')'}"
        >
          <div
            v-if="actionDetails.share_data"
            class="share-info"
          >
            <div class="user-info">
              <div class="head-img">
                <img
                  :src="actionDetails.share_data.head_img"
                  crossorigin="anonymous"
                  alt=""
                >
              </div>
              <div class="right-info">
                <span>{{ actionDetails.share_data.nickname }}</span>
                <div class="img-content">
                  <img
                    :src="beeIcon.pic_text"
                    crossorigin="anonymous"
                    alt=""
                  >
                </div>
              </div>
            </div>
            <div class="user-code">
              <div class="img-content">
                <img
                  :src="beeIcon.pic_finger"
                  crossorigin="anonymous"
                  alt=""
                >
              </div>
              <div class="img-content2">
                <img
                  :src="'data:image/jpeg;base64,'+actionDetails.share_data.qr_cord"
                  crossorigin="anonymous"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div class="canvas-img">
            <img
              :src="share_img"
              crossorigin="anonymous"
              alt=""
            >
          </div>
        </div>
      </div> -->
    </van-popup>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
// 行动详情，参与助力api
import { getActionDetail, launchAction, joinAction1 } from '@/api/BeeApi/action'
// import html2canvas from 'html2canvas/dist/html2canvas.min.js'
// 引入微信分享
import wxapi from '@/utils/wxapi.js'

// 引入组件
import detailCard0 from './components/detailCard0'
import detailCard1 from './components/detailCard1'
import detailCard2 from './components/detailCard2'
import detailCard3 from './components/detailCard3'
import detailCard4 from './components/detailCard4'
export default {
  metaInfo: {
    title: '项目详情'
  },
  components: {
    detailCard0,
    detailCard1,
    detailCard2,
    detailCard3,
    detailCard4
  },

  props: {},
  data() {
    return {
      // 公益行动id
      id: this.$route.query.id,
      showPercent: false,
      actionDetails: {
        id: 0,
        main_title: '',
        subtitle: '',
        initiate_people_num: 0,
        share_number: 0,
        schedule_status: 0,
        company_desc: '',
        participate_num: 0,
        background_image_url: '',
        top_desc: '',
        schedule: 0,
        project_progress: [
          {
            schedule_main_title: '',
            schedule_subtitle: '',
            correspond_status: 0,
            created_at: ''
          }
        ],
        company_info: {
          love_company_logo: '',
          company_desc: '',
          cooperation_company_list: [
            {
              cooperation_company_logo: ''
            },
            {
              cooperation_company_logo: ''
            }
          ]
        },
        is_join: false,
        uid: 0
      },
      BeeDefault,
      helpSuccess: false,
      helped: false,
      beeIcon: {
        pop_ups_pic_value: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value_app@2x.png'),
        pop_ups_icon_delete: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png'),
        shareTip: require('@/assets/icon/share/guide1.png'),
        publicwelfare_detail_popup_icon_download: require('@/assets/icon/discover/publicwelfare_detail_popup_icon_download@2x.png'),
        publicwelfare_popups_download: require('@/assets/icon/discover/publicwelfare_popups_download@2x.png'),
        publicwelfare_popups_text: require('@/assets/icon/discover/publicwelfare_popups_text@2x.png'),
        pic_text: require('@/assets/icon/discover/pic_text@2x.png'),
        pic_finger: require('@/assets/icon/discover/pic_finger@2x.png')
      },
      // 参与助力获得公益值
      pwv_number: 0,
      share_img: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // 获取详情数据
    this.getActionDetailsData()
  },
  methods: {
    async getActionDetailsData() {
      const res = await getActionDetail({ id: this.id })
      this.actionDetails = res.data
      wxapi.wxShare({
        title: this.actionDetails.main_title, // 分享标题, 请自行替换
        desc: '我为公益代言！点点手指，为我助力！', // 分享描述, 请自行替换
        link: this.actionDetails.share_data.url, // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'https://img.fengjishi.com/app/images/action.jpg' // 分享图标, 请自行替换，需要绝对路径
      })
    },
    // 参与助力
    async goHelp() {
      // this.$store.state.app.beeHeader = false
      // aid 行动id
      this.helpSuccess = true
      // html2canvas(this.$refs.shareImg, {
      //   useCORS: true
      // }).then(canvas => {
      //   console.log(canvas)

      //   this.share_img = canvas.toDataURL('image/png')
      // })
      try {
        const res = await joinAction1({ id: this.id })
        if (res.status_code === 200) {
          this.actionDetails.is_join = true
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 发起助力
    async goHelp1() {
      // aid 行动id
      try {
        const res = await launchAction({ id: this.id })
        if (res.status_code === 200) {
          // this.$toast(res.message)
          // this.$store.state.app.beeHeader = false
          this.helpSuccess = true
        }
      } catch (error) {
        this.$toast(error)
      }
      // this.helpSuccess = true
    },

    // 关闭分享弹出层
    closed() {
      this.$store.state.app.beeHeader = true
    },

    // 分享回调函数
    wxRegCallback() {
      // 用于微信JS-SDK回调
      this.wxShareTimeline()
      this.wxShareAppMessage()
    },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      const option = {
        title: this.actionDetails.subtitle, // 分享标题, 请自行替换
        link: this.actionDetails.share_data.url, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.actionDetails.share_image, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(option)
    },
    wxShareAppMessage() {
      // 微信自定义分享给朋友
      const option = {
        title: this.actionDetails.subtitle, // 分享标题, 请自行替换
        desc: this.actionDetails.top_desc, // 分享描述, 请自行替换
        link: this.actionDetails.share_data.url, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.actionDetails.share_image, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    }
  }
}
</script>

<style scoped lang="less">
.action-details {
  // margin: 46px 0 60px;
  margin-bottom: 60px;
  .action-img {
    width: 100%;
    max-height: 3rem;
    overflow: hidden;
  }
  .details-content {
    margin: 0 0.3rem 0.2rem;
    position: relative;
    top: -0.32rem;
    .details-card {
      // background-color: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
      margin-bottom: 0.08rem;
      box-sizing: border-box;
    }
  }
  .footer-action {
    width: 100%;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    background-color: #fff;
    text-align: center;
    border-top: 0.02rem solid @Grey4;
    .action-button {
      margin: 0.1rem 0.12rem;
      box-sizing: border-box;
      border-radius: 0.4rem;
      overflow: hidden;
    }
    .not-help {
      display: flex;
      align-items: center;
      .van-button {
        border: none;
        color: #ffffff;
        border-radius: 0;
        font-size: 0.32rem;
      }
      .share-help {
        flex: 1;
        background-color: @BeeDefault;
      }
      .go-help {
        flex: 1;
        background-image: linear-gradient(to right, #ffbd2f, #ffa42f);
      }
    }
    .helped-text {
      height: 0.52rem;
      text-align: center;
      color: @Red1;
      font-size: 0.22rem;
      background-color: @Red3;
      line-height: 0.52rem;
    }
  }
  .success-content {
    border-radius: 0.2rem;
    overflow: initial;
    .help-success {
      width: 5.68rem;
      height: 6.72rem;
      padding: 0.56rem 0.44rem 0.32rem;
      box-sizing: border-box;
      text-align: center;
      .success-text {
        font-size: 0.44rem;
        color: @BeeDefault;
      }
      .success-text2 {
        margin-top: 0.36rem;
        font-size: 0.32rem;
        color: @Grey2;
      }
      .success-value {
        height: 3.2rem;
        background-size: 100%;
        background-position: center;
        position: relative;
        .get-benefit {
          font-size: 0.28rem;
          color: @BeeDefault;
          border-bottom: 0.02rem solid @BeeDefault;
          width: 1.72rem;
          text-align: center;
          position: absolute;
          right: 1.3rem;
          bottom: 1rem;
          .benefit-num {
            font-size: 0.7rem;
          }
        }
      }
      .success-text3 {
        font-size: 0.22rem;
        color: @Grey2;
      }
      .success-share {
        font-size: 0.32rem;
        border: none;
        border-radius: 0.4rem;
        height: 0.88rem;
        width: 4.8rem;
        background-color: @BeeDefault;
        color: #ffffff;
        margin-top: 0.2rem;
      }
    }
    .closePop {
      position: absolute;
      left: 48%;
      font-size: 0.5rem;
      bottom: -1rem;
    }
  }

  .share-modal {
    background: rgba(0, 0, 0, 0);
    .share-bg {
      width: 5.34rem;
      height: 6.92rem;
      border-radius: 0.16rem;
      background-color: #fff;
      padding: 0.16rem;
      box-sizing: border-box;
      .share-content {
        border-radius: 0.16rem;
        height: 100%;
        background-size: cover;
        position: relative;
        .share-info {
          position: absolute;
          bottom: 0.2rem;
          left: 0.24rem;
          height: 1.24rem;
          width: 4.52rem;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 0.08rem;
          display: flex;
          padding: 0.08rem 0.12rem;
          justify-content: space-between;
          box-sizing: border-box;
          .user-info {
            display: flex;
            align-items: center;
            .head-img {
              width: 0.64rem;
              height: 0.64rem;
              margin-right: 0.06rem;
            }
            .right-info {
              .img-content {
                width: 1.56rem;
                height: 0.24rem;
              }
            }
          }
          .user-code {
            display: flex;
            align-items: center;
            .img-content {
              height: 0.46rem;
              width: 0.72rem;
            }
            .img-content2 {
              width: 1.08rem;
              height: 1.08rem;
            }
          }
        }
        .canvas-img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
      }
      .save-img {
        display: flex;
        justify-content: space-between;
        .img-content {
          width: 3.16rem;
          height: 0.56rem;
        }
        .img-content2 {
          width: 1.76rem;
          height: 0.88rem;
        }
      }
    }
  }
  .shareTip {
    width: 3.3rem;
    height: 2.28rem;
  }
}
</style>
