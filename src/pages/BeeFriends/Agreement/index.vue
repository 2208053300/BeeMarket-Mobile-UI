<template>
  <div class="help bg-gray">
    <!--  -->
    <div class="content bg-white">
      <p>
        秉持“轻创业，大财富，零风险”的合作理念，蜂集市诚邀您作为集市的公益合伙人，在成为合伙人之前，请您仔细阅读下文，了解公益合伙人入伙、退伙条件，权利、福利及相应义务：
      </p>
      <h5>
        一、合伙人入伙条件
      </h5>
      <p>
        1、认同共创共荣，普惠公益的集市理念。
      </p>
      <p>
        2、蜂集市有效注册用户，即有过在蜂集市购物记录的注册用户。
      </p>
      <h5>
        二、合伙人权益
      </h5>
      <h6>
        1、推荐合伙人奖励
      </h6>
      <p>
        合伙人推荐厂商/店铺入驻蜂集市（或蜂联盟），经总部审核通过后，该厂商/店铺以后的所有订单结算，蜂集市都将给予推荐合伙人0.5%的提成奖励，发放至该合伙人蜂友圈账户中。
      </p>
      <p>
        审核原则：推荐合伙人以厂商/店铺在APP“申请入驻”时填写的“推荐人”信息为准，信息错误或与系统信息不吻合，视为无推荐人，一次判定，不支持申诉。
      </p>
      <h6>
        2、推广合伙人奖励
      </h6>
      <p>
        合伙人的蜂友圈每笔有效消费（免单消费和特别活动除外）合伙人都将获得3%~5%推广奖励。具体奖励标准：成为公益合伙人初始奖励3%，蜂友圈累计消费额满10万后奖励4%，最近六个月累计满50万后奖励5%。
      </p>
      <h6>
        3、团队奖金
      </h6>
      <p>
        合伙人的蜂友申请加入合伙人体系后，其蜂友圈所有有效消费，作为合伙人的您均将获得1%~3%团队奖励:
      </p>
      <p>
        首个蜂友加入体系，初始奖金1%；
      </p>
      <p>
        累计20蜂友加入体系且均达4%推广奖励标，团队奖金2%；
      </p>
      <p>
        累计50蜂友加入体系且20以上达5%推广奖励标准，团队奖金3%。
      </p>
      <h6>
        4、股权分红
      </h6>
      <p>
        根据公益合伙人业绩排行榜变动情况，蜂集市每个财务年度将拿出20%股权收益用于部分合伙人股权分红，详情规则另行制定。
      </p>
      <h6>
        5、集市福利
      </h6>
      <p>
        作为合伙人，随着您蜂友圈对公益消费的持续支持，您蜂友圈账户中会积累大量蜜点，这些蜜点除选择提佣外，您还可以报名参加集市年度旅游，轻松畅快，走遍世界。
      </p>
      <p>
        若蜂工厂合作的国外/国内厂商，其产品领域正好是您所熟悉的，欢迎报名前往，作为蜂集市代表，为所有用户巡控品质，参与监制。您的往返机票和住宿将全部由蜂集市承担。
      </p>
      <h5>
        三、退伙说明
      </h5>
      <p>
        当合伙人连续两个月在蜂集市系统没有任何有效消费（不计数额）记录时，系统将自动判定并视为该合伙人退出合伙体系，退伙不会产生任何责任及额外风险，但相应合伙权益将不再享有。
      </p>
      <p>
        退伙后，您可重新申请加入体系，但需按当时政策重新审核，原有关联蜂友业绩将重新起算。
      </p>
      <h5>
        四、其它
      </h5>
      <p>
        本协议的最终解释权归蜂集市所有，一经发布即生效，若相关政策变更，则自动适用变更后的政策。
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
  meteInfo() {
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
