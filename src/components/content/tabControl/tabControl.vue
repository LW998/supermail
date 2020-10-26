<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      class="tab-control-item"
      :class="{active:index ===curIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      curIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.curIndex = index;
      this.$emit('tabClick',index);
    }
  }
};
</script>

<style lang='less'>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px;
  }
}
</style>
