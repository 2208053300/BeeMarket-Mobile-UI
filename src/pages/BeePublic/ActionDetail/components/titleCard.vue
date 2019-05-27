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
          标题标题标题标题标题
        </div>
        <div class="subhead1">
          副标题标题标题标题标题
        </div>
        <div class="address-content">
          <van-icon :name="beeIcon.confirmorder_icon_address_gray" />
          青海 玉树州
        </div>
      </div>
    </div>
    <div class="people-content">
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
            <span class="bee-text">5000</span>人
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
            <span class="bee-text">5000</span>人
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
      margin-top: 0.2rem;
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
        .person-num{
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
}
</style>
