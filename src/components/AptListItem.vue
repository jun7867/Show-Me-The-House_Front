<template>
  <!-- 검색된 아파트 하나씩의 정보 Vue -->
  <div
    style="margin: 10px;"
    @click="selectedApt"
    @mouseover="bgColorChange(true)"
    @mouseout="bgColorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <img
      :src="selectedImage"
      style="height:64px; width=100px;"
      class="img-list"
      alt=""
    />
    [{{ apt.일련번호 }}]
    {{ apt.아파트 }}
  </div>
</template>

<script>
export default {
  name: 'AptListItem',
  data() {
    return {
      isColor: false,
      images: [
        require('@/assets/apt/apt.png'),
        require('@/assets/apt/apt1.jpg'),
        require('@/assets/apt/apt2.jpg'),
        require('@/assets/apt/apt3.jpg'),
        require('@/assets/apt/apt4.jpg'),
        require('@/assets/apt/apt5.jpg'),
      ],
      selectedImage: '',
    };
  },
  created() {
    console.log('아파트 그림 ');
    const idx = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[idx];
  },
  props: {
    apt: Object,
  },
  methods: {
    selectedApt: function() {
      this.$emit('select-apt', this.apt);
      this.$emit('select-img', this.selectedImage); // 선택된 이미지 부모로 event
    },
    bgColorChange: function(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style>
.img-list {
  height: 64px;
  width: 100px;
}
.mouse-over-bgcolor {
  background-color: #e0eeee;
  font-size: 13pt;
}
</style>
