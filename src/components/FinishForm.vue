<template>
  <div class="finishForm container">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
    </div>
    <div class="row fv_form_body">
      <div class="col-12 fv_form mb-0">
        <div class="row">
          <div class="col-12 d-flex d-flex align-items-center justify-content-center">
            <font-awesome-icon class="fv_smile" :icon="['fas', 'smile']"></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="col-12 fv_form">
        <div class="row">
          <h3 class="fv_redirect_word w-100">Redirected to homepage after 5 seconds…</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTitle from '@/components/FormTitle';

export default {
  name: 'finishForm',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Congratulations',
      subtitle: 'Now you’re one of us!',
      completedStep: 5,
    };
  },
  created() {
    this.updateStep();
  },
  mounted() {},
  methods: {
    updateStep() {
      const vm = this;
      vm.$eventHub.$emit('update-step', vm.completedStep);
    },
  },
};
</script>
