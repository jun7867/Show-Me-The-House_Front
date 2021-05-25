import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  //npm install —-save vuex-persistedstate
  plugins: [createPersistedState()],
  state: {
    notices: [],
    notice: {},
    sidos: [],
    guguns: [],
    dongs: [],
    sidoName: '', // 시도 이름
    gugunName: '', // 구군 이름
    apts: [], // 아파트 정보 리스트

    accessToken: null,
    userId: '',
    userName: '',
  },
  getters: {
    notices(state) {
      return state.notices;
    },
    notice(state) {
      return state.notice;
    },
    sidos(state) {
      return state.sidos;
    },
    guguns(state) {
      return state.guguns;
    },
    dongs(state) {
      return state.dongs;
    },
    sidoName(state) {
      return state.sidoName;
    },
    gugunName(state) {
      return state.gugunName;
    },
    apts(state) {
      return state.apts;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
  },
  mutations: {
    setNotices(state, payload) {
      state.notices = payload;
    },
    setNotice(state, payload) {
      state.notice = payload;
    },
    setSidos(state, payload) {
      state.sidos = payload;
    },
    setGuguns(state, payload) {
      state.guguns = payload;
    },
    setDongs(state, payload) {
      state.dongs = payload;
    },
    setSidoName(state, payload) {
      state.sidoName = payload;
    },
    setGugunName(state, payload) {
      state.gugunName = payload;
    },
    setApts(state, payload) {
      state.apts=payload;
    },
    LOGIN(state, payload) {
      state.accessToken = payload['auth-token'];
      state.userId = payload['user-id'];
      state.userName = payload['user-name'];
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userId = '';
      state.userName = '';
    },
  },
  actions: {
    getNotices(context) {
      http
        .get("board")
        .then(({ data }) => {
          context.commit("setNotices", data);
        })
        .catch(() => {
          alert("수행 중 오류가 발생했습니다.");
        });
    },
    getNotice(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setNotice", data);
        })
        .catch(() => {
          alert("오류 발생");
        });
    },
    getSidos(context) {
      http
        .get('/map/sido')
        .then(({ data }) => {
          context.commit("setSidos", data);
        })
        .catch(() => {
          alert("Sido 오류");
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getGuguns(context, payload) {    
      http
        .get(payload)
        .then(({ data }) => {
          
          context.commit("setGuguns", data);
        })
        .catch(() => {
          console.log("error");
          alert("Gugun 오류");
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        })
    },
    getDongs(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setDongs", data);
        })
        .catch(() => {
          alert("Dong 오류");
          this.errored = true;
        })
        .finally(() => {    
          this.loading = false;
        })
    },
    getSidoName(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setSidoName", data);
        })
        .catch(() => {
          alert("sidoName 오류");
          this.errored = true;
        })
        .finally(() => {    
          this.loading = false;
        })
    },
    getGugunName(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setGugunName", data);
        })
        .catch(() => {
          alert("GugunName 오류");
          this.errored = true;
        })
        .finally(() => {    
          this.loading = false;
        })
    },
    getAptName(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setApts", data);
          
        })
        .catch(() => {
          alert("AptName 오류 ");
        })
    },
    getAptDong(context, payload) {
      http
        .get(payload)
        .then(({ data }) => {
          context.commit("setApts", data);
        })
        .catch(() => {
          alert("AptDong 오류 ");
        })
    },
    LOGIN(context, user) {
      return axios
        .post(`http://localhost:8090/vue/api/member/confirm/login`, user)
        .then((response) => {
          if (`${response.data['status']}` == 'true') {
            alert(
              '반갑습니다! ' +
                `${response.data['user-name']}` +
                '님!'
            );
            context.commit('LOGIN', response.data);
            axios.defaults.headers.common[
              'auth-token'
            ] = `${response.data['auth-token']}`;
          } else {
            alert('올바른 계정정보를 입력하세요.');
          }
        })
        .catch(() => {
          console.log("in vue " + user.userId);
        });
    },
    LOGOUT(context) {
      context.commit('LOGOUT');
      axios.defaults.headers.common['auth-token'] = undefined;
    },
  },
});
