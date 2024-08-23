<template>
  <div
    class="player-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
  >
    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ player.name }}</h3>
    <p class="text-gray-700 mb-1"><strong>Team:</strong> {{ player.team }}</p>
    <p class="text-gray-700 mb-1">
      <strong>Position:</strong> {{ player.position }}
    </p>

    <!-- Conditionally display stats if player is a DetailedPlayer -->
    <div v-if="isDetailedPlayer(player)" class="mt-4">
      <p class="text-gray-700 mb-1">
        <strong>Games Played:</strong> {{ player.games_played }}
      </p>
      <p class="text-gray-700 mb-1">
        <strong>Fan Points:</strong> {{ player.fan_points }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Player, DetailedPlayer } from "@/types/Player";

export default defineComponent({
  props: {
    player: {
      type: Object as PropType<Player>, // Player type can be DetailedPlayer or MinimalPlayer
      required: true,
    },
  },
  methods: {
    // Type guard to check if the player is a DetailedPlayer
    isDetailedPlayer(player: Player): player is DetailedPlayer {
      return (player as DetailedPlayer).games_played !== undefined;
    },
  },
});
</script>
