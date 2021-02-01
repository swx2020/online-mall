<template>
  <div id="tab-bar">
      <slot></slot>
    <!-- <div class="tab-bar-item">首页</div>
    <div class="tab-bar-item">分类</div>
    <div class="tab-bar-item">购物车</div>
    <div class="tab-bar-item">我的</div> -->
  </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style scoped>
#tab-bar {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  background: #f6f6f6;
  display: flex;
  /* 
  flex布局
    Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。
    任何一个容器都可以指定为Flex布局。
      .box{
        display: flex;
      }
    行内元素也可以使用Flex布局。
      .box{
          display: inline-flex;
      }

    !!!注意:设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
  */
}
</style>