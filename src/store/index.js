import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import cart from './modules/cart'
import history from './modules/history'
import order from './modules/order'
import giftPackage from './modules/giftPackage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart,
    history,
    order,
    giftPackage
  }
})
export default store
