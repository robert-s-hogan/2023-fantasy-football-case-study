<template>
  <div class="draft-page container mx-auto py-10">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Draft Players (2024 Harris Mock Drafts)
    </h1>

    <!-- Reset Draft Button and Search Bar -->
    <div class="controls flex justify-between items-center mb-8">
      <!-- Reset Draft Button -->
      <button
        @click="resetDraft"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        :disabled="loading"
      >
        Reset Draft
      </button>

      <!-- Search Bar -->
      <div class="search-section">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for players by name or position..."
          class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <!-- Conditional content: If loading, show "loading", if filtered players, show the table, else show "no results" -->
    <div>
      <!-- Show loading state -->
      <div v-if="loading" class="text-center text-gray-600">
        Loading players...
      </div>

      <!-- Show players table when players are loaded -->
      <div v-else-if="filteredPlayers.length > 0" class="overflow-x-auto">
        <table class="table-auto w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 text-gray-600 text-center">Rank</th>
              <th class="px-4 py-2 text-gray-600 text-center">Name</th>
              <th class="px-4 py-2 text-gray-600 text-center">Position</th>
              <th class="px-4 py-2 text-gray-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="player in filteredPlayers"
              :key="player.name"
              :class="getRowClass(player.position)"
              class="hover:bg-gray-50"
            >
              <!-- Check if the player has rank (MinimalPlayer) -->
              <td class="border px-4 py-2 text-center">
                {{ isMinimalPlayer(player) ? player.rank : "N/A" }}
              </td>
              <td class="border px-4 py-2 text-center">{{ player.name }}</td>
              <td class="border px-4 py-2 text-center">
                {{ player.position }}
              </td>
              <td class="border px-4 py-2 text-center">
                <button
                  @click="draftPlayer(player.name)"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
                  :disabled="loading"
                >
                  Draft Player
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results -->
      <div v-else class="no-results text-center text-gray-600 mt-8">
        No players found matching your search.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Player, MinimalPlayer } from "@/types/Player"; // Ensure you import Player types

export default defineComponent({
  name: "DraftPage",
  setup() {
    const playerStore = usePlayerStore(); // Access the Pinia store
    const searchQuery = ref(""); // Search query input

    // Fetch 2024 mock draft data
    const fetchPlayers = async () => {
      try {
        await playerStore.fetchUndraftedPlayers(); // Fetch undrafted players
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    // Function to reset the draft
    const resetDraft = async () => {
      try {
        await playerStore.resetDraft(); // Reset the drafted players
        await fetchPlayers(); // Re-fetch players after reset
      } catch (err) {
        console.error("Error resetting draft:", err);
      }
    };

    // Function to draft a player
    const draftPlayer = async (playerName: string) => {
      try {
        await playerStore.draftPlayer(playerName);
        await fetchPlayers(); // Refresh the player list after drafting
      } catch (err) {
        console.error("Error drafting player:", err);
      }
    };

    // Type guard to check if a player is a MinimalPlayer
    const isMinimalPlayer = (player: Player): player is MinimalPlayer => {
      return (player as MinimalPlayer).rank !== undefined;
    };

    // Computed property to filter players based on search query
    const filteredPlayers = computed(() => {
      if (!searchQuery.value) return playerStore.undraftedPlayers;

      return playerStore.undraftedPlayers.filter((player) =>
        [player.name, player.position].some((field) =>
          field?.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      );
    });

    // Get row class based on player position (color rows by position)
    const getRowClass = (position: string) => {
      if (position === "RB") return "bg-blue-100"; // Blue for RB
      if (position === "WR") return "bg-green-100"; // Green for WR
      if (position === "QB") return "bg-yellow-100"; // Yellow for QB
      if (position === "TE") return "bg-purple-100"; // Purple for TE
      return ""; // Default for other positions
    };

    onMounted(() => {
      fetchPlayers(); // Fetch players when component is mounted
    });

    return {
      searchQuery,
      filteredPlayers,
      draftPlayer,
      resetDraft, // Add the reset draft function
      getRowClass,
      loading: computed(() => playerStore.loading), // Access the loading state from the store
      isMinimalPlayer, // Use the type guard to check for MinimalPlayer
    };
  },
});
</script>
