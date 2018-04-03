import Vue from 'vue';
import Router from 'vue-router';
import Auction from '@/pages/Auction';
import Home from '@/pages/Home';
import Memorial from '@/pages/Memorial';
import My from '@/pages/My';
import Trade from '@/pages/Trade';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/auction', name: 'Auction', component: Auction },
    { path: '/home', name: 'Home', component: Home },
    { path: '/memorial', name: 'Memorial', component: Memorial },
    { path: '/my', name: 'My', component: My },
    { path: '/trade', name: 'Trade', component: Trade },
  ],
});
