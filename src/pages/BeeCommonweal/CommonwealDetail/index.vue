<template>
  <div class="com-detail">
    <div class="detail-card">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <div class="desc">
              购买宝贝获得公益值
            </div>
            <div class="time">
              2017-12-17 18:03
            </div>
          </template>
          <div class="comVal">
            +100
          </div>
        </van-cell>
        <van-cell>
          <template slot="title">
            <div class="desc">
              购买宝贝抵扣公益值
            </div>
            <div class="time">
              2017-12-17 18:03
            </div>
          </template>
          <div class="comVal">
            -100
          </div>
        </van-cell>
      </van-cell-group>
    </div>
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
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {}
}
</script>

<style scoped lang="less">
.com-detail {
  .detail-card {
    .van-cell {
      background-color: transparent;
      .desc {
        font-size: 0.32rem;
      }
      .time {
        font-size: 0.28rem;
        color: @Grey1;
      }
      .van-cell__value {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .comVal {
        font-size: 0.36rem;
        color: @ProductName;
      }
    }
  }
}
</style>
