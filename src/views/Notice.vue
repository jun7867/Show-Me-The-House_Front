<template>
  <div>
    <h4 class="text-center">공지사항 목록</h4>
    <div class="text-right">
      <button class="btn btn-primary" @click="movePage">등록</button>
    </div>
    <div v-if="notices.length > 0">
      <table class="table table-boardered table-condensed">
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
    </div>
    <div v-else>게시글이 없습니다.</div>
  </div>
</template>
<script>
// import http from '@/util/http-common.js'
import moment from "moment";
import { mapGetters} from "vuex";
export default {
  name: "notice",
  computed:{
    ...mapGetters(["notices"])
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
  }
};
</script>
