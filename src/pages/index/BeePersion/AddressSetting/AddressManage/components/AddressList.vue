<template>
  <div class="address-list">
    <div
      v-for="(address,index) in addressList"
      :key="index"
      class="address-content"
      @click="selectAddr(address)"
    >
      <div class="address-name">
        <span>{{ address.name }}</span>
        <span>{{ address.mobileNum | toTel }}</span>
      </div>
      <div class="address-details">
        <div
          v-if="address.tag!==null"
          class="address-tag"
        >
          {{ tags[address.tag] }}
        </div>
        <span>{{ address.address }}</span>
      </div>
      <div class="address-op">
        <div class="address-default">
          <div
            v-if="address.def"
            class="default1"
          >
            <van-icon :name="beeIcon.mine_address_checkbox_square_s" />
            <span>默认地址</span>
          </div>
          <div
            v-else
            class="default2"
            @click.stop="setDefault(address.addr_id)"
          >
            <van-icon :name="beeIcon.mine_address_checkbox_square_n" />
            <span>设为默认</span>
          </div>
        </div>
        <div class="address-op1">
          <van-icon
            :name="beeIcon.mine_address_icon_edit"
            style="margin-right:0.7rem;"
            @click.stop="editAddress(address.addr_id)"
          />
          <van-icon
            :name="beeIcon.mine_address_icon_del"
            @click.stop="delAddress(address.addr_id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { delAddress, defaultAddress } from '@/api/BeeApi/user'
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
      },
      tags: {
        school: '学校',
        work: '公司',
        home: '家'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.$route.query.mode)
  },
  methods: {
    // 设置默认地址
    async setDefault(addr_id) {
      try {
        const res = await defaultAddress({ addr_id })
        this.$toast({
          message: res.message,
          duration: 1000,
          onClose: () => {
            this.$emit('change')
          }
        })
      } catch (e) {
        this.$toast.fail(e)
      }
    },
    // 编辑地址
    editAddress(id) {
      this.$router.push({
        path: '/persion/addressSetting/addAddress',
        query: {
          addr_id: id
        }
      })
    },
    // 删除地址
    async delAddress(id) {
      try {
        const res = await delAddress({ addr_id: id })
        this.$toast({
          message: res.message,
          duration: 1000,
          onClose: () => {
            this.$emit('change')
          }
        })
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    // 选择地址
    selectAddr(addr) {
      if (this.$route.query.mode === 'select') {
        this.$store.state.order.addrDetail = addr
        this.$router.push({
          name: this.$store.state.app.pushName,
          query: this.$store.state.app.pushQuery
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.address-list {
  margin: 0 0.2rem;
  margin-bottom: 1.5rem;
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
        padding: 0.05rem;
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
