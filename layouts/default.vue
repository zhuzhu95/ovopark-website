<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <div class="logo">
          <a href="/"><i class="ovopark-logo"></i></a>
        </div>    
        <ul class="p-ul">
          <li class="p-li" v-for="(menu, mIndex) in menus" :key="mIndex">
            <span>{{ menu.name }}</span>
            <i class="border"></i>
            <ul class="child-ul">
              <li class="child-li" v-for="(child, cIndex) in menu.child" :key="cIndex">
                <nuxt-link :to="child.url">{{ child.name }}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="nav-btn">
          <button class="login" @click="handleLogin">登录</button>
          <a class="regist" href="/webview/register/index.html#!/" target="_blank" rel="nofollow">注册</a>
          <a class="opreat" href="http://www.opretail.com" target="_blank">English website</a>
        </div>
      </div>
    </div>
    <nuxt />
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import menuList from '~/assets/js/menu'
import qs from 'qs'

const md5 = require('~/assets/js/md5')

export default Vue.extend({
  data() {
    return {
      menus: menuList
    }
  },
  methods: {
    handleLogin() {
      this.$axios.$post(
        '/login.action',
        qs.stringify({ username: 'zxx', password: md5('666666a') }),
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      ).then(res => {
        console.log(res)
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
})
</script>

<style lang="scss">
body, p, h1, h2, h3, ul, li {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(0,0,0,0.8);
  color: #fff;
}
.header-inner {
  width: 1280px;
  margin: 0 auto;
  line-height: 60px;
  .p-ul {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .p-li {
      width: 108px;
      text-align: center;
      cursor: pointer;
      position: relative;
      .border {
        opacity: 0;
        position: absolute;
        bottom: 0px; left: 0;
        display: inline-block;
        width: 100%;
        border-bottom: 2px solid #f90;
      }
      &:hover {
        .border {
          opacity: 1;
        }
        .child-ul {
          max-height: 540px;
        }
      }
    }
  }
  .child-ul {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    position: absolute;
    transition: max-height 0.5s;
    .child-li {
      background-color: rgba(0, 0, 0, 0.8);
      a { color: #fff; }
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
.footer {
  height: 100px;
  background-color: #f2f2f2;
}
</style>
