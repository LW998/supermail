<template>
  <div class="recommend">
    <div
      class="recommendItem"
      v-for="(item, index) in recommends"
      :key="index"
      @click="itemClick(index)"
    >
      <div class="recommendImg">
        <img v-lazy="item.image" alt @load="recimgLoad" />
      </div>
      <div class="recommendInfo">
        <p class="title">{{ item.title }}</p>
        <p class="price">¥{{ item.mlsDiscountPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      if (this.$route.path !== "/detail/" + this.recommends[index].iid) {
        this.$router.push("/detail/" + this.recommends[index].iid);
        this.$router.go(0);
      }
      //   this.$route.path !== "/detail?iid=" + this.recommends[index].iid?
      //   this.$router.push({
      //     path: "/detail",
      //     query: { iid: this.recommends[index].iid }
      //   });
      // : null;
    },
    recimgLoad() {
      this.$emit("recimgLoad");
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .recommendItem {
    width: 32%;
    margin-right: 2%;
    margin-bottom: 10px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .recommendImg {
      height: 145px;
      overflow: hidden;
      img {
        width: 100%;
        visibility: inherit;
        display: inherit;
        vertical-align: middle;
      }
    }

    .recommendInfo {
      font-size: 13px;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
      }
      .price {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
