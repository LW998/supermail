<template>
  <div id="detail">
    <detail-navbar class="detailnav" @titleClick="titleClick" ref="nav"></detail-navbar>
    <scroll class="content" ref="scrolls" @scroll="detailScroll" :probeType="3">
      <detail-swiper :swiperImgs="topImages" class="detailSwiper"></detail-swiper>
      <detail-baseinfo :goods="goods" @showServe="showServe"></detail-baseinfo>
      <detail-check @showSku="showSku" :text="skuText"></detail-check>
      <div class="cleanfix"></div>
      <detail-comments :rate="rate"></detail-comments>
      <div class="cleanfix"></div>
      <detail-shopinfo :shop="shop"></detail-shopinfo>
      <div class="cleanfix"></div>
      <detail-info :info="detailInfo" @detailimgLoad="detailimgLoad" ref="infoSet"></detail-info>
      <detail-params :params="itemParams" ref="paramsSet"></detail-params>
      <detail-recommend :recommends="recommends" ref="recommend" @recimgLoad="recimgLoad"></detail-recommend>
    </scroll>
    <dial :isShow="isShow" @markClick="markClick">
      <div slot="content" class="dialogServe" v-if="showDialog === 'server'">
        <div class="serverContent">
          <div class="serverTitle">服务说明</div>
          <div class="close" @click="closeClick">×</div>
          <div v-for="item in goods.services" class="serverItem">
            <span class="title">{{ item.name }}</span>
            <span class="desc">{{ item.content }}</span>
          </div>
        </div>
      </div>
      <div slot="content" class="dialogSku" v-if="showDialog === 'sku'">
        <div class="skuContent" v-if="Object.keys(sku).length !== 0">
          <div class="close" @click="closeClick">×</div>
          <div class="skuInfo">
            <img :src="skus.img" alt />
            <div class="skuRight">
              <div class="price">{{ skus.priceHtml }}</div>
              <div class="stock">库存 {{ skus.stock }}</div>
              <div class="sku-text" v-html="text">{{ text }}</div>
            </div>
          </div>
          <div class="skuView">
            <div class="skuList" v-for="(item, index) in sku.props" :key="index">
              <div class="label">{{ item.label }}</div>
              <ul class="list">
                <li
                  v-for="(listItem, i) in item.list"
                  :key="i"
                  @click=" skuClick($event,listItem.type, listItem.index)"
                  :class="skuClass(listItem.type, listItem.index)"
                >{{ listItem.name }}</li>
              </ul>
            </div>
            <div class="number">
              <div class="label">数量</div>
              <div class="numberCal">
                <span class="reduce" @click="reduce">-</span>
                <span class="view">{{ skus.num }}</span>
                <span class="add" @click="add">+</span>
              </div>
            </div>
          </div>
          <div class="skuBtn" v-if="!cartClick">
            <div class="addCart" :class="{disabled:sku.totalStock===0}" @click="addCart">加入购物车</div>
            <div
              class="toBuy"
              :style="{background:(sku.totalStock===0?'#999':'linear-gradient(90deg, #ff5777, #ff468f)')}"
            >{{this.sku.totalStock===0?'已下架':'立即购买'}}</div>
          </div>
          <div class="skuBtn" v-if="cartClick">
            <div class="sure" @click="addCart">确定</div>
          </div>
        </div>
      </div>
    </dial>
    <detail-bottombar @cartShow="cartShow" :productStock="sku.totalStock"></detail-bottombar>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  params,
  sku,
  rate
} from "../../network/detail";

import { mapActions } from "vuex";
import detailNavbar from "./childComps/detailNavbar";
import detailSwiper from "../../components/common/swiper/swiper";
import detailBaseinfo from "./childComps/detailBaseInfo";
import detailShopinfo from "./childComps/detailShopInfo";
import detailComments from "./childComps/detailComments";
import detailInfo from "./childComps/detailInfo";
import detailParams from "./childComps/detailParams";
import detailRecommend from "./childComps/detailRecommend";
import detailBottombar from "./childComps/detailBottombar";
import detailCheck from "./childComps/detailCheck";

import dial from "../../components/common/dialoag/dial";
import scroll from "../../components/common/betterScroll/Scroll";

