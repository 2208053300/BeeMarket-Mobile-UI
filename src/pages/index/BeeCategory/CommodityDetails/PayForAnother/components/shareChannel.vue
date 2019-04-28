<template>
  <div class="share-channel">
    <div class="gift-way">
      <span class="way-title">请点击发送申请</span>
      <div class="way-gird">
        <div class="way-content">
          <div class="way-img">
            <img
              src=""
              alt=""
            >
          </div>
          <span class="way-text">微信</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.share-channel {
  .gift-way {
    padding: 0.4rem 0.2rem;
    margin: 0.16rem;
    border-radius: 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    .way-gird {
      margin: 0.4rem 0.2rem 0 0.2rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      .way-content {
        text-align: center;
        .way-img {
          margin-bottom: 0.2rem;
        }
        .way-text {
          font-size: 0.28rem;
        }
      }
    }
  }
}
</style>
