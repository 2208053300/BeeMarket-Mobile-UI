<template>
  <div class="address-list">
    <div
      v-for="(address,index) in addressList"
      :key="address.username"
      class="address-content"
    >
      <div class="address-name">
        <span>{{ address.username }}</span>
        <span>{{ address.phone | toTel }}</span>
      </div>
      <div class="address-details">
        <div class="address-tag">
          {{ address.tag }}
        </div>
        <span>{{ address.details }}</span>
      </div>
      <div class="address-op">
        <div class="address-default">
          <div
            v-if="address.default"
            class="default1"
          >
            <van-icon name="circle" />
            <span>默认地址</span>
          </div>
          <div
            v-else
            class="default2"
            @click="setDefault(index)"
          >
            <van-icon name="circle" />
            <span>设为默认</span>
          </div>
        </div>
        <div class="address-op1">
          <van-icon
            name="edit"
            style="margin-right:0.7rem;"
            @click="editAddress(index)"
          />
          <van-icon
            name="delete"
            @click="delAddress(index)"
          />
        </div>
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
    return {}
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
      this.$store.commit('SET_ADDRESSDATE', this.addressList[index])
      this.$router.push('/persion/addressSetting/addAddress')
    },
    // TODO 删除地址
    delAddress(index) {}
  }
}
</script>

<style scoped lang="less">
@import "../../../../../styles/variables.less";
.address-list {
  margin: 0 0.2rem;
  margin-bottom: 2rem;
  .address-content {
    background-color: #fff;
    margin-top: 0.2rem;
    border-radius: 0.24rem;
    overflow: hidden;
    .address-name {
      display: flex;
      justify-content: space-between;
      font-size: 0.32rem;
      padding: 0.3rem 0.3rem 0;
    }
    .address-details {
      padding: 0.3rem;
      font-size: 0.24rem;
      color: @Grey1;
      line-height: 0.35rem;
      position: relative;
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
        margin-right: 0.15rem;
      }
      &::after {
        content: " ";
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        border-bottom: 1px solid #ebedf0;
      }
    }
    .address-op {
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      vertical-align: text-top;
      align-items: center;
      .address-default {
        font-size: 0.28rem;
        .van-icon {
          vertical-align: text-top;
          margin-right: 0.15rem;
        }
        .default1 {
          color: @BeeDefault;
        }
      }
      .address-op1 {
        font-size: 0.4rem;
      }
    }
  }
}
</style>
