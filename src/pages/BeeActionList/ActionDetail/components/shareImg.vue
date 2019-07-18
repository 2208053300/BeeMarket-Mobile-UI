<template>
  <div class="share-container">
    <van-popup
      v-model="helpSuccess"
      class="share-modal"
      transition="van-fade"
      :close-on-click-overlay="false"
      @close="closed"
      @click-overlay="closed"
    >
      <div class="text-right tipImg">
        <img
          :src="beeIcon.shareTip"
          class="shareTip"
        >
      </div>
      <div class="canvas-content">
        <div class="canvas-img">
          <img
            ref="shareImgPre"
            alt=""
            :src="share_img"
          >
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
        shareTip: require('@/assets/icon/share/guide1.png')
      },
      bgBase64: '',
      headBase64: ''
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
      this.$parent.showImg = true
      const imgList = document.querySelectorAll('.share-content img')
      console.log(imgList)

      for (let index = 0; index < imgList.length; index++) {
        const element = imgList[index]
        element.setAttribute('crossOrigin', 'Anonymous')
      }
      // 防止加载错误，每个链接加上时间戳，没用
      // const time = Math.floor(new Date().getTime() / 100)
      // this.actionDetails.share_image =
      //   this.actionDetails.share_image + '?' + time
      // this.actionDetails.share_data.head_img =
      //   this.actionDetails.share_data.head_img + '?' + time
      // function getBase64Image(img) {
      //   var canvas = document.createElement('canvas')
      //   canvas.width = img.width
      //   canvas.height = img.height
      //   var ctx = canvas.getContext('2d')
      //   ctx.drawImage(img, 0, 0, img.width, img.height)
      //   var dataURL = canvas.toDataURL('image/png')
      //   return dataURL
      // }

      // function getImg(img) {
      //   var image = new Image()
      //   image.src = img
      //   image.setAttribute('crossOrigin', 'anonymous')
      //   console.log(image)

      //   image.onload = function() {
      //     img = getBase64Image(image)
      //     console.log(img)
      //   }
      // }
      // this.bgBase64 = getImg(this.actionDetails.share_image)
      // this.headBase64 = getImg(this.actionDetails.share_data.head_img)
      // this.bgBase64 = await Axios(this.actionDetails.share_image)
      setTimeout(async() => {
        const imgDom = document.querySelectorAll('.share-content')[0]
        try {
          const canvasImg = await html2canvas(imgDom, {
            // allowTaint: true,
            useCORS: true
            // scrollX: 0,
            // scrollY: 0,
            // width: imgDom.scrollWidth,
            // height: imgDom.scrollHeight,
            // windowWidth: imgDom.scrollWidth,
            // windowHeight: imgDom.scrollHeight
          })
          this.$parent.showImg = false
          const img = canvasImg.toDataURL('image/png')
          console.log(img)

          // this.$refs.shareImgPre.setAttribute('src', img)
          this.share_img = img
        } catch (error) {
          console.log(error)
        }
      }, 1000)
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
  .canvas-content {
    position: relative;
    width: 5.34rem;
    height: 6.92rem;
    border-radius: 0.16rem;
    background-color: #fff;
    padding: 0.16rem;
    .canvas-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
