export default {
  cartLength(state) {
    let sum = 0;
    for (let i = 0, len = state.carts.length; i < len; i++) {
      sum += state.carts[i].list.length;
    }
    return sum;
  },
  cartLists(state) {
    return state.carts
  },
  shopLength(state) {
    return state.carts.length
  },
  OneCartList(state) {
    return function (i) {
      return state.carts[i]
    }
  }
}
