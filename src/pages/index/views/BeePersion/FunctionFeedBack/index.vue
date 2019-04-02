<template>
  <div>
    <van-nav-bar title="功能反馈">
      <div
        slot="left"
        class="nav-right"
      >
        <div>
          <van-icon
            name="arrow-left"
            size="20px"
          />
        </div>
      </div>
    </van-nav-bar>

    <van-cell-group class="margin-t-20">
      <van-field
        v-model="username"
        required
        clearable
        label="联系方式"
        right-icon="question-o"
        placeholder="请填写联系方式（手机号码）"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="message"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
        rows="1"
        autosize
      />
    </van-cell-group>
    <van-button type="primary" block class="margin-t-20">
      提交反馈
    </van-button>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      username: '',
      message: ''
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
