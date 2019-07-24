<template>
  <div class="share-container">
    <van-popup
      v-model="helpSuccess"
      class="share-modal"
      transition="van-fade"
      :close-on-click-overlay="false"
      @opened="drawImg"
      @close="closed"
      @click-overlay="closed"
    >
      <div class="text-right tipImg">
        <img
          :src="beeIcon.shareTip"
          class="shareTip"
        >
      </div>
      <div class="share-bg">
        <div class="share-content">
          <!-- :style="{backgroundImage:'url('+actionDetails.share_image+')'}" -->
          <img
            :src="actionDetails.share_image"
            alt=""
            class="bg-img"
          >
          <div class="share-info-content">
            <div
              v-if="actionDetails.share_data"
              class="share-info"
            >
              <div class="user-info">
                <div class="head-img">
                  <img
                    :src="actionDetails.share_data.head_img"
                    crossOrigin="anonymous"
                    alt=""
                    :onload="loadEnd=true"
                  >
                </div>
                <div class="right-info">
                  <span class="user-name">{{ actionDetails.share_data.nickname }}</span>
                  <div class="img-content">
                    <img
                      :src="beeIcon.pic_text"
                      alt=""
                    >
                  </div>
                </div>
              </div>
              <div class="user-code">
                <div class="img-content">
                  <img
                    :src="beeIcon.pic_finger"
                    alt=""
                  >
                </div>
                <div class="img-content2">
                  <img
                    :src="actionDetails.share_data.qr_cord"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="share_img"
          class="canvas-content"
        >
          <div class="canvas-img">
            <img
              ref="shareImgPre"
              alt=""
              :src="share_img"
            >
          </div>
        </div>
      </div>
      <div class="text-tip">
        <span>长按保存图片到本地</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
import { setTimeout } from 'timers'
export default {
  components: {},
  props: {
    helpSuccess: {
      type: Boolean,
      default: false
    },
    actionDetails: {
      type: Object,
      default: () => {
        return {
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
          uid: 0,
          share_data: {}
        }
      }
    }
  },
  data() {
    return {
      share_img: '',
      beeIcon: {
        shareTip: require('@/assets/icon/share/guide1.png'),
        pic_text: require('@/assets/icon/discover/pic_text@2x.png'),
        pic_finger: require('@/assets/icon/discover/pic_finger@2x.png')
      },
      bgBase64: '',
      headBase64: '',
      loadEnd: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭分享弹出层
    closed() {
      this.$emit('update:helpSuccess', false)
    },
    async drawImg() {
      // 判断是否图片已经加载成功
      if (!this.loadEnd) {
        setTimeout(this.drawImg(), 2000)
      }
      const imgDom = document.querySelector('.share-content')
      try {
        const canvasImg = await html2canvas(imgDom, {
          useCORS: true,
          scrollX: 0,
          scrollY: 0
          // y: imgDom.offsetTop
        })
        const img = canvasImg.toDataURL('image/png')
        this.share_img = img
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.share-container {
  .share-modal {
    background: rgba(0, 0, 0, 0);
    .tipImg {
      .shareTip {
        width: 3.3rem;
        height: 2.28rem;
      }
    }
    .text-tip {
      color: #ffffff;
      font-size: 0.28rem;
      padding: 0.1rem;
      text-align: center;
    }
  }
  .share-bg {
    width: 5.34rem;
    height: 6.92rem;
    border-radius: 0.16rem;
    background-color: #fff;
    padding: 0.16rem;
    box-sizing: border-box;
    position: relative;
    .share-content {
      height: 100%;
      position: relative;
      width: 5.02rem;
      height: 6.6rem;
      background-size: cover;
      background-repeat: no-repeat;
      .bg-img {
        width: 5.02rem;
        height: 6.6rem;
      }
      .share-info-content {
        position: absolute;
        bottom: 0.2rem;
        width: 100%;
        .share-info {
          height: 1.24rem;
          width: 4.52rem;
          margin: auto;
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
              border-radius: 50%;
              overflow: hidden;
            }
            .right-info {
              font-size: 0.2rem;
              overflow: hidden;
              .user-name {
                white-space: nowrap;
              }
              .img-content {
                width: 1.56rem;
                height: 0.24rem;
                margin-top: 0.06rem;
              }
            }
          }
          .user-code {
            display: flex;
            align-items: center;
            .img-content {
              height: 0.46rem;
              width: 0.72rem;
              margin-right: 0.06rem;
            }
            .img-content2 {
              width: 1.08rem;
              height: 1.08rem;
            }
          }
        }
      }
    }
  }
  .canvas-content {
    position: absolute;
    left: 0.16rem;
    bottom: 0.16rem;
    width: 5.02rem;
    height: 6.6rem;
    border-radius: 0.16rem;
    background-color: #fff;
    .canvas-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
