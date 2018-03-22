// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import VueAppInsights from 'vue-application-insights';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';

Vue.use(Element, { size: 'small' });
Vue.use(VueAppInsights, {
  id: 'f71df0ca-cfa3-4a8b-9b4f-14b91536d506',
  router,
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
