<template>
  <div class="goodsitem" @click="itemClick">
    <img v-lazy="goodsItem.image" alt class="goodsitem-img" @load="imageLoad" />
    <p class="goodsitem-title">{{ goodsItem.title }}</p>
    <div class="goods_info">
      <span class="xs">限时价</span>
      <span class="goodsitem-msprice">¥{{ goodsItem.mlsDiscountPrice }}</span>
      <span class="goodsitem-price">
        <del>¥{{ goodsItem.price }}</del>
      </span>
    </div>
    <p class="buy">立即购买</p>
  </div>
</template>

<script>
export default {
  name: "goodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("imgLoad");
    },
    itemClick() {
      this.$route.path !== "/detail/" + this.goodsItem.iid
        ? this.$router.push("/detail/" + this.goodsItem.iid)
        : null;

      // this.$route.path !== "/detail?iid=" + this.goodsItem.iid
      //   ? this.$router.push({
      //       path: "/detail",
      //       query: { iid: this.goodsItem.iid }
      //     })
      //   : null;
    }
  }
};
</script>

<style lang="less">
.goodsitem {
  width: 48%;
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 1%;
  border-top-left-radius: 5px 4px;
  border-top-right-radius: 5px 4px;
  &:nth-of-type(odd) {
    float: left;
  }
  &:nth-of-type(even) {
    float: right;
  }
  .goodsitem-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
    line-height: 22px;
    vertical-align: bottom;
    padding: 0 5px;
    color: #333333;
    font-size: 13px;
    margin: 0;
  }
  .goods_info {
    display: block;
    height: 20px;
    width: 100%;
    margin: 5px auto 0;
    padding: 0 5.14%;
    line-height: 1;
    background-image: none;
    overflow: hidden;
    .xs {
      border: 1px solid #ff5777;
      border-radius: 1px;
      background-color: #fff;
      color: #ff5777;
      font-size: 10px;
      line-height: 14px;
      display: inline-block;
      padding: 0 0.4px;
      vertical-align: middle;
    }
    .goodsitem-msprice {
      color: #333;
      font-size: 16px;
      margin-left: 5px;
      vertical-align: middle;
    }
    .goodsitem-price {
      color: #a1a09e;
      font-size: 12px;
      line-height: 20px;
      vertical-align: middle;
      float: right;
    }
  }
  .goodsitem-img {
    width: 100%;
    height: 300px;
    max-height: 330px;
    vertical-align: middle;
    border-radius: 5px 4px;
  }
  .buy {
    display: block;
    color: #fff;
    text-align: center;
    width: 90%;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    background: #ff5777;
    border-radius: 3px;
    margin: 10px;
  }
}
</style>
