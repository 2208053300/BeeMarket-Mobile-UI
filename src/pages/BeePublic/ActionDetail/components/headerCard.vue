<template>
  <div class="header-card">
    <div class="action-img">
      <img
        src=""
        alt=""
      >
    </div>
    <div class="header-text1">
      <span class="text1">只要人人献出一点爱，世界将变成美好的人间</span>
    </div>
    <div class="header-img">
      <img src="" alt="">
    </div>
    <span class="user-name">
      @呵呵呵呵
    </span>
    <p class="header-text2">
      “来和我一起<span class="bee-text">为公益助力</span>吧！”
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
.header-card {
  border-radius: 0.08rem;
  background-color: @Yellow3;
  padding: 0.2rem 0.2rem 0.4rem;
  text-align: center;
  box-shadow: 0 0 0.2rem @Grey6;
  .action-img {
    height: 2.8rem;
    background-color: @Grey2;
    border-radius: 0.08rem;
  }
  .header-text1 {
    margin-top: 0.44rem;
    font-size: 0.3rem;
    text-align: center;
    .text1 {
      background-image: -webkit-linear-gradient(top, #e62330, #ffae00);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .header-img{
    margin: 0.48rem auto 0.16rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: @Grey2;
  }
  .user-name{
    font-size: 0.3rem;
  }
  .header-text2{
    font-size: 0.3rem;
    margin: 0;
    padding: 0;
    margin-top: 0.2rem;
    .bee-text{
      color: @BeeDefault;
    }
  }
}
</style>
