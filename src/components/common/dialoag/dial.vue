<template>
  <transition name="all">
    <div class="dialoag" v-show="isShow">
      <!-- <transition name="fade"> -->
      <div class="mark" @click="markClick"></div>
      <!-- </transition> -->
      <!-- <transition name="content"> -->
      <div class="content">
        <slot name="content"></slot>
      </div>
      <!-- </transition> -->
    </div>
  </transition>
</template>

<script>
export default {
  name: "dial",
  props: {
    isShow: {
      type: Boolean
    }
  },
  // data() {
  //   return {
  //      isShow: true
  //   };
  // },
  methods: {
    markClick() {
      this.$emit("markClick");
    }
  }
};
</script>

<style lang="less" scoped>
.dialoag {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9900;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9901;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .content {
    width: 100%;
    background-color: #fff;
    z-index: 9902;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }
}
.all-enter-active {
  .content {
    animation: in 0.4s;
  }
}
.all-leave-active {
  .content {
    animation: out 0.4s;
  }
}

.all-enter-active {
  .mark {
    animation: fin 0.2s;
  }
}
.all-leave-active {
  .mark {
    animation: fout 0.4s;
  }
}
.all-enter-active {
  animation: ain 0.2s;
}
.all-leave-active {
  animation: aout 0.4s;
}
@keyframes aout {
  100% {
    z-index: 9900;
  }
}
@keyframes ain {
  100% {
    z-index: 9900;
  }
}

@keyframes out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes fout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
