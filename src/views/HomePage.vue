<template>
  <div class="home-page">
    <h1>Welcome to the Fantasy Football Analysis</h1>

    <!-- Link to Case Study -->
    <router-link to="/case-study" class="case-study-link">
      View 2023 Case Study
    </router-link>

    <!-- Search Bar -->
    <div class="search-section">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for players by name, team, or position..."
        class="search-input"
      />
    </div>

    <!-- Filtered Players -->
    <div v-if="filteredPlayers.length > 0" class="player-list">
      <div
        v-for="player in filteredPlayers"
        :key="player.name"
        class="player-card"
      >
        <h3>{{ player.name }}</h3>
        <p><strong>Team:</strong> {{ player.team }}</p>
        <p><strong>Position:</strong> {{ player.position }}</p>
        <p><strong>Rank Difference:</strong> {{ player.rank_difference }}</p>
      </div>
    </div>

    <div v-else class="no-results">No players found matching your search.</div>
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

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .case-study-link {
    display: block;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.5em;
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .search-section {
    text-align: center;
    margin-bottom: 20px;

    .search-input {
      width: 50%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1.1em;
    }
  }

  .player-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .player-card {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      flex: 1 1 calc(30% - 20px); /* 3 columns with gap */

      h3 {
        margin-bottom: 10px;
        color: #333;
      }

      p {
        margin: 5px 0;
        color: #555;
      }
    }
  }

  .no-results {
    text-align: center;
    font-size: 1.2em;
    color: #e74c3c;
  }
}
</style>
