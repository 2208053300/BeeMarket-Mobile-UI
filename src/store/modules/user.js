const user = {
  state: {
    userInfo: {
      nickname: localStorage.getItem('nickname') || '',
      head_image: localStorage.getItem('head_image') || '',
      mobileAstr: localStorage.getItem('mobileAstr') || ''
    },
    addressData: {}
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      localStorage.setItem('nickname', userInfo.nickname)
      localStorage.setItem('head_image', userInfo.head_image)
      localStorage.setItem('mobileAstr', userInfo.mobileAstr)
    },
    CLEAR_USER_INFO: state => {
      localStorage.removeItem('nickname')
      localStorage.removeItem('head_image')
      localStorage.removeItem('mobileAstr')
      state.userInfo = {
        nickname: '',
        head_image: '',
        mobileAstr: ''
      }
    },
    SET_ADDRESSDATE: (state, addressData) => {
      state.addressData = addressData
    }
  },
  actions: {
    GetUserInfo(commit, uid) {
      return new Promise(resolve => {
        commit('SET_USER_INFO')
        resolve()
      })
    }
  }
}

export default user
