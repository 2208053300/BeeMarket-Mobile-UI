<template>
  <div
    class="item flex flex-column"
    @click="goDetail(item.pid,item.target)"
  >
    <div class="img">
      <img :src="item.tUrl">
    </div>
    <div class="info flex flex-column">
      <p class="name no-wrap">
        {{ item.pname }}
      </p>
      <p class="desc no-wrap">
        {{ item.product_desc }}
      </p>
      <div class="price-op flex flex-between align-center">
        <div class="price">
          ￥
          <span style="font-size: 0.4rem">{{ item.sell_price }}</span>
        </div>
        <!-- 加减按钮 -->
        <div v-if="item.selected_qty" class="p-add-remove">
          <img :src="beeIcon.minus" @click.stop="minus">
          <span>{{ item.selected_qty }}</span>
          <img :src="beeIcon.plus" @click.stop="plus">
        </div>
        <!-- 加入礼包按钮 -->
        <div
          v-else
          class="add-to-pack-btn"
          @click.stop="addToPack"
        >
          <van-icon name="plus" />
          加入礼包
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
    return {
      beeIcon: {
        minus: require('@/assets/icon/giftPackage/farm_icon_minus_small@2x.png'),
        plus: require('@/assets/icon/giftPackage/farm_details_icon_plus_big@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goDetail(pid, target) {
      this.$router.push({
        path: '/detail',
        query: { pid: pid, target: target }
      })
      this.$store.state.order.target = target
    },
    async addToPack() {
      // 添加商品
    },
    async minus() {},
    async plus() {}
  }
}
</script>

<style scoped lang="less">
.item {
  text-align: left;
  width: 3.4rem;
  border-radius: 0.16rem;
  margin-right: 0.14rem;
  margin-bottom: 0.14rem;
  background-color: white;
  p {
    margin: 0;
  }
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  .img {
    width: 3.4rem;
    height: 3.4rem;
    background: #f4f4f4;
    img {
      border-top-left-radius: 0.16rem;
      border-top-right-radius: 0.16rem;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    padding: 0.16rem 0.2rem 0.3rem 0.2rem;
    flex: 1;
    .name {
      font-size: 0.28rem;
      color: @ProductName;
    }
    .desc {
      font-size: 0.22rem;
      color: @Grey1;
      margin-top: 0.16rem;
    }
    .price-op {
      margin-top: 0.36rem;
      .price {
        font-size: 0.24rem;
        color: @BeeDefault3;
      }
      .p-add-remove {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        color: @Grey12;
        span {
          margin: 0 0.2rem;
        }
        img {
          width: 0.4rem;
        }
      }
      .add-to-pack-btn {
        display: flex;
        align-items: center;
        color: white;
        background: @BeeDefault;
        height: 0.4rem;
        border-radius: 1rem;
        font-size: 0.2rem;
        padding: 0 0.2rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
