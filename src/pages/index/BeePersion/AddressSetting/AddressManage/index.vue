<template>
  <div>
    <div class="container">
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
        @change="getAddressListData"
      />
      <div class="new-address">
        <!-- <van-button
          class="new-button"
          @click="$router.push('/persion/addressSetting/addAddress')"
        >
          <van-icon name="plus" />
          新增收货地址
        </van-button> -->
        <van-button
          class="done-button"
          @click="doneAddress"
        >
          确认
        </van-button>
        <van-button
          class="add-new"
          @click="$router.push('/persion/addressSetting/addAddress')"
        >
          <van-icon name="plus" />新增收货地址
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/BeeApi/user'
import AddressList from './components/AddressList'
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
      addressList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getAddressListData()
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    async getAddressListData() {
      const res = await getAddressList()
      this.addressList = res.data
    },
    doneAddress() {
      // TODO 此处做判断，跳转回之前的页面，带上选好的地址数据
      this.$store.state.order.addrDetail = this.addressList.filter(item => {
        return item.def
      })
      this.$router.push({ name: this.$store.state.app.pushName })
    }
  }
}
</script>

<style scoped lang="less">
.container {
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
    .add-new {
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
