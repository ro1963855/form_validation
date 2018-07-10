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
                            class="fv_form_input"
                            placeholder="example@email.com"></b-form-input>
              <font-awesome-icon class="fv_form_warining"
                                  :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
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
                          placeholder="●●●●●●●●"></b-form-input>
            <b-tooltip ref="fv_form_comfirmPassword_tooltip"
                        target="fv_form_password"
                        placement="right"
                        triggers="click">MINIMUM 8 CHARACTERS</b-tooltip>
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
                          :state="false"
                          placeholder="●●●●●●●●"></b-form-input>
            <font-awesome-icon class="fv_form_warining"
                                :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
            <b-tooltip ref="fv_form_comfirmPassword_tooltip"
                        target="fv_form_comfirmPassword"
                        placement="right"
                        triggers="click">NOT MATCH</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form_submit">
        <div class="row">
          <div class="col-12">
            <b-button variant="primary"
                      class="fv_form_submit_btn"
                      :disabled="!isValidated">{{ `SUBMIT & NEXT` }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';

export default {
  name: 'fv_crateAccount',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Create Account',
      subtitle: 'Glad to see you here!',
      isValidated: false,
      completedStep: 0,
    };
  },
  methods: {
    updateStep() {
      const vm = this;
      vm.$eventHub.$emit('update-step', vm.completedStep);
    },
  },
  created() {
    this.updateStep();
  },
};
</script>
