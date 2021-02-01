<template>
    <!-- 
        基本上移动端的电商项目每个页面都会有一个导航栏（内容样式很多例如标题、例如购物车即数量、例如详情页的选项卡）
            所以整体的导航栏应该放在 common 文件中
            而具体的内容放在 content 文件夹中
     -->

     <!-- 
         因为可能多个页面都有导航栏，所以这里应该使用类名
                tabbar.vue文件是因为整个项目都只有一个tabbar，所以使用id
      -->
    <div class="nav-bar">
        <!-- 因为这里需要布局样式，插槽应该被包在div内部！！！ -->
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
/* 使用flex布局 */
.nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

    /* 项目中的导航栏虽然有背景颜色，但是不建议在这里设置，因为有些页面导航栏没有背景颜色 */
}

.left,.right {
    width: 60px;
}

.center {
    flex: 1;
}
</style>