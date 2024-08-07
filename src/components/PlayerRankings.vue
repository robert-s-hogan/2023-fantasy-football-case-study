<template>
  <div>
    <h1>Player PPR Rankings</h1>
    <ul>
      <li v-for="player in players" :key="player.player_id">
        {{ player.name }} - Rank: {{ player.rank }}
      </li>
    </ul>
  </div>
</template>

<script>
import YahooService from "@/services/YahooService";

export default {
  data() {
    return {
      players: [],
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthVerifier = urlParams.get("oauth_verifier");

    if (oauthVerifier) {
      try {
        const { accessToken, accessTokenSecret } =
          await YahooService.getAccessToken(oauthVerifier);
        const response = await YahooService.fetchPPRRankings(
          accessToken,
          accessTokenSecret
        );
        this.players = response.data.players;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
