<template>
  <div class="share-container">
    <van-popup
      v-model="helpSuccess"
      class="share-modal"
      :close-on-click-overlay="false"
      @opened="drawImg"
      @close="closed"
      @click-overlay="closed"
    >
      <div
        class="text-right"
        style="padding:0.2rem 0.2rem 0 0"
      >
        <img
          :src="beeIcon.shareTip"
          class="shareTip"
        >
      </div>
      <div class="share-bg">
        <div
          ref="shareImg"
          class="share-content"
        >
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
                    v-once
                    :src="actionDetails.share_data.head_img"
                    alt=""
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
                    :src="'data:image/jpeg;base64,'+actionDetails.share_data.qr_cord"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="canvas-img">
            <img
              ref="shareImgPre"
              crossorigin="anonymous"
              alt=""
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import html2canvas from 'html2canvas/dist/html2canvas.min.js'
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
          uid: 0
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
      bgBase64: ''
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
      // this.getBase64(this.actionDetails.share_image)
      const imgList = document.querySelectorAll('.share-content img')
      console.log(imgList)

      for (let index = 0; index < imgList.length; index++) {
        const element = imgList[index]
        element.setAttribute('crossorigin', 'anonymous')
      }
      html2canvas(this.$refs.shareImg, {
        allowTaint: true,
        useCORS: true
      }).then(canvas => {
        console.log(canvas)
        this.$refs.shareImgPre.setAttribute('src', canvas.toDataURL())
        this.share_img = canvas.toDataURL('image/png')
      })
    },
    getBase64(img) {
      function getBase64Image(img) {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
        var dataURL = canvas.toDataURL('image/' + ext)
        return dataURL
      }

      var image = new Image()
      image.src = img
      image.onload = function() {
        this.bgBase64 = getBase64Image(image)
      }
    }
  }
}
</script>

<style scoped lang="less">
.share-container {
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
        overflow: hidden;
        position: relative;
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
