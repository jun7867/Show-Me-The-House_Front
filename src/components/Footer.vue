<template>
  <v-footer dark padless default>
    <v-card flat tile class="gray lighten white--text text-center">

      <v-card-text class="white--text pt-0 mt-10">
        <div>
          <a href="" >이용약관</a> 
          <a href="" class="m-3">개인정보처리방침</a> <a href="">부동산 고객센터</a>
          <br />
          <b>준영 호현</b> 본 사이트는 SSAFY에 지원을 받아 만들어진 사이트입니다. 무단 배포를 금지합니다.
          <br /> 문의: jjune095@gmail.com 
          <br />@Copyright @Jun. All Right Reserved.
        </div>
      </v-card-text>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Show Me The Home</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  
};
</script>

<style scoped>
v-footer {
  width: 100%;
}
v-card {
  width: 100%;
}
v-card-text {
  width: 100%;
  text-align: center;
}
div {
  width: 100%;
}
</style>
