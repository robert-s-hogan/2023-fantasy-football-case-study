<template>
  <div class="plotly-chart" ref="plotlyChart"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
import Plotly from "plotly.js-dist";
import { Player } from "@/types/Player"; // Import the Player type

export default defineComponent({
  name: "UnderperformersChart",
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

      // Step 1: Sort the data by rank_difference in ascending order (worst performers first)
      const sortedData = [...props.data].sort(
        (a, b) => (a.rank_difference ?? 0) - (b.rank_difference ?? 0)
      );

      // Step 2: Limit the data to the top 25 players
      const limitedData = sortedData.slice(0, 25);

      // Create x-axis labels with the player's name and draft position (rank)
      const xLabels = limitedData.map(
        (player: Player) => `${player.name} (Rank: ${(player as any).rank})`
      );

      const chartData = [
        {
          x: xLabels, // X-axis: Player names with draft rank
          y: limitedData.map(
            (player: Player) => -(player.rank_difference ?? 0)
          ), // Negate rank difference for underperformers
          type: "bar",
        },
      ];

      const layout = {
        title: "Largest Negative Rank Difference (preseason rank - final rank)",
        xaxis: {
          title: "Players",
          tickangle: -45, // Rotate labels to -45 degrees
          automargin: true, // Automatically adjust the margins
        },
        yaxis: { title: "Rank Difference" },
        margin: {
          l: 50, // Increase left margin for better readability
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
      renderChart(); // Render the chart when component is mounted
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
