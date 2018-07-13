<template>
  <div class="paymentMethod container">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
    </div>
    <div class="row fv_form_body">
      <div class="col-12 fv_form">
        <div class="row">
          <div class="col-12">
            <h3 class="fv_form_title">Card Number</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            id="fv_form_credit"
                            class="fv_form_input"
                            placeholder="1234 5678 9012 3456"
                            v-model="credit.value"
                            :state="credit.isValidated"
                            @change="checkCreditCardType"></b-form-input>
              <font-awesome-icon :icon="['fab', 'cc-visa']"
                                  v-if="this._.isEmpty(credit.type) && credit.isValidated !== false"
                                  class="fv_credit_type_palceholder"></font-awesome-icon>
              <font-awesome-icon :icon="['fab', credit.type]"
                                  v-if="!this._.isEmpty(credit.type)"
                                  class="fv_credit_type"></font-awesome-icon>
              <font-awesome-icon class="fv_form_warining"
                                  :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
              <b-tooltip ref="fv_form_credit_tooltip"
                        target="fv_form_credit"
                        placement="right"
                        triggers="">INVALID NUMBER</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">Cardholder Name</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="EXAMPLE NAME"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">Bank Name</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="EXAMPLE BANK"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form mb-0">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">CVV</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="123"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form mb-0">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">Expire Date</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="MM"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form mb-0">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title"></h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="DD"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form_submit">
        <div class="row">
          <div class="col-12">
            <b-button variant="primary"
                      class="fv_form_submit_btn"
                      :disabled="canSubmit()"
                      @click="submitForm()">{{ `DONE` }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';

export default {
  name: 'paymentMethod',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Payment Method',
      subtitle: 'Add your credit card infomation!',
      completedStep: 3,
      credit: {
        value: '',
        isValidated: null,
        type: '',
      },
    };
  },
  created() {
    this.updateStep();
  },
  mounted() {},
  methods: {
    checkCreditCardType() {
      const number = this.credit.value;
      this.credit.type = '';
      // visa
      let re = new RegExp('^4');
      if (number.match(re) != null) {
        this.credit.type = 'cc-visa';
      }

      // Mastercard
      // Updated for Mastercard 2017 BINs expansion
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
        this.credit.type = 'cc-mastercard';
      }

      // AMEX
      re = new RegExp('^3[47]');
      if (number.match(re) != null) {
        this.credit.type = 'cc-amex';
      }

      // Discover
      re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
      if (number.match(re) != null) {
        this.credit.type = 'cc-discover';
      }

      // Diners
      re = new RegExp('^36');
      if (number.match(re) != null) {
        this.credit.type = 'cc-diners-club';
      }

      // JCB
      re = new RegExp('^35(2[89]|[3-8][0-9])');
      if (number.match(re) != null) {
        this.credit.type = 'cc-jcb';
      }

      if (this._.isEmpty(this.credit.type)) {
        this.credit.isValidated = false;
        this.$refs.fv_form_credit_tooltip.$emit('open');
      } else {
        this.credit.isValidated = true;
        this.$refs.fv_form_credit_tooltip.$emit('close');
      }
    },
    updateStep() {
      const vm = this;
      vm.$eventHub.$emit('update-step', vm.completedStep);
    },
    canSubmit() {
      return !(
        !this._.isEmpty(this.credit.value) &&
        this.credit.isValidated
      );
    },
    submitForm() {
      this.$router.push('/FinishForm');
    },
  },
};
</script>
