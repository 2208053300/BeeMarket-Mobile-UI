<template>
  <div class="replace-header" :class="{header2:replaceDetail.status===3}">
    <div
      class="header-text1 text-type1"
    >
      <span>您的好友在蜂集市上给您买了礼物当您领取并确认收货地址后，</span>
      <span class="bee-text">即可发货</span>
    </div>
    <div class="header-img">
      <img
        src=""
        alt=""
      >
    </div>
    <div class="header-name">
      <span>哈哈哈哈</span>
    </div>
    <div
      class="header-time"
    >
      剩余领取时间：<span class="bee-text">6</span>日 <span class="bee-text">22</span>小时 <span class="bee-text">59</span>分
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    getName(value) {
      value = value.toString()
      return value.substr(0, 1) + '****'
    }
  },
  props: {
    replaceDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.replace-header {
  background-color: #fff;
  text-align: center;
  margin-top: 0.2rem;
  box-sizing: border-box;
  padding: 0.4rem 0.3rem;
  .bee-text {
    color: @BeeDefault;
  }
  .header-text1 {
    font-size: 0.3rem;
    margin: 0.3rem auto 0;
    .text2 {
      display: block;
    }
  }
  .text-type1 {
    width: 5.05rem;
    height: 0.65rem;
  }
  .header-img {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0.4rem auto 0;
    background-color: @Grey1;
  }
  .header-name {
    font-size: 0.2rem;
    color: @Grey1;
    margin-top: 0.06rem;
  }
  .header-time {
    margin-top: 0.2rem;
    font-size: 0.22rem;
    color: @Grey2;
  }
}
.header2{
  height: 4.3rem;
  .text-type1{
    margin-top: 0;
  }
}
</style>
