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
        const [rankingsResponse, eosResponse] = await Promise.all([
          axios.get<Player[]>("http://127.0.0.1:8001/rankings"),
          axios.get<Player[]>("http://127.0.0.1:8001/eos_results"),
        ]);

        this.draftRankings = rankingsResponse.data;
        this.eosResults = eosResponse.data;

        this.assignEosRanks();
        this.mergeData();
      } catch (error) {
        this.error = "Failed to fetch data.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    assignEosRanks() {
      // Sort only the DetailedPlayer based on fan_points
      this.eosResults
        .filter(isDetailedPlayer)
        .sort((a, b) => b.fan_points - a.fan_points);

      // Assign eos_rank to only DetailedPlayers
      this.eosResults.forEach((player, index) => {
        if (isDetailedPlayer(player)) {
          player.eos_rank = index + 1;
        }
      });
    },

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
              isMinimalPlayer(draftPlayer) && eosPlayer.eos_rank
                ? draftPlayer.rank! - eosPlayer.eos_rank
                : undefined,
          };
        }

        return {
          ...draftPlayer,
          eos_rank: undefined, // Set eos_rank to undefined instead of null
          fan_points: 0,
          rank_difference: isMinimalPlayer(draftPlayer)
            ? draftPlayer.rank
            : undefined,
        };
      });
    },
  },
});
