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
        v-show="showActivityDirections"
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
        v-if="actionDetails.bottom_desc"
        class="helped-text"
      >
        <!-- 您已参与了助力，分享给更多好友，一起助力吧! -->
        {{ actionDetails.bottom_desc }}
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
    <hideBg
      :bg-opacity="bgOpacity"
      :action-details="actionDetails"
    />
    <share-img
      ref="shareImg"
      :action-details="actionDetails"
      :help-success.sync="helpSuccess"
    />
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
// 行动详情，参与助力api
import { getActionDetail, launchAction, joinAction1 } from '@/api/BeeApi/action'
// 引入微信分享
import wxapi from '@/utils/wxapi'

// 引入组件
import detailCard0 from './components/detailCard0'
import detailCard1 from './components/detailCard1'
import detailCard2 from './components/detailCard2'
import detailCard3 from './components/detailCard3'
import detailCard4 from './components/detailCard4'
import shareImg from './components/shareImg'
import hideBg from './components/hideBg'
export default {
  metaInfo: {
    title: '项目详情'
  },
  components: {
    detailCard0,
    detailCard1,
    detailCard2,
    detailCard3,
    detailCard4,
    shareImg,
    hideBg
  },

  props: {},
  data() {
    return {
      // 公益行动id
      bgOpacity: 0,
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
        uid: 0,
        share_data: {}
      },
      BeeDefault,
      helpSuccess: false,
      helped: false,
      beeIcon: {
        pop_ups_pic_value: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value_app@2x.png'),
        pop_ups_icon_delete: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png'),
        publicwelfare_detail_popup_icon_download: require('@/assets/icon/discover/publicwelfare_detail_popup_icon_download@2x.png'),
        publicwelfare_popups_download: require('@/assets/icon/discover/publicwelfare_popups_download@2x.png'),
        publicwelfare_popups_text: require('@/assets/icon/discover/publicwelfare_popups_text@2x.png')
      },
      // 参与助力获得公益值
      pwv_number: 0
    }
  },
  computed: {
    // 计算是否显示活动说明
    showActivityDirections() {
      if (this.actionDetails.activity_directions === undefined) {
        return false
      } else if (this.actionDetails.activity_directions.length === 0) {
        return false
      } else if (this.actionDetails.activity_directions[0].content === '') {
        return false
      }
      return true
    }
  },
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
      this.actionDetails.share_data.qr_cord =
        'data:image/jpeg;base64,' + this.actionDetails.share_data.qr_cord
    },
    // 参与助力
    async goHelp() {
      try {
        const res = await joinAction1({ id: this.id })
        if (res.status_code === 200) {
          this.actionDetails.is_join = true
          this.$refs.shareImg.drawImg()
          this.helpSuccess = true
        }
      } catch (error) {
        this.$toast(error)
      }
    },
    // 发起助力
    async goHelp1() {
      try {
        const res = await launchAction({ id: this.id })
        if (res.status_code === 200) {
          this.$refs.shareImg.drawImg()
          this.helpSuccess = true
        }
      } catch (error) {
        this.$toast(error)
      }
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
    z-index: 100;
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
}
</style>
