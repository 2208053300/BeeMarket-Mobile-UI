<template>
  <div>
    <div
      class="item flex flex-column"
      @click="goDetail(item.pid,item.target)"
    >
      <div class="img">
        <img :src="item.tUrl">
      </div>
      <div class="info flex flex-column flex-between">
        <p class="name no-wrap">
          {{ item.pname }}
        </p>
        <div class="tags-price">
          <div class="tags">
            <template v-if="item.area">
              <div class="from-area">
                商品来自：{{ item.area }}
              </div>
              <van-button
                v-if="item.is_hot"
                round
                size="mini"
              >
                热销
              </van-button>
              <!-- <van-button
                v-else
                round
                size="mini"
              >
                {{ item.tags[0] }}
              </van-button> -->
            </template>
            <template>
              <van-button
                v-if="item.is_hot"
                round
                size="mini"
              >
                热销
              </van-button>
              <van-button
                v-for="(tag, index) in item.tags"
                :key="index"
                round
                size="mini"
              >
                {{ tag }}
              </van-button>
            </template>
            <!-- <van-button round size="mini">
              活动
            </van-button>
            <van-button round size="mini">
              自己添加
            </van-button> -->
          </div>
          <div class="price flex flex-between align-center">
            <span class="now-price">￥<span>{{ item.sell_price }}</span></span>
            <span class="del-price">￥<span>{{ item.line_price }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goDetail(pid, target) {
      this.$router.push({
        path: '/category/details',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    }
  }
}
</script>

<style scoped lang="less">
.item {
  width: 3.3rem;
  height: 5rem;
  border: 1px solid #ddd;
  border-radius: 0.1rem;
  margin-right: 0.1rem;
  margin-bottom: 0.2rem;

  &:nth-of-type(2n) {
    margin-right: 0;
  }
}
.img {
  width: 3.3rem;
  height: 3.3rem;
  background: #f4f4f4;
  border-radius: 0.1rem;

  img {
    width: 100%;
    height: 100%;
  }
}
.info {
  padding: 0.1rem 0.2rem;
  flex: 1;
}
.name {
  font-size: 0.28rem;
  color: #666;
  margin: 0;
}
.tags {
  margin-bottom: 0.2rem;
  .from-area {
    padding: 0.04rem 0.08rem;
    box-sizing: border-box;
    font-size: 0.2rem;
    text-align: center;
    color: @Red1;
    border: 0.02rem solid @Red1;
    margin-right: 0.12rem;
    border-radius: 0.04rem;
    display: inline-block;
  }
}
.van-button {
  border-color: @BeeDefault;
  color: @BeeDefault;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.2rem;
  margin-left: 0.05rem;
  width: auto;

  padding: 0 0.1rem;
  &:first-of-type {
    color: #fff;
    border: 0;
    // background: url(@/assets/category/list_pic_label.png)
    //   no-repeat;
    background-size: 100% 100%;
  }
}
.now-price {
  color: @BeeDefault;
  font-size: 0.24rem;
  span {
    font-size: 0.34rem;
  }
}
.del-price {
  text-decoration: line-through;
  font-size: 0.2rem;
  color: #999;
}
</style>
