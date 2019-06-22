<template>
  <div class="header">
    <img :src="icon">
    <p class="title">
      {{ title }}
    </p>
    <p class="subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
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
p{
  margin: 0;
}
.header {
  padding-top: 0.6rem;
  img {
    width: 30px;
  }
  .title {
    font-size: 0.36rem;
    color: #333333;
    font-weight: bold;
    margin-top: 0.24rem
  }
  .subtitle {
    margin-top: 0.12rem;
    color: @BeeDefault;
    font-size: 0.14rem;
    letter-spacing: 0.05rem;
  }
}
</style>
