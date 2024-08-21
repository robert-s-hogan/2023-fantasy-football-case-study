<template>
  <div class="rank-movers-chart">
    <div ref="plotlyChart"></div>
    <!-- Plotly chart container -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watch } from "vue";
import Plotly from "plotly.js-dist"; // Import Plotly.js
import { Player, MinimalPlayer, DetailedPlayer } from "@/types/Player"; // Import Player types

export default defineComponent({
  name: "RankMoversChart",
  props: {
    data: {
      type: Array as PropType<Player[]>, // Use Player[] as the type
      required: true,
    },
  },
  mounted() {
    this.renderChart(); // Render the chart when component is mounted
  },
  watch: {
    // Re-render the chart whenever the data prop changes
    data: {
      immediate: true,
      handler() {
        this.renderChart();
      },
    },
  },
  methods: {
    // Type guard to check if a player is MinimalPlayer
    isMinimalPlayer(player: Player): player is MinimalPlayer {
      return (player as MinimalPlayer).rank !== undefined;
    },
    // Type guard to check if a player is DetailedPlayer
    isDetailedPlayer(player: Player): player is DetailedPlayer {
      return (player as DetailedPlayer).eos_rank !== undefined;
    },
    renderChart() {
      if (!this.data.length) return; // No data, no chart

      // Filter players who have both a preseason rank and end-of-season rank
      const filteredPlayers = this.data.filter(
        (player: Player) =>
          this.isMinimalPlayer(player) && this.isDetailedPlayer(player)
      );

      // Sort players by rank_difference in descending order and take top 25
      const topPlayers = [...filteredPlayers]
        .sort(
          (a, b) =>
            Math.abs(b.rank_difference ?? 0) - Math.abs(a.rank_difference ?? 0) // Handle undefined rank_difference
        )
        .slice(0, 25); // Take the top 25 players based on the biggest rank movement

      // Prepare data for Plotly
      const chartData = [
        {
          x: topPlayers.map((player: Player) => player.name), // Player names (x-axis)
          y: topPlayers.map((player: Player) => player.rank_difference ?? 0), // Rank differences (y-axis)
          type: "bar",
          marker: {
            color: "#66BB6A", // Bar color
          },
          name: "Biggest Rank Movers",
        },
      ];

      // Chart layout options
      const layout = {
        title: "Biggest Rank Movers (Top 25)",
        xaxis: {
          title: "Player Names",
          tickangle: -45, // Rotate labels
          automargin: true, // Adjust margins dynamically
        },
        yaxis: { title: "Rank Difference" },
        height: 400,
        margin: { t: 50, l: 50, r: 50, b: 100 }, // Increase bottom margin for labels
        responsive: true,
      };

      // Use Plotly to render the chart
      Plotly.newPlot(this.$refs.plotlyChart, chartData, layout);
    },
  },
});
</script>

<style scoped>
.rank-movers-chart {
  width: 100%;
  height: 400px;
}
</style>
