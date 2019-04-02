const app = {
  state: {
    beeFooter: {
      show: true,
      avtive: 0
    }
  },
  mutations: {
    SET_BEEFOOTER: (state, beeFooter) => {
      state.beeFooter = beeFooter
    }
  },
  actions: {
    ChangeBeeFooter({
      commit,
      beeFooter
    }) {
      return new Promise(resolve => {
        commit('SET_BEEFOOTER', beeFooter)
        resolve()
      })
    }

  }
}

export default app
