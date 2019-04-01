<template>
  <div>
    <van-nav-bar title="购物车">
      <div
        slot="right"
        class="nav-right"
      >
        <!-- <van-icon
          name="edit"
          size="20px"
          style="margin-right:21px; float:left"
        /> -->
      </div>
    </van-nav-bar>
    <div class="wrapper bg-white">
      <ul class="shop-list">
        <li class="shop-box">
          <van-row gutter="20">
            <van-col span="24" class="flex align-center margin-b-20">
              <van-checkbox v-model="checked" />
              <span> 店铺名字</span>
            </van-col>
            <van-col span="8">
              <div class="goods-item bg-gray">
                <img src="@/assets/logo.png">
                <van-checkbox v-model="checked" class="checkbox" />
              </div>
            </van-col>
          </van-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      checked: ''
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
.wrapper{padding: 0.2rem}
.goods-item{
  position: relative;
  .checkbox{
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
  }
}
</style>
