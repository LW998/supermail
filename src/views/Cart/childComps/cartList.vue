<template>
  <div class="lists">
    <scroll class="content" ref="scrolls">
      <div class="list">
        <cart-list-item v-for="(item,index) in len" :products="item" :i="index" :key="index"></cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../../../components/common/betterScroll/Scroll";
import cartListItem from "./cartListItem";

import { mapGetters } from "vuex";
export default {
  name: "cartList",
  computed: {
    ...mapGetters({
      len: "cartLists"
    })
  },
  activated() {
    this.$refs.scrolls.refresh();
  },
  components: {
    cartListItem,
    scroll
  }
};
</script>

<style lang="less" scoped>
.lists {
  height: 100vh;
  .content {
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: #dddddd40;
    .list {
      width: 100%;
      display: flex;
      flex-flow: column wrap;
    }
  }
}
</style>