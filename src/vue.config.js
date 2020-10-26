module.exports = {
    // 输出文件目录
    outputDir: "dist",
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                common: "@/common",
                components: "@/components",
                network: "@/network",
                views: "@/views"
            }
        }
    }
};