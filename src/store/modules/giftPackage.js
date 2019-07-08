const giftPackage = {
  state: {
    selectedTotalNum: 0, // 选择总数量
    selectedTotalAmount: 0, // 选择总金额
    showTip: true // 是否显示提示
  },
  mutations: {
    SET_SELECTED_TOTAL_NUM(state, num) {
      state.selectedTotalNum = num
    },
    SET_SELECTED_TOTAL_AMOUNT(state, amount) {
      state.selectedTotalAmount = amount
    },
    SET_SHOW_TIP(state, bool) {
      state.showTip = bool
    }
  }
}

export default giftPackage
