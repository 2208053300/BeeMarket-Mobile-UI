const app = {
  state: {
    beeHeader: false,
    beeFooter: {
      show: true,
      active: 0
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
