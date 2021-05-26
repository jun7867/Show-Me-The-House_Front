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
    >
    

      <template #cell(aptName)="row">
        <!-- 아파트 이름 누르면 상세페이지 이동? 모달?  -->
        <router-link :to="'detailApt?no=' + row.item.no">{{ row.item.aptName }}</router-link>
      </template>
      <template #cell(dealDate)="row">
        <p>{{row.item.dealYear}}.{{row.item.dealMonth}}</p>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
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
  </div>
</template>

<script>

export default {
  name: 'AptList',
  components: {
  },
  props: {
    aptlist: Array,
    dongCode: String,
  },
  data() {
    return {
      aptlistBydong: [],
      fields: [
            { key: 'no', label: 'No', sortable: true, sortDirection: 'desc' },
            { key: 'dong', label: '동 이름', sortable: true, sortDirection: 'desc' },
            { key: 'aptName', label: '아파트 이름', sortable: true, sortDirection: 'desc' },
            { key: 'dealAmount', label: '실거래(만원)', sortable: true, sortDirection: 'desc' },
            { key: 'dealDate', label: '거래 날짜', sortable: true, sortDirection: 'desc' },
            { key: 'buildYear', label: '지어진 년도', sortable: true, sortDirection: 'desc' },
            { key: 'floor', label: '층수', sortable: true, sortDirection: 'desc' }
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
    };
  },
  created() {
    this.totalRows = this.aptlist.length;
  },
  methods: {
    // selectImage: function(img) {
    //   this.$emit('select-img', img);
    // },
    onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
  },
};
</script>

