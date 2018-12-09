import Vue from 'vue';
// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.client) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    Vue.use(VueAwesomeSwiper);
}
