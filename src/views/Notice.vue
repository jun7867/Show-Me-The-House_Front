<template>
  <div>
    <h4 class="text-center">공지사항 목록</h4>

    <div class="m-3 text-left" v-if="user.user_no ==1">
      <button class="btn btn-primary" @click="movePage">공지사항 등록</button>
    </div>
    <div v-if="notices.length > 0">
      <table class="table table-hover"  id="my-table">
        <colgroup>
          <col width="10%" />
          <col width="50%" />
          <col width="15%" />
          <col width="25%" />
        </colgroup>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
        <tr v-for="(notice, index) in notices" :key="index">
          <td>{{ notice.no }}</td>
          <td>
            <router-link :to="'detailNotice?no=' + notice.no">{{ notice.title }}</router-link>
          </td>
          <td v-text="notice.writer"></td>
          <td>{{ notice.regtime | toDate }}</td>
        </tr>
      </table>

      <!-- pagination -->
      <div class="mt-3">
        <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
      </div>

    </div>
    <div v-else>게시글이 없습니다.</div>
  </div>
</template>
<script>
// import http from '@/util/http-common.js'
import moment from "moment";
import { mapGetters} from "vuex";
import axios from 'axios';
export default {
  name: "notice",
  data() {
    return {
      user: '',
      perPage: 3,
      currentPage: 1,
    }
  },
  computed:{
    ...mapGetters(["notices",'getAccessToken', 'getUserId', 'getUserName']),
    rows() {
        return this.notices.length
      }
  },
  filters: {
    toDate: function (regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    }
  },
  methods: {
    movePage() {
      this.$router.push("/createNotice");
    }
  },
  created() {
     this.$store.dispatch("getNotices");
     
     axios.defaults.headers.common['auth-token'] = this.$store.state.accessToken;
    axios
      .get(`http://localhost:8090/vue/api/member/info`)
      .then((response) => {
        this.user = response.data.user;
        
      })
      .catch(() => {
        // this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
      });

    
  }
};
</script>
