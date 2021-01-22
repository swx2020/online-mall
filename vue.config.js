module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                commonJS: '@/commonJS',
                components: '@/components',
                views: '@/views',
                network: '@/network'
            }
        }
    }
}

// 别名配置后一定要先别名配置结束后一定要先重新 npm run serve，然后才能在路径中使用别名
// 如果没有先npm run serve，而是直接在路径中使用会报错
