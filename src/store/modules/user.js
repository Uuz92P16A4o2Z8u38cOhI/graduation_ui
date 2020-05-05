import Cookies from 'js-cookie'

export default {
    state: {
      token: Cookies.get("access_token")?Cookies.get("access_token"):'', //jwt
      perms: [],  // 用户权限标识集合
      userId: '', //用户id
      userName:'',
      schoolIcon:'',
      schoolName: '',
      blog : '',
      avatar :'',
      loginTime : '',
      nickName: '',
      version: 0,
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
      setSchoolName(state,schoolName){
        state.schoolName = schoolName;
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
      },
      setVersion(state,version){
        state.version = version;
      }
    },
    actions: {
    }
}
