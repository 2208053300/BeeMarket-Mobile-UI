<template>
  <div>
    <div class="container">
      <van-notice-bar
        :color="Grey1"
        left-icon="volume-o"
        text="这是您赠送好友的订单，不能自己领取"
        mode="closeable"
        background="#ececec"
      />
      <div
        v-if="addressList.length===0"
        class="null-img"
      >
        <img
          src=""
          alt=""
        >
        <span>还没有收货地址呢</span>
      </div>
      <address-list
        v-else
        :address-list="addressList"
      />
      <div class="new-address">
        <van-button
          class="done-button"
          @click="$router.push('/GetResult/GetSuccess')"
        >
          确认
        </van-button>
        <van-button class="add-new">
          <van-icon name="plus" />新增收货地址
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/user'
import AddressList from './components/AddressList'
import { Grey1 } from '@/styles/index/variables.less'
export default {
  metaInfo: {
    title: '地址管理'
  },
  components: {
    AddressList
  },
  props: {},
  data() {
    return {
      Grey1,
      addressList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getAddressList()
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    async getAddressList() {
      const res = await getAddressList()
      this.addressList = res.data.addressData
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding-top: 46px;
  margin-bottom: 2rem;
  .null-img {
    margin-top: 2.1rem;
    text-align: center;
    color: @Grey2;
    font-size: 0.28rem;
  }
  .new-address {
    width: 100%;
    text-align: center;
    margin-top: 2.4rem;
    .done-button {
      width: 5.86rem;
      height: 0.9rem;
      line-height: 0.9rem;
      border-radius: 0.1rem;
      font-size: 0.32rem;
      color: #ffffff;
      background-color: @BeeDefault;

    }
    .add-new{

      background-color: transparent;
      color: @BeeDefault;
      font-size: 0.3rem;
      border: none;
      .van-icon {
        vertical-align: text-top;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
