<template>
  <div>
    <h1>Player Performance</h1>
    <div v-if="players.length">
      <ul>
        <li v-for="player in players" :key="player.id">
          {{ player.name }} - Points: {{ player.performance.points }}
        </li>
      </ul>
      <BarChart :data="chartData" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PlayerService from "@/services/PlayerService";
import { Bar } from "vue-chartjs";

export default {
  components: {
    BarChart: {
      extends: Bar,
      props: ["data"],
      mounted() {
        this.renderChart(this.data, {
          responsive: true,
          maintainAspectRatio: false,
        });
      },
    },
  },
  data() {
    return {
      players: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Player Points",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
    };
  },
  async created() {
    const response = await PlayerService.getDraftedPlayers();
    const players = response.data;
    this.players = await Promise.all(
      players.map(async (player) => {
        const performanceResponse = await PlayerService.getPlayerPerformance(
          player.id
        );
        player.performance = performanceResponse.data;
        return player;
      })
    );
    this.updateChartData();
  },
  methods: {
    updateChartData() {
      this.chartData.labels = this.players.map((player) => player.name);
      this.chartData.datasets[0].data = this.players.map(
        (player) => player.performance.points
      );
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
