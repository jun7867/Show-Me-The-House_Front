<template>
  <!-- 검색된 아파트 리스트 정보 Vue -->
  <div>
    <v-card elevation="16" max-width="1400" class="mx-auto">
      <v-virtual-scroll :items="aptlist" height="500" item-height="500">
        <div v-if="aptlist.length > 0">
          <table class="table table-hover"  id="my-table">
            <colgroup>
               <col width="10%" />
              <col width="20%" />
              <col width="20%" />
              <col width="13%" />
              <col width="13%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <tr>
              <th>No.</th>
              <th>동 이름</th>
              <th>아파트 이름</th>
              <th>실거래(만원)</th>
              <th>거래 날짜</th>
              <th>지어진 년도</th>
              <th>층수</th>
            </tr>
            <tr v-for="(apt, index) in aptlist" :key="index">
              <td>{{ apt.no }}</td>
              <td>{{ apt.dong }}</td>
              <!-- <td v-text="apt.aptName"> -->
                <router-link :to="'detailApt?no=' + apt.no">{{ apt.aptName }}</router-link>
              <!-- </td> -->
              <td v-text="apt.dealAmount">만원</td>
              <td>{{apt.dealYear}}.{{apt.dealMonth}}</td>
              <td v-text="apt.buildYear"></td>
              <td v-text="apt.floor"></td>
            </tr>
          </table>

            <!-- pagination -->
            <div class="mt-3">
              <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
            </div>

          </div>
          <div v-else>아파트 정보가 없습니다.</div>
        <!-- <template v-slot:default="{ item }">
          <v-list-item>
            <apt-list-item
              :key="item"
              :apt="item"
              @select-apt="selectApt"
              @select-img="selectImage"
            />
          </v-list-item>
        </template> -->
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
// import AptListItem from '@/components/AptListItem.vue';

export default {
  name: 'AptList',
  components: {
    // AptListItem,
  },
  props: {
    aptlist: Array,
    dongCode: String,
  },
  data() {
    return {
      aptlistBydong: [],
    };
  },
  methods: {
    selectApt: function(apt) {
      this.$emit('select-apt', apt);
    },
    selectImage: function(img) {
      this.$emit('select-img', img);
    },
  },
};
</script>

<style></style>
