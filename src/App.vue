<template>
  <v-app id="app" data-app>
    <NavHeader />
    <div style="height: 130px;"> </div>
    <div style="height: 100%;">
    <router-view />
    </div>
    <Footer />
  </v-app>
</template>

<script>
import NavHeader from '@/components/NavHeader';
import Footer from '@/components/Footer';
export default {
  name:'App',
  components:{
    NavHeader,
    Footer
  },
  data: () => (
    {

    }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>