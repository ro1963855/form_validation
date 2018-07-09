<template>
  <div class="fv_navbar container">
    <div class="fv_line"></div>
    <div class="fv_step d-flex justify-content-center">
      <div class="fv_step_graph d-flex align-items-center" v-for="index in step.total" :key="index">
        <font-awesome-icon class="fv_step_icon"
                            :class="{active: index <= step.current}"
                            v-if="index >= step.current"
                            :icon="['far', 'dot-circle']"></font-awesome-icon>
        <font-awesome-icon class="fv_step_icon"
                            :class="{active: index <= step.current}"
                            v-if="index < step.current"
                            :icon="['fas', 'check-circle']"></font-awesome-icon>
        <div class="fv_step_connection"
              :class="{active: index <= step.current - 1}"
              v-if="index < step.total"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fv_navbar',
  data() {
    return {
      step: {
        total: 4,
        current: 2,
      },
    };
  },
};
</script>
