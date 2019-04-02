const user = {
  state: {
    userInfo: {},
    addressData: {}
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ADDRESSDATE: (state, addressData) => {
      state.addressData = addressData
    }
  },
  actions: {
    GetUserInfo(commit, uid) {
      return new Promise(resolve => {
        commit('SET_USERINFO')
        resolve()
      })
    }
  }
}

export default user
