<template>
  <div v-if="chartData" class="bar-chart">
    <!-- Ensure the correct binding for data and options -->
    <Bar :data="chartData" :options="options" />
  </div>
  <div v-else>
    <p>No data available for top performers</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { usePlayerStore } from "@/store/usePlayerStore";

// Register necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "BarChart",
  setup() {
    const playerStore = usePlayerStore();

    onMounted(() => {
      console.log("Player Store Data (onMounted):", playerStore.mergedData);
    });

    const chartData = computed(() => {
      if (!playerStore.mergedData.length) return null;

      return {
        labels: playerStore.mergedData.map((player) => player.name),
        datasets: [
          {
            label: "Rank Difference",
            backgroundColor: "#3498db",
            data: playerStore.mergedData.map(
              (player) => player.rank_difference
            ),
          },
        ],
      };
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Ensure the chart occupies full height
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    return {
      chartData,
      options,
    };
  },
});
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
