<template>
  <div>
    <van-cell-group class="margin-t-20">
      <van-field
        v-model="username"
        clearable
        label="联系方式"
        placeholder="请填写联系方式（手机号码）"
      />
    </van-cell-group>
    <van-cell-group class="margin-t-20">
      <van-field
        v-model="message"
        label="问题描述"
        type="textarea"
        placeholder="对我们的网站有什么建议吗？"
        rows="3"
        autosize
      />
    </van-cell-group>
    <van-cell-group class="margin-t-20 upload-img">
      <div class="van-cell van-field ">
        <div class="img-label">
          <span> 上传图片（最多六张）</span>
        </div>
      </div>
      <van-uploader name="uploader" :after-read="onRead" accept="image/gif, image/jpeg" multiple class="uploader-img">
        <van-icon name="photograph" />
      </van-uploader>
    </van-cell-group>

    <van-button
      type="primary"
      block
      class="margin-t-20 subimit-btn"
    >
      提交反馈
    </van-button>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '功能反馈'
  },
  components: {},
  props: {},
  data() {
    return {
      username: '',
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 读取图片完成后的回调函数
    onRead(file, detail) {
      console.log(file, detail)
    }
  }
}
</script>

<style  lang="less">
.upload-img .img-label {
  width: 200px;
  font-size: 14px;
}
.uploader-img {
  margin: 20px 15px;
}
.subimit-btn {
  background: @BeeDefault;
  border-color: @BeeDefault;
}
</style>
