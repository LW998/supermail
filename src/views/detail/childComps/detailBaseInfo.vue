<template>
  <div class="baseinfo" v-if="Object.keys(goods).length !== 0">
    <div class="pricecontent">
      <div class="price">
        <div class="priceLeft">
          <span class="priceUnit">{{ goods.unit }}</span>
          <span class="priceNow">{{ goods.realPrice }}</span>
        </div>
        <div class="priceRight">
          <span class="priceOld">{{ goods.oldPrice }}</span>
          <div class="pricetags" v-if="goods.discount">
            <span class="pricetag">{{ goods.discount.text }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <span class="titleSpan">{{ goods.title }}</span>
      <a class="pickforme" :href="goods.pickforme.link">
        <img :src="goods.pickforme.icon" alt />
        <span>{{ goods.pickforme.name }}</span>
      </a>
    </div>
    <div class="columns">
      <div class="item" v-for="(item, index) in columList" :key="index">{{ item.desc }}</div>
    </div>
    <div class="cleanfix"></div>
    <div class="servers" @click="showServe">
      <div v-for="(item, index) in serverlist" :key="index" class="serversItem">
        <img :src="item.icon" alt />
        <span>{{ item.name }}</span>
      </div>
      <img src="../../../assets/img/common/next.png" alt class="next" />
    </div>
    <div class="cleanfix"></div>
  </div>
</template>
<script>
export default {
  name: "detailBaseInfo",
  props: {
    goods: {
      type: Object
    }
  },
  computed: {
    serverlist() {
      return this.goods.services.slice(0, 3);
    },
    columList() {
      return this.goods.columns.slice(1);
    }
  },

  methods: {
    showServe() {
      this.$emit("showServe");
    }
  }
};
</script>

<style scoped lang="less">
.baseinfo {
  width: 100%;
  .pricecontent {
    width: 100%;
    padding: 3% 5% 0 5%;
    margin: 0;
    height: 65px;
    background-color: #fff;
    .price {
      display: flex;
      flex-flow: row nowrap;
      -webkit-box-direction: normal;
      align-items: center;
      .priceLeft {
        vertical-align: text-top;
        align-items: flex-start;
        -webkit-box-align: start;
        display: flex;
        color: #333333;
        .priceNow {
          font-size: 39px;
          line-height: 39px;
          padding-left: 2px;
        }
        .priceUnit {
          vertical-align: super;
          font-size: 13px;
          line-height: 20px;
          display: inline-block;
        }
      }
      .priceRight {
        margin-left: 5px;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-flow: column nowrap;

        .priceOld {
          display: block;
          font-size: 15px;
          text-decoration: line-through;
          color: #999;
          line-height: 35px;
        }
        .pricetags {
          display: flex;
          flex-flow: row nowrap;
          padding: 0 5px 0 0;
          .pricetag {
            height: 16px;
            width: 100%;
            line-height: 16px;
            text-align: center;
            font-size: 13px;
            padding: 0 5px;
            background-color: rgb(255, 232, 238);
            color: rgb(255, 34, 85);
          }
        }
      }
    }
  }
  .title {
    padding-top: 10px;
    display: flex;
    -webkit-box-align: center;
    justify-content: space-between;
    align-items: center;
    -webkit-box-pack: justify;
    background-color: #fff;
    .titleSpan {
      width: 70%;
      font-size: 15px;
      margin: 0 5%;
    }
    .pickforme {
      width: 25%;
      background-color: #f8f8f8;
      color: #999;
      padding: 0 4%;
      font-size: 13px;
      height: 26px;
      line-height: 26px;
      border-top-left-radius: 26px;
      border-bottom-left-radius: 26px;
      img {
        width: 15px;
        vertical-align: middle;
        margin-right: 5px;
        padding-bottom: 5px;
      }
      span {
        vertical-align: top;
      }
    }
  }
  .cleanfix {
    width: 100%;
    height: 10px;
    background-color: #dddddd50;
  }
  .columns {
    background-color: #fff;
    height: 35px;
    line-height: 35px;
    display: flex;
    flex: 1;
    padding: 0 5%;
    color: #9999;
    font-size: 13px;

    .item {
      width: 100%;
      &:last-child {
        text-align: right;
      }
      &:first-child {
        text-align: left;
      }
    }
  }
  .servers {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 5%;
    .serversItem {
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 2px;
      }
      span {
        vertical-align: middle;
        font-size: 13px;
      }
    }
    .next {
      width: 20px;
      height: 20px;
      margin: 10px -10px 0px 0px;
    }
  }
}
</style>
