<template>
  <div>
    <div class="item flex flex-column">
      <div class="img">
        <img :src="item.img">
      </div>
      <div class="info flex flex-column flex-between">
        <p class="name no-wrap">
          {{ item.name }}
        </p>
        <div class="tags-price">
          <div class="tags">
            <van-button
              v-for="(tag, index) in item.tags"
              :key="index"
              round
              size="mini"
            >
              {{ tag }}
            </van-button>
            <!-- <van-button round size="mini">
              活动
            </van-button>
            <van-button round size="mini">
              自己添加
            </van-button> -->
          </div>
          <div class="price flex flex-between align-center">
            <span
              class="now-price"
            >￥<span>{{ item.nowPrice }}</span></span>
            <span
              class="del-price"
            >￥<span>{{ item.delPrice }}</span></span>
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
  methods: {}
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