import { backTopMixin } from "../../common/mixin";
import { debounce } from "../../common/utils";

export default {
  name: "detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      pageTitle: null,
      refresh: null,
      goods: {},
      rate: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      themTopY: [],
      cartClick: false,
      recommends: [],
      isShow: false,
      showDialog: null,
      clickIndex: {},
      getTop: null,
      sku: {},
      skuText: "请选择: 颜色 尺码",
      uncheck: [],
      skuInfo: {},
      screenHeight: window.innerHeight,
      curIndex: 0
    };
  },
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = data.topImages;
      this.goods = new Goods(data.itemInfo, data.priceInfo, data.itemServices);
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.itemParams = new params(data.itemParams);
      this.rate = new rate(data.rateInfo);
      this.sku = new sku(data.skuInfo);
      this.skuInfo = {
        img: this.sku.img,
        priceHtml: this.sku.priceRange,
        num: 1,
        stock: this.sku.totalStock,
        text: "请选择: 颜色 尺码"
      };
      Object.keys(this.sku).forEach(item => {
        if (item.substr(-3) === "Key") {
          this.uncheck.push(item.substr(0, item.length - 3));
        }
      });
      this.$nextTick(() => {
        document.title = data.itemInfo.seo.title;
        if (this.sku.totalStock === 0) {
          this.skuInfo.num = 0;
        }
      });
    });

    getRecommend().then(res => {
      this.recommends = res.data;
    });
  },
  components: {
    detailNavbar,
    detailSwiper,
    detailBaseinfo,
    detailComments,
    detailShopinfo,
    detailInfo,
    detailParams,
    detailCheck,
    detailRecommend,
    detailBottombar,
    scroll,
    dial
  },
  computed: {
    skuClass() {
      return function(type, index) {
        let stockNum = 0;
        this.sku.skus.forEach(item => {
          if (item[type + "Id"] === index) {
            stockNum += item.stock;
          }
        });

        if (stockNum === 0) {
          // this.skuInfo.num = 0;
          return { disabled: true };
        } else {
          return { active: this.clickIndex[type] == index };
        }
      };
    },
    skus() {
      return this.skuInfo;
    },
    text() {
      let str = ``;
      if (this.uncheck.length === 0) {
        str = ``;
        let res = {};
        this.$set(this.skuInfo, "num", 1);
        res = this.sku.skus.filter(
          item =>
            item.sizeId === this.clickIndex["size"] &&
            item.styleId === this.clickIndex["style"]
        )[0];
        res.priceHtml = "¥" + (res.nowprice / 100).toFixed(2);
        Object.assign(this.skuInfo, res);
        str += `已选择: <span style=\"color:#f25;\">“${res.style}”“${res.size}”</span>`;
      } else if (this.uncheck.length === 2) {
        if (this.skuInfo.currency) {
          this.$delete(this.skuInfo, "color");
          this.$delete(this.skuInfo, "currency");
          this.$delete(this.skuInfo, "nowprice");
          this.$delete(this.skuInfo, "price");
          this.$delete(this.skuInfo, "size");
          this.$delete(this.skuInfo, "stockId");
          this.$delete(this.skuInfo, "sizeId");
          this.$delete(this.skuInfo, "style");
          this.$delete(this.skuInfo, "styleId");
          this.$delete(this.skuInfo, "xdSkuId");
        }
        this.$set(this.skuInfo, "priceHtml", this.sku.priceRange);
        this.$set(this.skuInfo, "img", this.sku.img);
        this.$set(this.skuInfo, "text", "请选择: 颜色 尺码");
        this.$set(this.skuInfo, "stock", this.sku.totalStock);
        str = this.skuInfo.text;
      } else if (this.uncheck.length === 1) {
        str += `请选择: `;
        str += ` ${this.sku[this.uncheck[0] + "Key"]} `;
        let stock = 0,
          image = "";
        if (this.skuInfo.currency) {
          this.$delete(this.skuInfo, "color");
          this.$delete(this.skuInfo, "currency");
          this.$delete(this.skuInfo, "nowprice");
          this.$delete(this.skuInfo, "price");
          this.$delete(this.skuInfo, "size");
          this.$delete(this.skuInfo, "stockId");
          this.$delete(this.skuInfo, "sizeId");
          this.$delete(this.skuInfo, "style");
          this.$delete(this.skuInfo, "styleId");
          this.$delete(this.skuInfo, "xdSkuId");
        }
        if (this.uncheck[0] === "size") {
          this.sku.skus.forEach(item => {
            if (item.styleId === this.clickIndex.style) {
              stock += item.stock;
              image = item.img;
            }
          });
          this.$set(this.skuInfo, "priceHtml", this.sku.priceRange);
          this.$set(this.skuInfo, "img", image);
          this.$set(this.skuInfo, "num", 1);
          this.$set(this.skuInfo, "stock", stock);
        } else {
          this.sku.skus.forEach(item => {
            if (item.sizeId === this.clickIndex.size) {
              stock += item.stock;
            }
          });
          this.$set(this.skuInfo, "priceHtml", this.sku.priceRange);
          this.$set(this.skuInfo, "stock", stock);
          this.$set(this.skuInfo, "num", 1);
        }
      }
      this.skuText = str;
      return str;
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scrolls.refresh, 100);
    this.getTop = debounce(() => {
      this.themTopY = [];
      this.themTopY.push(0);
      this.themTopY.push(-this.$refs.infoSet.$el.offsetTop + 10);
      this.themTopY.push(-this.$refs.paramsSet.$el.offsetTop);
      this.themTopY.push(-this.$refs.recommend.$el.offsetTop);
      this.themTopY.push(-Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    ...mapActions({ ad: "addCart" }),
    detailimgLoad() {
      this.refresh();
      this.getTop();
    },
    getStock(type, id) {},
    showServe() {
      this.showDialog = "server";
      this.isShow = true;
    },
    showSku() {
      this.showDialog = "sku";
      this.isShow = true;
    },
    closeClick() {
      this.cartClick = false;
      this.isShow = false;
    },
    markClick() {
      this.cartClick = false;
      this.isShow = false;
    },
    skuClick(el, type, index) {
      if (el.currentTarget.classList[0] === "disabled") return;
      if (this.clickIndex[type] === index) {
        // this.skuInfo[type] = 0;
        // this.$forceUpdate();
        this.$set(this.clickIndex, type, 0);
      } else {
        this.$set(this.clickIndex, type, index);
      }

      for (let key in this.clickIndex) {
        if (!this.clickIndex.hasOwnProperty(key)) return;
        if (this.clickIndex[key] !== 0) {
          this.uncheck = this.uncheck.filter(item => item !== key);
        } else {
          this.uncheck.push(key);
          this.uncheck = [...new Set(this.uncheck)];
        }
      }
    },
    reduce() {
      if (this.sku.totalStock === 0) return;
      this.skuInfo.num > 1
        ? (this.skuInfo.num -= 1)
        : this.$toast.show("至少要购买1件");
    },

    add() {
      if (this.sku.totalStock === 0) return;
      if (this.skuInfo.num < this.skuInfo.stock) {
        this.skuInfo.num += 1;
      } else {
        this.$toast.show(`库存只剩${this.skuInfo.stock}件哦~`);
      }
    },
    recimgLoad() {
      this.refresh();
    },
    titleClick(index) {
      this.curIndex = index;
      this.$refs.scrolls.scrollTo(0, this.themTopY[index], 0);
    },
    detailScroll(position) {
      const positionY = -position.y;
      this.isShowBack = -position.y > this.screenHeight * 1.5;
      let len = this.themTopY.length;
      for (let i = 0; i < len - 1; i++) {
        if (
          this.curIndex !== i &&
          positionY >= -this.themTopY[i] &&
          positionY < -this.themTopY[i + 1]
        ) {
          this.curIndex = i;
          this.$refs.nav.curIndex = this.curIndex;
        }
      }
    },
    cartShow() {
      this.showDialog = "sku";
      this.isShow = true;
      this.cartClick = true;
    },
    addCart() {
      if (this.uncheck.length === 0) {
        let product = {
          list: []
        };
        let productInfo = {};
        product.shopName = this.shop.name;
        product.shopId = this.shop.shopId;
        product.shopcheck = false;
        productInfo.shopId = this.shop.shopId;
        productInfo.checked = false;
        productInfo.title = this.goods.title;
        productInfo.image = this.skuInfo.img;
        productInfo.desc = this.goods.desc;
        productInfo.price = this.skuInfo.priceHtml;
        productInfo.id = this.skuInfo.xdSkuId;
        productInfo.stock = this.skuInfo.stock;
        productInfo.style = this.skuInfo.style;
        productInfo.size = this.skuInfo.size;
        productInfo.num = this.skuInfo.num;
        product.list[0] = productInfo;
        this.$store.dispatch("addCart", product).then(res => {
          this.$toast.show(res);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#detail {
  background-color: #fff;
  z-index: 9;
  position: relative;
  height: 100vh;
  .detailSwiper {
    position: relative;
    overflow: hidden;
    margin: auto;
    height: 100%;
  }
  .detailnav {
    position: fixed;
    z-index: 9;
    width: 100%;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .cleanfix {
    width: 100%;
    height: 10px;
    background-color: #dddddd50;
  }
  .dialogServe {
    width: 100%;
    .serverContent {
      padding: 10px;
      overflow: auto;
      max-height: 70vh;
      position: relative;
      .serverTitle {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
        font-size: 17px;
      }
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
      }
      .serverItem {
        padding: 10px 0;
        border-bottom: 1px solid #dfdfdf;
        &:last-child {
          border-bottom: none;
        }
        .title {
          display: block;
          color: #333;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          text-align: left;
        }
        .desc {
          display: block;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .dialogSku {
    width: 100%;
    .skuContent {
      position: relative;
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        z-index: 9900;
      }
      .skuInfo {
        position: relative;
        padding: 10px 8px;
        img {
          position: absolute;
          width: 83px;
          bottom: 10px;
          left: 20px;
          max-height: 124px;
        }
        .skuRight {
          margin-left: 100px;
          color: #333333;
          .price {
            font-size: 28px;
            line-height: 30px;
          }
          .stock {
            font-size: 13px;
            color: #333333;
            line-height: 20px;
          }
          .sku-text {
            font-size: 13px;
            vertical-align: text-bottom;
            color: #333333;
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .selectd {
            color: #ff2255;
          }
        }
      }
      .skuView {
        margin: 20px 5px 10px 5px;
        padding: 0 10px;
        .skuList {
          .label {
            line-height: 12px;
            font-size: 12px;
            margin: 5px 0 3px 0;
          }
          .list {
            list-style: none;
            margin-bottom: 10px;
            li {
              display: inline-block;
              line-height: 25px;
              padding: 0 10px;
              border: 1px solid #bbb;
              border-radius: 5px;
              margin-right: 8px;
              margin-bottom: 8px;
              font-size: 13px;
              cursor: pointer;
              color: #5e5e5e;
              white-space: nowrap;
              text-align: center;
              max-width: 226px;
              overflow: hidden;
              text-overflow: ellipsis;
              z-index: 9900;
            }
            .disabled {
              opacity: 0.5;
              border-style: dashed;
              border-color: #bbb;
              color: #424242;
            }
            .active {
              color: #ed4566;
              border-color: #ed4566;
            }
          }
        }
        .number {
          .label {
            line-height: 12px;
            font-size: 12px;
            margin: 5px 0 3px 0;
          }
          .numberCal {
            display: flex;
            width: 80px;
            height: 25px;
            border: 1px solid #bbb;
            border-radius: 5px;
            margin-top: 5px;
            text-align: center;
            line-height: 25px;
            .reduce {
              display: block;
              width: 25px;
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
              width: 25px;
              color: #ed4566;
              font-size: 12px;
              cursor: pointer;
            }
          }
        }
      }
      .skuBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        line-height: 50px;
        width: 100%;
        .addCart {
          flex: 1;
          text-align: center;
          color: #ff5777;
          background-color: #ffe6e8;
        }
        .sure {
          flex: 1;
          z-index: 9901;
          text-align: center;
          background: linear-gradient(90deg, #ff5777, #ff468f);
          color: #fff;
        }
        .disabled {
          background: #d0d0d0;
          color: #999;
        }
        .toBuy {
          flex: 1;
          text-align: center;
          color: #fff;
          // background: linear-gradient(90deg, #ff5777, #ff468f);
        }
      }
    }
  }
}
</style>
