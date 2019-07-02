<template>
  <div class="help bg-gray">
    <!--  -->
    <div class="content bg-white">
      <p>
        秉持“轻创业，大财富，零风险”的合作理念，蜂集市诚邀您作为集市的公益合伙人，在成为合伙人之前，请您仔细阅读下文，了解公益合伙人入伙、退伙条件，权利、福利及相应义务：
      </p>
      <h5>
        一、合伙人条件
      </h5>
      <p>
        1、认同共创共享普惠公益的集市理念。
      </p>
      <p>
        2、系蜂集市有效注册用户且在蜂集市有过购物记录。
      </p>
      <h5>
        二、合伙人权益
      </h5>
      <h6>
        1、推荐奖励政策
      </h6>
      <p>
        您推荐厂商入驻蜂集市，经平台审核通过后，该厂商以后的所有订单结算，蜂集市都将给予您（推荐合伙人）提成奖励，发放至您的蜂友圈账户之中。
      </p>
      <p>
        推荐合伙人以厂商在APP“申请入驻”时填写的“推荐人”信息为准，信息错误或与系统信息不吻合，视为无推荐人，一次判定不支持申诉。
      </p>
      <h6>
        2、推广奖励政策
      </h6>
      <p>
        您蜂友圈中的所有直接蜂友，在平台中的所有有效消费（免单消费和特别活动除外）合伙人都将获得推广奖励，具体奖励标准根据合伙人星级予以区分。
      </p>
      <h6>
        3、团队奖励政策
      </h6>
      <p>
        您的直接蜂友开启蜂友圈后，其中的所有蜂群用户，均视为您的关联蜂友，他们在平台中的所有有效消费（免单消费和特别活动除外）您都将获得团队奖励，具体奖励标准根据合伙人星级予以区分。
      </p>
      <h6>
        4、其他福利政策
      </h6>
      <p>
        作为合伙人，随着您蜂友圈对公益消费的持续支持您蜂友圈中会积累大量公益值，达到一定数量时系统会自动将您升为二星合伙人及三星合伙人，并会在一定条件下授予您集市勋章，且集市将不定期开放更多合伙人福利政策，具体以蜂友圈公示信息为准。
      </p>
      <h5>
        三、退伙说明
      </h5>
      <p>
        当合伙人连续90天在蜂集市没有任何消费记录时，系统将临时冻结该合伙人的蜂友圈，冻结期两个月，期间所有蜂友数据会全部保留，该合伙人也可随时申请回复开启，超过冻结期系统将自动判定该合伙人退出合伙体系，退伙不会产生任何责任及额外风险，但相应权益及数据会随之注销。
      </p>
      <p>
        退伙后可重新申请加入体系，但需按当时政策重新审核，原有关联蜂友数据重新计算。
      </p>
      <h5>
        四、其它
      </h5>
      <p>
        蜂集市合伙人政策之最终解释权归平台所有，一经发布即为生效，若政策调整变更，则自动适用变更后的政策。
      </p>
      <p>
        &nbsp;
      </p>
      <p>
        <br>
      </p>
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
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {},
  metaInfo() {
    return {
      title: '合伙人共创协议'
    }
  }
}
</script>

<style scoped lang="less">
b {
  text-decoration: underline;
}
.indent {
  text-indent: 2em;
}
.help {
  margin-top: 0.2rem;

  padding: 0 0.2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .content {
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
  }
  h4 {
    margin-bottom: 0.25rem;
    text-indent: 2em;
    margin-top: 0.3rem;
    font-size: 0.34rem;
  }
  h4.toph4 {
    margin-top: 0;
  }
  h5 {
    margin-bottom: 0.2rem;
    text-indent: 2em;
    font-size: 0.3rem;
    font-weight: 600;
  }
  h6 {
    margin-bottom: 0.2rem;
    text-indent: 2em;
    font-size: 0.3rem;
    font-weight: 600;
    color: #666;
  }
  p {
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
    color: #666;
    line-height: 1.5;
    text-indent: 2em;
  }
}
</style>
