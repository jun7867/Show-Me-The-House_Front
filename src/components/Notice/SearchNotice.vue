<template>
  <div style="margin-top: 80px;">
    <h4 class="text-center" v-text="notice.title"></h4>
    <table class="table table-condensed w-100 border" v-if="notice">
      <tr>
        <th>번호</th>
        <td v-text="notice.no"></td>
      </tr>
      <tr>
        <th>글쓴이</th>
        <td v-text="notice.writer"></td>
      </tr>

      <tr>
        <th>날짜</th>
        <td>{{ notice.regtime | toDate }}</td>
      </tr>
      <tr>
        <th colspan="2">내용</th>
      </tr>
    </table>
    <div style="height: 200px;" class="md-3" v-text="notice.content"></div>


    <div v-if="notice.comment != null">
      <div v-text="notice.comment" class="border"></div>
    </div>

    <div v-if="notice.comment == null">
      <h4>댓글 등록</h4>
      <textarea id="comment" v-model.lazy="notice.comment" ref="comment" cols="50" rows="5" ></textarea>
      <button class="btn btn-primary" @click="uploadComment">댓글 등록</button>
    </div>


    <div class="mt-3">
      <router-link class="btn btn-primary text-light" to="/notice">목록</router-link>
      <router-link v-if="user.user_no == 1" class="btn btn-primary text-light" :to="'/updateNotice?no=' + notice.no">수정</router-link>
      <router-link v-if="user.user_no == 1" class="btn btn-primary text-light" :to="'/removeNotice?no=' + notice.no">삭제</router-link>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import moment from "moment";
import {mapGetters} from "vuex";
import axios from 'axios';
export default {
  data() {
    return {
      user: '',
    }
  },
   computed:{
    ...mapGetters(["notice",'getAccessToken', 'getUserId', 'getUserName'])
  },
  filters: {
    toDate: function (regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    }
  },
  created() {
    this.$store.dispatch('getNotice', `/board/${this.$route.query.no}`)
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
  methods:{
     moveHandler: function() {
       console.log("comment : "+this.notice);
      this.$router.push("'detailNotice?no=' + notice.no");
    }

  }
};
</script>