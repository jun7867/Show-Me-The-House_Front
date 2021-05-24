<template>
  <!-- 검색된 아파트 리스트 정보 Vue -->
  <div>
    <v-card elevation="16" max-width="500" class="mx-auto">
      <v-virtual-scroll :items="aptlist" height="500" item-height="100">
        <template v-slot:default="{ item }">
          <v-list-item>
            <apt-list-item
              :key="item"
              :apt="item"
              @select-apt="selectApt"
              @select-img="selectImage"
            />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
import AptListItem from '@/components/AptListItem.vue';

export default {
  name: 'AptList',
  components: {
    AptListItem,
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
