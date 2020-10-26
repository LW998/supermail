<template>
  <div class="detailNavbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="titleitem"
          :key="index"
          :class="{active:index===curIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import navBar from "../../../components/common/navbar/navBar";
export default {
  name: "detailNavbar",
  components: {
    navBar
  },
  data() {
    return {
      titles: ["商品", "详情", "参数", "推荐"],
      curIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.curIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      // this.$router.back();
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.detailNavbar {
  background-color: #fff;
  .back {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .title {
    display: flex;
    .titleitem {
      flex: 1;
    }
    .active {
      color: var(--color-high-text);
    }
  }
}
</style>
