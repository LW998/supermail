<template>
  <div class="back">
    <img src="../../../assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "backTop",
  // methods: {
  //   backClick(){
  //     this.$emit("backClick");
  //   }
  // },
};
</script>

<style scoped lang="less">
.back {
  position: fixed;
  right: 10px;
  bottom: 50px;
  img {
    width: 43px;
    height: 43px;
  }
}
</style>
