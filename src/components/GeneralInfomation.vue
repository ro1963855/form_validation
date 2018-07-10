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
                            id="fv_form_name"
                            class="fv_form_input"
                            placeholder="Example Name"
                            v-model="name.value"></b-form-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';

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
      name: {
        value: '',
      },
    };
  },
  methods: {
    // emit
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
