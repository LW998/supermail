<template>
  <div class="bottombar" v-if="productStock!==undefined">
    <div class="Bleft">
      <div class="icon">
        <span class="image">
          <img src="../../../assets/img/detail/shop.svg" alt />
        </span>
        <span class="text">店铺</span>
      </div>
      <div class="icon">
        <span class="image">
          <img src="../../../assets/img/detail/message.svg" alt />
        </span>
        <span class="text">客服</span>
      </div>
      <div class="icon">
        <span class="image">
          <img src="../../../assets/img/detail/college.svg" alt />
        </span>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="Bright">
      <div
        class="btn"
        @click="cartShow"
        :style="{background:(productStock===0?'#d0d0d0':'#ffe6e8'),color:(productStock===0?'#999':'#ff5777')}"
      >
        <span>加入购物车</span>
      </div>
      <div
        class="btn"
        :style="{background:(productStock===0?'#999':'linear-gradient(90deg, #ff5777, #ff468f)')}"
      >
        <span>{{productStock===0?'已下架':'立即购买'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBottombar",
  props: {
    productStock: {
      type: Number,
      default() {
        return undefined;
      }
    }
  },
  methods: {
    cartShow() {
      if (this.productStock === 0) return;
      this.$emit("cartShow");
    }
  }
};
</script>

<style lang="less" scoped>
.bottombar {
  font-size: 12px;
  z-index: 9;
  height: 49px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  .Bleft {
    width: 50%;
    display: flex;
    .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      box-sizing: border-box;
      border-right: 1px solid #ededed;
      border-top: 1px solid #ededed;
      .image {
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  .Bright {
    width: 50%;
    display: flex;
    .btn {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 49px;
      &:first-child {
        background-color: #ffe6e8;

        color: #ff5777;
      }
      &:last-child {
        background: linear-gradient(90deg, #ff5777, #ff468f);
        span {
          color: #fff;
        }
      }
    }
    .disabled {
      background: #d0d0d0;
      color: #999;
    }
  }
}
</style>