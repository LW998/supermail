<template>
  <transition name="tip">
    <div class="tip" v-show="isShow">
      <p class="content">{{ message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Tip",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  // props: {
  //   status: {
  //     type: Boolean,
  //     default: false
  //   },
  //   val: {
  //     type: String,
  //     default: ""
  //   }
  // },
  methods: {
    show(message, type, duration = 1000) {
      let context = this;
      return (function anonymous() {
        context.isShow = true;
        context.message = message;
        switch (type) {
          case "info":
            context.color = "#5cb3cc";
            break;
          case "error":
            context.color = "#c21f30";
            break;
          case "success":
            context.color = "#45b787";
            break;
          case "waring":
            context.color = "#f0932b";
        }
        if (context.timer) clearTimeout(context.timer);
        context.timer = setTimeout(() => {
          context.isShow = false;
          context.timer = null;
        }, duration);
      })();
    }
  }
};
</script>

<style lang="less" scoped>
.tip {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 10000;
  .content {
    min-width: 53px;
    padding: 15px;
    word-wrap: break-word;
    font-size: 15px;
    color: #fff;
    line-height: 1.5;
    text-align: center;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.tip-enter-active {
  animation: ain 0.2s;
}
.tip-leave-active {
  animation: aout 0.4s;
}

.tip-enter-active {
  .content {
    animation: enter 0.75s;
  }
}
.tip-leave-active {
  .content {
    animation: leave 0.75s;
  }
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
.content-enter___XrWpZsbM {
  -webkit-animation: enter 0.75s;
  animation: enter 0.75s;
}
.content-leave___1lGJx-qG {
  -webkit-animation: leave 0.3s;
  animation: leave 0.3s;
}
@-webkit-keyframes enter {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
  20% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes enter {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
  20% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes leave {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  to {
    opacity: 0.7;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes leave {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  to {
    opacity: 0.7;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
