import Vue from 'vue';
import Router from 'vue-router';
import CreateAccount from '@/components/CreateAccount';
import GeneralInfomation from '@/components/GeneralInfomation';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CreateAccount',
      component: CreateAccount,
    },
    {
      path: '/generalInfomation',
      name: 'GeneralInfomation',
      component: GeneralInfomation,
    },
  ],
});
