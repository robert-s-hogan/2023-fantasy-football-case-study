import { defineStore } from "pinia";
import axios from "axios";
import { Player } from "@/types/Player"; // Assuming this type is correctly defined in your project

// Define the State interface for Pinia store
interface State {
  mergedData: Player[]; // Holds data for 2023 case study and performers
  undraftedPlayers: Player[]; // Holds 2024 Harris Draft players (undrafted players)
  loading: boolean; // Loading state for API requests
  error: string | null; // Holds error messages, if any
}

// Define the Pinia store for managing player data
export const usePlayerStore = defineStore("player", {
  // State for the store
  state: (): State => ({
    mergedData: [], // Case study or performer data
    undraftedPlayers: [], // Undrafted players for 2024 draft
    loading: false, // Loading state
    error: null, // Error message state
  }),

  // Actions (Async functions) for data fetching and manipulation
  actions: {
    // Fetch undrafted players for 2024 Harris Mock Draft
    async fetchUndraftedPlayers(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Player[]>(
          "http://127.0.0.1:8001/players"
        );
        this.undraftedPlayers = response.data; // Store response in state
      } catch (error: any) {
        this.error =
          error.response?.data?.message || "Failed to fetch undrafted players.";
        console.error("Error fetching undrafted players:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Fetch the 2023 case study data (Preseason vs EOS rankings)
    async fetch2023CaseStudy(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Player[]>(
          "http://127.0.0.1:8001/performers/2023"
        );
        this.mergedData = response.data; // Store case study data in state
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          "Failed to fetch 2023 case study data.";
        console.error("Error fetching 2023 case study data:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Fetch performers by type (best, worst, actual)
    async fetchPerformers(type: string): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<Player[]>(
          "http://127.0.0.1:8001/performers",
          {
            params: { type },
          }
        );
        this.mergedData = response.data; // Store performers data in state
      } catch (error: any) {
        this.error =
          error.response?.data?.message ||
          `Failed to fetch performers (${type}).`;
        console.error(`Error fetching performers (${type}):`, error.message);
      } finally {
        this.loading = false;
      }
    },

    // Draft a player from the 2024 Harris Draft Rankings
    async draftPlayer(playerName: string): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        await axios.post(`http://127.0.0.1:8001/draft/${playerName}`);

        // Remove the drafted player from the undrafted players list
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

    // Reset the drafted players list (for 2024 mock drafts)
    async resetDraft(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        await axios.post("http://127.0.0.1:8001/reset_draft");
        this.undraftedPlayers = []; // Clear the undrafted players list
      } catch (error: any) {
        this.error = error.response?.data?.message || "Failed to reset draft.";
        console.error("Error resetting draft:", error.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
