<template>
  <div class="com-detail3">
    <div class="chart-header">
      <div class="header-left">
        <div class="part1">
          <div class="color1" />
          我的
        </div>
        <div class="part1">
          <div class="color2" />
          平均值
        </div>
      </div>
      <span>*以蜂友圈蜂友公益值总数计算平均值</span>
    </div>
    <div class="chart-content">
      <div class="chart-part">
        <div class="pro-content">
          <div
            class="pro1"
            :style="{height:comVal.novice_data.mine_novice+'%'}"
          />
        </div>
        <div class="pro-content">
          <div
            class="pro2"
            :style="{height:comVal.novice_data.novice_avg+'%'}"
          />
        </div>
        <div class="text-content">
          <div class="help-text1">
            <van-icon :name="beeIcon.mine_public_icon_boost" />
            新手专享
          </div>
          <span class="beyond">{{ comVal.novice_data.novice_proportion|getAbsolute }}</span>
        </div>
      </div>
      <div class="chart-part">
        <div class="pro-content">
          <div
            class="pro1"
            :style="{height:comVal.initiate_data.mine_initiate+'%'}"
          />
        </div>
        <div class="pro-content">
          <div
            class="pro2"
            :style="{height:comVal.initiate_data.initiate_avg+'%'}"
          />
        </div>
        <div class="text-content">
          <div class="help-text1">
            <van-icon :name="beeIcon.mine_public_icon_initiate" />
            发起助力
          </div>
          <span class="beyond">{{ comVal.initiate_data.initiate_proportion|getAbsolute }}</span>
        </div>
      </div>
      <div class="chart-part">
        <div class="pro-content">
          <div
            class="pro1"
            :style="{height:comVal.buy_data.mine_buy+'%'}"
          />
        </div>
        <div class="pro-content">
          <div
            class="pro2"
            :style="{height:comVal.buy_data.buy_avg+'%'}"
          />
        </div>
        <div class="text-content">
          <div class="help-text1">
            <van-icon :name="beeIcon.mine_public_icon_shop" />
            购买宝贝
          </div>
          <span class="beyond">{{ comVal.buy_data.buy_proportion|getAbsolute }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    // 获取百分值
    getAbsolute(value) {
      value = value || 0
      if (value >= 0) {
        return '高于均值' + Math.abs(value) + '%'
      } else {
        return '低于均值' + Math.abs(value) + '%'
      }
    }
  },
  props: {
    comVal: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      beeIcon: {
        mine_public_icon_boost: require('@/assets/icon/common/commonweal/mine_public_icon_boost.png'),
        mine_public_icon_initiate: require('@/assets/icon/common/commonweal/mine_public_icon_initiate.png'),
        mine_public_icon_shop: require('@/assets/icon/common/commonweal/mine_public_icon_shop.png')
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
.com-detail3 {
  margin-top: 0.2rem;
  height: 3.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.16rem;
  padding: 0.28rem 0.18rem 0.28rem 0.4rem;
  box-sizing: border-box;
  .chart-header {
    font-size: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .part1 {
      display: inline-block;
      &:first-child {
        margin-right: 0.25rem;
      }
      .color1 {
        height: 0.16rem;
        width: 0.16rem;
        background-color: #fff;
        display: inline-block;
      }
      .color2 {
        height: 0.16rem;
        width: 0.16rem;
        background-color: rgba(255, 255, 255, 0.5);
        display: inline-block;
      }
    }
  }
  .chart-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 1.9rem;
    margin-top: 0.2rem;
    .chart-part {
      text-align: center;
      .pro-content {
        height: 1.2rem;
        width: 0.16rem;
        display: inline-block;
        margin: 0 0.05rem;
        position: relative;
        .pro1 {
          background-color: #fff;
          position: absolute;
          width: 0.16rem;
          max-height: 1.2rem;
          left: 0;
          bottom: 0;
        }
        .pro2 {
          background-color: rgba(255, 255, 255, 0.5);
          position: absolute;
          width: 0.16rem;
          max-height: 1.2rem;
          left: 0;
          bottom: 0;
        }
      }
    }
    .text-content {
      margin-top: 0.2rem;
      .help-text1 {
        margin-bottom: 0.05rem;
        .van-icon {
          vertical-align: middle;
          margin-right: 0.08rem;
        }
      }
      .beyond {
        font-size: 0.22rem;
      }
    }
  }
}
</style>
