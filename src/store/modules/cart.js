const cart = {
  state: {
    cartInfo: []
  },
  mutations: {
    SET_CartINFO: (state, cartInfo) => {
      state.cartInfo = cartInfo
    }
  },
  actions: {
    GetCartInfo(commit, uid) {
      return new Promise(resolve => {
        commit('SET_CartINFO')
        resolve()
      })
    }
  }
}

export default cart
