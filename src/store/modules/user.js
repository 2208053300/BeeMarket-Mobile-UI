import { getUserMsg, isPartner, getUserIsNew, getUID } from '@/api/BeeApi/user'
const user = {
  state: {
    userInfo: {
      nickname: localStorage.getItem('nickname') || '',
      head_image: localStorage.getItem('head_image') || '',
      mobileAstr: localStorage.getItem('mobileAstr') || ''
    },
    addressData: {},
    have_no_read: false,
    // 1是合伙人，2冻结合伙人，0非合伙人
    userStatus: null,
    isActiveUser: 1,
    // 当 is_partner = 0 时，该字段有效；1表示满足申请条件，0表示不满足
    applyCondition: 0,
    is_new_user: false,
    uid: 0,
    hasPhone: false,
    showFarmPop: false
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      try {
        localStorage.setItem('nickname', userInfo.nickname)
        localStorage.setItem('head_image', userInfo.head_image)
        localStorage.setItem('mobileAstr', userInfo.mobileAstr)
      } catch (error) {
        //
      }
    },
    CLEAR_USER_INFO: state => {
      try {
        localStorage.removeItem('nickname')
        localStorage.removeItem('head_image')
        localStorage.removeItem('mobileAstr')
      } catch (error) {
        //
      }
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
    },
    SET_USER_APPLY_CONFITION: (state, applyCondition) => {
      state.applyCondition = applyCondition
    },
    SET_IS_NEW_USER: (state, is_new_user) => {
      state.is_new_user = is_new_user
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_ISACTIVEUSER: (state, isActiveUser) => {
      state.isActiveUser = isActiveUser
    }
  },
  actions: {
    ClearUserInfo({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_USER_INFO')
        resolve()
      })
    },
    GetUserInfo({ commit }, uid) {
      return new Promise(resolve => {
        commit('SET_USER_INFO')
        resolve()
      })
    },
    async GerUserMsg({ commit }) {
      const res = await getUserMsg()
      commit('SET_HAVE_NO_READ', res.data.have_no_read)
    },
    async getUserIsNew({ commit }) {
      const res = await getUserIsNew()
      commit('SET_IS_NEW_USER', res.data.is_new_user)
    },
    async GerUserStatus({ commit }) {
      const res = await isPartner()
      if (res.status_code === 200) {
        commit('SET_USER_STATUS', res.data.is_partner)
        commit('SET_ISACTIVEUSER', res.data.active)
        commit('SET_USER_APPLY_CONFITION', res.data.apply_condition)
      }
    },
    async GetUid({ commit }) {
      const res = await getUID()
      commit('SET_UID', res.data.uid)
    }
  }
}

export default user
