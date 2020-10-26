<template>
  <div class="bottomBar">
    <div class="bottomLeft">
      <checkButton :isChecked="isSelectAll" @click.native="checkAll"></checkButton>
      <!-- :isChecked="allCheck" @click.native="shopClick"  -->
      <span class="checkAll">全选</span>
    </div>
    <div class="bottomRight" v-if="!isRemove">
      <div class="total">
        合计
        <span class="totalPrice">¥ {{totalPrice}}</span>
      </div>
      <div class="Settlement">结算 {{totalChecked}}</div>
    </div>
    <div class="bottomRight" v-if="isRemove">
      <div class="collection">移入收藏夹</div>
      <div class="remove" @click="remove">删除</div>
    </div>
  </div>
</template>

<script>
import checkButton from "../../../components/content/checkButton/checkButton";

import { mapGetters } from "vuex";
export default {
  name: "cartBottomBar",
  props: {
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  components: {
    checkButton
  },
  data() {
    return {
      allCheck: true
      // isRemove: true
    };
  },
  methods: {
    checkAll() {
      if (!this.list.length) {
        return;
      }
      if (this.isSelectAll) {
        this.$store.commit("changeShopCheck", false);
      } else {
        this.$store.commit("changeShopCheck", true);
      }
    },
    remove() {
      this.$store.commit("removeGoods");
    }
  },
  computed: {
    ...mapGetters({
      list: "cartLists"
    }),
    totalPrice() {
      let sum = 0;
      this.list.forEach(item => {
        item.list
          .filter(listItem => listItem.checked)
          .forEach(itemVal => {
            sum += parseFloat(itemVal.price.substr(1)) * itemVal.num;
          });
      });
      return sum.toFixed(2);
    },
    totalChecked() {
      let total = 0;
      this.list.forEach(item => {
        total += item.list.filter(listItem => listItem.checked).length;
      });
      if (total === 0) {
        return "";
      }
      return `(${total})`;
    },
    isSelectAll() {
      if (!this.list.length) {
        return false;
      }
      return this.list.every(item => {
        return item.shopcheck;
      });
      // this.list.forEach(item => {
      //   console.log(item.shopcheck);
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.bottomBar {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  .bottomLeft {
    display: flex;
    width: 90px;
    align-items: center;
    justify-content: center;
    vertical-align: bottom;
    .checkAll {
      display: block;
      margin-left: 10px;
    }
  }
  .bottomRight {
    display: flex;
    align-items: center;
    .total {
      margin-right: 20px;
      .totalPrice {
        color: #ff0000;
      }
    }
    .Settlement {
      margin-right: 10px;
      height: 30px;
      line-height: 30px;
      background-color: #ff000f;
      color: #fff;
      padding: 0 20px;
      border-radius: 15px;
      font-size: 15px;
    }
    .collection {
      height: 25px;
      line-height: 25px;
      color: #ff9000;
      width: 90px;
      font-size: 13px;
      border: 1px solid #ff9000;
      border-radius: 12.5px;
      text-align: center;
      vertical-align: middle;
    }
    .remove {
      height: 25px;
      line-height: 25px;
      color: #ff5000;
      width: 50px;
      font-size: 13px;
      border: 1px solid #ff5000;
      border-radius: 12.5px;
      text-align: center;
      vertical-align: middle;
      margin: 0 12px;
    }
  }
}
</style>