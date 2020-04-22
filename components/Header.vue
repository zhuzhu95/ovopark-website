<template>
  <div class="header">
    <div class="header-inner">   
      <ul class="p-ul">
        <li class="logo"><i class="ovopark-logo"></i></li>
        <li class="p-li" v-for="(menu, mIndex) in menus" :key="mIndex">
          <span>{{ menu.name }}</span>
          <i class="border"></i>
          <ul class="child-ul">
            <li class="child-li" v-for="(child, cIndex) in menu.child" :key="cIndex">
              <nuxt-link :to="child.url">{{ child.name }}</nuxt-link>
            </li>
          </ul>
        </li>
        <li class="btns">
          <button class="login" @click="handleLogin">登录</button>
          <a class="register" :href="`${baseURL}/webview/register/index.html#!/`" target="_blank" rel="nofollow">注册</a>
          <a class="opretail" href="http://www.opretail.com" target="_blank">English website</a>
        </li>
      </ul>
    </div>
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
      menus: menuList,
      baseURL: process.env.BASE_URL
    }
  },
  methods: {
    handleLogin() {
      const params = {
        username: 'zxx',
        password: md5('666666a')
      }
      this.$axios.$post('/login.action', qs.stringify(params), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        let url = ''
        if (res.result === 'true') {
          if (!res.groupId) {
            localStorage.setItem("ovo_loginReferrer", window.location.href)
            localStorage.setItem("ovo_webSocketId", res.webSocketId)
            url = '/home/index.html'
          } else {
            url = `/webview/register/index.html?enterId=${res.groupId}#!/next`
          }
        } else {
          if (res.signUsersId) {
            url = `/webview/register/index.html?signUserId=${res.signUserId}#!/join`
          }
        }
        window.location.href = this.baseURL + url
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
})
</script>
<style lang="scss">
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
  font-size: 14px;
  .p-ul {
    display: flex;
    justify-content: space-between;
    .logo {
      height: 60px;
      margin-right: 100px;
      .ovopark-logo {
        display: inline-block;
        width: 83px;
        height: 42px;
        margin-top: 9px;
        background-image: url('//ovopark.oss-cn-hangzhou.aliyuncs.com/web/images/Ovopark_Logo.png');
      }
    }
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
  .btns {
    margin-left: 100px;
  }
  .login {
    padding: 7px 15px;
    color: #fff;
    border: 1px solid #fa0;
    outline: none;
    border-radius: 6px;
    background-color: #fa0;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background-color: #f90;
    }
  }
  .register {
    padding: 7px 15px;
    color: #fa0;
    border: 1px solid #fa0;
    border-radius: 6px;
    margin-right: 10px;
    &:hover {
      color: #fff;
      background-color: #f90;
    }
  }
  .opretail {
    color: #666;
    &:hover {
      color: #fff;
    }
  }
}
</style>