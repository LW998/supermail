<template>
  <div class="paramsInfo" v-if="Object.keys(params).length!==0">
    <table class="paramsTable">
      <tr v-for="(tr,indexy) in params.rule" :key="indexy">
        <td v-for="(td,indexz) in tr" :key="indexz">{{td}}</td>
      </tr>
    </table>
    <ul class="paramsUl">
      <li v-for="(value,key,index) in params.info" :key="index">
        <span>{{key}}</span>
        <span>{{value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "detailParams",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.paramsInfo {
  margin: 10px;
  padding: 0 5px;
  .paramsTable {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    tr {
      border-bottom: 1px solid #f4f4f4;
      &:first-child {
        td {
          color: #727272;
        }
      }
      td {
        height: 40px;
        line-height: 40px;
        text-align: left;
        color: #eb4868;
        &:first-child {
          color: #727272;
          width: 28%;
        }
      }
    }
  }
  .paramsUl {
    list-style: none;
    font-size: 14px;
    li {
      text-align: left;
      border-bottom: 1px solid #f4f4f4;
      display: flex;
      span {
        display: block;
        padding: 10px 0;
        &:last-child {
          color: #eb4868;
          flex: 1;
        }
        &:first-child {
          width: 28%;
        }
      }
    }
  }
}
</style>