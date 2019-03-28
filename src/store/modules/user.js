const user = {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
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
