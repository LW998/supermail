<template>
  <div class="swiperContent">
    <swiper class="detailSwiper">
      <swiper-item v-for="(item, index) in swiperImgs" :key="index">
        <img v-lazy="item" alt class="swiperItem" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper";
export default {
  name: "detailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    swiperImgs: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="less">
.swiperContent {
  background-color: #fff;
  .detailSwiper {
    margin: 0 auto;
    .swiperItem {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
