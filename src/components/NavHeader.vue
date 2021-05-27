<template>
  <v-app-bar app color="white" flat >
    <v-container class="py-0 fill-height">
      <router-link to="/">
         <v-img max-height="80" max-width="140" src="/img/smth3_remove.png" />
      </router-link>
      <v-btn
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.path"
        text
      >
        {{ menu.title }}
      </v-btn>

      <v-spacer></v-spacer>

      <!-- 로그인 했다면 -->
      <div v-if="user.user_no == 1">
        <div>
          <span>{{user.user_id}}님 반갑습니다. </span>
        <v-btn to="/list-user">관리자페이지</v-btn>
        <v-btn @click.prevent="onClickLogout">로그아웃</v-btn>
      </div>
      </div>

      <!-- 관리자가 아니라면 -->
      <div v-else-if="getAccessToken">
        <div>
        <span>{{user.user_id}}님 반갑습니다. </span>
        <v-btn to="/mypage">마이페이지</v-btn>
        <v-btn @click.prevent="onClickLogout">로그아웃</v-btn>
      </div>
      </div>
      <!-- 로그인을 안했다면 -->
      <div v-else>
        <div>
        <v-btn
          v-for="(login, index) in logins"
          :key="index"
          :to="login.path"
          text
        >
          {{ login.title }}
        </v-btn>
      </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

 <script>
import { mapGetters } from 'vuex';
import axios from 'axios';
// const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: 'Header',

  data() {
    return {
      user: '',
      isLogin: false,
      sidebar: false,
      menus: [
        { title: '부동산 정보', path: '/apt' },
        { title: '관심 매물', path: '/favorite' },
        { title: '공지 게시판', path: '/notice' },
      ],
      logins: [
        { title: '로그인', path: '/signin' },
        { title: '회원가입', path: '/signup' },
      ],
    };
  },
  updated() {
    // 가져온 Token값을 header에 넣어주는 작업 실시.
    axios.defaults.headers.common['auth-token'] = this.$store.state.accessToken;
    axios
      .get(`http://localhost:8090/vue/api/member/info`)
      .then((response) => {
        this.user = response.data.user;
      })
      .catch(() => {
        // this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
      });
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
  },
  methods: {
    onClickLogout() {
      this.$store
        .dispatch('LOGOUT')
        .then(() => this.$router.replace('/').catch(() => {}));
      this.$router.go();
    },
    refresh() {
      console.log(this.user);
    }
  },
};
</script>
