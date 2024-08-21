import { defineStore } from "pinia";
import axios from "axios";
import { Player, DetailedPlayer, MinimalPlayer } from "@/types/Player";

// Define the state type separately
interface State {
  draftRankings: Player[];
  eosResults: Player[];
  mergedData: Player[];
  loading: boolean;
  error: string | null;
}

// Helper function to check if a player is a DetailedPlayer
function isDetailedPlayer(player: Player): player is DetailedPlayer {
  return (player as DetailedPlayer).fan_points !== undefined;
}

// Helper function to check if a player is a MinimalPlayer
function isMinimalPlayer(player: Player): player is MinimalPlayer {
  return (player as MinimalPlayer).rank !== undefined;
}

export const usePlayerStore = defineStore("player", {
  state: (): State => ({
    draftRankings: [],
    eosResults: [],
    mergedData: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        // Using Promise.all to fetch both rankings and EOS data concurrently
        const [rankingsResponse, eosResponse] = await Promise.all([
          axios.get<Player[]>("http://127.0.0.1:8001/rankings"),
          axios.get<Player[]>("http://127.0.0.1:8001/eos_results"),
        ]);

        this.draftRankings = rankingsResponse.data;
        this.eosResults = eosResponse.data;

        this.assignEosRanks(); // Assign end-of-season ranks
        this.mergeData(); // Merge draft and end-of-season data
      } catch (error: any) {
        this.error =
          error.response?.status === 404
            ? "Data not found."
            : "Failed to fetch data.";
        console.error("Error fetching data:", error.message);
      } finally {
        this.loading = false;
      }
    },

    // Assigning EOS rank based on fan_points for DetailedPlayers
    assignEosRanks() {
      // Sort DetailedPlayers by fan_points in descending order
      this.eosResults
        .filter(isDetailedPlayer)
        .sort((a, b) => b.fan_points - a.fan_points);

      // Assign eos_rank to DetailedPlayers only
      this.eosResults.forEach((player, index) => {
        if (isDetailedPlayer(player)) {
          player.eos_rank = index + 1;
        }
      });
    },

    // Merging draftRankings with eosResults based on player name
    mergeData() {
      this.mergedData = this.draftRankings.map((draftPlayer) => {
        const eosPlayer = this.eosResults.find(
          (p) => p.name === draftPlayer.name
        );

        if (eosPlayer && isDetailedPlayer(eosPlayer)) {
          return {
            ...draftPlayer,
            eos_rank: eosPlayer.eos_rank,
            fan_points: eosPlayer.fan_points,
            rank_difference:
              isMinimalPlayer(draftPlayer) && eosPlayer.eos_rank !== undefined
                ? (draftPlayer.rank ?? 0) - eosPlayer.eos_rank
                : undefined,
          };
        }

        // Handle cases where no matching EOS data is found
        return {
          ...draftPlayer,
          eos_rank: undefined, // Set eos_rank to undefined if not found
          fan_points: 0, // Default fan points to 0
          rank_difference: isMinimalPlayer(draftPlayer)
            ? draftPlayer.rank
            : undefined,
        };
      });

      // Log mergedData to console
      // console.log("Final mergedData:", this.mergedData);
    },
  },
});
