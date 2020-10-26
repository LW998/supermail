<template>
  <div class="listItem"
    v-if="Object.keys(products.list).length !== 0">
    <div class="listShop">
      <check-button :isChecked="products.shopcheck" class="shopClick"
        @click.native="shopClick"></check-button>
      <img src="../../../assets/img/detail/shop.svg" alt
        class="shopImg" />
      <span class="shopName">{{ products.shopName }}</span>
    </div>
    <div v-for="(item, index) in products.list" class="listGoods">
      <div class="goodsLeft">
        <check-button :isChecked="item.checked" class="goodsClick"
          @click.native="goodsClick(index)"></check-button>
        <img :src="item.image" alt class="goodsImg" />
      </div>
      <div class="goodsRight">
        <div class="title">
          <p class="titleText">{{ item.title }}</p>
        </div>
        <div class="goodsStyle">{{ item.style }} {{ item.size }}</div>
        <div class="priceNum">
          <div class="price">
            <p class="priceText">{{ item.price }}</p>
          </div>
          <div class="num">
            <span class="reduce"
              @click="reduce(item.stock, item.num, index)">-</span>
            <span class="view">{{ item.num }}</span>
            <span class="add"
              @click="add(item.stock, item.num, index)">+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkButton from "../../../components/content/checkButton/checkButton";
export default {
  name: "cartListItem",
  props: {
    products: {
      type: Object,
      default() {
        return {};
      },
    },
    i: {
      type: Number,
      default() {
        return -1;
      },
    },
  },
  data() {
    return {
      // products: this.$store.state.carts[this.i]
    };
  },
  components: {
    checkButton,
  },
  computed: {
    shopcheck() {
      return this.$store.state.carts[this.i].list.every((item) => item.checked);
    },
  },
  methods: {
    shopClick() {
      if (!this.shopcheck) {
        this.$store.commit("changeOneShopCheck", { i: this.i, status: true });
      } else {
        this.$store.commit("changeOneShopCheck", { i: this.i, status: false });
      }
    },

    goodsClick(index) {
      this.$store.commit("changeOneGoodsCheck", {
        i: this.i,
        index: index,
      });
      this.$store.commit("changeShopByChecked", this.i);
    },

    reduce(stock, num, index) {
      if (num > 1) {
        this.$store.commit("reduceNum", {
          i: this.i,
          index: index,
        });
      } else {
        this.$toast.show("至少购买1件");
      }
    },
    add(stock, num, index) {
      if (num < stock) {
        this.$store.commit("addNum", {
          i: this.i,
          index: indexn,
        });
      } else {
        this.$toast.show(`库存只剩${stock}件哦~`);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.listItem {
  width: 95%;
  margin: 10px 2.5%;
  border-radius: 10px;
  background-color: #fff;
  .listShop {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 2px;
    .shopClick {
      margin: 0 8px 0 13px;
    }
    .shopName {
      font-size: 14px;
      color: #333333;
      margin-left: 8px;
    }
    .shopImg {
      width: 20px;
      height: 20px;
    }
  }
  .listGoods {
    padding: 8px;
    display: flex;
    margin-bottom: 10px;
    .goodsLeft {
      display: flex;
      height: 99px;
      width: 105px;
      justify-content: space-around;
      align-items: center;
      .goodsImg {
        width: 66px;
      }
    }
    .goodsRight {
      flex: 1;
      padding: 2px 15px;
      line-height: 23px;
      .title {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 13px;
        letter-spacing: 1px;
      }
      .goodsStyle {
        font-size: 13px;
        background-color: #dddddd40;
        color: #999;
        padding: 2px 5px;
        display: inline-block;
      }
      .priceNum {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .price {
          color: red;
          font-size: 14px;
        }
        .num {
          display: flex;
          width: 70px;
          height: 23px;
          border: 1px solid #bbb;
          border-radius: 5px;
          margin-top: 5px;
          text-align: center;
          line-height: 23px;
          .reduce {
            display: block;
            width: 20px;
            color: #ed4566;
            font-size: 12px;
            cursor: pointer;
          }
          .view {
            flex: 1;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            color: #333;
            font-size: 13px;
          }
          .add {
            display: block;
            width: 20px;
            color: #ed4566;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
