<template>
  <div>
    <div class="title">
      <p class="tip">
        参与成功，等待开奖
      </p>
      <div class="shared-man">
        <img :src="icon.avatar" class="share-avatar">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '免费送礼'
  },
  components: {},
  props: {},
  data() {
    return {
      icon: {
        avatar: require('@/assets/icon/freeGift/freegift_wechat_popup.png')
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>
