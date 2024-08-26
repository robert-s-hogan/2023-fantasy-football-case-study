<template>
  <div class="draft-page container mx-auto py-10">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Draft Players (2024 Harris Draft Rankings)
    </h1>

    <!-- Filter Buttons -->
    <div class="filters flex justify-center space-x-4 mb-8">
      <button
        @click="fetchPlayers"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Refresh Player List
      </button>
    </div>

    <!-- Search Bar -->
    <div class="search-section mb-8 flex justify-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for players by name, team, or position..."
        class="search-input w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Display loading state -->
    <div v-if="loading" class="text-center">Loading players...</div>

    <!-- Display error state -->
    <div v-if="error" class="text-center text-red-500">
      {{ error }}
      <button @click="retryFetch" class="text-blue-500 underline">Retry</button>
    </div>

    <!-- Filtered Players -->
    <div
      v-if="filteredPlayers.length > 0 && !loading"
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

        <!-- Only display rank if it's a MinimalPlayer -->
        <p v-if="isMinimalPlayer(player)" class="text-gray-700 mb-1">
          <strong>Rank:</strong> {{ player.rank }}
        </p>

        <button
          @click="draftPlayer(player.name)"
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          :disabled="loading"
        >
          Draft Player
        </button>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="!loading" class="no-results text-center text-gray-600 mt-8">
      No players found matching your search.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { usePlayerStore } from "@/store/usePlayerStore"; // Using the updated player store
import { Player, MinimalPlayer } from "@/types/Player"; // Import types

export default defineComponent({
  name: "DraftPage",
  setup() {
    const playerStore = usePlayerStore(); // Use the updated Pinia store
    const searchQuery = ref("");

    // Type guard to check if player is MinimalPlayer
    const isMinimalPlayer = (player: Player): player is MinimalPlayer => {
      return (player as MinimalPlayer).rank !== undefined;
    };

    // Fetch undrafted players from the backend
    const fetchPlayers = async () => {
      try {
        await playerStore.fetchUndraftedPlayers();
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    // Retry function in case of an error
    const retryFetch = () => {
      fetchPlayers(); // Retry fetching players
    };

    // Trigger fetching of data when the component is mounted
    onMounted(() => {
      fetchPlayers(); // Fetch players when component is mounted
    });

    // Function to draft a player
    const draftPlayer = async (playerName: string) => {
      try {
        await playerStore.draftPlayer(playerName);
        await fetchPlayers(); // Refresh the player list after drafting
      } catch (err) {
        console.error("Error drafting player:", err);
      }
    };

    // Computed property to filter players based on search query
    const filteredPlayers = computed(() => {
      if (!searchQuery.value) return playerStore.undraftedPlayers;
      return playerStore.undraftedPlayers.filter((player) =>
        [player.name, player.team, player.position].some((field) =>
          field?.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      );
    });

    return {
      searchQuery,
      filteredPlayers,
      loading: computed(() => playerStore.loading), // Bind loading state
      error: computed(() => playerStore.error), // Bind error state
      fetchPlayers, // Fetch player function
      draftPlayer, // Function to draft a player
      retryFetch, // Retry function for error handling
      isMinimalPlayer, // Type guard for MinimalPlayer
    };
  },
});
</script>

<style scoped>
.draft-page {
  padding: 1.5rem;
}

.player-card {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.player-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
