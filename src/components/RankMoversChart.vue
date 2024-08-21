<template>
  <div class="rank-movers-chart">
    <div ref="plotlyChart"></div>
    <!-- Plotly chart container -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, watch } from "vue";
import Plotly from "plotly.js-dist"; // Import Plotly.js
import { Player } from "@/types/Player"; // Import Player type

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
    renderChart() {
      if (!this.data.length) return; // No data, no chart

      // Prepare data for Plotly
      const chartData = [
        {
          x: this.data.map((player: Player) => player.name), // Player names (x-axis)
          y: this.data.map((player: Player) => player.rank_difference), // Rank differences (y-axis)
          type: "bar",
          marker: {
            color: "#66BB6A", // Bar color
          },
          name: "Biggest Rank Movers",
        },
      ];

      // Chart layout options
      const layout = {
        title: "Biggest Rank Movers",
        xaxis: { title: "Player Names" },
        yaxis: { title: "Rank Difference" },
        height: 400,
        margin: { t: 50, l: 50, r: 50, b: 50 },
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
