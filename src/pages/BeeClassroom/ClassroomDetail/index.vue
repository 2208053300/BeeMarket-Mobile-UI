<template>
  <div class="class-room-detail">
    <div style="background: white">
      <p class="title">
        {{ detail.title }}
      </p>
      <p class="subtitle">
        作者<span>{{ detail.author }}</span>{{ detail.date }}
      </p>
      <div class="video">
        <video
          ref="video"
          :src="detail.video_url"
          :poster="detail.first_screen"
          class="video-body"
          :controls="showControls"
        />
        <div v-if="!showControls" style="position: relative">
          <div class="control">
            <img
              :src="beeIcon.title_icon_stop"
              style="width: 1.28rem;height: 1.28rem"
              @click="play"
            >
          </div>
        </div>
      </div>
      <div style="text-align: center;padding-top: 0.4rem">
        <img :src="beeIcon.classroom_pic_triangle" style="width: 0.24rem;height: 0.22rem">
      </div>
      <div class="article">
        <!-- eslint-disable-next-line -->
        <div v-html="detail.content" />
      </div>
      <div style="text-align: center;padding-top: 1.4rem">
        <span class="recommend-tip">你可能还想看</span>
      </div>
      <div style="text-align: center;padding-top: 0.32rem">
        <img :src="beeIcon.classroom_pic_triangle" style="width: 0.24rem;height: 0.22rem">
      </div>
      <div class="recommend-content">
        <ul>
          <li v-for="item in recommendList" :key="item.id" @click="goDetail(item.id)">
            <div><div class="point" /></div>{{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div style="padding: 0.2rem 0.3rem">
      <img :src="beeIcon.classroom_pic_bg">
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '课堂详情'
  },
  components: {},
  props: {},
  data() {
    return {
      classroom: {
        1: {
          title: '快速玩转蜂集市',
          author: '集市课堂',
          date: '2019.06.22',
          video_url: 'https://img.fengjishi.com.cn/app/videos/education/intro.mp4',
          first_screen: require('@/assets/icon/task/talent/first_screen@3x.png'),
          content: '<p>如果说有一个平台，有海量商品可以超值购物，你信不信？</p>\n<p>如果说这个平台，除了超值购物，还可以免单购物，你信不信？</p>\n<p>那如果说，这个平台不仅可以省钱，可以免单，还可以轻松赚钱，和平台一起持续分享丰厚收益，你又信不信呢？</p>\n<p>以前，我是不信的。但是现在，我相信了，因为真有这么一个平台，他叫做：<span style="text-decoration: underline;">蜂 集 市</span>！</p>\n<p>&nbsp;</p>\n<p>那么蜂集市，是做什么的呢？</p>\n<p>蜂集市，是一个倡导&ldquo;共享经济理念&ldquo;的，让用户&ldquo;能省/能免/能赚&rdquo;的，创新电商平台。</p>\n<p>&nbsp;</p>\n<p>以&ldquo;共享+公益&rdquo;为核心理念，蜂集市希望携手全国用户，共同来打造一个，能够持续共享收益、同时轻松参与公益的，创新商业模式。</p>\n<p>在这里，所有用户不仅能体验到海量商品的超值购物，同时还能申请成为合伙人，通过平台的&ldquo;蜂友圈&rdquo;功能，和蜂集市一起来轻松推广共享消费，持续分享丰厚收益。</p>\n<p>这，就是蜂集市的&ldquo;共享&rdquo;理念。</p>\n<p>与此同时，蜂集市还将呈现给用户，更多更丰富的，公益性消费选择：如农副产品的公益购，风景如画的公益游，等等。让用户通过&ldquo;消费助农&rdquo;的方式，可以超值购买到更多偏远地区的优质农副产品，享受到更多风景如画的乡村生态旅游，进而持续带动更多贫困地区及农民群体的经济增长与脱贫增收。</p>\n<p>这，就是蜂集市的&ldquo;公益&rdquo; 理念。</p>\n<p>&nbsp;</p>\n<p>除此之外，蜂集市还为用户打造了一个&ldquo;免单购物&rdquo;的创新商业模式，以鼓励用户对社会公益事业的参与及支持。用户在集市中获赠的大量&ldquo;公益值&rdquo;，可以在蜂集市所有消费项目中，任意使用，畅享免单。</p>\n<p>那么，&ldquo;公益值&rdquo;是什么呢？</p>\n<p>公益值，就是蜂集市不断发放给用户的，免单消费权益。不仅可以用于集市中海量商品的自由选购，还可以在蜂集市陆续开放的旅游、酒店、餐饮、娱乐等线下服务项目中畅享免单。真正做到&ldquo;您消费、我免费&rdquo;的畅快体验！</p>\n<p>那么&ldquo;公益值&rdquo;，要怎么获得呢？&nbsp;&nbsp;&nbsp;&nbsp; 三个字，各种送！</p>\n<p>除了消费农副产品，支持助农增收，会获赠相应公益值之外；在蜂集市海量商品中，任意选购公益宝贝，也将获赠相应公益值；或只是点点手指，将蜂集市的公益活动内容，分享转发给身边朋友，同样可以获赠大量公益值。</p>\n<p>总之，方式多多，乐趣多多。</p>\n<p>蜂集市，目前已联合全国众多优质生产厂商，建立全网全域联动协作体系，同时邀请各地政府机构和社会公益团体，全面参与运营监管，旨在汇集更多社会力量，努力实现共享消费的同时，合纵连横，一起为社会公益事业持续助力。</p>\n<p style="text-align: center;">始于共创共享，终于普惠四方！</p>\n<p style="text-align: center;">蜂集市，就是这么一个，以&ldquo;共享+公益&rdquo;为核心理念的，创新电商平台。</p>'
        },
        2: {
          title: '开启你的蜂友圈',
          author: '集市课堂',
          date: '2019.06.22',
          video_url: 'https://img.fengjishi.com.cn/app/videos/education/friendship-course-1.mp4',
          first_screen: require('@/assets/icon/task/talent/first_screen@3x.png'),
          content: '<p>蜂友圈，是蜂集市秉承&ldquo;共创共享&rdquo;理念，而倾力打造的&ldquo;社交分享+收益共享&rdquo;系统。</p>\n<p>任何用户都可以通过&ldquo;开启自己的蜂友圈&rdquo;，成为集市合伙人。</p>\n<p>而开启蜂友圈，蜂集市不会收取任何费用，只需用户在蜂集市的海量商品中，任选完成一次消费体验即可，与金额无关，免单也算！</p>\n<p>&nbsp;</p>\n<p>那么，作为蜂集市合伙人，会不会像某些平台一样，需要收取会员费?缴纳管理费？或需要囤货/充值之类的呢？完全不会！</p>\n<p>蜂集市承诺，坚持零风险的合伙人福利政策，所有风险由平台承担，合伙人只享受权益，不承担任何风险，更不需要缴纳任何费用，只需认同&ldquo;共创共享&rdquo;的集市理念，是蜂集市有效注册用户，即可开启您的蜂友圈。</p>\n<p>&nbsp;</p>\n<p>开启了蜂友圈的合伙人，分为1 星、2星、3星三种星级，不同的星级，对应享受不同的收益奖励：分别为2%-4%的推广奖励，和1%-2%的团队奖励。其中，1星合伙人，将获得蜂友圈中，所有直接蜂友消费总额2%的推广奖励，以及所有关联蜂友（即每个直接蜂友不断分享裂变，而产生的更多蜂群用户）消费总额1%的团队奖励；当您的蜂友圈公益值，累计达到一定标准时，系统会自动将您升为2星合伙人，此时您将获得3%的推广奖励和1.5%的团队奖励；以此类推，当您的蜂友圈公益值，再次累计至升星标准时，系统会将您升为3星合伙人，您可获得的共享收益标准将提升至，4%的推广奖励，和2%的团队奖励。</p>\n<p>也就是说，作为集市合伙人，您分享带来的所有蜂友用户，以及这些蜂友有意无意再分享裂变，带来的更多蜂群用户，他们以后的所有消费，蜂集市都将源源不断的，通过您的蜂友圈，和您共享收益！</p>\n<p>&nbsp;</p>\n<p>那么，合伙人的星级会不会因为什么原因被降级呢？完全不会，蜂集市，对合伙人星级，执行只升不降政策，但需要注意的是，如果您连续 90天在蜂集市没有任何消费记录，那么您的蜂友圈会被系统临时冻结，冻结期为两个月，冻结期内您的所有蜂友关系会全部保留，您也可以随时申请恢复开启蜂友圈。但超过冻结期，系统会判定您已正式退伙，您的蜂友圈会被正式注销，所有关联数据及收益，也会随之注销，所以，记得时常关注您的蜂友圈状态哦。</p>\n<p>&nbsp;</p>\n<p>始于共创共享、终于普惠四方</p>\n<p>蜂集市 让生活 蜂富起来！</p>'
        }
      },
      beeIcon: {
        title_icon_stop: require('@/assets/icon/public/title_icon_stop@2x.png'),
        classroom_pic_triangle: require('@/assets/icon/classroom/classroom_pic_triangle@2x.png'),
        classroom_pic_bg: require('@/assets/icon/classroom/classroom_pic_bg@2x.png')
      },
      showControls: false
    }
  },
  computed: {
    // 从课堂列表中获取详情
    detail() {
      return this.classroom[this.$route.params.id]
    },
    // 获取其他的课堂列表
    recommendList() {
      const list = [
        { title: '快速玩转蜂集市', id: 1 },
        { title: '开启你的蜂友圈', id: 2 }
      ]
      const id = parseInt(this.$route.params.id)
      return list.filter(item => item.id !== id)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 播放视频
    play() {
      this.$refs.video.play()
      this.showControls = true
    },
    // 打开课堂详情
    goDetail(id) {
      this.$router.replace({
        name: 'classroomDetail',
        params: { id }
      })
    }
  },
  // 当前打开另外一个课堂时会调用此方法
  beforeRouteUpdate(to, from, next) {
    // TODO 获取课堂详情 jethro
    console.log('TODO 获取课堂详情:', to.params.id)
    next()
  }
}
</script>

<style lang="less">
.class-room-detail {
  @videoWidth: 6.4rem;
  @videoHeight: 3.28rem;
  p {
    margin: 0;
  }
  .title {
    padding: 0.52rem 0.3rem 0 0.3rem;
    font-size: 0.44rem;
    color: @Grey12;
    font-weight: bold;
    font-family: "PingFang SC",sans-serif;
  }
  .subtitle {
    padding: 0.4rem 0.3rem 0 0.3rem;
    color: @Grey1;
    font-size: 0.24rem;
    span {
      padding: 0 0.28rem;
      font-size: 0.28rem;
      color: @BeeDefault;
      font-family: "PingFang SC",sans-serif;
    }
  }
  .video {
    padding: 0.8rem 0.54rem 0 0.54rem;
    border-radius: 0.08rem;
    .video-body {
      background-color: black;
      width: @videoWidth;
      height: @videoHeight;
      border-radius: 0.08rem;
    }
    .control {
      width: @videoWidth;
      height: @videoHeight;
      top: -@videoHeight;
      left: 0;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .article {
    padding: 0.32rem 0.54rem 0 0.54rem;
    font-size: 0.28rem;
    font-family: "PingFang SC", sans-serif;
    line-height: 1.8;
    color: @Grey12;
  }
  .recommend-tip {
    background: black;
    color: white;
    font-size: 0.34rem;
    font-family: "PingFang SC", sans-serif;
    font-weight: bold;
  }
  .recommend-content {
    padding: 0.04rem 1.08rem 1rem 1.08rem;
    color: @BeeDefault3;
    font-size: 0.28rem;
    ul {
      text-decoration: underline;
      text-underline-offset: 2px;
      li {
        letter-spacing: 0.02rem;
        display: flex;
        align-items: baseline;
        line-height: 0.38rem;
        margin-top: 0.36rem;
        vertical-align: middle;
        div {
          flex-shrink: 0;
          height: 0.38rem;
        }
        .point {
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          background-color: @BeeDefault3;
          vertical-align: middle;
          margin-right: 0.24rem;
        }
      }
    }
  }
}
</style>
