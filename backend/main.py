from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data from JSON files
with open('2023_yahoo_EOS_results.json') as f:
    eos_data = json.load(f)

with open('2023_yahoo_draft_rankings.json') as f:
    rankings_data = json.load(f)

# Assign EOS ranks based on fan_points (most points = highest rank)
def assign_eos_ranks(eos_data):
    # Sort EOS data by fan points in descending order
    sorted_eos = sorted(eos_data, key=lambda p: p.get("fan_points", 0), reverse=True)

    # Assign ranks based on fan points
    for idx, player in enumerate(sorted_eos):
        player["eos_rank"] = idx + 1  # Rank starts from 1

    return sorted_eos

# Combine the two datasets for easier access
def merge_data():
    merged = []
    eos_data_with_ranks = assign_eos_ranks(eos_data)  # Assign ranks to EOS data

    for player in rankings_data:
        # Only include players with a valid preseason rank
        if player.get("rank") is None:
            continue  # Skip players without a preseason rank

        # Find matching EOS data by player name
        eos_player = next((p for p in eos_data_with_ranks if p["name"] == player["name"]), None)

        if eos_player:
            # Calculate rank difference (preseason rank - EOS rank)
            rank_difference = int(player.get("rank", 0) - eos_player.get("eos_rank", 0))

            merged.append({
                "name": player["name"],
                "rank": player.get("rank"),
                "eos_rank": eos_player.get("eos_rank"),
                "rank_difference": rank_difference,
                "games_played": eos_player.get("games_played"),
                "fan_points": eos_player.get("fan_points"),
                "passing": eos_player.get("passing", None),  # Safe access to passing stats
                "rushing": eos_player.get("rushing", None),  # Safe access to rushing stats
                "receiving": eos_player.get("receiving", None),  # Safe access to receiving stats
                "fumbles": eos_player.get("fumbles", None),  # Safe access to fumbles stats
                "position": player.get("position"),
                "team": player.get("team"),
            })

    return merged

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Fantasy Football API",
        "available_endpoints": {
            "/rankings": "Get all draft rankings",
            "/eos_results": "Get all EOS results",
            "/rankings/team/{team}": "Filter rankings by team",
            "/rankings/position/{position}": "Filter rankings by position",
            "/performers": "Get top, under, or met performers",
            "/performers/team/{team}": "Get performers filtered by team",
            "/performers/position/{position}": "Get performers filtered by position"
        }
    }

# Helper function to handle full list vs default 25
def limit_results(data, full: bool, limit: int = 25):
    if full:
        return data
    return data[:limit]

# Endpoint to get performers based on rank difference type (best, worst, actual)
@app.get("/performers")
def get_performers(
    type: str = Query("best", enum=["best", "worst", "actual"]),
    position: str = None,
    team: str = None,
    full: bool = False,  # Return full list if full=true
    limit: int = 25
):
    merged_data = merge_data()

    # Apply team filter if provided
    if team:
        merged_data = [p for p in merged_data if p["team"].upper() == team.upper()]

    # Apply position filter if provided
    if position:
        merged_data = [p for p in merged_data if p["position"].upper() == position.upper()]

    # Determine sorting based on type
    if type == "best":
        # Best: Players with the largest positive difference (EOS rank < Preseason rank)
        sorted_data = sorted(merged_data, key=lambda p: p["rank_difference"], reverse=True)
    elif type == "worst":
        # Worst: Players with the largest negative difference (EOS rank > Preseason rank)
        sorted_data = sorted(merged_data, key=lambda p: p["rank_difference"])
    elif type == "actual":
        # Actual: Players whose rank_difference is closest to 0 (smallest absolute difference)
        sorted_data = sorted(merged_data, key=lambda p: abs(p["rank_difference"]))

    # Limit the results
    return sorted_data if full else sorted_data[:limit]

# Filter rankings by team
@app.get("/rankings/team/{team}")
def get_rankings_by_team(
    team: str,
    full: bool = False,
    limit: int = 25
):
    merged_data = merge_data()

    # Filter by team
    filtered_data = [p for p in merged_data if p["team"].upper() == team.upper()]

    # Sort by fan points
    sorted_data = sorted(filtered_data, key=lambda x: x["fan_points"], reverse=True)

    return limit_results(sorted_data, full, limit)

# Filter rankings by position
@app.get("/rankings/position/{position}")
def get_rankings_by_position(
    position: str,
    full: bool = False,
    limit: int = 25
):
    merged_data = merge_data()

    # Filter by position
    filtered_data = [p for p in merged_data if p["position"].upper() == position.upper()]

    # Sort by fan points
    sorted_data = sorted(filtered_data, key=lambda x: x["fan_points"], reverse=True)

    return limit_results(sorted_data, full, limit)
