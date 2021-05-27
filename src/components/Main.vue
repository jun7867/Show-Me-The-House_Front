<template>
  <v-container fluid style="width:100%">
    <!-- 홈 -->
    <v-carousel v-model="model" cycle height="600px">
      <v-carousel-item v-for="img in imgs" :key="img">
        <v-sheet color="#e0eeee" height="600px" tile>
          <img :src="img" style="height:600px; width:100%" />
          <v-container fill-height fluid pa-0 ma-0 pb-3>
            <v-layout fill-height align-end pb-4 mb-4>
              <v-flex xs12>
                <v-card color="black" class="pa-2">
                  <span class="headline white--text">Happy House</span>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <br /><br />
    <br />
    <v-row>
      <!-- 관심 매물 -->
      <v-col cols="4">
        <v-card class="mx-auto" max-width="100%" to="/favorite">
          <v-toolbar color="black" dark>
            <v-toolbar-title >관심 매물</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container>
            <v-row>
              <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                <v-card>
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title v-text="card.title"></v-card-title>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <!-- 아파트 정보 -->
      <v-col cols="8">
        <div class="around">
          <v-card class="mx-auto" max-width="100%">
            <v-tabs v-model="tab" grow color="white" dark height="65px">
              <v-tab v-for="item in items" :key="item">
                <p style="font-size:20px;">{{ item }}</p>
            </v-tab>
            </v-tabs>
            <b-card>
              <b-table
              :items="newlist"
              :fields="fields"
              stacked="md"
              show-empty
              small
              >
              </b-table>             
            </b-card>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Main',
  data: () => ({
    model: 0,
    imgs: [
      require('../assets/khome1.jpeg'),
      require('../assets/khome2.jpeg'),
      require('../assets/home1.jpg'),
      require('../assets/home2.jpg'),
    ],
    tab: null,
    items: ['최신 실거래 아파트 매물'],
    fields: [
            { key: 'dong', label: '동 이름' },
            { key: 'aptName', label: '아파트 이름'},
            { key: 'buildYear', label: '지어진 년도'},
            { key: 'floor', label: '층수'},
        ],
    newlist:[],
    articles: [],
    cards: [
      {
        title: '관심 매물',
        src: 'img/apt3.jpg',
        flex: 12,
      },
    ],
  }),
   
  created() {
    axios
        .get(`http://localhost:8090/api/room/apt/newlist`)
        .then(({ data }) => {
        this.newlist = data;
        console.log(this.newlist);
        })
        .catch(err => {
            console.log(err);
            alert("오류 발생!!");
        });
<<<<<<< HEAD

  },
=======
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

>>>>>>> dadf9e234613b8d1574b2766d34ba001dbbfcd4d
};
</script>
