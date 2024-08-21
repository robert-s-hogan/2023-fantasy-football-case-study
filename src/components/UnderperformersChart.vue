<template>
  <div class="underperformers-chart">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Player } from "@/types/Player"; // Import the Player type

// Register necessary chart components for Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  name: "UnderperformersChart",
  props: {
    data: {
      type: Array as PropType<Player[]>, // Prop type for an array of Player
      required: true,
    },
  },
  setup(props) {
    // Compute the chart data from props
    const chartData = computed(() => {
      return {
        labels: props.data.map((player: Player) => player.name),
        datasets: [
          {
            label: "Rank Difference",
            backgroundColor: "#e74c3c",
            data: props.data.map((player: Player) => player.rank_difference),
          },
        ],
      };
    });

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#333",
          },
        },
        x: {
          ticks: {
            color: "#333",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#333",
          },
        },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#333",
          bodyColor: "#333",
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

<style lang="scss" scoped>
.underperformers-chart {
  canvas {
    width: 100% !important;
    height: 400px !important;
  }

  .chart-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
