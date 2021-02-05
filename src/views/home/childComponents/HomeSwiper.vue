<template>
  <div>
    <!-- 轮播图 -->
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>


<script>
// 导入轮播图
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        //   当类型是数组或者对象时，默认值必须是函数形式
        //   默认返回一个空数组，
        return []
      },
    },
  },
};
</script>

<style scoped>
</style>