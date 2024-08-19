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

export interface DetailedPlayer {
  name: string;
  team: string;
  position: string;
  games_played: number;
  bye_week: number;
  fan_points: number;
  passing: PassingStats;
  rushing: RushingStats;
  receiving: ReceivingStats;
  fumbles: FumbleStats;
  eos_rank?: number; // Add eos_rank as optional
  rank_difference?: number; // Already exists as optional
}

export interface MinimalPlayer {
  rank?: number;
  name: string;
  team: string;
  position: string;
  rank_difference?: number; // Add this optional field
}

export type Player = DetailedPlayer | MinimalPlayer;
