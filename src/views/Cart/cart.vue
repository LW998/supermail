<template>
  <div class="carts">
    <nav-bar class="navBar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" class="manger" @click="magerClick">{{remove?'完成':'管理'}}</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar :isRemove="remove"></cart-bottom-bar>
  </div>
</template>

<script>
import navBar from "../../components/common/navbar/navBar";

import cartBottomBar from "./childComps/cartBottomBar";
import cartList from "./childComps/cartList";

import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    cartList,
    cartBottomBar,
    navBar
  },
  data() {
    return {
      remove: false
    };
  },
  computed: {
    // ...mapGetters(["cartLength"])
    ...mapGetters({
      length: "cartLength"
    })
  },
  methods: {
    magerClick() {
      this.remove = !this.remove;
    }
  }
};
</script>
<style lang="less" scoped>
.carts {
  .navBar {
    position: fixed;
    z-index: 9;
    width: 100%;
    background-color: #ff8198;
    color: #fff;
  }
  .manger {
    font-size: 15px;
  }
}
</style>
