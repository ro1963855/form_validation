<template>
  <div class="updateProfilePicture">
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
  name: 'updateProfilePicture',
  components: {
    FormTitle,
  },
  data() {
    return {
      title: 'Update Profile Picture',
      subtitle: 'We wanna know you more!',
      completedStep: 2,
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
