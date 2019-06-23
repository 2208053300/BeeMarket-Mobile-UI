import { getUserMsg, isPartner } from '@/api/BeeApi/user'

const user = {
  state: {
    userInfo: {
      nickname: localStorage.getItem('nickname') || '',
      head_image: localStorage.getItem('head_image') || '',
      mobileAstr: localStorage.getItem('mobileAstr') || ''
    },
    addressData: {},
    have_no_read: false,
    userStatus: 0
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
    },
    SET_HAVE_NO_READ: (state, have_no_read) => {
      state.have_no_read = have_no_read
    },
    SET_USER_STATUS: (state, userStatus) => {
      state.userStatus = userStatus
    }
  },
  actions: {
    GetUserInfo(commit, uid) {
      return new Promise(resolve => {
        commit('SET_USER_INFO')
        resolve()
      })
    },
    async GerUserMsg({ commit }) {
      const res = await getUserMsg()
      commit('SET_HAVE_NO_READ', res.data.have_no_read)
    },
    async GerUserStatus({ commit }) {
      const res = await isPartner()
      commit('SET_USER_STATUS', res.data.is_partner)
    }
  }
}

export default user
