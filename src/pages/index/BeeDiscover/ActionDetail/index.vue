<template>
  <div class="action-details">
    <!-- <div class="action-img">
      <img :src="actionDetails.background_image_url" alt="">
    </div> -->
    <div class="details-content">
      <detail-card0 class="details-card" :action-details="actionDetails" />
      <detail-card1 class="details-card" :action-details="actionDetails" />
      <detail-card2 class="details-card" :action-details="actionDetails" />
      <detail-card3 class="details-card" :action-details="actionDetails" />
    </div>
    <div class="footer-action">
      <div v-if="actionDetails.is_join" class="helped-text">
        您已参与了该项目的助力，分享给更多好友，一起助力吧!
      </div>
      <div class="action-button not-help">
        <!-- <van-button class="share-help">
          发起助力
        </van-button> -->
        <van-button
          class="go-help"
          :disabled="actionDetails.is_join"
          @click="goHelp"
        >
          <span v-if="!actionDetails.is_join">参与并发起助力</span>
          <span v-else>已参与助力</span>
        </van-button>
      </div>
    </div>
    <!--  <van-popup v-model="helpSuccess" class="success-content">
      <div class="help-success">
        <span class="success-text">
          助力成功
        </span>
        <div class="success-text2">
          恭喜你获得以下奖励
        </div>
        <div
          class="success-value"
          :style="{ backgroundImage: 'url(' + beeIcon.pop_ups_pic_value + ')' }"
        >
          <div class="get-benefit">
            <span class="benefit-num">{{}}</span>公益值
          </div>
        </div>
        <div class="success-text3">
          分享给更多好友，一起来为项目助力吧！
        </div>
        <van-button class="success-share">
          发起助力
        </van-button>
      </div>
      <van-icon
        :name="beeIcon.pop_ups_icon_delete"
        class="closePop"
        @click="helpSuccess = false"
      />
    </van-popup>-->
    <van-popup
      v-model="helpSuccess"
      position="top"
      class="share-modal"
      @closed="closed"
    >
      <div class="text-right" style="padding:0.2rem 0.2rem 0 0">
        <img :src="beeIcon.shareTip" class="shareTip">
      </div>
    </van-popup>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
// 行动详情，参与助力，发起助力
import { getActionDetail, joinAction } from '@/api/BeeApi/action'
import detailCard0 from './components/detailCard0'
import detailCard1 from './components/detailCard1'
import detailCard2 from './components/detailCard2'
import detailCard3 from './components/detailCard3'
export default {
  metaInfo: {
    title: '项目详情'
  },
  components: {
    detailCard0,
    detailCard1,
    detailCard2,
    detailCard3
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
        is_join: false
      },
      BeeDefault,
      helpSuccess: false,
      helped: false,
      beeIcon: {
        pop_ups_pic_value: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value_app@2x.png'),
        pop_ups_icon_delete: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png'),
        shareTip: require('@/assets/icon/share/guide1.png')
      },
      // 参与助力获得公益值
      pwv_number: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getActionDetailsData()
  },
  methods: {
    async getActionDetailsData() {
      const res = await getActionDetail({ id: this.id })
      this.actionDetails = res.data
    },
    // 参与助力 分享成功后跳转页面到助力成功页面 /joinSuccess
    async goHelp() {
      // aid 行动id share_id 分享人 id
      // const res = await joinAction({ aid: this.id,share_id })
      // console.log(res)
      this.$store.state.app.beeHeader = false
      this.helpSuccess = true
      // this.actionDetails.is_join = true
    },
    // 关闭分享弹出层
    closed() {
      this.$store.state.app.beeHeader = true
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
      margin: 0.04rem 0.12rem;
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
  }
  .shareTip {
    width: 3.3rem;
    height: 2.28rem;
  }
}
</style>
