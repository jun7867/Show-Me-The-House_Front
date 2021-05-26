<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="signin">
            <b-form-group label="Enter your user id">
                <b-form-input v-model="user.user_id" type="text"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter your password">
                <b-form-input v-model="user.pwd" type="password"></b-form-input>
            </b-form-group>
            <b-button size="lg" @click="signin">Signin</b-button>
        </form>
        <router-link :to="{ name:'Signup' }">Sigiup</router-link>
    </div>
    
</template>


<script>
// import axios from 'axios';
    // import axios from 'axios';
    export default{
        name: 'Signin',
        data: function() {
            return {
                user: {
                    user_id: '',
                    pwd: '',
                },
            msg: '',
            };
        },
        computed: {
            nextRoute() {
                return this.$route.params.nextRoute ? this.$route.params.nextRoute : '';
            },
        },
    methods: {
        signin: function() {
        this.$store
            .dispatch('LOGIN', {user_id: this.user.user_id, pwd: this.user.pwd})
            .then(() => this.$router.push(`/`))
            .catch(({ message }) => (this.msg = message));
        },
    },
    }

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

    .btn-lg {
        width: 100%;
    }
</style>
