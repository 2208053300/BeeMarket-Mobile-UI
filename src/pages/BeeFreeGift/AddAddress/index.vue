<template>
  <div>
    <div class="add-address">
      <van-cell-group>
        <van-field
          v-model="beeForm.name"
          label="姓名"
          placeholder="请输入收货人姓名"
        />

        <van-field
          v-model="beeForm.mobileNum"
          type="phone"
          label="手机号码"
          placeholder="请填写收货人电话"
        />
        <van-cell
          title="所在地区"
          is-link
          :value="areaStr"
          @click="showArea=true"
        />
        <van-field
          v-model="beeForm.detailed"
          type="textarea"
          placeholder="填写详细信息，如街道，楼盘等"
          rows="3"
          autosize
        />
        <!-- <van-cell
          title="标签"
          class="address-tag"
        >
          <div class="tags">
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='home'}"
              @click="beeForm.tag='home'"
            >
              家
            </div>
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='work'}"
              @click="beeForm.tag='work'"
            >
              公司
            </div>
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='school'}"
              @click="beeForm.tag='school'"
            >
              学校
            </div>
          </div>
        </van-cell> -->
      </van-cell-group>

      <van-popup
        v-model="showArea"
        position="bottom"
        @click-overlay="showArea=false"
        @closed="$refs.beeArea.handleClose()"
      >
        <bee-area ref="beeArea" @select-end="areaSelected" />
      </van-popup>
    </div>
    <div class="save-address">
      <van-button
        v-if="this.$route.query.addr_id"
        class="save-button"
        @click="editAddress"
      >
        领取礼物
      </van-button>
      <van-button
        v-else
        class="save-button"
        @click="saveAddress"
      >
        领取礼物
      </van-button>
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
import BeeArea from '@/components/BeeArea'
import { getAddressDetail, addAddress, updateAddress } from '@/api/BeeApi/user'
export default {
  metaInfo() {
    if (this.$route.query.addr_id) {
      return { title: '编辑地址' }
    } else {
      return { title: '新增地址' }
    }
  },
  components: { BeeArea },
  props: {},
  data() {
    return {
      beeForm: {
        tag: 'home',
        last_id: ''
      },
      BeeDefault,
      showArea: false,
      area: [] // 已选择的区域
    }
  },
  computed: {
    areaStr() {
      if (this.beeForm.base_addr) {
        return this.beeForm.base_addr
      }
      if (this.area.length === 0) {
        return '请选择'
      } else {
        return this.area.map(item => item.name).join(' ')
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // NOTE 如果是编辑地址
    if (this.$route.query.addr_id) {
      this.getAddressDetailData()
    }
  },
  beforeDestroy() {
    this.$store.state.user.addressData = {}
  },
  methods: {
    async getAddressDetailData() {
      try {
        const res = await getAddressDetail({ addr_id: this.$route.query.addr_id })
        this.beeForm = res.data
      } catch (e) {
        this.$toast.fail(e)
      }
    },
    async saveAddress() {
      // TODO 上传表单，并且返回上一级列表
      try {
        const res = await addAddress(this.beeForm)
        if (res.status_code === 200) {
          this.$router.go(-1)
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    async editAddress() {
      this.beeForm.addr_id = this.$route.query.addr_id
      try {
        const res = await updateAddress(this.beeForm)
        if (res.status_code === 200) {
          this.$router.go(-1)
        }
      } catch (error) {
        this.$toast.fail(error)
      }
    },
    areaSelected(selected) {
      this.showArea = false
      this.area = selected
      this.beeForm.last_id = selected[selected.length - 1].id
    }
  }
}
</script>

<style lang="less">
.add-address {
  .van-cell {
    min-height: 0.86rem;
    .van-cell__title {
      font-size: 0.28rem;
      color: @ProductName;
    }
    .van-field__control::placeholder {
      font-size: 0.28rem;
      color: @Grey1;
    }
  }
  .address-tag {
    .van-cell__title {
      flex: 0.2;
    }
    .tags {
      text-align: left;
      .tag {
        width: 1.15rem;
        height: 0.48rem;
        line-height: 0.48rem;
        display: inline-block;
        font-size: 0.26rem;
        text-align: center;
        color: @ProductName;
        margin: 0 0.15rem;
        background-color: #fff;
        border: 0.01rem solid @Grey1;
        border-radius: 0.24rem;
      }
      .tagSelected {
        border-color: @BeeDefault;
        background-color: @BeeDefault;
        color: #ffffff;
      }
    }
  }
}
.save-address {
  position: fixed;
  width: 100%;
  bottom: 0.3rem;
  text-align: center;
  .save-button {
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
</style>
