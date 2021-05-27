<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h2>부동산 매매 정보</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex" cols="4" sm="4">
          <v-select
            label="검색 옵션"
            :items="options"
            v-model="isSearchDong"
            max-height="auto"
            autocomplete
          />
        </v-col>
      </v-row>

      <!-- 시,군구,동 별 검색 -->
      <v-row v-if="isSearchDong == '동별 검색' ">
        <v-col class="d-flex" cols="4" sm="4">
          <v-select
            label="시"
            :items="sidos"
            v-model="selectSido"
            item-text="sidoName"
            item-value="sidoCode"
            max-height="auto"
            autocomplete
            v-on:change="selectedSido"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.sidoName }}
            </template>
          </v-select>
        </v-col>
        <v-col class="d-flex" cols="4" sm="4">
          <v-select
            label="구/군"
            :items="guguns"
            v-model="selectGugun"
            item-text="gugunName"
            item-value="gugunCode"
            max-height="auto"
            autocomplete
            v-on:change="selectedGugun"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.gugunName }}
            </template>
          </v-select>
        </v-col>
        <v-col  class="d-flex" cols="4" sm="4">
          <v-select
            label="동"
            v-bind:items="dongs"
            v-model="selectDong"
            item-text="dongName"
            item-value="dongName"
            max-height="auto"
            autocomplete
            v-on:change="selectedDong"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.dongName }}
            </template>
          </v-select>
        </v-col>
      </v-row>

      <!-- 아파트 검색을 누르면 나오는 검색창 -->
      <v-col v-else-if="isSearchDong == '아파트별 검색'">
          <apt-search-bar @apt-name="sendAptName" />
        </v-col>
     <v-row>
        <h3>총 {{ apts.length }} 개의 결과물이 있습니다.</h3>
      </v-row>
      <v-row>
        <v-col cols="12"
          ><KakaoMap
            :si="sidoName"
            :gugun="gugunName"
            :dong="selectDong"
            :aptlist="apts"
        /></v-col>
      </v-row>

      <div style="height: 150px">
      </div>
      <apt-list
                  :aptlist="apts"
                  @select-apt="selectedApt"
                />
    </v-container>
    
    
  </div>
</template>
<script>

import KakaoMap from '@/components/KakaoMap.vue';
import { mapGetters} from "vuex";
import AptSearchBar from '@/components/Apt/AptSearchBar.vue';
import AptList from '@/components/Apt/AptList.vue';
export default {
  name: 'Apt',
  components: {
    KakaoMap,
    AptSearchBar,
    AptList,
  },
  data() {
    return {
      dongCode: '',
      selectApt: '', // AptList에서 선택된 아파트
      selectImage: '', // AptList에서 선택된 아파트 이미지
      selectSido: '', // 시도 코드
      selectGugun: '', // 구군 코드
      selectDong: '', // 동 이름
      dongName: '',
      isSearchDong: 0, // 선택한 option String
      options: [
        "동별 검색",
        "아파트별 검색"
      ],
    };
  },
  created() {
    this.$store.dispatch("getSidos");
  },
  computed:{
    ...mapGetters(["sidos","guguns","dongs","sidoName","gugunName","apts"]),
  },
  methods: {
    sendAptName: function(aptname) {
      this.$store.dispatch("getAptName",`/room/apt/aptName/`+aptname);
    },
    sendDongName: function() {
      console.log(this.selectDong+"@@@");
      this.$store.dispatch("getAptName",`/room/apt/dong/`+this.selectDong);
    },
    selectedApt: function(apt) {
      this.selectApt = apt;
    },
    selectedImage: function(img) {
      this.selectImage = img;
    },
    selectedSido: function() {
      this.$store.dispatch("getGuguns",`/map/sido/`+this.selectSido);
    },
    selectedGugun: function() {
      this.$store.dispatch("getDongs",`/map/sido/gugun/`+this.selectGugun);
    },
    selectedDong: function() {
      this.$store.dispatch("getSidoName",`/map/getSiName/`+this.selectSido);
      this.$store.dispatch("getGugunName",`/map/getGugunName/`+this.selectGugun);
      console.log(this.gugunName);
      console.log(this.selectDong);
      this.sendDongName();
      // 시,군,동에 연결된 정보들 여기서 연결 가능..! (상가 정보?)
    },
  },
};
</script>

<style>
#aptdetail {
  align-content: center;
  height: 600px;
  width: 100%;
  border: 1px solid black;
}
</style>
