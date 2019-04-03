const history = {
  state: {
    historyInfo: [],
    historySelected: []
  },
  mutations: {
    SET_HISTORYINFO: (state, historyInfo) => {
      state.historyInfo = historyInfo
    },
    SET_HISTORYSELECTED: (state, historySelected) => {
      state.historySelected = historySelected
    }
  },
  actions: {
    GetHistoryInfo({ commit }, historyInfo) {
      return new Promise(resolve => {
        commit('SET_HISTORYINFO', historyInfo)
        resolve()
      })
    }
  }
}

export default history
