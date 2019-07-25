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
      <!-- <div class="text-right tipImg">
        <img
          :src="beeIcon.shareTip"
          class="shareTip"
        >
      </div> -->
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
      this.$parent.bgOpacity = 1
      // 判断是否图片已经加载成功
      const imgDom = document.querySelector('.share-content')
      try {
        const canvasImg = await html2canvas(imgDom, {
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          x: imgDom.offsetLeft,
          y: imgDom.offsetTop
        })
        const img = canvasImg.toDataURL('image/png')
        this.share_img = img
      } catch (error) {
        console.log(error)
        this.$toast('生成二维码海报失败！')
      }
      this.$parent.bgOpacity = 0
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
    width: 5.02rem;
    height: 6.6rem;
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
