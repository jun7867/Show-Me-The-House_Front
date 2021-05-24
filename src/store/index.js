import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notices: [],
    notice: {},
    sidos: [],
    guguns: [],
    dongs: [],
    sidoName: '', // 시도 이름
    gugunName: '', // 구군 이름
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
    }
  },
});
