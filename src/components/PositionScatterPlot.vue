<template>
  <div v-if="data && data.length" class="scatter-plot">
    <div ref="plotlyChart"></div>
  </div>
  <div v-else>
    <p>No position data available</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import Plotly from "plotly.js-dist";
import { PropType } from "vue"; // Ensure PropType is imported
import { usePlayerStore } from "@/store/usePlayerStore"; // Pinia store
import { Player, DetailedPlayer, MinimalPlayer } from "@/types/Player";

// Helper function to check if the player is a MinimalPlayer
function isMinimalPlayer(player: Player): player is MinimalPlayer {
  return (player as MinimalPlayer).rank !== undefined;
}

// Helper function to check if the player is a DetailedPlayer
function isDetailedPlayer(player: Player): player is DetailedPlayer {
  return (player as DetailedPlayer).fan_points !== undefined;
}

export default defineComponent({
  name: "PositionScatterPlot",
  props: {
    data: {
      type: Array as PropType<Player[]>, // Correctly define the prop type
      required: true,
      default: () => [], // Default to an empty array
    },
  },
  setup(props) {
    const plotlyChart = ref<HTMLDivElement | null>(null);
    const playerStore = usePlayerStore(); // Access Pinia store

    // Render Plotly chart
    const renderChart = () => {
      if (!props.data.length || !plotlyChart.value) return;

      const scatterData = [
        {
          x: props.data.map((player: Player) => {
            // Safely access rank for MinimalPlayer or fallback to 0 for DetailedPlayer
            return isMinimalPlayer(player) ? player.rank ?? 0 : 0;
          }), // Preseason rank (x-axis)
          y: props.data.map((player: Player) =>
            isDetailedPlayer(player) ? player.eos_rank ?? 0 : 0
          ), // End-of-season rank (y-axis)
          mode: "markers",
          type: "scatter",
          marker: { color: "#42A5F5" },
          name: "Position Performance",
        },
      ];

      const layout = {
        title: "Position Performance Scatter Plot",
        xaxis: { title: "Preseason Rank", zeroline: false },
        yaxis: { title: "End-of-Season Rank", zeroline: false },
        margin: { t: 50, l: 50, r: 50, b: 50 },
        height: 400,
        responsive: true,
      };

      Plotly.newPlot(plotlyChart.value, scatterData, layout);
    };

    // Watch for changes in the data prop and re-render the chart
    watch(
      () => props.data,
      () => {
        renderChart();
      },
      { immediate: true }
    );

    onMounted(() => {
      renderChart(); // Render chart when component is mounted
    });

    return {
      plotlyChart,
      playerStore,
    };
  },
});
</script>

<style scoped>
.scatter-plot {
  margin-top: 20px;
}
</style>
