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
  mounted() {
    if (this.$store) {
      this.$store.state.app.beeHeader = true
      this.$store.state.app.beeFooter.show = false
    }
  }
}
</script>
