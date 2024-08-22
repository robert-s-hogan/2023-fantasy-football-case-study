import { defineStore } from "pinia";
import axios from "axios";
import { Player } from "@/types/Player"; // Using Player union type (MinimalPlayer | DetailedPlayer)

interface State {
  mergedData: Player[]; // Store for merged data from backend
  loading: boolean;
  error: string | null;
}

export const usePlayerStore = defineStore("player", {
  state: (): State => ({
    mergedData: [], // Store for merged data
    loading: false,
    error: null,
  }),

  actions: {
    // Fetching data from FastAPI `/performers` endpoint
    async fetchData(type = "best", full = true) {
      // Add 'type' to differentiate between best, worst, actual
      this.loading = true;
      this.error = null;

      try {
        // Fetch data from the FastAPI endpoint
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
  },
});
