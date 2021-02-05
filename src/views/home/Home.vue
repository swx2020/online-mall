<template>
    <div id="home">
        <!-- 引用组件NavBar -->
        <nav-bar class="home-nav">
            <!-- 因为这里只需要替换中间部分，所以只需要写一个命名插槽 -->
            <div slot="center">购物街</div>
        </nav-bar>

        <!-- 轮播图 -->
        <!-- :banners="banners" 参考父传子 -->
        <home-swiper :banners="banners"></home-swiper>

        <!-- 轮播图2 -->
        <!-- <div id="hy-swiper">
            <div class="swiper">
                <img src="~assets/img/home/recommend_bg.jpg" alt="">
                < !-- 循环遍历图片 -- >
            </div>
        </div> -->
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComponents/HomeSwiper.vue'

import {getHomeMultidata} from 'network/home.js';

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper
    },
    data() {
        return {
            // 将请求过来的数据到存到data中！！！
            // result: null
            // result中是一个大的对象，内部有多个变量，为了区分，将每个变量单独保存
            banners: [],
            recommends: []
        }
    },
    created() {
        // 当组件被创建时就发送请求
        // 1、请求多个数据

        /*
            函数调用  -> 压入函数栈中调用，
                函数栈中会保存所以函数调用过程中的所有的变量（数据等），
                    但是这些变量（数据等）都是临时的

            函数调用结束 -> 弹出函数栈（释放函数调用过程中的所有变量）

            即没调用一次，变量都会重新创建，一旦调用结束，所有变量都会释放
        */ 
        // 这里是一个异步操作！！！参考promise（then方法）
        getHomeMultidata()
            .then(res => {
                console.log(res);
                /*
                    此时数据在函数内，一旦调用函数执行完毕就不再存在，
                        所以要先将请求过来的数据保存起来（保存到data中）
                */    
                // this.result = res;
                // 此时变量都已经保存到data中的result变量中：涉及到垃圾回收机制（内存回收） ---- 选集p155/20分钟左右

                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
    }
}
</script>

<style scoped>
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
}

.swiper img {
    width: 320px;
}
</style>