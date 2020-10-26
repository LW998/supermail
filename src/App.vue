<template>
  <div id="app">
    <keep-alive exclude="Home,detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-Bar v-show="isShow"></main-tab-Bar>
  </div>
</template>

<script>
import MainTabBar from "../src/components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  data() {
    return {
      isShow: true,
      rush: false
    };
  },
  components: {
    MainTabBar
  },
  watch: {
    $route: {
      handler: function(value, oldVal) {
        let reg = /^\/(home|category|cart|profile)$/;
        this.isShow = reg.test(value.path);
      },
      // 深度观察监听
      deep: true
    }
    // $route(to, from) {
    //   if (!this.rush) {
    //     this.$router.go(0);
    //     this.rush = true;
    //   }
    // }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
