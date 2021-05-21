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
        <th>내용</th>
        <td colspan="2" v-text="notice.content"></td>
      </tr>
    </table>

    <div v-if="notice.comment != null">
      <h4>댓글</h4>
      <div v-text="notice.comment"></div>
    </div>

    <div v-if="notice.comment == null">
      <h4>댓글 등록</h4>
      <textarea id="comment" v-model.lazy="notice.comment" ref="comment" cols="50" rows="5" ></textarea>
      <button class="btn btn-primary" @click="updateHandler">등록</button>
    </div>


    <div class="text-right ">
      <router-link class="btn btn-primary text-light" to="/notice">목록</router-link>
      <router-link class="btn btn-primary text-light" :to="'/updateNotice?no=' + notice.no">수정</router-link>
      <router-link class="btn btn-primary text-light" :to="'/removeNotice?no=' + notice.no">삭제</router-link>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
   computed:{
    ...mapGetters(["notice"])
  },
  filters: {
    toDate: function (regtime) {
      return moment(new Date(regtime)).format("YYYY.MM.DD");
    }
  },
  created() {
    this.$store.dispatch('getNotice', `/board/${this.$route.query.no}`)
  },
  methods:{
    // updateHandler: function() {
    //   //데이타 검증
    //   let err = true;
    //   let msg = "";

    //   !this.comment && ((msg = "댓글을 입력해 주세요"), (err = false), this.$refs.comment.focus());

    //   if (!err)
    //     alert(msg);
    //   else {
    //     console.log("............update:comment");
    //     axios
    //       .put(`http://localhost:8090/api/board`, {
    //         no: this.notice.no,
    //         title: this.notice.title,
    //         writer: this.notice.writer,
    //         content: this.notice.content,
    //         comment: this.notice.comment
    //       })
    //       .then(({ data }) => {
    //         if (data == "success") {
    //           console.log("update................", data);
    //           alert("수정 완료!!!");
    //           this.moveHandler();
    //         } else {
    //           alert("수정 중 오류 발생");
    //         }
    //       })
    //       .catch(() => {
    //         alert("오류 발생");
    //       });
    //   }
    // },
     moveHandler: function() {
       console.log("comment : "+this.notice);
      this.$router.push("'detailNotice?no=' + notice.no");
    }

  }
};
</script>