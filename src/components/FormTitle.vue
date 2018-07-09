<template>
  <div class="fv_formTitle">
      <h1>{{ title }}</h1>
      <h2>{{ subtitle }}</h2>
  </div>
</template>

<script>
export default {
  name: 'fv_formTitle',
  props: ['title', 'subtitle'],
  data() {
    return {};
  },
};
</script>
