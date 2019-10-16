<template>
  <div class="rights-earn ">
    <p class="table-header">
      星级越高 收益越高
    </p>
    <div class="earn-tag">
      三大奖励 持续受益
    </div>
    <div class="earn-table">
      <div class="table-item">
        <div class="item-left">
          合伙人星级
        </div>
        <div class="item-right">
          <div class="right-top">
            <div class="star-content">
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
            </div>
            <div class="star-content">
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
            </div>
            <div class="star-content">
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
              <div class="star-img">
                <img
                  :src="beeIcon.interests_icon_star_orange"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-item">
        <div class="item-left">
          推广奖励
        </div>
        <div class="item-right">
          <div class="right-top">
            <span>2%</span>
            <span>3%</span>
            <span>4%</span>
          </div>
          <span class="right-text">直接蜂友消费总额的百分比</span>
        </div>
      </div>
      <div class="table-item">
        <div class="item-left">
          团队奖励
        </div>
        <div class="item-right">
          <div class="right-top">
            <span>1%</span>
            <span>1.5%</span>
            <span>2%</span>
          </div>
          <span class="right-text">间接蜂友消费总额的百分比</span>
        </div>
      </div>
      <div class="table-item">
        <div class="item-left">
          推荐奖励
        </div>
        <div class="item-right">
          <span>推荐商家入驻 持续分享商家营业额的</span>
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
        interests_icon_star_orange: require('@/assets/icon/beeFriends/rights/interests_icon_star_orange.png')
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
.rights-earn {
  background-color: #fff;
  text-align: center;
  padding: 0.4rem 0.32rem;
  .table-header {
    font-size: 0.32rem;
    font-weight: bold;
  }
  .earn-tag {
    font-size: 0.24rem;
    color: @BeeDefault;
    width: 2.32rem;
    height: 0.36rem;
    border-radius: 0.18rem;
    line-height: 0.36rem;
    box-sizing: border-box;
    border: 0.02rem solid @BeeDefault;
    margin: 0.2rem auto 0;
  }
  .earn-table {
    .table-item {
      padding: 0.16rem 0;
      height: 0.88rem;
      box-sizing: border-box;
      border-bottom: 0.02rem solid @BeeDefault;
      display: flex;
      align-items: center;
      &:last-of-type{
        border: none;
      }
      .item-left {
        width: 1.6rem;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .item-right {
        flex: 1;
        font-size: 0.24rem;
        .right-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-items: center;
          font-size: 0.28rem;
          .star-content {
            .star-img {
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.08rem;
              display: inline-block;
            }
          }
        }
        .right-text {
          font-size: 0.22rem;
          color: @Grey1;
        }
      }
    }
  }
}
</style>
