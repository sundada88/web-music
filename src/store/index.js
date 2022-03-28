// 开发模式下可以通过 crateLogger 查看日志
import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  // 严格模式，state 的修改必须通过 commit mutation 来完成
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
