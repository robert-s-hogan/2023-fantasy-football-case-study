<template>
  <div class="rank-movers-chart">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Player } from "@/types/Player"; // Import Player type

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

export default defineComponent({
  name: "RankMoversChart",
  props: {
    data: {
      type: Array as PropType<Player[]>, // Use Player[] as the type
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.data.map((player: Player) => player.name), // Use Player type here
        datasets: [
          {
            label: "Biggest Rank Movers",
            backgroundColor: "#66BB6A",
            data: this.data.map((player: Player) => player.rank_difference), // Use Player type here
          },
        ],
      };
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.rank-movers-chart {
  canvas {
    width: 100% !important;
    height: 400px !important;
  }
}
</style>
