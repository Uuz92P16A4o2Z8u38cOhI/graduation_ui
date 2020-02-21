import Cookies from 'js-cookie'

export default {
    state: {
      token: Cookies.get("access_token")?Cookies.get("access_token"):'', //jwt
      perms: [],  // 用户权限标识集合
    },
    getters: {

    },
    mutations: {
        setPerms(state, perms){  // 用户权限标识集合
            state.perms = perms;
        }
    },
    actions: {
    }
}
