import { defineStore } from "pinia";
import axios from "axios";
import { Player } from "@/types/Player"; // Using Player union type (MinimalPlayer | DetailedPlayer)

interface State {
  mergedData: Player[]; // Store for merged data from backend
  undraftedPlayers: Player[]; // Store for undrafted players (from Harris draft rankings)
  loading: boolean;
  error: string | null;
}

export const usePlayerStore = defineStore("player", {
  state: (): State => ({
    mergedData: [], // Store for merged data (best, worst, actual performers)
    undraftedPlayers: [], // Store for undrafted players (Harris draft)
    loading: false,
    error: null,
  }),

  actions: {
    // Fetching data from FastAPI `/performers` endpoint
    async fetchData(type = "best", full = true) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Player[]>(
          "http://127.0.0.1:8001/performers",
          {
            params: {
              type, // best, worst, actual
              full, // full list or limited to 25
            },
          }
        );

        console.log("API Response Data:", response.data); // Log the API response data

        this.mergedData = response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to fetch data.";
        console.error("Error fetching data:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Fetch undrafted players from FastAPI `/players` endpoint (2024 Harris Draft Rankings)
    async fetchUndraftedPlayers() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Player[]>(
          "http://127.0.0.1:8001/players"
        );

        console.log("Undrafted Players Data:", response.data); // Log the API response data

        this.undraftedPlayers = response.data; // Store undrafted players
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to fetch undrafted players.";
        console.error("Error fetching undrafted players:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Draft a player by name, mark as drafted and update the list
    async draftPlayer(playerName: string) {
      this.loading = true;
      this.error = null;

      try {
        await axios.post(`http://127.0.0.1:8001/draft/${playerName}`);

        // After drafting the player, remove them from the undrafted players list
        this.undraftedPlayers = this.undraftedPlayers.filter(
          (player) => player.name !== playerName
        );
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          `Failed to draft player ${playerName}.`;
        console.error("Error drafting player:", error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
