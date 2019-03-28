<template>
  <div>
    <!-- 公益项目 -->
    <van-row gutter="20">
      <van-col span="12" class="pb-item">
        公益项目1
      </van-col>
      <van-col span="12" class="pb-item">
        公益项目2
      </van-col>
      <van-col span="24" class="margin-t-20 text-center">
        <van-button type="primary" size="small">
          更多项目，等您助力>
        </van-button>
      </van-col>
    </van-row>
    <!-- 公益地图 -->
    <van-row class="margin-t-b-20">
      <van-col span="24" class="margin-b-20">
        <img src="http://temp.im/640x260" alt="">
      </van-col>
      <van-col span="12" class="text-center">
        公益商品：120个>
      </van-col>
      <van-col span="12" class="text-center">
        公益项目：120个>
      </van-col>
    </van-row>
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

<style scoped lang="less">
.pb-item{border: 1px solid #ddd; text-align: center; height: 2rem;line-height: 2rem}
</style>
