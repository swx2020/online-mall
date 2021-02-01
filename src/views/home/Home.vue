<template>
    <div>
        <!-- 引用组件NavBar -->
        <nav-bar class="home-nav">
            <!-- 因为这里只需要替换中间部分，所以只需要写一个命名插槽 -->
            <div slot="center">购物街</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
    name: 'Home',
    components: {
        NavBar
    }
}
</script>

<style scoped>
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
}
</style>