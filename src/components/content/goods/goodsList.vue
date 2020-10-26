<template>
  <div class="goods">
    <goods-item v-for="(item,index) in goods" :key="index" :goodsItem="item"></goods-item>
    <div class="noMore" v-show="isnoMore">没有更多数据了</div>
    <div class="first" v-show="firstLoad">正在加载中...</div>
    <div class="noMore" v-show="!isnoMore">
      <span>正在加载中...</span>
    </div>
  </div>
</template>

<script>
import goodsItem from "./goodsItem";
export default {
  name: "goodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    },
    isnoMore: {
      type: Boolean,
      default() {
        return false;
      }
    },
    firstLoad: {
      type: Boolean,
      default() {
        return true;
      }
    }
    // isLoadMore: {
    //   type: Boolean,
    //   default() {
    //     return true;
    //   }
    // }
  },
  components: {
    goodsItem
  }
};
</script>

<style scoped>
.goods {
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  clear: both;
}
.noMore {
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.first {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
