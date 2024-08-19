<template>
  <div>
    <h1>Fantasy Football Performance: EOS vs Preseason</h1>

    <!-- Loading and Error States -->
    <div v-if="loading">Loading data...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Display Player Cards -->
    <div v-if="!loading && !error" class="player-cards">
      <PlayerCard
        v-for="player in mergedData"
        :player="player"
        :key="player.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePlayerStore } from "./store/usePlayerStore";
import PlayerCard from "./components/PlayerCard.vue";

export default defineComponent({
  components: {
    PlayerCard,
  },
  setup() {
    const playerStore = usePlayerStore();

    // Fetch data when the component is mounted
    playerStore.fetchData();

    return {
      ...playerStore,
    };
  },
});
</script>

<style>
.player-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
