<template>
  <div class="title-card">
    <div class="title-content">
      <div class="img-content">
        <img
          :src="beeIcon.publicwelfare_share_icon_activity"
          alt=""
        >
      </div>
      <div class="title-content2">
        <div class="title1">
          {{ actionData.main_title }}
        </div>
        <div class="subhead1">
          {{ actionData.subtitle }}
        </div>
        <!-- <div class="address-content">
          <van-icon :name="beeIcon.confirmorder_icon_address_gray" />
          青海 玉树州
        </div> -->
      </div>
    </div>
    <div
      v-if="actionData.is_schedule"
      class="people-content"
    >
      <div class="card-part">
        <div class="img-content">
          <img
            :src="beeIcon.publicwelfare_icon_participate"
            alt=""
          >
        </div>
        <div class="text-content">
          <span>已参与助力</span>
          <p class="person-num">
            <span class="bee-text">{{ actionData.participate_num }}</span>人
          </p>
        </div>
      </div>
      <div class="card-part">
        <div class="img-content">
          <img
            :src="beeIcon.publicwelfare_icon_aim"
            alt=""
          >
        </div>
        <div class="text-content">
          <span>目标参与需</span>
          <p class="person-num">
            <span class="bee-text">{{ actionData.initiate_people_num }}</span>人
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="join-num"
    >
      <div class="help-icon">
        <img
          :src="beeIcon.publicwelfare_icon_participate"
          class="icon"
        >
      </div>
      <div class="help-text">
        已参与助力
        <div class="help-time">
          <span class="bee-text">
            {{ actionData.participate_num }}
          </span>人
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    actionData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      beeIcon: {
        publicwelfare_share_icon_activity: require('@/assets/icon/discover/publicwelfare_share_icon_activity@2x.png'),
        confirmorder_icon_address_gray: require('@/assets/icon/discover/confirmorder_icon_address_gray@2x.png'),
        publicwelfare_icon_participate: require('@/assets/icon/discover/publicwelfare_icon_participate@2x.png'),
        publicwelfare_icon_aim: require('@/assets/icon/discover/publicwelfare_icon_aim@2x.png')
      }
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
.title-card {
  background-color: #fff;
  border-radius: 0.08rem;
  box-shadow: 0 0 0.2rem @Grey6;
  padding: 0.2rem;
  .title-content {
    display: flex;
    .img-content {
      height: 0.92rem;
      width: 0.92rem;
    }
    .title-content2 {
      .title1 {
        font-size: 0.32rem;
      }
      .subhead1 {
        font-size: 0.26rem;
        color: @Grey2;
        margin-top: 0.16rem;
      }
      .address-content {
        font-size: 0.22rem;
        color: @Grey2;
        margin-top: 0.28rem;
        .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
  .people-content {
    margin-top: 0.4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.8rem;
    text-align: center;
    padding-bottom: 0.2rem;
    .card-part {
      display: flex;
      padding-left: 0.6rem;
      align-items: center;
      &:first-child {
        border-right: 0.01rem solid @Grey4;
      }
      .img-content {
        height: 0.8rem;
        width: 0.8rem;
      }
      .text-content {
        font-size: 0.26rem;
        .person-num {
          padding: 0;
          margin: 0;
          margin-top: 0.08rem;
          .bee-text {
            color: @BeeDefault;
          }
        }
      }
    }
  }
  .join-num {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.32rem;
    margin-right: 0.3rem;
    align-items: center;
    .help-icon {
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.08rem;
    }
    .help-text {
      font-size: 0.22rem;
      .help-time {
        display: inline-block;
        .bee-text {
          color: @BeeDefault;
        }
      }
    }
  }
}
</style>
