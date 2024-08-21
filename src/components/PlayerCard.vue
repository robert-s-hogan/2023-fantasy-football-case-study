<template>
  <div class="player-card">
    <h2>{{ player.name }}</h2>
    <p><strong>Team:</strong> {{ player.team }}</p>
    <p><strong>Position:</strong> {{ player.position }}</p>

    <!-- Conditionally display stats if player is a DetailedPlayer -->
    <div v-if="isDetailedPlayer(player)">
      <p><strong>Games Played:</strong> {{ player.games_played }}</p>
      <p><strong>Fan Points:</strong> {{ player.fan_points }}</p>

      <!-- Conditionally render passing stats if available -->
      <p v-if="player.passing">
        <strong>Passing Yards:</strong> {{ player.passing.yards }}
      </p>

      <!-- Conditionally render rushing stats if available -->
      <p v-if="player.rushing">
        <strong>Rushing Yards:</strong> {{ player.rushing.yards }}
      </p>
    </div>

    <!-- Rank comparison (for both DetailedPlayer and MinimalPlayer) -->
    <p v-if="player.rank_difference !== null">
      <strong>Rank Difference:</strong> {{ player.rank_difference }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Player, DetailedPlayer } from "@/types/Player";

export default defineComponent({
  props: {
    player: {
      type: Object as PropType<Player>, // PropType is Player (either DetailedPlayer or MinimalPlayer)
      required: true,
    },
  },
  methods: {
    // Type guard to check if player is DetailedPlayer
    isDetailedPlayer(player: Player): player is DetailedPlayer {
      return (player as DetailedPlayer).games_played !== undefined;
    },
  },
});
</script>

<style scoped>
.player-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.player-card h2 {
  margin: 0 0 10px 0;
}
</style>
