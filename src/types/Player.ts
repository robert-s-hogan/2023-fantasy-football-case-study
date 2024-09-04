// Define the statistics for passing, rushing, receiving, and fumbles
interface PassingStats {
  yards: number;
  touchdowns: number;
  interceptions: number;
  sacks: number;
  pick_six: number;
}

interface RushingStats {
  attempts: number;
  yards: number;
  touchdowns: number;
}

interface ReceivingStats {
  receptions: number;
  yards: number;
  touchdowns: number;
  targets: number;
}

interface FumbleStats {
  total: number;
  lost: number;
}

// Add overallRank and positionRank to all players
export interface PlayerBase {
  name: string;
  team: string;
  position: string;
  overallRank?: number; // Add overallRank here
  positionRank?: string; // Add position rank like RB1, WR2, etc.
}

// DetailedPlayer type with all stats fields
export interface DetailedPlayer extends PlayerBase {
  games_played: number;
  bye_week: number;
  fan_points: number;
  passing?: PassingStats; // Making these optional since not every player has all stats
  rushing?: RushingStats;
  receiving?: ReceivingStats;
  fumbles?: FumbleStats;
  eos_rank?: number; // Optional field for end-of-season rank
  rank_difference?: number; // Optional field to calculate the difference between draft and EOS ranks
}

// MinimalPlayer type for players without detailed stats
export interface MinimalPlayer extends PlayerBase {
  rank?: number; // Optional draft rank
  rank_difference?: number; // Optional field for rank difference
}

// A union type to represent either DetailedPlayer or MinimalPlayer
export type Player = DetailedPlayer | MinimalPlayer;
