<template>
  <div class="app">
      <headerBar />

      <main class="content">
          <router-view />
      </main>

      <footerBar />
  </div>
</template>

<script>
import headerBar from './pages/components/headerBar.vue'
import footerBar from './pages/components/footerBar.vue'

export default {
  name: 'App',
  components: {
    headerBar,
    footerBar
  }
}
</script>

<style>
html, body { height: 100%; }

body {
  min-height: 100vh;
  margin: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* this is the middle area between header and footer */
.content {
  flex: 1;          /* take remaining height */
  display: flex;    /* so .layout in the page can stretch */
}
</style>