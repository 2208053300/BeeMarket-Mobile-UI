const app = {
  state: {
    beeHeader: false,
    beeFooter: {
      show: true,
      active: 0
    },
    pushName: '',
    // 图片错误时加载默认图片填充
    defaultImg:
      "this.src='https://img.fengjishi.com.cn/product/album/2019/06/03204403fnhaQkphpQ6l19R.jpeg'",
    homeUri: 'http://app.fengjishi.com.cn/#',
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
    }
  },
  actions: {
    ChangeBeeFooter({ commit }, beeFooter) {
      return new Promise(resolve => {
        commit('SET_BEEFOOTER', beeFooter)
        resolve()
      })
    }
  }
}

export default app
