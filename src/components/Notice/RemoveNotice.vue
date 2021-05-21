<template>
  <div>삭제중...</div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    // let no = new URL(document.location).searchParams.get("no");

    const no = this.$route.query.no;
    axios
      .delete(`http://localhost:8090/api/board/${no}`)
      .then(({ data }) => {
        if (data == "success") {
          alert("삭제 완료!!!");
          this.$router.push("/notice");
        } else {
          alert("삭제중 오류 발생");
          this.$router.push(`'/detailNotice?no='+${no}`);
        }
      })
      .catch(() => {
        alert("삭제중 오류 발생");
        this.$router.push(`'/detailNotice?no='+${no}`);
      });
  }
}
</script>
