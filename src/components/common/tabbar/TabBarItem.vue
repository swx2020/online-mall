<template>
    <div class="tab-bar-item" @click="Toggle">

        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
        <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->

        <!-- 
            因为这里不能写死，而是在父组件中动态传入
                所以可以选择命名插槽
            
            <img src="" alt="首页">
            <div>首页</div>
         -->

    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        // 传入当前要跳转的路由
        path: String,
        activeColor: {
            type: String,
            default: 'lightblue'
        }
    },
    data() {
        return {
            // isActive: true
        }
    },
    computed: {
        isActive() {
            // 判断当前活跃的路由中的path是否与传入props中的path相同
            // indexOf == -1 表示$route.path中没有找到 this.path，即不等于 props中的path
            // 反之 !== -1，则代表有 this.path，即等于 props中的path
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        Toggle() {
            this.$router.push(this.path)
        }
    }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
    padding-top: 3px;
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
/* .active {
    color: deeppink;
} */
</style>