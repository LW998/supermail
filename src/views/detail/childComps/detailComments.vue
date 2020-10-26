<template>
  <div class="commentInfo" v-if="Object.keys(rate).length!==0">
    <div class="head">
      <span class="head-title">{{headInfo}}</span>
      <img src="../../../assets/img/common/next.png" alt class="next" />
    </div>
    <div class="tags">
      <span
        class="tag"
        :class="item.emotion"
        v-for="(item,index) in rate.rateTags"
        :key="index"
      >{{item.value}} ({{item.num}})</span>
    </div>
    <div class="list">
      <div class="listItem" v-for="(item,index) in rate.list" :key="index">
        <div class="user">
          <img :src="item.user.avatar" alt />
          <span class="userName">{{item.user.uname}}</span>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="time">{{time(index)}}</div>
        <div class="extra">
          <span v-for="e in item.extraInfo">{{e}}</span>
        </div>
        <div class="explain" :class="{ex:item.explain}">{{item.explain}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailComments",
  props: {
    rate: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    headInfo() {
      return this.rate.sales >= 10000
        ? `买家评价 ${this.rate.rate} | 销量  ${(
            this.rate.sales / 10000
          ).toFixed(1)}w`
        : `买家评价 ${this.rate.rate} | 销量  ${this.rate.sales}`;
    },
    time() {
      return function(index) {
        return new Date(this.rate.list[index].created * 1000)
          .toLocaleDateString()
          .replace(/\//g, "-");
      };
    }
  }
};
</script>

<style lang="less" scoped>
.commentInfo {
  padding: 0 10px;
  background-color: #fff;
  width: 100%;
  .head {
    padding: 15px 0px 5px 0px;
    position: relative;
    .head-title {
      width: 100%;
      display: block;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    .next {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 0;
      top: 20px;
    }
  }
  .tags {
    display: flex;
    flex-flow: row wrap;
    .tag {
      margin: 5px 5px 0px 0px;
      padding: 0 5px;
      font-size: 13px;
      height: 25px;
      line-height: 25px;
    }
    .positive {
      color: #ff2255;
      background-color: #ffe8ee;
    }
    .negative {
      color: #666666;
      background-color: #f6f6f6;
    }
  }
  .list {
    margin: 10px 0;
    .listItem {
      border-bottom: 1px solid #eee;
      .user {
        display: flex;
        padding: 10px 0;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        .userName {
          height: 35px;
          line-height: 35px;
          font-size: 15px;
          margin-left: 15px;
        }
      }
      .content {
        font-size: 15px;
        line-height: 22px;
        margin-top: 5px;
      }
      .time {
        margin: 8px 0 2px 0;
        font-size: 13px;
      }
      .extra {
        font-size: 13px;
        margin-bottom: 16px;
        span {
          margin-right: 8px;
        }
      }
      .explain {
        font-size: 15px;
        color: #999;
        line-height: 22px;
      }
      .ex {
        border-top: 1px solid #eee;
        padding-top: 16px;
        padding-bottom: 16px;
      }
    }
  }
}
</style>