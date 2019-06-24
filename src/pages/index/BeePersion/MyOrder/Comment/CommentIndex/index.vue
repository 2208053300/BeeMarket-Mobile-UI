<template>
  <div class="comment">
    <div class="comment-content">
      <div class="comment-rate">
        <div class="product-img">
          <img
            src=""
            alt=""
          >
        </div>
        <span class="rate-text">总体评价</span>
        <van-rate
          v-model="score"
          :size="size"
          :icon="beeIcon.product_detail_icon_flower_pressed"
          :void-icon="beeIcon.product_detail_icon_flower_normat"
          :color="BeeDefault"
          :allow-half="allowHalf"
        />
        <span class="rate-value">{{ score }}</span>
      </div>
      <div class="comment-detail">
        <van-field
          v-model="commentText"
          type="textarea"
          placeholder="亲，赶快在这里留下你的金句良言吧！"
          rows="1"
          autosize
          :border="showBorder"
        />
        <div class="comment-imgs">
          <div
            v-for="(img, index) in commentImgs"
            :key="index"
            class="comment-img"
          >
            <img :src="img.content">
            <div class="del-img" @click="delImg(index)">
              <van-icon name="clear" />
            </div>
          </div>
          <div v-if="commentImgs.length < 6" class="upload-img">
            <van-uploader
              :after-read="onRead"
              accept="image/png, image/jpeg"
              multiple
            >
              <van-icon name="photograph" />
            </van-uploader>
            <div class="img-num">
              <span
                v-if="commentImgs.length === 0"
                class="upload-text"
              >添加图片</span>
              <div v-else class="upload-num">
                <span class="num">{{ commentImgs.length }}</span>/6
              </div>
            </div>
          </div>
        </div>
        <van-cell
          clickable
          @click="toggleAnonymity"
        >
          <div
            slot="title"
            class="anonymity"
          >
            <van-checkbox
              ref="anonymityBox"
              v-model="isAnonymity"
              :checked-color="BeeDefault"
            >
              匿名
            </van-checkbox>
          </div>
          <span class="anonymity-text">你的评价能帮助到其他小伙伴哦！</span>
        </van-cell>
      </div>
    </div>
    <div class="comment-op">
      <van-button :loading="loading" class="submit-comment" @click="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { zipImg } from '@/utils/imgUp'
import { BeeDefault } from '@/styles/index/variables.less'
import { addComment } from '@/api/BeeApi/user'
export default {
  metaInfo: {
    title: '发表评价'
  },
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      BeeDefault,
      score: 5,
      size: '0.3rem',
      commentText: '',
      beeIcon: {
        product_detail_icon_flower_pressed: require('@/assets/icon/product/product_detail_icon_flower_pressed@2x.png'),
        product_detail_icon_flower_normat: require('@/assets/icon/product/product_detail_icon_flower_normat@2x.png'),
        product_detail_evaluation_icon_flower_pressed: require('@/assets/icon/product/product_detail_evaluation_icon_flower_pressed@2x.png'),
        product_detail_evaluation_icon_flower_normat: require('@/assets/icon/product/product_detail_evaluation_icon_flower_normat@2x.png'),
        product_detail_icon_avatar: require('@/assets/icon/product/product_detail_icon_avatar@2x.png')
      },
      allowHalf: false,
      showBorder: false,
      isAnonymity: false,
      commentImgs: [],
      order_no: this.$route.query.order_no,
      sku_id: this.$route.query.sku_id
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.state.app.beeHeader = true
    this.$store.state.app.beeFooter.show = false
  },
  methods: {
    // 提交评论
    async submit() {
      if (!this.score) {
        this.$toast.fail('请给出评分后提交！')
        return
      }
      this.loading = true
      const files = this.commentImgs.map(item => {
        return item.file
      })
      const formData = new FormData()
      const results = await Promise.all(
        files.map(async file => {
          const res = await zipImg(file)
          formData.append('images[]', res)
          return res
        })
      )
      console.log('results:', results)
      formData.set('order_no', this.order_no)
      formData.set('sku_id', this.sku_id)
      formData.set('score', this.score)
      formData.set('content', this.content)
      formData.set('anonymous', this.anonymous)
      const res = await addComment(formData)
      if (res.status_code === 200) {
        this.$toast.success(res.message)
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      }
    },
    // 是否匿名
    toggleAnonymity() {
      this.$refs.anonymityBox.toggle()
    },
    // 上传图片
    async onRead(file) {
      console.log(file)
      if (Array.isArray(file)) {
        this.commentImgs.push(...file)
      } else {
        this.commentImgs.push(file)
      }
      if (this.commentImgs.length >= 6) {
        this.commentImgs.length = 6
        this.$toast('评论图片最多上传6个！')
      }
    },
    delImg(index) {
      this.commentImgs.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  .upload-text{font-size: 0.24rem;}
  .upload-title{font-size: 0.28rem; color: #333}
  .comment-content {
    background-color: #fff;
    box-sizing: border-box;
    .comment-rate {
      padding: 0.3rem;
      display: flex;
      align-items: center;
      border-bottom: 0.02rem solid @Grey6;
      .product-img {
        width: 0.66rem;
        height: 0.66rem;
        background-color: @GreyBg;
        border-radius: 0.05rem;
        overflow: hidden;
        margin-right: 0.2rem;
      }
      .rate-text {
        font-size: 0.3rem;
        color: @Grey2;
      }
      .van-rate {
        margin: 0 0.2rem;
        display: flex;
      }
      .rate-value {
        font-size: 0.4rem;
        color: @BeeDefault;
      }
    }
    .comment-detail {
     .comment-imgs {
          padding-left: 0.3rem;
          padding-top: 0.4rem;
          display: grid;
          grid-template-columns: repeat(3, 1.4rem);
          grid-template-rows: 1.4rem 1.4rem;
          grid-gap: 0.3rem 0.4rem;
          .comment-img {
            position: relative;
            img {
              border-radius: 0.05rem;
            }
            .del-img {
              position: absolute;
              top: -0.1rem;
              right: -0.1rem;
            }
          }
          .upload-img {
            height: 1.4rem;
            padding-top: 0.3rem;
            box-sizing: border-box;
            border: 0.04rem dashed @Grey6;
            border-radius: 0.1rem;
            text-align: center;
            .img-num {
              .upload-num {
                font-size: 0.28rem;
                .num {
                  font-size: 0.34rem;
                  color: @BeeDefault;
                }
              }
            }
          }
        }
      .van-cell {
        padding-bottom: 0.5rem;
        .van-cell__value {
          flex: 2;
        }
      }
    }
  }
  .comment-op {
    position: fixed;
    bottom: 0.8rem;
    text-align: center;
    width: 100%;
    .submit-comment {
      width: 5.88rem;
      height: 0.88rem;
      background-color: @BeeDefault;
      color: #ffffff;
    }
  }
}
</style>
