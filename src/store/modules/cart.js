const cart = {
  state: {
    cartInfo: [],
    cartSelected: [],
    skuId: 0
  },
  mutations: {
    SET_CartINFO: (state, cartInfo) => {
      state.cartInfo = cartInfo
    },
    SET_CARTSELECTED: (state, cartSelected) => {
      state.cartSelected = cartSelected
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
