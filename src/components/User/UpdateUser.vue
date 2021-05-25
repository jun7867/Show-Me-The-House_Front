<template>
    <div>
        <h2>회원정보 수정</h2>
        <form @submit.prevent="updateMember">
            <b-form-group label="ID">
                <b-form-input type="text" v-model="user.user_id"></b-form-input>
            </b-form-group>
            <b-form-group label="Name">
                <b-form-input type="text" v-model="user.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
                <b-form-input type="password" v-model="user.pwd"></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input type="text" v-model="user.email"></b-form-input>
            </b-form-group>
            <b-button size="lg" variant="success" type="submit">Update</b-button>
        </form>
    </div>
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
        .get(`http://localhost:9999/vue/api/member/${this.$route.query.no}`)
        .then((response) => {
            this.user = response.data;
        })
        .catch(() => {
            // this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
        });
    },
    methods: {
        updateMember(){
            axios
            .put(`http://localhost:9999/vue/api/member`, this.user)
            .then((response) => {
                if(response.data == 'success'){
                    alert("회원정보가 수정되었습니다.");
                    this.$router.go(-1);
                }else{
                    alert("회원정보가 수정되지 못했습니다.");
                }
            });
            this.submitted = true;
        },

    },

}
</script>

<style>

</style>