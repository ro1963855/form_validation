<template>
  <div class="fv_navbar container">
    <div class="row">
      <div class="col-12">
        <div class="fv_line"></div>
      </div>
    </div>
    <div class="row">
      <div class="fv_step d-flex justify-content-center col-12">
        <div class="fv_step_graph d-flex align-items-center"
              v-for="index in step.total"
              :key="index">
          <font-awesome-icon class="fv_step_icon"
                              :class="{active: index <= step.completed + 1}"
                              v-if="index >= step.completed + 1"
                              :icon="['far', 'dot-circle']"></font-awesome-icon>
          <font-awesome-icon class="fv_step_icon"
                              :class="{active: index <= step.completed}"
                              v-if="index < step.completed + 1"
                              :icon="['fas', 'check-circle']"></font-awesome-icon>
          <div class="fv_step_connection"
                :class="{active: index <= step.completed}"
                v-if="index < step.total"></div>
        </div>
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
        completed: -1,
      },
    };
  },
  methods: {
    listenUpdateStep() {
      const vm = this;
      vm.$eventHub.$on('update-step', (completed) => {
        vm.step.completed = completed;
      });
    },
  },
  created() {
    this.listenUpdateStep();
  },
};
</script>
