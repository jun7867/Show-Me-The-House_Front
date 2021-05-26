<template>
    <div>
        <h1>Signup Form</h1>
        <form @submit.prevent="signup">
            <b-form-group label="Enter your user id">
                <b-form-input type="text" v-model="user_id"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter your user name">
                <b-form-input type="text" v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter your password">
                <b-form-input type="password" v-model="pwd"></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm password">
                <b-form-input type="password" v-model="cfmpwd"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter your email">
                <b-form-input type="text" v-model="email"></b-form-input>
            </b-form-group>
            <b-button size="lg" type="submit">Signup</b-button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Signup',
        data () {
            return {
                user_id: '',
                pwd: '',
                cfmpwd: '',
                name: '',
                email: ''
            };
        },
        computed: {
            nextRoute() {
                return this.$route.params.nextRoute ? this.$route.params.nextRoute : '';
            },
        },
        methods: {
            async signup () {

                if(!this.user_id){
                    alert("아이디를 입력해주세요");
                    return false;
                }
                if(!this.name){
                    alert("이름을 입력해주세요");
                    return false;
                }
                if(!this.pwd){
                    alert("비밀번호를 입력해주세요");
                    return false;
                }
                if(!this.cfmpwd){
                    alert("확인 비밀번호를 입력해주세요");
                    return false;
                }
                if (this.pwd != this.cfmpwd){
                    alert("입력한 비밀번호를 확인해주세요");
                    return false;
                }
                if(!this.email){
                    alert("이메일을 입력해주세요");
                    return false;
                }

                const response = await axios.post('http://localhost:8090/vue/api/member', {
                    user_id: this.user_id,
                    pwd: this.pwd,
                    cfmpwd: this.cfmpwd,
                    name: this.name,
                    email: this.email
                })
                .then((response) => {
                    if (response.data == 'success') {
                        alert('회원가입이 완료하였습니다.');
                        this.$router.replace(`/${this.nextRoute}`);
                    } else {
                        alert('회원가입이 실패하였습니다.');
                    }
                });
                console.log(response)
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
    width: 600px;
    margin: 60px auto 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .btn-lg {
        width: 100%;
    }
</style>
