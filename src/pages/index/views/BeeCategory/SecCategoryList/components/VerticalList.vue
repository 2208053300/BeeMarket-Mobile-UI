<template>
  <div class="vertical-list">
    <VerticalListItem :item="item" />
  </div>
</template>

<script>
import VerticalListItem from './VerticalListItem'
export default {
  components: {
    VerticalListItem
  },
  props: {

  },
  data() {
    return {
      item: {
        img: '',
        name: '',
        tags: [],
        nowPrice: 0,
        delPrice: 0
      }
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
.vertical-list{
  padding: 0 0.3rem;
}
</style>
