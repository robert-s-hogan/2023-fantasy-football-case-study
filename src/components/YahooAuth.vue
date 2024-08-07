<template>
  <div>
    <button @click="authenticate">Authenticate with Yahoo</button>
  </div>
</template>

<script>
import YahooService from "@/services/YahooService";

export default {
  methods: {
    async authenticate() {
      try {
        const authUrl = await YahooService.getRequestToken();
        window.location.href = authUrl;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
