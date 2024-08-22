<template>
  <div id="app">
    <router-view />
    <!-- This will render the HomePage or RankingsCaseStudy depending on the route -->
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>
