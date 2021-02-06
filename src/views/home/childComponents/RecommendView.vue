<template>
  <div class="recommend">
     <div class="recommend-item" v-for="item in recommends" :key="item.acm">
        <a :href="item.link">
           <img :src="item.image" alt="">
           <div>{{item.title}}</div>
        </a>
     </div>
   </div>
</template>

<script>
export default {
   name: 'RecommendView',
   // 这里需要获取数据，而数据都在home.vue中
   props: {
      recommends: {
         type: Array,
         default() {
            return []
         }
      }
   }
}
</script>

<style scoped>
.recommend {
   display: flex;
   width: 100%;
   text-align: center;
   font-size: 12px;

   padding: 10px 0 20px;
   border-bottom: 8px solid #eee;
}

.recommend-item {
   flex: 1;
}

.recommend-item img {
   width: 70px;
   height: 70px;
   margin-bottom: 10px;
}
</style>