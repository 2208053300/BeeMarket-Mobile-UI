const cart = {
  state: {
    cartInfo: [],
    cartSelected: [],
    skuId: 0,
    pNumber: 1,
    showSku: false,
    // 送礼id
    sid: null
  },
  mutations: {
    SET_CartINFO: (state, cartInfo) => {
      state.cartInfo = cartInfo
    },
    SET_CARTSELECTED: (state, cartSelected) => {
      state.cartSelected = cartSelected
    },
    SET_SID: (state, sid) => {
      state.sid = sid
    }
  },
  actions: {
    GetCartInfo({ commit }, uid) {
      return new Promise(resolve => {
        commit('SET_CartINFO')
        resolve()
      })
    },
    setSid({ commit }, sid) {
      return new Promise(resolve => {
        commit('SET_SID', sid)
        resolve()
      })
    }
  }
}

export default cart
