<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
  h1, h2, h3, h4, * {
    line-height: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    /* outline: 1px solid red; */
  }
</style>

