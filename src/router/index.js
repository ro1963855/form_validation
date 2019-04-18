import Vue from 'vue';
import Router from 'vue-router';
import CreateAccount from '@/components/CreateAccount';
import GeneralInfomation from '@/components/GeneralInfomation';
import UpdateProfilePicture from '@/components/UpdateProfilePicture';
import PaymentMethod from '@/components/PaymentMethod';
import FinishForm from '@/components/FinishForm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/vue/form_validation/',
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
    {
      path: '/updateProfilePicture',
      name: 'UpdateProfilePicture',
      component: UpdateProfilePicture,
    },
    {
      path: '/paymentMethod',
      name: 'PaymentMethod',
      component: PaymentMethod,
    },
    {
      path: '/finishForm',
      name: 'FinishForm',
      component: FinishForm,
    },
  ],
});
