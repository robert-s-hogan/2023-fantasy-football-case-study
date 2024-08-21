<template>
  <div class="case-study">
    <h1>2023 Fantasy Football Rankings Case Study</h1>
    <p class="introduction">
      This case study compares the preseason draft rankings with the
      end-of-season (EOS) results. The data highlights the top performers,
      biggest risers, and the players who underperformed their preseason
      expectations.
    </p>

    <!-- Loading and error states -->
    <div v-if="loading">Loading data...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Section: Top Performers -->
    <section v-if="!loading && !error" class="top-performers section">
      <h2>Top Performers</h2>
      <p>Here are the players who most exceeded their preseason rankings:</p>
      <div class="chart-container">
        <TopPerformersChart :data="topPerformers" />
      </div>
    </section>

    <!-- Section: Underperformers -->
    <section v-if="!loading && !error" class="underperformers section">
      <h2>Underperformers</h2>
      <p>These players fell short of their preseason expectations:</p>
      <div class="chart-container">
        <UnderperformersChart :data="underperformers" />
      </div>
    </section>

    <!-- Section: Biggest Rank Movers -->
    <section v-if="!loading && !error" class="rank-movers section">
      <h2>Biggest Rank Movers</h2>
      <p>
        These players experienced the largest rank movement, positive or
        negative:
      </p>
      <div class="chart-container">
        <RankMoversChart :data="rankMovers" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { usePlayerStore } from "@/store/usePlayerStore";
import TopPerformersChart from "@/components/TopPerformersChart.vue";
import UnderperformersChart from "@/components/UnderperformersChart.vue";
import RankMoversChart from "@/components/RankMoversChart.vue"; // Import RankMoversChart

export default defineComponent({
  components: {
    TopPerformersChart,
    UnderperformersChart,
    RankMoversChart, // Register RankMoversChart
  },
  setup() {
    const playerStore = usePlayerStore(); // Access player store

    onMounted(() => {
      playerStore.fetchData(); // Fetch the data on component mount
    });

    // Filter for players with a positive rank difference (Top Performers)
    const topPerformers = computed(() =>
      playerStore.mergedData.filter(
        (player) =>
          player.rank_difference !== undefined && player.rank_difference > 0
      )
    );

    // Filter for players with a negative rank difference (Underperformers)
    const underperformers = computed(() =>
      playerStore.mergedData.filter(
        (player) =>
          player.rank_difference !== undefined && player.rank_difference < 0
      )
    );

    // Filter for players with the largest rank movement (positive or negative)
    const rankMovers = computed(() =>
      playerStore.mergedData
        .filter((player) => player.rank_difference !== undefined)
        .sort(
          (a, b) =>
            Math.abs(b.rank_difference ?? 0) - Math.abs(a.rank_difference ?? 0)
        )
    );

    return {
      loading: playerStore.loading,
      error: playerStore.error,
      topPerformers, // Pass this data to TopPerformersChart
      underperformers, // Pass this data to UnderperformersChart
      rankMovers, // Pass this data to RankMoversChart
    };
  },
});
</script>

<style lang="scss" scoped>
.case-study {
  max-width: 1400px;
  margin: auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5em;
    color: #333;
  }

  .introduction {
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 40px;
    color: #555;
  }

  .section {
    margin-bottom: 60px;

    h2 {
      font-size: 2em;
      margin-bottom: 20px;
      color: #2c3e50;
    }

    p {
      font-size: 1.1em;
      color: #34495e;
    }

    .chart-container {
      margin-top: 20px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
