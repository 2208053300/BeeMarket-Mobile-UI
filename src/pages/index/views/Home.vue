<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
      <img alt="Vue logo" src="@/assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>
