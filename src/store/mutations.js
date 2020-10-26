import {
  add_Goods,
  add_Goods_Num,
  add_Shop
} from "./mutations-type";

export default {
  // addCart(state, payload) {
  //   let nIndex = state.carts.findIndex(item => item.shopName === payload.shopName);
  //   if (nIndex === -1) {
  //     state.carts.push(payload);
  //   } else {
  //     let index = state.carts[nIndex].list.findIndex(item => item.id === payload.list[0].id);
  //     if (index === -1) {
  //       state.carts[nIndex].list.push(payload.list[0]);
  //     } else {
  //       state.carts[nIndex].list[index].num += payload.list[0].num;
  //     }
  //   }
  // },
  [add_Shop](state, payload) {
    state.carts.push(payload);
  },
  [add_Goods](state, payload) {
    state.carts[payload.nIndex].list.push(payload.payload.list[0]);
  },
  [add_Goods_Num](state, payload) {
    state.carts[payload.nIndex].list[payload.index].num +=
      payload.payload.list[0].num;
  },

  addNum(state, payload) {
    let {
      i,
      index
    } = payload;
    state.carts[i].list[index].num += 1;
  },

  reduceNum(state, payload) {
    let {
      i,
      index
    } = payload;
    state.carts[i].list[index].num -= 1;
  },

  //   全选按钮选中的时候改变所有选中状态
  changeShopCheck(state, payload) {
    for (let i = 0; i < state.carts.length; i++) {
      let item = state.carts[i]
      if (item.checked === payload) continue;
      item.list.forEach(i => {
        i.checked = payload
      })
      item.shopcheck = payload
    }
  },
  // 点击店铺勾选
  changeOneShopCheck(state, payload) {
    let {
      i,
      status
    } = payload
    state.carts[i].shopcheck = !state.carts[i].shopcheck;
    state.carts[i].list.forEach(item => {
      item.checked = status
    })
  },
  // 监听店铺商品的选中判断是否选中店铺
  changeShopByChecked(state, payload) {
    state.carts[payload].shopcheck = state.carts[payload].list.every(
      item => item.checked
    )
  },
  // 单个商品改变选中状态
  changeOneGoodsCheck(state, payload) {
    let {
      i,
      index
    } = payload;
    state.carts[i].list[index].checked = !state.carts[i].list[index].checked;
  },


  removeGoods(state) {
    let length = state.carts.length;
    if (length === 0) return;
    for (let i = 0; i < length; i++) {
      let item = state.carts[i];
      // let total = 0;
      if (item) {
        let len = item.list.length;
        for (let j = 0; j < len; j++) {
          let listItem = item.list[j];
          if (listItem && listItem.checked) {
            // total += 1;
            state.carts[i].list.splice(j, 1);
            j--;
          }
        }
      }
    }
    state.carts = state.carts.filter(item => item.list.length !== 0);
  }
};
