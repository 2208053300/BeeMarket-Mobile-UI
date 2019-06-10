<template>
  <div class="fill-log-info">
    <van-cell-group>
      <van-field
        v-model="express_no"
        clearable
        label="快递单号"
        placeholder="请输入您的快递单号"
      />
      <van-field
        v-model="express_name"
        clearable
        input-align="right"
        right-icon="arrow"
        label="快递公司"
        placeholder="请选择"
        @click="showModal = true"
      />
    </van-cell-group>
    <!-- 提交按钮 -->
    <div class="text-center">
      <van-button class="submit-btn" round size="large" @click="submit">
        提交
      </van-button>
    </div>
    <!-- 物流公司选择modal -->
    <van-popup v-model="showModal" position="bottom" :overlay="true">
      <van-picker
        :columns="logComList"

        title="物流公司"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { fillLogisticsInfo, getExpressData } from '@/api/BeeApi/user'
export default {
  components: {},
  props: {},
  data() {
    return {
      aid: this.$route.query.aid,
      // 选择的物流公司id
      express_id: '',
      // 选择的物流公司名称
      express_name: '',
      // 物流单号
      express_no: '',
      logComList: [
        {
          express_id: 1000,
          express_name: '用户自提'
        }
      ],
      showModal: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
    this.getLogComList()
  },
  methods: {
    // 获取物流公司信息
    async getLogComList() {
      const res = await getExpressData()
      console.log('物流公司：', res)
      this.logComList = res.data.map(item => {
        return {
          express_id: item.express_id,
          text: item.express_name
        }
      })
    },
    // 提交信息
    async submit() {
      if (!this.express_id && !this.express_no) {
        this.$toast.fail('物流单号、物流公司必填')
        return
      }
      const res = await fillLogisticsInfo({
        aid: this.aid,
        express_id: this.express_id,
        express_no: this.express_no
      })
      if (res.code === 1 && res.status_code === 200) {
        this.$toast.success(res.message)
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      }
    },
    // 选择物流公司
    onChange(picker, value, index) {
      this.express_id = value.express_id
      this.express_name = value.text
    },
    onConfirm(picker, value, index) {
      this.showModal = false
    },
    onCancel(picker, value, index) {
      this.showModal = false
    }
  },
  meteInfo() {
    return {
      title: '填写物流信息'
    }
  }
}
</script>

<style scoped lang="less">
.fill-log-info {
  margin-top: 0.2rem;
  .submit-btn {
    background: @BeeDefault3;
    color: #fff;
    width: 70%;
    margin: 0.3rem auto;
  }
}
</style>
