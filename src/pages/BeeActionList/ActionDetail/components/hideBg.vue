<template>
  <div
    class="share-bg"
    :class="{hideBg:!bgOpacity}"
  >
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    bgOpacity: {
      type: Number,
      default: 0
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
        // shareTip: require('@/assets/icon/share/guide1.png'),
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
  methods: {}
}
</script>

<style scoped lang="less">
.share-bg {
  width: 5.34rem;
  height: 6.92rem;
  border-radius: 0.16rem;
  background-color: #fff;
  padding: 0.16rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  .share-content {
    height: 100%;
    position: relative;
    width: 5.02rem;
    height: 6.6rem;
    background-size: cover;
    background-repeat: no-repeat;
    // border-radius: 0.16rem;
    // overflow: hidden;
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
.hideBg {
  opacity: 0;
}
</style>
