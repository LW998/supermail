import {
    request,
} from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: '/detail/recommend'
    })
}

export class Goods {
    constructor(itemInfo, priceInfo, itemServices) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.unit = priceInfo.currency;
        this.pickforme = itemInfo.pickforme;
        this.pageTitle = itemInfo.seo.title;
        this.oldPrice = priceInfo.currency + itemInfo.lowPrice;
        this.realPrice = itemInfo.lowNowPrice;
        this.discount = priceInfo.priceTags[0];
        this.columns = itemServices.columns;
        this.services = itemServices.services;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.levelStart = "https://s10.mogucdn.com/mlcdn/c45406/200205_2eg19cl3528hj8ihbc21ci5l0k857_44x44.png";
        this.level = shopInfo.level;
        this.name = shopInfo.name;
        this.shopId = shopInfo.shopId;
        this.shopLogo = shopInfo.shopLogo;
        this.saleDesc = shopInfo.saleDesc + (shopInfo.cGoods ? shopInfo.cGoods : 0);
        this.shopLabels = shopInfo.shopLabels;
        this.shopUrl = shopInfo.shopUrl;
    }
}

export class params {
    constructor(itemParams) {
        this.info = itemParams.info.set;
        itemParams.rule ? this.rule = itemParams.rule.tables[0] : this.rule = [];
    }
}

export class rate {
    constructor(rateInfo) {
        this.rate = rateInfo.cRate;
        this.list = rateInfo.list;
        this.rateTags = rateInfo.rateTags;
        this.sales = rateInfo.sales;
    }
}
export class sku {
    constructor(skuInfo) {
        this.priceRange = skuInfo.priceRange;
        this.img = skuInfo.img;
        this.props = skuInfo.props;
        this.skus = skuInfo.skus;
        this.totalStock = this.getStock();
        this.sizeKey = skuInfo.sizeKey;
        this.styleKey = skuInfo.styleKey;
    }
    getStock() {
        let ary = [];
        this.skus.forEach((item, index) => {
            ary.push(item.stock);
        })
        return ary.reduce((prev, item) => {
            return prev + item
        })
    }
}