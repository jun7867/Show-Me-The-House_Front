<template>
  <!-- 검색된 아파트 리스트 정보 Vue -->
  <div>
    <b-container fluid>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="검색"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="2" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="5"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

    </b-row>
    <!-- Main table element -->
    <b-table
      :items="aptlist"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      data-toggle="table"
    >
    

      <template #cell(dealDate)="row">
        <p>{{row.item.dealYear}}.{{row.item.dealMonth}}</p>
      </template>
      <template #cell(detail)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template #cell(favorite)="row">
        <b-button size="sm" @click="addFavorite(row)" > 등록 / 삭제 </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <img src="@/assets/apt/apt1.jpg" />
            <img src="@/assets/apt/aptDetail.png" />
            <p>아파트 평수: {{row.item.area}}</p>
            <li v-for="(value, key) in row.item" :key="key">
              <!-- {{ key }}: {{ value }} -->
              </li> 
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-col sm="7" md="6" class="my-1 mx-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
  </b-container>

  <LineChart
    :aptlist="aptlist"
  />
  
  <div style="width:800px">
    
  </div>  

  </div>
</template>

<script>

import axios from 'axios';
import LineChart from '@/components/LineChart.vue'


export default {
  name: 'AptList',
  components: {
    LineChart,
  },
  props: {
    aptlist: Array,
    dongCode: String,
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      },
      fields: [
            { key: 'no', label: 'No', sortable: true, sortDirection: 'desc' },
            { key: 'dong', label: '동 이름', sortable: true, sortDirection: 'desc' },
            { key: 'aptName', label: '아파트 이름', sortable: true, sortDirection: 'desc' },
            { key: 'dealAmount', label: '실거래(만원)', sortable: true, sortDirection: 'desc' },
            { key: 'dealDate', label: '거래 날짜', sortable: true, sortDirection: 'desc' },
            { key: 'buildYear', label: '지어진 년도', sortable: true, sortDirection: 'desc' },
            { key: 'floor', label: '층수', sortable: true, sortDirection: 'desc' },
            { key: 'detail', label: '상세 보기', sortable: true, sortDirection: 'desc' },
            { key: 'favorite', label: '관심매물'}
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        name: 'favorite',
        selelcted: [],
    };
  },
  created() {
    this.totalRows = this.aptlist.length;

    // 가져온 Token값을 header에 넣어주는 작업 실시.
    axios.defaults.headers.common['auth-token'] = this.$store.state.accessToken;
    axios
    .get(`http://localhost:8090/vue/api/member/info`)
    .then((response) => {
        this.user = response.data.user;
        console.log("user : "+ this.user.user_no);
    })
    .catch(() => {
        // this.$store.dispatch('LOGOUT').then(() => this.$router.replace('/'));
        });

  },
  methods: {
    onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    favorite (row) {
      console.log(row.field.value);
    },
    addFavorite(row){
      if(this.user == ''){
        alert("로그인 후 이용해주세요");
      }else if(row.item.value == true){
        this.deleteFavorite(row.item.no);
        row.item.value = false;
      }
      else {
              axios
                .post(`http://localhost:8090/api/favorite`, {housedeal_no: row.item.no, user_no: this.user.user_no})
                .then((response) => {
                    if (response.data == 'success') {
                        alert('관심매물로 등록하였습니다.');
                    } else {
                        alert('관심매물로 등록하지 못했습니다.');
                        this.$router.push('/');
                    }
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
                row.item.value = true;
      }
    },
    deleteFavorite(no){
        axios
                .delete(`http://localhost:8090/api/favorite/${this.user.user_no}/` + no)
                .then((response) => {
                    if (response.data == 'success') {
                        alert('관심매물 목록에서 삭제되었습니다.');
                    } else {
                        alert('관심매물 목록에서 삭제하지 못했습니다.');
                        // this.$router.push('/');
                    }
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
      }
  },
};
</script>

<style>
    .favoriting{
        display: inline-block
    }
    .favorite__heart {
        display: inline-block;
        padding: 3px;
        vertical-align: middle;
        line-height: 1;
        font-size: 16px;
        color: #ABABAB;
        cursor: pointer;
        -webkit-transition: color .2s ease-out;
        transition: color .2s ease-out;
    }
    .favorite__heart.is-disabled:hover {
        cursor: default;
    }
    .favorite__checkbox {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
    }
    .favorite__heart__selected{
        color: #df470b;
    }
    li{
      list-style: none
      }
</style>