import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notices: [],
    notice: {}
  },
  getters: {
    notices(state) {
      return state.notices;
    },
    notice(state) {
      return state.notice;
    }
  },
  mutations: {
    setNotices(state, payload) {
      state.notices = payload;
    },
    setNotice(state, payload) {
      state.notice = payload;
    }
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
    }
  },
});
