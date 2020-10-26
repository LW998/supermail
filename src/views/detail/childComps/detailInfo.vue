<template>
  <div class="detailinfo" v-if="Object.keys(info).length !== 0">
    <div class="detailDesc">
      <div class="descStart">
        <i class="dot"></i>
      </div>
      <div class="descText">{{ info.desc }}</div>
      <div class="descEnd">
        <i class="dot"></i>
      </div>
    </div>
    <div
      class="detailItem"
      v-for="(item, index) in info.detailImage"
      :key="index"
    >
      <div class="itemTitle">{{ item.key }}</div>
      <div class="itemImg" v-for="(img, i) in item.list" :key="i">
        <img v-lazy="img" alt @load="imageLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      count: 0,
      imagesLength: 0
    };
  },
  methods: {
    imageLoad() {
      //   if (++this.count === this.imagesLength) {
      this.$emit("detailimgLoad");
      //   }
    }
  },
  watch: {
    // info() {
    //   let sum = 0;
    //   for (let i = 0; i < this.info.detailImage.length; i++) {
    //     if (this.info.detailImage[i].list) {
    //       sum += this.info.detailImage[i].list.length;
    //     }
    //   }
    //   this.imagesLength = sum;
    // }
  }
};
</script>

<style lang="less" scoped>
.detailinfo {
  margin: 20px 0;
  .detailDesc {
    padding: 0 5%;
    .descStart {
      float: left;
      width: 80px;
      height: 1px;
      background: #a3a3a5;
      position: relative;
      .dot {
        width: 5px;
        height: 5px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: -2.5px;
      }
    }
    .descText {
      padding: 15px 0;
    }
    .descEnd {
      float: right;
      width: 80px;
      height: 1px;
      background: #a3a3a5;
      position: relative;
      .dot {
        width: 5px;
        height: 5px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: -2px;
        right: 0;
      }
    }
  }
  .detailItem {
    width: 100%;
    .itemTitle {
      height: 30px;
      line-height: 30px;
      font-weight: 400;
      padding-left: 5%;
      color: #303030;
      margin-top: 5px;
    }
    .itemImg {
      img {
        width: 100%;
      }
    }
  }
}
</style>
