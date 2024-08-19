<template>
  <div>
    <BarChart :chart-data="chartData" />
  </div>
</template>

<script>
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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      chartData: {
        labels: this.mergedData.map((player) => player.name),
        datasets: [
          {
            label: "Fantasy Points",
            backgroundColor: "#42A5F5",
            data: this.mergedData.map((player) => player.fan_points),
          },
          {
            label: "Rank Difference",
            backgroundColor: "#66BB6A",
            data: this.mergedData.map((player) => player.rank_difference),
          },
        ],
      },
    };
  },
  mounted() {
    this.$emit("render-chart", this.chartData);
  },
};
</script>
