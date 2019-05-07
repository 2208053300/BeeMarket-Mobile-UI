<template>
  <div>
    <ul class="farm-list margin-t-20">
      <li v-for="(item, index) in list" :key="index" class="item">
        <FarmListItem :src="item.img" :name="item.name" :price="item.price" />
      </li>
    </ul>
  </div>
</template>

<script>
import FarmListItem from './FarmListItem'
export default {
  components: {
    FarmListItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
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
.farm-list{width: 100%; overflow-x: scroll; display: -webkit-box;
  .item{width: 33%; padding: 0 10px;}
}
</style>
