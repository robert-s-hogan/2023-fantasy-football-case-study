<template>
  <div class="plotly-chart" ref="plotlyChart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import Plotly from "plotly.js-dist";
import { Player, DetailedPlayer } from "@/types/Player"; // Import Player and DetailedPlayer types

// Helper function to check if a player is a DetailedPlayer
function isDetailedPlayer(player: Player): player is DetailedPlayer {
  return (player as DetailedPlayer).eos_rank !== undefined;
}

export default defineComponent({
  name: "TopPerformersChart",
  props: {
    data: {
      type: Array as () => Player[], // Define the prop as an array of Player objects
      required: true,
    },
  },
  setup(props) {
    const plotlyChart = ref<HTMLDivElement | null>(null);

    const renderChart = async () => {
      if (!plotlyChart.value) {
        console.error("Plotly chart container is not available.");
        return;
      }

      // Step 1: Filter for players who have both preseason (rank) and EOS (eos_rank) data
      // and have a positive rank difference (improved their rank).
      const filteredData = props.data.filter(
        (player: Player) =>
          (player as any).rank !== undefined && // Preseason rank exists
          isDetailedPlayer(player) && // End-of-season rank exists (DetailedPlayer)
          (player.rank_difference ?? 0) > 0 // Positive rank difference (improved)
      );

      // Step 2: Sort by rank_difference in descending order (greatest positive difference first)
      const sortedData = filteredData.sort(
        (a, b) => (b.rank_difference ?? 0) - (a.rank_difference ?? 0)
      );

      // Step 3: Limit to the top 25 players with the largest positive rank difference
      const limitedData = sortedData.slice(0, 25);

      // Create x-axis labels with player names and ranks
      const xLabels = limitedData.map(
        (player: Player) => `${player.name} (Rank: ${(player as any).rank})`
      );

      // Prepare the chart data
      const chartData = [
        {
          x: xLabels, // X-axis: Player names with draft rank
          y: limitedData.map((player: Player) => player.rank_difference ?? 0), // Y-axis: Rank difference
          type: "bar",
        },
      ];

      const layout = {
        title: "Top Performers - Largest Positive Rank Difference",
        xaxis: {
          title: "Players",
          tickangle: -45, // Rotate labels for better readability
          automargin: true, // Automatically adjust the margins
        },
        yaxis: { title: "Rank Difference" },
        margin: {
          l: 50, // Left margin
          r: 10, // Right margin
          b: 100, // Bottom margin for rotated labels
          t: 50, // Top margin
        },
      };

      await nextTick(); // Ensure the DOM has been updated

      if (plotlyChart.value) {
        Plotly.newPlot(plotlyChart.value, chartData, layout);
      }
    };

    onMounted(() => {
      renderChart(); // Render the chart when the component is mounted
    });

    // Re-render the chart if the data changes
    watch(
      () => props.data,
      () => {
        renderChart();
      }
    );

    return {
      plotlyChart,
    };
  },
});
</script>

<style scoped>
.plotly-chart {
  width: 100%;
  height: 400px;
}
</style>
