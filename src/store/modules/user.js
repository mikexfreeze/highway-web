import {loginByEmail, logout, getInfo} from 'api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: Cookies.get('X-Ivanka-Token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByEmail(username, userInfo.password)
          .then(response => {
            console.log("登录接口返回信息")
            console.log(response)
            const data = response.data;
            Cookies.set('X-Ivanka-Token',  'Bearer ' + data.access_token);
            commit('SET_TOKEN', 'Bearer ' + data.access_token);
            // commit('SET_EMAIL', email);
            resolve();
          });
      });
    },


    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        // console.log("token")
        // console.log(state.token)
        getInfo(state.token).then(response => {
          console.log("action 获取用户信息")
          console.log(response)
          const data = response.data;
          commit('SET_ROLES', data.authorities);
          commit('SET_NAME', data.login);
          // commit('SET_AVATAR', data.avatar);
          // commit('SET_UID', data.uid);
          // commit('SET_INTRODUCTION', data.introduction);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 第三方验证登录
    LoginByThirdparty({commit, state}, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('X-Ivanka-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
          console.log("登出")
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('X-Ivanka-Token');
          resolve();

      });
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('X-Ivanka-Token');
        resolve();
      });
    }
  }
};

export default user;
