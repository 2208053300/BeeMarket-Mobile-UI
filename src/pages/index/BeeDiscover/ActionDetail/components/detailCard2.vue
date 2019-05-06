<template>
  <div class="card2">
    <div class="action-title">
      项目简介
    </div>
    <div class="action-content">
      内容文字
    </div>
  </div>
</template>

<script>
import { BeeDefault } from '@/styles/index/variables.less'
export default {
  components: {},
  props: {
    actionDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      BeeDefault
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
.card2 {
  padding: 0.32rem;
  .action-title {
    font-size: 0.28rem;
  }
  .action-content {
    margin-top: 0.24rem;
    font-size: 0.24rem;
    color: @Grey2;
  }
}
</style>
