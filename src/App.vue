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

<style lang="scss" scoped>
// Define global color variables first
$background-color: #f5f5f5;
$text-color: #333;
$primary-color: #3498db;
$link-color: $primary-color;

#app {
  text-align: center;
  padding: 20px;
  font-family: "Arial", sans-serif;

  // Set up default background and text color
  background-color: $background-color;
  color: $text-color;

  // Set up media query for responsiveness
  @media (max-width: 768px) {
    padding: 10px;
  }
}

body {
  margin: 0;
  padding: 0;
  font-family: "Arial", sans-serif;
  background-color: $background-color;
  color: $text-color;

  // Set a default font size for the body
  font-size: 16px;

  // Ensure that text rendering is optimized
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Add a global link style
a {
  color: $link-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
