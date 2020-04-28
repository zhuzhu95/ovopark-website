<template>
  <div class="container">
    <!-- banner -->
    <div class="banner-wrapper">
      <div class="carouse-list">
        <div class="carouse-track" :style="trackStyles">
          <div
            class="carouse-item"
            v-for="bannerItem in bannerList"
            :key="bannerItem.id"
            :style="{'background': `url(${bannerItem.showUrl}) 0% 0%/cover;`}">
            <a v-show="bannerItem.linkUrl" :href="bannerItem.linkUrl"></a>
          </div>
        </div>
        </div>
        <ul class="carouse-dots">
          <li
            class="dots-item"
            v-for="dotsItem in bannerList.length"
            :key="dotsItem"
            :class="{'dots-active': dotsItem === currentIndex + 1}"
            @click="handleDots(dotsItem - 1)">
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '【万店掌】视频远程巡店系统_客流统计分析系统_门店客流分析统计软件',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '视频远程巡店系统,客流统计系统,客流分析系统,客流统计分析软件,万店掌' },
        { hid: 'description', name: 'description', content: '苏州万店掌网络科技有限公司【服务热线:400-100-1392】高效运营专家，为零售连锁等行业提供视频远程巡店系统，客流统计分析系统，门店客流分析统计软件，以及会员识别，连锁店监控等解决方案，欢迎前来咨询服务！' },
      ]
    }
  },
  data() {
    return {
      bannertimer: null,
      trackOffset: 0,
      currentIndex: 0,
    }
  },
  async asyncData({ $axios }) {
    try {
      const params = { type: 3 }
      const res = await $axios.$post('/service/getAdvertisements.action', params)
      let bannerList = []
      if (res.result === 'ok') {
        const arr = res.data.data
        for (const item of arr) {
          if (item.linkUrl) {
            item.linkUrl = item.linkUrl.split('||&&||')[0]
          }
        }
        bannerList = arr
      }
      return { bannerList }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    trackStyles() {
      return {
        transform: `translateX(${-this.trackOffset}%)`,
        transition: 'transform 500ms ease 0s',
      }
    }
  },
  mounted() {
    this.setAutoplay()
  },
  methods: {
    // banner 自动播放
    setAutoplay() {
      window.clearInterval(this.bannertimer)
      this.bannertimer = window.setInterval(() => {
        if (this.currentIndex < this.bannerList.length - 1) {
          this.currentIndex++
        } else {
          this.currentIndex = 0
        }
        this.trackOffset = this.currentIndex * 20
      }, 3000)
    },

    // 点击 banner 下的小点
    handleDots(n) {
      this.currentIndex = n
      this.setAutoplay()
    }
  }
}
</script>

<style lang="scss">
.container {
  .banner-wrapper {
    position: relative;
    .carouse-list {
      // width: 60%;
      // margin: 0 auto;
      overflow: hidden;
      .carouse-track {
        width: 500%;
        transform: translateX(0);
        transition: transform 500ms ease 0s;
      }
      .carouse-item {
        float: left;
        width: 20%;
        height: 969px;
      }
    }
    .carouse-dots {
      position: absolute;
      left: 0;
      bottom: 10px;
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      padding-inline-start: 0;
      .dots-item {
        width: 15px;
        height: 6px;
        border-radius: 3px;
        background-color: #d6d6d6;
        margin-left: 15px;
        cursor: pointer;
      }
      .dots-active {
        width: 30px;
        background-color: #ff9900;
      }
    }
  }
}
</style>
