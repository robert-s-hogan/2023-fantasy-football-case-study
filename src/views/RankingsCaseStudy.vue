<template>
  <div class="case-study max-w-7xl mx-auto p-8">
    <!-- Main Heading -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">
      2023 Fantasy Football Rankings Case Study
    </h1>

    <!-- Introduction -->
    <p
      class="introduction text-lg text-center text-gray-600 mb-12 leading-relaxed"
    >
      This case study compares the preseason draft rankings with the
      end-of-season (EOS) results. The data highlights the top performers,
      biggest risers, and the players who underperformed their preseason
      expectations.
    </p>

    <!-- Data Overview Section -->
    <section class="data-overview mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Data Overview and Explanation of Metrics
      </h2>
      <p class="text-gray-700 mb-4">
        The rankings used in this case study are sourced from
        <strong>Yahoo Fantasy Football</strong>. The preseason rankings reflect
        player draft order, expectations based on player form, team situation,
        and expert analysis.
      </p>
      <p class="text-gray-700 mb-6">
        The end-of-season (EOS) rankings represent player performance based on
        total points scored and positional rankings at the end of the 2023
        season.
      </p>

      <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Metrics</h3>
      <ul class="list-disc list-inside text-gray-700">
        <li class="mb-2">
          <strong>Rank Difference:</strong> The difference between a player’s
          preseason draft ranking and their EOS ranking. A positive number means
          a player exceeded expectations, while a negative number means they
          underperformed.
        </li>
        <li class="mb-2">
          <strong>Games Played:</strong> The total number of games a player
          participated in during the 2023 season, which contextualizes
          performance (e.g., missing games due to injuries or suspension).
        </li>
        <li class="mb-2">
          <strong>Points Per Game (PPG):</strong> A key metric to standardize
          player performance across different games played.
        </li>
        <li class="mb-2">
          <strong>Positional Context:</strong> We also compare players within
          their position (e.g., QB, RB, WR, TE) to better understand their rank
          movements.
        </li>
      </ul>
    </section>

    <!-- Loading and Error States -->
    <div v-if="loading" class="status-message text-center text-gray-600">
      Loading data...
    </div>
    <div
      v-else-if="error"
      class="status-message error text-center text-red-500"
    >
      {{ error }}
    </div>

    <!-- Main Sections, Only Shown if No Loading or Error -->
    <div v-else>
      <!-- Section: Top Performers -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-green-600 mb-4">
          Top Performers
        </h2>
        <p class="text-gray-700 mb-6">
          Here are the players who most exceeded their preseason rankings:
        </p>
        <div class="chart-container bg-white p-6 rounded-lg shadow-lg">
          <TopPerformersChart :data="topPerformers" />
        </div>
      </section>

      <!-- Section: Underperformers -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-red-600 mb-4">
          Underperformers
        </h2>
        <p class="text-gray-700 mb-6">
          These players fell short of their preseason expectations:
        </p>
        <div class="chart-container bg-white p-6 rounded-lg shadow-lg">
          <UnderperformersChart :data="underperformers" />
        </div>
      </section>

      <!-- Section: Biggest Rank Movers -->
      <section>
        <h2 class="text-2xl font-semibold text-yellow-600 mb-4">
          Biggest Rank Movers
        </h2>
        <p class="text-gray-700 mb-6">
          These players experienced the largest rank movement, positive or
          negative:
        </p>
        <div class="chart-container bg-white p-6 rounded-lg shadow-lg">
          <RankMoversChart :data="rankMovers" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { usePlayerStore } from "@/store/usePlayerStore";
import TopPerformersChart from "@/components/TopPerformersChart.vue";
import UnderperformersChart from "@/components/UnderperformersChart.vue";
import RankMoversChart from "@/components/RankMoversChart.vue";

export default defineComponent({
  components: {
    TopPerformersChart,
    UnderperformersChart,
    RankMoversChart,
  },
  setup() {
    const playerStore = usePlayerStore();

    // Fetch 2023 case study data when the component is mounted
    onMounted(() => {
      playerStore.fetch2023CaseStudy();
    });

    // Computed properties for filtered data
    const topPerformers = computed(() =>
      playerStore.mergedData.filter(
        (player) =>
          player.rank_difference !== undefined && player.rank_difference > 0
      )
    );

    const underperformers = computed(() =>
      playerStore.mergedData.filter(
        (player) =>
          player.rank_difference !== undefined && player.rank_difference < 0
      )
    );

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
      topPerformers,
      underperformers,
      rankMovers,
    };
  },
});
</script>
