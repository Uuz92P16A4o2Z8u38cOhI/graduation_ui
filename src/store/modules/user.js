import Cookies from 'js-cookie'

export default {
    state: {
      token: Cookies.get("access_token")?Cookies.get("access_token"):'', //jwt
      perms: [],  // 用户权限标识集合
      userId: '', //用户id
    },
    getters: {

    },
    mutations: {
      setPerms(state, perms){  // 用户权限标识集合
         state.perms = perms;
        },
      setUserId(state,userId){
          state.userId = userId;
      }
    },
    actions: {
    }
}
