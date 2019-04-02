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
      commit
    }, beeFooter) {
      commit('SET_BEEFOOTER', beeFooter)
      return new Promise(resolve => {
        console.log('app changefooter', beeFooter)
        resolve()
      })
    }

  }
}

export default app
