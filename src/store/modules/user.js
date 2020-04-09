import Cookies from 'js-cookie'

export default {
    state: {
      token: Cookies.get("access_token")?Cookies.get("access_token"):'', //jwt
      perms: [],  // 用户权限标识集合
      userId: '', //用户id
      userName:'',
      schoolIcon:'',
      blog : '',
      avatar :'',
      loginTime : '',
      nickName: '',
    },
    getters: {

    },
    mutations: {
      setPerms(state, perms){  // 用户权限标识集合
         state.perms = perms;
        },
      setUserId(state,userId){
          state.userId = userId;
      },
      setUserName(state,userName){
        state.userName = userName;
      },
      setSchoolIcon(state,schoolIcon){
        state.schoolIcon = schoolIcon;
      },
      setBlog(state,blog){
        state.blog = blog;
      },
      setAvatar(state,avatar){
        state.avatar = avatar;
      },
      setLoginTime(state,loginTime){
        state.loginTime = loginTime;
      },
      setNickName(state,NickName){
        state.NickName = NickName;
      }
    },
    actions: {
    }
}
