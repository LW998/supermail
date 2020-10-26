module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 400, //视窗的宽度
            viewportHeight: 649, //视窗的高度
            unitPrecision: 5, //指定‘px’转换为视窗单位保留的小数位
            viewportUnit: 'vw', //指定视窗单位
            selectorBlackList: ['ignore'], //指定不需要转换的样式
            minPixelValue: 1, //小于或等于1px不进行转换
            mediaQuery: false, //允许在媒体查询中转换为‘px’
            // exclude: [/TabBar/] //指定不需要转换的文件夹
        }
    }
}