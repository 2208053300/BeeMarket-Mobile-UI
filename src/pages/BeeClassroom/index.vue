<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '集市课堂'
  },
  components: {},
  mounted() {
    this.$store.state.app.beeHeader = true
  }
}
</script>
