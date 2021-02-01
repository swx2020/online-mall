<template>
    
    <!-- 在script标签中的名称使用驼峰命名时，template标签中的名称可以使用短横杠！！！！ -->
    <tab-bar>

      <!-- 在使用组件时，同时还需要传入当前的路由，以便点击时能完成路由跳转 -->
      <tab-bar-item path='/home' activeColor="deeppink">
        <!-- 通过插槽可以动态传入不同内容 -->
        <img slot='item-icon' src="~assets/img/tabbar/home.svg" alt="首页">
        <img slot='item-icon-active' src="~assets/img/tabbar/home_active.svg" alt="首页">
        <div slot='item-text'>首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor="deeppink">
        <!-- 通过插槽可以动态传入不同内容 -->
        <img slot='item-icon' src="~assets/img/tabbar/category.svg" alt="分类">
        <img slot='item-icon-active' src="~assets/img/tabbar/category_active.svg" alt="分类">
        <div slot='item-text'>分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart' activeColor="deeppink">
        <!-- 通过插槽可以动态传入不同内容 -->
        <img slot='item-icon'  src="~assets/img/tabbar/shopcart.svg" alt="购物车">
        <img slot='item-icon-active'  src="~assets/img/tabbar/shopcart_active.svg" alt="购物车">
        <div slot='item-text'>购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile' activeColor="deeppink">
        <!-- 通过插槽可以动态传入不同内容 -->
        <img slot='item-icon'  src="~assets/img/tabbar/profile.svg" alt="我的">
        <img slot='item-icon-active'  src="~assets/img/tabbar/profile_active.svg" alt="我的">
        <div slot='item-text'>我的</div>
      </tab-bar-item>

    </tab-bar>
</template>

<script>

  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>