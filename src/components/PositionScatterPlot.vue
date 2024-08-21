<template>
  <div v-if="data && data.length" class="scatter-plot">
    <Scatter :data="chartData" :options="options" />
  </div>
  <div v-else>
    <p>No position data available</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Scatter } from "vue-chartjs";
import {
  Chart as ChartJS,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Player, DetailedPlayer, MinimalPlayer } from "@/types/Player"; // Import Player, DetailedPlayer, MinimalPlayer types

// Register necessary chart components for Chart.js
ChartJS.register(
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

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
  setup(props) {
    // Compute chart data
    const chartData = computed(() => {
      if (!props.data.length) return null; // If no data, return null

      return {
        datasets: [
          {
            label: "Position Performance",
            backgroundColor: "#42A5F5",
            data: props.data.map((player: Player) => {
              // Check if the player is DetailedPlayer or MinimalPlayer
              const preseasonRank = (player as MinimalPlayer).rank ?? 0; // MinimalPlayer has rank
              const eosRank = isDetailedPlayer(player)
                ? player.eos_rank ?? 0
                : 0; // DetailedPlayer has eos_rank

              return {
                x: preseasonRank, // Preseason rank
                y: eosRank, // End-of-season rank
              };
            }),
          },
        ],
      };
    });

    // Chart options
    const options = {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Preseason Rank",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "End-of-Season Rank",
          },
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
.scatter-plot {
  canvas {
    width: 100% !important;
    height: 400px !important;
  }
}
</style>
