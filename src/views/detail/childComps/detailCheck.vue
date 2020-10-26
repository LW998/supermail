<template>
  <div class="skuInfo" @click="skuClick">
    <span class="text" v-html="text">{{text}}</span>
    <img src="../../../assets/img/common/next.png" alt />
  </div>
</template>

<script>
export default {
  name: "detailCheck",
  props: {
    text: {
      type: String,
      default() {
        return "";
      }
    }
  },
  methods: {
    skuClick() {
      this.$emit("showSku");
    }
  }
};
</script>

<style lang="less" scoped>
.skuInfo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 50px;
  background: #fff;
  .text {
    display: block;
    font-size: 13px;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
</style>