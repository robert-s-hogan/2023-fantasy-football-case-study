<template>
  <div id="app">
    <YahooAuth />
    <PlayerRankings />
  </div>
</template>

<script>
import YahooAuth from "@/components/YahooAuth";
import PlayerRankings from "@/components/PlayerRankings";

export default {
  name: "App",
  components: {
    YahooAuth,
    PlayerRankings,
  },
};
</script>

<style>
/* Add your styles here */
</style>
