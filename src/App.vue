<template>
  <div id="app">
    <div class="page-header">
      <work-header />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import workheader from './components/header.vue'

export default {
  name: 'app',
  components: {
    'work-header': workheader
  }
}
</script>

<style scoped>
#app {
  min-width: 1366px;
}
</style>>
