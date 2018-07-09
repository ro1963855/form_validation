<template>
  <div class="fv_crateAccount container">
    <form-title :title="title" :subtitle="subtitle"></form-title>
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
    };
  },
};
</script>
