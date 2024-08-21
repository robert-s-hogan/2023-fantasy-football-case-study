<template>
  <div v-if="data && data.length" class="scatter-plot">
    <div ref="plotlyChart"></div>
    <!-- Plotly chart container -->
  </div>
  <div v-else>
    <p>No position data available</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watch } from "vue";
import Plotly from "plotly.js-dist";
import { Player, DetailedPlayer, MinimalPlayer } from "@/types/Player";

// Helper function to check if the player is a DetailedPlayer
function isDetailedPlayer(player: Player): player is DetailedPlayer {
  return (player as DetailedPlayer).fan_points !== undefined;
}

export default defineComponent({
  name: "PositionScatterPlot",
  props: {
    data: {
      type: Array as PropType<Player[]>,
      required: true,
      default: () => [], // Default to empty array
    },
  },
  mounted() {
    // Render Plotly chart when the component is mounted
    this.renderChart();
  },
  watch: {
    // Re-render chart when `data` changes
    data: {
      immediate: true,
      handler() {
        this.renderChart();
      },
    },
  },
  methods: {
    renderChart() {
      if (!this.data.length) return;

      // Prepare data for Plotly
      const scatterData = [
        {
          x: this.data.map(
            (player: Player) => (player as MinimalPlayer).rank ?? 0
          ), // Preseason rank (x-axis)
          y: this.data.map((player: Player) =>
            isDetailedPlayer(player) ? player.eos_rank ?? 0 : 0
          ), // End-of-season rank (y-axis)
          mode: "markers", // Scatter plot with points
          type: "scatter",
          marker: { color: "#42A5F5" }, // Color for the points
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

      // Use Plotly to render the scatter plot
      Plotly.newPlot(this.$refs.plotlyChart, scatterData, layout);
    },
  },
});
</script>

<style scoped>
.scatter-plot {
  width: 100%;
  height: 400px;
}
</style>
