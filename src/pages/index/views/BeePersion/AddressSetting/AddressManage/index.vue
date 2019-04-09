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
      />
      <div class="new-address">
        <van-button
          class="new-button"
          @click="$router.push('/persion/addressSetting/addAddress')"
        >
          <van-icon name="plus" />
          新增收货地址
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/user'
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
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    getAddressList()
      .then(res => {
        this.addressList = res.data.addressData
      })
      .catch(() => {})
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../../styles/variables.less";
.container {
  .null-img {
    margin-top: 2.1rem;
    text-align: center;
    color: @Grey2;
    font-size: 0.28rem;
  }
  .new-address {
    position: fixed;
    width: 100%;
    bottom: 0.3rem;
    text-align: center;
    .new-button {
      width: 80%;
      border-radius: 0.1rem;
      font-size: 0.32rem;
      color: #ffffff;
      background-color: @BeeDefault;
      .van-icon {
        vertical-align: text-top;
      }
    }
  }
}
</style>
