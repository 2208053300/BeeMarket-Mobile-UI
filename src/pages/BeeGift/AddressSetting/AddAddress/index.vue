<template>
  <div>
    <div class="add-address">
      <van-cell-group>
        <van-field
          v-model="beeForm.username"
          label="姓名"
          placeholder="请输入收货人姓名"
        />

        <van-field
          v-model="beeForm.phone"
          type="phone"
          label="手机号码"
          placeholder="请填写收货人电话"
        />
        <van-cell
          title="所在地区"
          is-link
          value="请选择"
          @click="showArea=true"
        />
        <van-cell
          title="街道"
          is-link
          value="请选择"
        />
        <!-- TODO 添加街道选择 -->
        <van-field
          v-model="beeForm.details"
          type="textarea"
          placeholder="填写详细信息，如街道，楼盘等"
          rows="3"
          autosize
        />
        <van-cell
          title="标签"
          class="address-tag"
        >
          <div class="tags">
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='家'}"
              @click="beeForm.tag=1"
            >
              家
            </div>
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='公司'}"
              @click="beeForm.tag=2"
            >
              公司
            </div>
            <div
              class="tag"
              :class="{tagSelected: beeForm.tag==='学校'}"
              @click="beeForm.tag=3"
            >
              学校
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top:0.3rem;">
        <van-switch-cell
          v-model="beeForm.default"
          title="设为默认"
          :active-color="BeeDefault"
        />
      </van-cell-group>
      <van-popup
        v-model="showArea"
        position="bottom"
        @click-overlay="showArea=false"
      >
        <van-area
          :area-list="areaList"
          @confirm="showArea=false"
          @cancel="showArea=false"
        />
      </van-popup>
    </div>
    <div class="save-address">
      <van-button
        class="save-button"
        @click="saveAddress"
      >
        保存
      </van-button>
    </div>
  </div>
</template>

<script>
import areaList from '@/assets/area'
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  metaInfo: {
    title: '新增地址'
  },
  components: {},
  props: {},
  data() {
    return {
      beeForm: {
        username: '',
        phone: '',
        details: '',
        tag: '',
        default: false
      },
      BeeDefault,
      areaList,
      showArea: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    // NOTE 如果是编辑地址
    if (this.$store.state.user.addressData) {
      this.beeForm = this.$store.state.user.addressData
    }
  },
  beforeDestroy() {
    this.$store.state.user.addressData = {}
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    saveAddress() {
      // TODO 上传表单，并且返回上一级列表
      this.$router.go(-1)
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
