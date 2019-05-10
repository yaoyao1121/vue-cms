// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import qs from 'qs'

import common from './api/common'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
// import './assets/app.less'

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const LOGIN = !!localStorage.getItem('username');
  if (!LOGIN && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//axios 默认设置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = '/home/';  //本地
// axios.defaults.baseURL = 'http://192.168.1.112:30001/trender-interface';  //本地
axios.defaults.baseURL = 'http://47.111.87.108:30001/trender-interface';  //测试
// axios.defaults.baseURL = 'http://101.37.66.204:30001/trender-interface';  //生产



let token = '';

axios.defaults.headers.common['x-authtoken'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use((config) => {

  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }

  let grxx = !!sessionStorage.getItem('grxx') ? JSON.parse(sessionStorage.getItem('grxx')) : '';
  let token = ''
  if (!!grxx) {
    token = grxx.userToken
  }

  config.headers.common['x-authtoken'] = token;

  return config;
}, (err) => {
  return Promise.reject(err);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
  const data = response.data

  if (data.status == 'token_error') {
    router.replace({
      path: "/"
    });
    window.ELEMENT.Message.error({
      message: data.msg
    })
   
  }

    return response;

}, (err) => {

  return Promise.reject(err);
});

Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;   //  携带cookies
















Vue.prototype.number = common.number;

Vue.config.productionTip = false



//格式化日期格式
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
