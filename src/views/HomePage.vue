<template>
  <div class="home-page container mx-auto py-10">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Welcome to the Fantasy Football Analysis
    </h1>

    <!-- Add Link to Draft Page -->
    <router-link
      to="/draft"
      class="block text-center text-blue-500 hover:text-blue-700 font-semibold text-xl mb-10 transition duration-200"
    >
      Go to Draft Players
    </router-link>

    <!-- Link to Case Study -->
    <router-link
      to="/case-study"
      class="block text-center text-blue-500 hover:text-blue-700 font-semibold text-xl mb-10 transition duration-200"
    >
      View 2023 Case Study
    </router-link>
 
    <!-- Filter Buttons -->
    <div class="filters flex justify-center space-x-4 mb-8">
      <button
        @click="fetchPerformers('best')"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Best Performers
      </button>
      <button
        @click="fetchPerformers('worst')"
        class="bg-red-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Worst Performers
      </button>
      <button
        @click="fetchPerformers('actual')"
        class="bg-green-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Closest to Actual
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
import { usePlayerStore } from "@/store/usePlayerStore";

export default defineComponent({
  name: "HomePage",
  setup() {
    const playerStore = usePlayerStore(); // Use the Pinia store
    const searchQuery = ref("");

    // Function to fetch players based on the type (best, worst, actual)
    const fetchPerformers = async (type: string) => {
      try {
        await playerStore.fetchData(type);
      } catch (err) {
        console.error("Error fetching performers:", err);
      }
    };

    // Retry function in case of an error
    const retryFetch = () => {
      fetchPerformers("best"); // Retry fetching best performers by default
    };

    // Trigger fetching of data when the component is mounted
    onMounted(() => {
      fetchPerformers("best"); // Default to fetching best performers
    });

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
      loading: computed(() => playerStore.loading), // Bind loading state
      error: computed(() => playerStore.error), // Bind error state
      fetchPerformers, // Bind function for fetching performers
      retryFetch, // Retry function for error handling
    };
  },
});
</script>
