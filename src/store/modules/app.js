/*
 * @Description: 基础应用store
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-04-08 13:47:02
 * @LastEditors: zhoucheng
 */
// const state = {
//   sidebar: {
//     opened: localStorage.get('sidebarStatus') ? !!+localStorage.get('sidebarStatus') : true,
//     withoutAnimation: false
//   },
//   device: 'desktop',
//   size: localStorage.get('size') || 'medium'
// }

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.set('sidebarStatus', 1)
    } else {
      localStorage.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  // state,
  mutations,
  actions
}
