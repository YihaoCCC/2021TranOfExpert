
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    //定义菜单状态
    collapsed: false,
    topNavState: 'home',
    leftNavState: 'home',
    E_user:[],//存放登陆用户信息数据
    cachedTags:[],  //存储多级路由菜单的Tags
    voting:[],  //存储从首页传过来的哪一个评审对象，并在正在评审页面（Voting）创建时候加载此数据

  },
  mutations: {

    login(state,user){
      state.Authorization=user;
      localStorage.setItem('Authorization', user)
    }
  },
  actions: {
  },
  modules: {
  }
})
