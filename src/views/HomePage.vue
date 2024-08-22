<template>
  <div class="home-page container mx-auto py-10">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Welcome to the Fantasy Football Analysis
    </h1>

    <!-- Link to Case Study -->
    <router-link
      to="/case-study"
      class="block text-center text-blue-500 hover:text-blue-700 font-semibold text-xl mb-10 transition duration-200"
    >
      View 2023 Case Study
    </router-link>

    <!-- Search Bar -->
    <div class="search-section mb-8 flex justify-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for players by name, team, or position..."
        class="search-input w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Filtered Players -->
    <div
      v-if="filteredPlayers.length > 0"
      class="player-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      <!-- Player Cards -->
      <div
        v-for="player in filteredPlayers"
        :key="player.name"
        class="player-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
      >
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ player.name }}
        </h3>
        <p class="text-gray-700 mb-1">
          <strong>Team:</strong> {{ player.team }}
        </p>
        <p class="text-gray-700 mb-1">
          <strong>Position:</strong> {{ player.position }}
        </p>
        <p class="text-gray-700">
          <strong>Rank Difference:</strong> {{ player.rank_difference }}
        </p>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="no-results text-center text-gray-600 mt-8">
      No players found matching your search.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { usePlayerStore } from "@/store/usePlayerStore"; // Import your Pinia store

export default defineComponent({
  name: "HomePage",
  setup() {
    const playerStore = usePlayerStore();

    // Trigger fetching of data when the component is mounted
    onMounted(() => {
      if (playerStore.mergedData.length === 0) {
        // Only fetch if data isn't already available
        playerStore.fetchData();
      }
    });

    const searchQuery = ref("");

    // Computed property to filter players based on search query
    const filteredPlayers = computed(() => {
      if (!searchQuery.value) return playerStore.mergedData;
      return playerStore.mergedData.filter((player) =>
        [player.name, player.team, player.position].some((field) =>
          field?.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      );
    });

    return {
      searchQuery,
      filteredPlayers,
    };
  },
});
</script>
