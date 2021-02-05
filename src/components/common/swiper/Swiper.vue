<template>
    <div id="hy-swiper">
      <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <!-- 指示点 -->
      <slot name="indicator">
      </slot>
      <div class="indicator">
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
	export default {
		name: "Swiper",
    props: {
      interval: {
		    type: Number,
        default: 3000
      },
      animDuration: {
		    type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
      }
    },
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();
        // console.log(this.slideCount);
        // 2.开启定时器
        this.startTimer();
        // console.log(this.slideCount);
      }, 500)
      
      /*
      // 这里定时器的时间如果太短，会导致接口还没加载时，定时器由于时间太短已经工作，所以后面的都没有执行?

        刚刚做完，也发现了问题，发表下我的观点。先说结论吧：我认为是异步操作导致的。
        原因是我在没有抽离模板的时候，即组件内容都在Home中完成的时候，是没有任何问题的；
        但在抽离了模板之后我的轮播图是在轮播，但是没有图片，一片空白，只有第一张图。
        因此，我便从模板抽离处开始找问题。然后看见了：banners的动态绑定，发现所需的数据是经过异步请求传过来的。
        我们也知道，异步请求的结果是在回调函数中，所以先渲染的模板可能会出现空数据的情况，即还没有拿到返回的数据，
        后来拿到了数据，但模板已经渲染完了，并没有响应式的刷新。因此重新刷新页面后，轮播图又正常工作了。

        解决：加大定时器的时间，把渲染模板的延时器时间调长一点，等拿到数据了，再开始渲染
      */
    },
    methods: {
		  /**
       * 定时器操作
       */
      startTimer: function () {
		    this.playTimer = window.setInterval(() => {
		      this.currentIndex++;
		      this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent: function (currentPosition) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 校验正确的位置
       */
      checkPosition: function () {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },

      /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
		  handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },

      /**
       * 拖动事件的处理
       */
      touchStart: function (e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },

      touchMove: function (e) {
        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function (e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },

      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
	}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
