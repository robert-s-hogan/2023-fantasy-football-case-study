import axios from "axios";

const API_URL =
  "https://fantasyfootballcalculator.com/api/v1/adp/ppr?teams=12&year=2023";

export default {
  getDraftedPlayers() {
    return axios.get(`${API_URL}/drafted-players`);
  },
  getPlayerPerformance(playerId) {
    return axios.get(`${API_URL}/players/${playerId}/performance`);
  },
};
