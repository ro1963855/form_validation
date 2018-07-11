<template>
  <div class="fv_crateAccount container">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
    </div>
    <div class="row fv_form_body">
      <div class="col-12 fv_form">
        <div class="row">
          <div class="col-12">
            <h3 class="fv_form_title">Account</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            id="fv_form_account"
                            class="fv_form_input"
                            placeholder="example@email.com"
                            v-model="email.value"
                            :state="email.isValidated"
                            @change="checkEmailFormat"></b-form-input>
              <font-awesome-icon class="fv_form_warining"
                                  :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
              <b-tooltip ref="fv_form_account_tooltip"
                        target="fv_form_account"
                        placement="right"
                        triggers="">INVALID EMAIL</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form">
        <div class="row">
          <div class="col-12">
            <h3 class="fv_form_title">Password</h3>
          </div>
          <div class="col-12">
            <b-form-input type="text"
                          id="fv_form_password"
                          class="fv_form_input"
                          placeholder="●●●●●●●●"
                          v-model="password.value"
                          :state="password.isValidated"
                          @change="checkPasswordFormat"></b-form-input>
            <font-awesome-icon class="fv_form_warining"
                                :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
            <b-tooltip ref="fv_form_password_tooltip"
                        target="fv_form_password"
                        placement="right"
                        triggers="">MINIMUM 8 CHARACTERS</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form mb-0">
        <div class="row">
          <div class="col-12">
            <h3 class="fv_form_title">Comfirm Password</h3>
          </div>
          <div class="col-12">
            <b-form-input type="text"
                          id="fv_form_comfirmPassword"
                          class="fv_form_input"
                          placeholder="●●●●●●●●"
                          v-model="comfirmPassword.value"
                          :state="comfirmPassword.isValidated"
                          @change="checkComfirmPasswordIsEqualToPassword">></b-form-input>
            <font-awesome-icon class="fv_form_warining"
                                :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
            <b-tooltip ref="fv_form_comfirmPassword_tooltip"
                        target="fv_form_comfirmPassword"
                        placement="right"
                        triggers="">NOT MATCH</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form_submit">
        <div class="row">
          <div class="col-12">
            <b-button variant="primary"
                      class="fv_form_submit_btn"
                      :disabled="canSubmit()"
                      @click="submitForm()">{{ `SUBMIT & NEXT` }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';
import AsyncValidator from 'async-validator';

export default {
  name: 'fv_crateAccount',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Create Account',
      subtitle: 'Glad to see you here!',
      completedStep: 0,
      email: {
        value: '',
        isValidated: null,
      },
      password: {
        value: '',
        isValidated: null,
      },
      comfirmPassword: {
        value: '',
        isValidated: null,
      },
    };
  },
  methods: {
    // emit
    updateStep() {
      const vm = this;
      vm.$eventHub.$emit('update-step', vm.completedStep);
    },
    checkEmailFormat() {
      const vm = this;
      const descriptor = {
        value: {
          type: 'string',
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          required: true,
        },
      };

      const validator = new AsyncValidator(descriptor);
      validator.validate(vm.email, (errors) => {
        if (errors) {
          vm.email.isValidated = false;
          vm.$refs.fv_form_account_tooltip.$emit('open');
        } else {
          vm.email.isValidated = true;
          vm.$refs.fv_form_account_tooltip.$emit('close');
        }
      });
    },
    checkPasswordFormat() {
      const vm = this;
      const descriptor = {
        value: {
          type: 'string',
          pattern: /^.{8}$/,
          required: true,
        },
      };

      const validator = new AsyncValidator(descriptor);
      validator.validate(vm.password, (errors) => {
        if (errors) {
          vm.password.isValidated = false;
          vm.$refs.fv_form_password_tooltip.$emit('open');
        } else {
          vm.password.isValidated = true;
          vm.$refs.fv_form_password_tooltip.$emit('close');
        }
      });
    },
    checkComfirmPasswordIsEqualToPassword() {
      const vm = this;
      if (vm.password.value === vm.comfirmPassword.value) {
        vm.comfirmPassword.isValidated = true;
        vm.$refs.fv_form_comfirmPassword_tooltip.$emit('close');
      } else {
        vm.comfirmPassword.isValidated = false;
        vm.$refs.fv_form_comfirmPassword_tooltip.$emit('open');
      }
    },
    canSubmit() {
      return !(
        !this._.isEmpty(this.email.value) &&
        !this._.isEmpty(this.password.value) &&
        !this._.isEmpty(this.comfirmPassword.value) &&
        this.email.isValidated &&
        this.password.isValidated &&
        this.comfirmPassword.isValidated
      );
    },
    submitForm() {
      this.$router.push('/generalInfomation');
    },
  },
  created() {
    this.updateStep();
  },
};
</script>
