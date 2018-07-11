<template>
  <div class="paymentMethod">
    <div class="row">
      <form-title :title="title"
                  :subtitle="subtitle"
                  class="col-12"></form-title>
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
