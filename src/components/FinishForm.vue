<template>
  <div class="finishForm">
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
