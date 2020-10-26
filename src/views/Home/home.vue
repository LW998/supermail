<template>
  <div id="home">
    <nav-bar class="homeNav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="fixedtab"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabControlClick"
      ref="tabControlfixd"
      v-show="istabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scrolls"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banner" @SwiperImageLoad="SwiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" class="rec"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabControlClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods" :isnoMore="showNoMore" :firstLoad="showLoad" class="goodslist"></goods-list>
    </scroll>
    <!-- 组件点击事件需要加上 native-->
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { debounce } from "../../common/utils";
import { backTopMixin } from "../../common/mixin";
// import backTop from "../../components/content/backTop/backTop";

import navBar from "../../components/common/navbar/navBar";
import tabControl from "../../components/content/tabControl/tabControl";
import goodsList from "../../components/content/goods/goodsList";
import scroll from "../../components/common/betterScroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "home",
  mixins: [backTopMixin],
  components: {
    navBar,
    tabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    goodsList,
    scroll
    // backTop
  },
  data() {
    return {
      banner: [],
      recommends: [],
      goods: {
        pop: { status: null, page: 0, list: [], isclick: false },
        news: { status: null, page: 0, list: [], isclick: false },
        sell: { status: null, page: 0, list: [], isclick: false }
      },
      curType: "pop",
      // isShowBack: false,
      screenHeight: window.innerHeight,
      tabOffsetTop: 0,
      //是否吸顶
      istabFixed: false,
      scrollTop: 0,
      delay: true,
      saveY: 0
      // isLoadMore: false
    };
  },

  created() {
    //请求多个数据
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods("pop");
    // this.getHomeGoods("news");
    // this.getHomeGoods("sell");
  },
  mounted() {
    let refresh = debounce(this.$refs.scrolls.refresh, 100);
    let finishPullUp = debounce(this.$refs.scrolls.finishPullUp, 200);
    //监听每个图片的加载
    this.$bus.$on("imgLoad", () => {
      //函数防抖
      refresh();
      // this.$refs.scrolls.refresh()
      if (!this.goods[this.curType].isclick) {
        this.goods[this.curType].isclick = true;
      }
      // if (this.goods[this.curType].isclick) {
      //   this.isLoadMore = false;
      // }
      finishPullUp();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.curType].list;
    },
    showNoMore() {
      return this.goods[this.curType].status === "fail";
    },
    showLoad() {
      return !this.goods[this.curType].isclick;
    }
  },
  activated() {
    //进keepalive组件
    this.$refs.scrolls.refresh();
    this.$refs.scrolls.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //出keepalive组件
    this.saveY = this.$refs.scrolls.getScrollY();
  },
  methods: {
    //事件监听相关的方法
    tabControlClick(index) {
      switch (index) {
        case 0:
          this.curType = "pop";
          break;
        case 1:
          this.curType = "news";
          break;
        case 2:
          this.curType = "sell";
          break;
      }
      //让fixed的tabcontrol和正常的tabcontrol显示的内容保存一致
      this.$refs.tabControl.curIndex = index;
      this.$refs.tabControlfixd.curIndex = index;
      if (this.delay) {
        this.$refs.scrolls.scrollTo(0, this.scrollTop, 500);
      } else {
        this.$refs.scrolls.scrollTo(0, this.scrollTop, 0);
      }
      //点击tabbar请求数据
      if (!this.goods[this.curType].isclick) {
        this.getHomeGoods(this.curType);
      }
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.banner;
        this.recommends = res.recommend;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].status = res.status;
        this.goods[type].list.push(...res.data);
        this.goods[type].page += 1;
      });
      //下拉后需要执行finishPullUp才能继续下一次
    },
    // backClick() {
    //   this.$refs.scrolls.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      //判断backtop是否显示
      this.isShowBack = -position.y > this.screenHeight * 1.5;
      //判断tabcontrol是否吸顶
      this.istabFixed = -position.y > this.tabOffsetTop;
      // if (this.istabFixed) {
      // this.goods[this.curType].top = position.y;
      // }
      // if (-position.y + 5 < this.tabOffsetTop) {
      //   for (let item in this.goods) {
      //     if (!this.goods.hasOwnProperty(item)) return;
      //     this.goods[item].top = -(
      //       this.$refs.tabControl.$el.offsetTop +
      //       this.$refs.tabControl.$el.offsetHeight -
      //       44
      //     );
      //   }
      //   this.delay = true;
      // }
      if (this.istabFixed) {
        this.delay = false;
      }
      if (-position.y + 5 < this.tabOffsetTop) {
        this.delay = true;
      }
      if (!this.scrollTop) {
        this.scrollTop = -(
          this.$refs.tabControl.$el.offsetTop +
          this.$refs.tabControl.$el.offsetHeight -
          44
        );
      }
    },
    loadMore() {
      if (this.goods[this.curType].status === "success") {
        this.getHomeGoods(this.curType);
        // this.isLoadMore = true;
      }
    },
    //需要等首页的轮播图请求到后重新计算tabControl距离顶部的高度
    SwiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  background-color: #dddddd30;
  position: relative;
}
.homeNav {
  background-color: var(--color-tint);
  color: #fff;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.fixedtab {
  position: relative;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.rec {
  background-color: #fff;
  margin: 0;
}
.content {
  /* margin-top: 44px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
