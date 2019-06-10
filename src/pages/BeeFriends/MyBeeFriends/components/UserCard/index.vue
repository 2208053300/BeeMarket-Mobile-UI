<template>
  <div class="user-card">
    <van-popup
      v-model="detailCard"
      :close-on-click-overlay="false"
      class="pop-card"
      @close="handleClose"
      @click-overlay="handleClose"
    >
      <div
        class="card-content"
        :style="{backgroundImage:'url('+beeIcon.bee_firends_basic_img_bg+')'}"
      >
        <div class="card-header">
          <div class="title-content">
            <!-- <span>个人信息</span> -->
            <span>厂家信息</span>
          </div>
          <div
            class="close-img"
            @click="handleClose"
          >
            <img
              :src="beeIcon.bee_firends_basic_icon_off"
              alt=""
            >
          </div>
        </div>
        <div class="user-detail">
          <div class="header-img">
            <div class="header-img2">
              <div class="header-img3">
                <img
                  src=""
                  alt=""
                >
              </div>
            </div>
          </div>
          <div class="user-name">
            用户名用户名
          </div>
          <!-- <div class="user-grade">
            <van-icon :name="beeIcon.bee_firends_basic_icon_star" />
            <span class="name">合伙人</span>
          </div> -->
          <div class="store-name">
            店铺名
          </div>
        </div>
        <div class="partner-content">
          <div
            class="partner"
            :style="{backgroundImage:'url('+beeIcon.bee_firends_img_bg_prompt+')'}"
          >
            蜂集市合伙商家
          </div>
        </div>
        <!-- <div class="friends-content">
          <div class="friends-part">
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_vendor"
              class="firends-image"
            />
            <div class="friends-num">
              厂商:<span class="num">43</span>个
            </div>
          </div>
          <div class="friends-part">
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_firend"
              class="firends-image"
            />
            <div class="friends-num">
              蜂友:<span class="num">43</span>个
            </div>
          </div>
          <div class="friends-part">
            <van-icon
              :name="beeIcon.bee_firends_basic_icon_association"
              class="firends-image"
            />
            <div class="friends-num">
              关联蜂友:<span class="num">43</span>个
            </div>
          </div>
        </div> -->
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    detailCard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beeIcon: {
        bee_firends_basic_icon_star: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_star.png'),
        bee_firends_basic_icon_off: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_off.png'),
        bee_firends_basic_img_bg: require('@/assets/icon/beeFriends/info/bee_firends_basic_img_bg.png'),
        bee_firends_basic_icon_firend: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_firend.png'),
        bee_firends_basic_icon_association: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_association.png'),
        bee_firends_basic_icon_vendor: require('@/assets/icon/beeFriends/info/bee_firends_basic_icon_vendor.png'),
        bee_firends_img_bg_prompt: require('@/assets/icon/beeFriends/rank/bee_firends_img_bg_prompt.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('update:detailCard', false)
    }
  }
}
</script>

<style scoped lang="less">
.user-card {
  .pop-card {
    border-radius: 0.1rem;
    .card-content {
      min-height: 6rem;
      width: 5.78rem;
      background-color: #ffc619;
      background-size: contain;
      .card-header {
        padding-top: 0.22rem;
        display: flex;
        justify-content: space-between;
        .title-content {
          width: 1.58rem;
          height: 0.44rem;
          line-height: 0.44rem;
          text-align: center;
          border-top-right-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
          background-color: rgba(255, 255, 255, 0.2);
          color: @Black1;
        }
        .close-img {
          width: 0.45rem;
          height: 0.45rem;
          margin-right: 0.25rem;
        }
      }
      .user-detail {
        text-align: center;
        margin-top: 0.18rem;
        .header-img {
          margin: auto;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          border: 0.02rem solid @BeeDefault;
          box-sizing: border-box;
          padding: 0.02rem;
          .header-img2 {
            width: 1.5rem;
            height: 1.5rem;
            box-sizing: border-box;
            padding: 0.02rem;
            border-radius: 50%;
            border: 0.1rem solid #fff;
            .header-img3 {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 0.02rem solid #fed559;
              background-color: #fff;
            }
          }
        }
        .user-name {
          font-size: 0.4rem;
          color: @Black1;
          margin: 0.2rem auto 0.16rem;
        }
        .store-name{
          font-size: 0.3rem;
        }
        .user-grade {
          margin: auto;
          height: 0.32rem;
          width: max-content;
          background-color: #f9b228;
          border-radius: 0.14rem;
          line-height: 0.32rem;
          text-align: center;
          padding: 0 0.24rem;
          color: #fff;
          font-size: 0.2rem;
          .van-icon {
            vertical-align: middle;
          }
          .name {
            margin-left: 0.08rem;
            vertical-align: middle;
          }
        }
      }
      .friends-content {
        margin-top: 0.5rem;
        height: 2.66rem;
        box-sizing: border-box;
        background-color: #fff;
        border-top-left-radius: 0.8rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1rem;
        padding: 0.82rem 0;
        .friends-part {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          &:first-child {
            border-right: 0.02rem solid @Grey6;
          }
          .firends-image {
            font-size: 0.5rem;
            margin: auto;
          }
          .friends-num {
            font-size: 0.26rem;
            margin-top: 0.16rem;
            .num {
              color: @BeeDefault;
            }
          }
        }
      }
      .partner-content {
        padding-top: 0.7rem;
        .partner {
          height: 0.38rem;
          line-height: 0.38rem;
          width: 3.2rem;
          text-align: center;
          margin: auto;
          font-size: 0.24rem;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
