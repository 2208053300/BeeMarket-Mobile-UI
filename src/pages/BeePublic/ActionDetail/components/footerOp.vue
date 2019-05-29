<template>
  <div class="action-footer">
    <div class="footer-op1">
      <van-button
        round
        class="join-help"
        @click="showSuccess=true"
      >
        参与助力
      </van-button>
      <!-- <van-button round class="join-help">
      进入活动中心
    </van-button> -->
      <van-popup
        v-model="showSuccess"
        class="pop-content"
      >
        <div class="success-card">
          <div class="img-content">
            <img
              :src="beeIcon.publicwelfare_detail_pop_ups_pic_value2"
              alt=""
            >
          </div>
          <p class="success-text1">
            助力成功
          </p>
          <p class="success-text2">
            为感谢您的参与，蜂集市送您 <span class="bee-text">100</span> 公益值
          </p>
          <p class="success-text3">
            进入活动中心即可领取
          </p>
          <van-button
            round
            class="join-help2"
          >
            进入活动中心
          </van-button>
        </div>
        <div
          class="close-icon"
          @click="showSuccess=false"
        >
          <van-icon :name="beeIcon.publicwelfare_detail_pop_ups_icon_delete" />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showSuccess: false,
      beeIcon: {
        publicwelfare_detail_pop_ups_pic_value2: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_pic_value2@2x.png'),
        publicwelfare_detail_pop_ups_icon_delete: require('@/assets/icon/discover/publicwelfare_detail_pop_ups_icon_delete@2x.png')
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
.action-footer {
  .footer-op1 {
    position: fixed;
    bottom: 0;
    background-color: @Grey10;
    height: 1.28rem;
    line-height: 1.28rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-top: 0.02rem solid @Grey4;
    z-index: 100;
    .join-help {
      background-color: @BeeDefault;
      height: 0.88rem;
      width: 6.56rem;
      color: #ffffff;
      line-height: 0.88rem;
    }
  }
  .pop-content {
    border-radius: 0.2rem;
    overflow: initial;
  }
  .success-card {
    height: 7.2rem;
    width: 5.68rem;
    box-sizing: border-box;
    padding-top: 0.6rem;
    text-align: center;
    line-height: 1.15;
    .img-content {
      height: 2.12rem;
      width: 2.12rem;
      margin: auto;
    }
    .success-text1 {
      font-size: 0.36rem;
      margin: 0.52rem 0 0.24rem;
      padding: 0;
      font-weight: bold;
    }
    .success-text2 {
      font-size: 0.26rem;
      color: @Grey2;
      padding: 0;
      margin: 0;
      .bee-text {
        color: @BeeDefault;
        font-size: 0.34rem;
      }
    }
    .success-text3 {
      padding: 0;
      margin: 0;
      margin-top: 1rem;
      font-size: 0.22rem;
      color: @Grey2;
    }
    .join-help2 {
      height: 0.8rem;
      width: 4.32rem;
      line-height: 0.8rem;
      font-size: 0.32rem;
      color: #ffffff;
      background: linear-gradient(to right, #fe9907, #fec108);
      margin-top: 0.24rem;
    }
  }
  .close-icon {
    line-height: 1.15;
    position: absolute;
    font-size: 0.5rem;
    bottom: -1rem;
    left: 48%;
  }
}
</style>
