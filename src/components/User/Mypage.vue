<template>
        <b-card id="tableCard"  class="card w-20">
            <template #header>
                <h4 class="mb-0">My Page</h4>
                </template>
            <b-list-group flush>
            <b-list-group-item><h5>User No : </h5> {{ user.user_no }}</b-list-group-item>
            <b-list-group-item><h5>ID : </h5> {{ user.user_id }}</b-list-group-item>
            <b-list-group-item><h5>Name : </h5>{{ user.name }}</b-list-group-item>
            <b-list-group-item><h5>E-Mail : </h5>{{ user.email }}</b-list-group-item>
            </b-list-group>
    <br />
    <div>
        <b-button name="수정하기" @click="moveUpdate(user.user_no)" class="mr-1">수정하기</b-button>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <b-button name="탈퇴하기" @click="deleteMember(user.user_no)">탈퇴하기</b-button>
      <br />
      <br />
    </div>
  </b-card>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            user: {},
        }
    },
    created() {
        axios.defaults.headers.common['auth-token'] = this.$store.state.accessToken;
        axios
        // .get(`http://localhost:9999/vue/api/member/info`)
        .get(`http://localhost:8090/vue/api/member/id/${this.$store.state.userId}`)
        .then((response) => {
            this.user = response.data;
        })
        .catch(() => {
            // this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
        });
    },
    methods: {
        moveUpdate(no) {
        this.$router.push('update-user?no=' + no);
        },
        deleteMember(no){
            axios
                .delete(`http://localhost:8090/vue/api/member/` + no)
                .then((response) => {
                    if (response.data == 'success') {
                        alert('삭제처리를 하였습니다.');
                        this.$router.replace(`/${this.nextRoute}`);
                        this.$store
                            .dispatch('LOGOUT')
                    } else {
                        alert('삭제처리를 하지 못했습니다.');
                        this.$router.push('/');
                    }
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        }
    },

}
</script>

<style>
#tableCard {
  width: 800px;
  align-self: center;
  margin-left: auto; 
  margin-right: auto;
}
#dataText {
  text-align: left;
}
</style>