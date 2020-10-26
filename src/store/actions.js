import {
    add_Goods,
    add_Goods_Num,
    add_Shop,
} from "./mutations-type"


export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let nIndex = context.state.carts.findIndex(
                item => item.shopName === payload.shopName
            );
            if (nIndex === -1) {
                context.commit(add_Shop, payload);
                resolve("添加到购物车成功");
            } else {
                let index = context.state.carts[nIndex].list.findIndex(
                    item => item.id === payload.list[0].id
                );
                if (index === -1) {
                    context.commit(add_Goods, {
                        nIndex,
                        payload
                    });
                    resolve("添加到购物车成功");
                } else {
                    context.commit(add_Goods_Num, {
                        index,
                        nIndex,
                        payload
                    });
                    resolve("添加到购物车成功");
                }
            }


        });
    }

}