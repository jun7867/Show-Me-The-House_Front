<template>
  <!-- 카카오맵 Vue -->
  <div>
    <div id="map" style="width:100%;height:500px;"></div>

    <div hidden>
      {{ aptlist }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'KakaoMap',
  data() {
    return {
      container: Document,
    };
  },
  props: {
    si: String,
    gugun: String,
    dong: String,
    aptlist: Array,
  },
  created(){
      this.initMap();
  },
  mounted() {
    // window.kakao && window.kakao.maps ?  : this.addScript();
    this.addScript();
  },
  updated() {
    this.addMarker();
  },
  methods: {
    initMap() {
      this.container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.497954, 127.027564),
        level: 3,
      };
      let map = new kakao.maps.Map(this.container, options);
      //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
        position: map.getCenter(),
      });
      marker.setMap(map);
    },
    addScript() {
      console.log("addScript");
      const script = document.createElement('script'); /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3d3e4d2226d1bf814c7613dcb9393af5&libraries=services';
      document.head.appendChild(script);
    },
    addMarker() {
      console.log("addMarker");
      var mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      }; // 지도를 생성합니다
      var map = new kakao.maps.Map(this.container, mapOption); // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder(); // 주소로 좌표를 검색합니다
      var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

      // 해당 동에 아파트 거래내역이 없으면 해당 동으로 위치 조정
      if (this.aptlist.length == 0) {
        var addrFullName = this.si + ' ' + this.gugun + ' ';

        geocoder.addressSearch(addrFullName, function(result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            }); // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                '해당 도시에 거래 내역이 없습니다.' +
                '</div>',
            });
            infowindow.open(map, marker); // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            marker.setMap(map);
            map.setCenter(coords);
          }
        });
      }

      this.aptlist.forEach((element) => {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        var addrFullName =
          this.si +
          ' ' +
          this.gugun +
          ' ' +
          element.법정동 +
          ' ' +
          element.도로명;

        geocoder.addressSearch(addrFullName, function(result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage, // 마커 이미지
              title: element.아파트,
            }); // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                addrFullName +
                ' ' +
                element.아파트 +
                '</div>',
            });
            infowindow.open(map, marker); // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            marker.setMap(map);
            map.setCenter(coords);
          }
        });
      });
    },
  },
};
</script>
