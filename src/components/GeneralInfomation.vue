<template>
  <div class="fv_generalInfomation container">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
    </div>
    <div class="row fv_form_body">
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title" data-subtitle="(optional)">Name</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="Example Name"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">Phone*</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            id="fv_form_phone"
                            class="fv_form_input"
                            placeholder="0912 345 678"
                            v-model="phone.value"
                            :state="phone.isValidated"
                            @change="checkPhoneFormat"></b-form-input>
              <font-awesome-icon class="fv_form_warining"
                                  :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
              <b-tooltip ref="fv_form_phone_tooltip"
                        target="fv_form_phone"
                        placement="right"
                        triggers="">NUMBERS ONLY</b-tooltip>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title" data-subtitle="(optional)">Birth Date</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="YYYY"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title"></h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="MM"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-4 fv_form">
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
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title">Address*</h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="City"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-6 fv_form">
        <div class="row">
          <div class="col-12 d-flex">
            <h3 class="fv_form_title"></h3>
          </div>
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            class="fv_form_input"
                            placeholder="Dist"></b-form-input>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form mb-0">
        <div class="row">
          <div class="col-12 position-relative">
              <b-form-input type="text"
                            id="fv_form_address"
                            class="fv_form_input"
                            placeholder="Address Detail"
                            v-model="address.value"
                            :state="address.isValidated"
                            @change="checkAddressFormat"></b-form-input>
              <font-awesome-icon class="fv_form_warining"
                                  :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
              <b-tooltip ref="fv_form_address_tooltip"
                        target="fv_form_address"
                        placement="right"
                        triggers="">REQUIRED FILED</b-tooltip>
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
  name: 'fv_generalInfomation',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'General Infomation',
      subtitle: 'Tell us who you are!',
      completedStep: 1,
      phone: {
        value: '',
        isValidated: null,
      },
      address: {
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
    checkPhoneFormat() {
      const vm = this;
      const descriptor = {
        value: {
          type: 'number',
          required: true,
          transform(value) {
            if (value === '') {
              return value;
            }
            return vm._.toNumber(value);
          },
        },
      };

      const validator = new AsyncValidator(descriptor);
      validator.validate(vm.phone, (errors) => {
        if (errors) {
          vm.phone.isValidated = false;
          vm.$refs.fv_form_phone_tooltip.$emit('open');
        } else {
          vm.phone.isValidated = true;
          vm.$refs.fv_form_phone_tooltip.$emit('close');
        }
      });
    },
    checkAddressFormat() {
      const vm = this;
      const descriptor = {
        value: {
          type: 'string',
          required: true,
        },
      };

      const validator = new AsyncValidator(descriptor);
      validator.validate(vm.address, (errors) => {
        if (errors) {
          vm.address.isValidated = false;
          vm.$refs.fv_form_address_tooltip.$emit('open');
        } else {
          vm.address.isValidated = true;
          vm.$refs.fv_form_address_tooltip.$emit('close');
        }
      });
    },
    canSubmit() {
      return !(
        !this._.isEmpty(this.phone.value) &&
        !this._.isEmpty(this.address.value) &&
        this.phone.isValidated &&
        this.address.isValidated
      );
    },
    submitForm() {
      this.$router.push('/updateProfilePicture');
    },
  },
  created() {
    this.updateStep();
  },
};
</script>
