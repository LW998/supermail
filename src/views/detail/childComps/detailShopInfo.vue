<template>
  <div class="shopContent">
    <div class="shopInfo" v-if="Object.keys(shop).length!==0">
      <div class="shopLeft">
        <img :src="shop.shopLogo" alt class="shopImg" />
      </div>
      <div class="shopRight">
        <div class="shopName">{{shop.name}}</div>
        <div class="shopLink">
          <a :href="shop.shopUrl">
            进店
            <img src="../../../assets/img/common/next.png" alt class="next" />
          </a>
        </div>
        <div class="info">
          <div class="infoStart">
            <img :src="shop.levelStart" alt v-for="(item,index) in shop.level" :key="index" />
          </div>
          <div class="infoGoods">
            <div class="Separate">|</div>
            <div class="goodsNumber">{{shop.saleDesc}}</div>
          </div>
        </div>
        <div class="shopLabels">
          <div class="labelItem" v-for="(item,index) in shop.shopLabels" :key="index">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shopContent {
  margin: 5px 0;
  padding: 10px;
  background-color: #fff;
  .shopInfo {
    display: flex;
    .shopLeft {
      width: 70px;
      height: 70px;
      margin-right: 5px;
      .shopImg {
        width: 100%;
      }
    }
    .shopRight {
      flex: 1;
      box-sizing: border-box;
      position: relative;
      .shopName {
        font-size: 14px;
        margin-top: 3px;
      }
      .shopLink {
        position: absolute;
        right: 20px;
        top: 0;
        font-size: 14px;
        color: #999;
        .next {
          width: 20px;
          position: absolute;
          top: -2px;
          right: -20px;
        }
      }
      .info {
        display: flex;
        padding: 8px 0 5px 0;
        .infoStart {
          img {
            width: 12px;
            vertical-align: text-top;
            margin-right: 2px;
          }
        }
        .infoGoods {
          height: 15px;
          line-height: 15px;
          display: flex;
          .Separate {
            height: 12px;
            font-size: 13px;
            color: #ccc;
            vertical-align: middle;
            margin: 0 15px;
          }
          .goodsNumber {
            font-size: 12px;
            vertical-align: middle;
          }
        }
      }
      .shopLabels {
        // display: flex;
        // justify-content: space-between;
        .labelItem {
          font-size: 12px;
          display: inline-block;
          height: 18px;
          line-height: 18px;
          border: 1px solid #d6d6d6;
          border-radius: 9px;
          padding: 0 7px;
          margin-right: 8px;
          color: #f46;
        }
      }
    }
  }
}
</style>