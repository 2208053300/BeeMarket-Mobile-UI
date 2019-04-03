<template>
  <div class="bg-white text-center bottom-btn">
    <van-button class="contact-btn">
      联系客服
    </van-button>
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

<style scoped  lang="less">
@import url(../../../../styles/variables.less);

.bottom-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0;
  border-top: 1px solid #ddd;
}
.contact-btn{
  background-color:@BeeDefault;
  border-color: @BeeDefault;
  font-size: 0.3rem;
  color: #fff;
  width: 80%;
}
</style>
