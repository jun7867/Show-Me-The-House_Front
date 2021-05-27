<template>
  <b-container fluid>
    <!-- User Interface controls -->
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
          label-cols-lg="3"
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

      <!-- <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col> -->
    </b-row>
    <div class="form-row float-right"> <b-button size="md" @click="moveCreate" class="mr-1" variant="light">회원 등록</b-button></div>
    <!-- Main table element -->
    <b-table
      :items="users"
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
    >
    

      <template #cell(actions)="row">
        <b-button size="sm" @click="moveUpdate(row.item.user_no)" class="mr-1" variant="light">수정
        </b-button>
        <b-button size="sm" @click="deleteMember(row.item.user_no)" variant="light">삭제
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-col sm="7" md="6" class="my-1 mx-auto" >
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

  
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
          users: [],
        fields: [
            { key: 'user_no', label: 'No', sortable: true, sortDirection: 'desc' },
            { key: 'user_id', label: 'ID', sortable: true, sortDirection: 'desc' },
            { key: 'name', label: 'Name', sortable: true, sortDirection: 'desc' },
            { key: 'email', label: 'E-Mail', sortable: true, sortDirection: 'desc' },
            { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: []
      }
    },
    mounted() {
      this.totalRows = this.users.length
    },
    created() {
        axios
        .get(`http://localhost:8090/vue/api/member/`)
        .then(({ data }) => {
        this.users = data;
        this.totalRows = data.length;
        console.log("list......", data);
        })
        .catch(err => {
            console.log(err);
            alert("오류 발생!!");
        });
    },
    methods: {
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      moveCreate() {
        this.$router.push("/signup");
        },
        moveUpdate(no) {
        this.$router.push('update-user?no=' + no);
        },
        deleteMember(no){
            axios
                .delete(`http://localhost:9999/vue/api/member/` + no)
                .then((response) => {
                    if (response.data == 'success') {
                        alert('삭제처리를 하였습니다.');
                        this.$router.go();
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
    }
  }
</script>