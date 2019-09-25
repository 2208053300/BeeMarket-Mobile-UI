const app = {
  state: {
    beeHeader: false,
    beeFooter: {
      show: false,
      active: 0
    },
    backTop: false,
    pushName: '',
    pushQuery: {},
    // 图片错误时加载默认图片填充
    defaultImg:
      "this.src='https://img.fengjishi.com.cn/product/album/2019/06/03204403fnhaQkphpQ6l19R.jpeg'",
    defaultImg2: require('@/assets/icon/home/ic_default@2x.png'),
    defaultImg3: require('@/assets/icon/home/ic_banner_default@2x.png'),
    head_detault: require('@/assets/icon/personalCenter/head_default.png'),
    homeUri: 'https://app.fengjishi.com/#',
    homeUri2: 'https://app.fengjishi.com/',
    share_data: {
      desc: '',
      img: '',
      link: '',
      title: ''
    }
  },
  mutations: {
    SET_BEEFOOTER: (state, beeFooter) => {
      state.beeFooter = beeFooter
    },
    SET_BEEHEADER: (state, beeHeader) => {
      state.beeHeader = beeHeader
    },
    SET_BACKTOP: (state, backTop) => {
      state.backTop = backTop
    },
    SET_PUSHNAME: (state, pushName) => {
      state.pushName = pushName
    }
  },
  actions: {
    ChangeBeeFooter({ commit }, beeFooter) {
      return new Promise(resolve => {
        commit('SET_BEEFOOTER', beeFooter)
        resolve()
      })
    },
    ChangePushName({ commit }, pushName) {
      return new Promise(resolve => {
        commit('SET_PUSHNAME', pushName)
        resolve()
      })
    }
  }
}

export default app
