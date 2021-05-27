<template>
  <v-row >
    <v-col>
      <input
        type="text"
        v-model="aptname"
        placeholder="아파트 이름를 입력하세요."
        @keypress.enter="aptName"
        style="width: 40%; padding:5px"
        class="border"
      />
      <v-btn @click="aptName">검색</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      aptname: '',
    };
  },
  methods: {
    aptName: function() {
      console.log(this.aptname);
      this.$emit('apt-name', this.aptname); //발생할 이벤트 이름, 보낼 데이터
    },
  },
};
</script>

<style></style>
