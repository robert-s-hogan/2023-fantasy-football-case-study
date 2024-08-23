<template>
  <!-- Chart container with TailwindCSS -->
  <div class="mt-6">
    <div ref="plotlyChart" class="h-96"></div>
  </div>

  <!-- Fallback message if no data -->
  <div v-if="!data || !data.length" class="text-center text-gray-500 mt-6">
    No data available
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from "vue"; // Ensure PropType is imported
import Plotly from "plotly.js-dist";
import { Player, MinimalPlayer, DetailedPlayer } from "@/types/Player";

export default defineComponent({
  name: "RankMoversChart",
  props: {
    data: {
      type: Array as PropType<Player[]>, // Use Player[] as the type
      required: true,
    },
  },
  setup(props) {
    const plotlyChart = ref<HTMLDivElement | null>(null);

    // Helper functions for type guards
    const isMinimalPlayer = (player: Player): player is MinimalPlayer => {
      return (player as MinimalPlayer).rank !== undefined;
    };

    const isDetailedPlayer = (player: Player): player is DetailedPlayer => {
      return (player as DetailedPlayer).eos_rank !== undefined;
    };

    // Function to render the chart
    const renderChart = () => {
      if (!props.data.length || !plotlyChart.value) return;

      const filteredPlayers = props.data.filter(
        (player: Player) => isMinimalPlayer(player) && isDetailedPlayer(player)
      );

      const topPlayers = [...filteredPlayers]
        .sort(
          (a, b) =>
            Math.abs(b.rank_difference ?? 0) - Math.abs(a.rank_difference ?? 0)
        )
        .slice(0, 25); // Top 25 players

      const chartData = [
        {
          x: topPlayers.map((player: Player) => player.name),
          y: topPlayers.map((player: Player) => player.rank_difference ?? 0),
          type: "bar",
          marker: { color: "#66BB6A" },
          name: "Biggest Rank Movers",
        },
      ];

      const layout = {
        title: "Biggest Rank Movers (Top 25)",
        xaxis: {
          title: "Player Names",
          tickangle: -45,
          automargin: true,
        },
        yaxis: { title: "Rank Difference" },
        height: 400,
        margin: { t: 50, l: 50, r: 50, b: 100 },
        responsive: true,
      };

      Plotly.newPlot(plotlyChart.value, chartData, layout);
    };

    // Watch for changes in the `data` prop and re-render the chart
    watch(
      () => props.data,
      () => {
        renderChart();
      },
      { immediate: true }
    );

    // Render the chart when the component is mounted
    onMounted(() => {
      renderChart();
    });

    return {
      plotlyChart,
    };
  },
});
</script>
