<template>
  <div class="address-list">
    <div
      v-for="(address,index) in addressList"
      :key="address.username"
      class="address-content"
    >
      <div class="address-header">
        <div class="person-detail">
          <van-icon
            v-if="address.default"
            :name="beeIcon.mine_address_checkbox_square_s"
            class="isDefault"
          />
          <van-icon
            v-else
            :name="beeIcon.mine_address_checkbox_square_n"
            class="isDefault"
          />
          <span class="name">{{ address.username }}</span>
          <span class="phone">{{ address.phone | toTel }}</span>
          <div class="address-tag">
            {{ address.tag }}
          </div>
        </div>
        <van-icon
          :name="beeIcon.mine_address_icon_edit"
          class="edit-icon"
          @click="editAddress(index)"
        />
      </div>
      <div class="address-detail">
        <span class="address">{{ address.details }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    // NOTE 隐藏手机号
    toTel(value) {
      value = value.toString()
      return value.substr(0, 3) + '****' + value.substr(7)
    }
  },
  props: {
    addressList: {
      type: Array,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      beeIcon: {
        mine_address_icon_del: require('@/assets/icon/personalCenter/func/mine_address_icon_del@2x.png'),
        mine_address_icon_edit: require('@/assets/icon/personalCenter/func/mine_address_icon_edit@2x.png'),
        mine_address_checkbox_square_s: require('@/assets/icon/personalCenter/func/mine_address_checkbox_square_s@2x.png'),
        mine_address_checkbox_square_n: require('@/assets/icon/personalCenter/func/mine_address_checkbox_square_n@2x.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // TODO 设置默认地址
    setDefault() {},
    // TODO 编辑地址
    editAddress(index) {
      // this.$store.commit('SET_ADDRESSDATE', this.addressList[index])
      this.$router.push('/addressManage/addAddress')
    },
    // TODO 删除地址
    delAddress(index) {}
  }
}
</script>

<style scoped lang="less">
.address-list {
  margin-bottom: 2rem;
  .address-content {
    background-color: #fff;
    margin-bottom: 0.2rem;
    height: 2.2rem;
    box-sizing: border-box;
    padding: 0.4rem 0.24rem;
    overflow: hidden;
    .address-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .edit-icon{
        text-align: right;
      }
      .isDefault{
        margin-right: 0.2rem;
        vertical-align: middle;
      }
      .name{
        font-size: 0.34rem;
        margin-right: 0.42rem;
      }
      .phone{
        font-size: 0.32rem;
      }
      .address-tag {
        width: 0.64rem;
        height: 0.26rem;
        line-height: 0.26rem;
        border-radius: 0.13rem;
        font-size: 0.2rem;
        background-color: @BeeDefault;
        color: #fff;
        text-align: center;
        display: inline-block;
        margin-left: 0.3rem;
        vertical-align: middle;
      }
    }
    .address-detail{
      margin-top: 0.45rem;
      font-size: 0.26rem;
      color: @Grey1;
      overflow: hidden;
    }
  }
}
</style>
