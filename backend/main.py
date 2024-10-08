from fastapi import FastAPI, Query, HTTPException
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

# Load the 2024 Harris draft rankings
with open('2024_harris_draft_rankings.json') as f:
    harris_rankings = json.load(f)

# Track drafted players
drafted_players = []

# Assign EOS ranks based on fan_points (most points = highest rank)
def assign_eos_ranks(eos_data):
    # Sort EOS data by fan points in descending order
    sorted_eos = sorted(eos_data, key=lambda p: p.get("fan_points", 0), reverse=True)

    # Assign ranks based on fan points
    for idx, player in enumerate(sorted_eos):
        player["eos_rank"] = idx + 1  # Rank starts from 1

    return sorted_eos

# Combine 2023 preseason and EOS data for a case study
def get_2023_case_study():
    merged = []
    eos_data_with_ranks = assign_eos_ranks(eos_data)  # Assign ranks to EOS data

    for player in harris_rankings:
        # Skip players that are drafted or whose data is incomplete
        if player["name"] in drafted_players:
            continue

        # Find matching EOS data by player name
        eos_player = next((p for p in eos_data_with_ranks if p["name"] == player["name"]), None)

        if eos_player:
            rank_difference = int(player.get("rank", 0) - eos_player.get("eos_rank", 0))

            merged.append({
                "name": player["name"],
                "rank": player.get("rank"),
                "eos_rank": eos_player.get("eos_rank"),
                "rank_difference": rank_difference,
                "games_played": eos_player.get("games_played"),
                "fan_points": eos_player.get("fan_points"),
                "position": player.get("position"),
                "team": player.get("team", "Unknown"),  # Ensure 'team' field is included
                # Additional stats, if any
                "passing": eos_player.get("passing", None),
                "rushing": eos_player.get("rushing", None),
                "receiving": eos_player.get("receiving", None),
                "fumbles": eos_player.get("fumbles", None),
            })

    return merged

# Endpoint for 2023 case study performers (preseason vs. end-of-season data)
@app.get("/performers/2023")
def get_2023_performers():
    return get_2023_case_study()  # Return the 2023 case study data


# Process only the 2024 mock draft data (Harris rankings)
def get_2024_mock_drafts():
    # This function only needs to return Harris rankings, no need to compare with EOS data
    mock_draft_data = []

    for player in harris_rankings:
        # Exclude drafted players from the mock draft list
        if player["name"] in drafted_players:
            continue

        mock_draft_data.append({
            "name": player["name"],
            "rank": player.get("rank", "N/A"),
            "position": player.get("position"),
            "team": player.get("team", "Unknown"),  # Team should be in Harris rankings
        })

    return mock_draft_data

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
            "/performers/position/{position}": "Get performers filtered by position",
            "/draft/{player_name}": "Mark a player as drafted and hide them from the list",
            "/reset_draft": "Reset the drafted players list",
        }
    }

# Helper function to handle full list vs default 25
def limit_results(data, full: bool, limit: int = 25):
    if full:
        return data
    return data[:limit]

# Endpoint to get the 2024 Harris Draft Rankings (undrafted players)
@app.get("/players")
def get_undrafted_players():
    return get_2024_mock_drafts()


# Endpoint to get performers based on rank difference type (best, worst, actual)
@app.get("/performers")
def get_performers(
    type: str = Query("best", enum=["best", "worst", "actual"]),
    position: str = None,
    team: str = None,
    full: bool = False,  # Return full list if full=true
    limit: int = 25
):
    merged_data = get_2023_case_study()  # Use case study function

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

# Filter rankings by team (2023 Case Study)
@app.get("/rankings/team/{team}")
def get_rankings_by_team(
    team: str,
    full: bool = False,
    limit: int = 25
):
    merged_data = get_2023_case_study()  # Use case study function

    # Filter by team
    filtered_data = [p for p in merged_data if p["team"].upper() == team.upper()]

    # Sort by fan points
    sorted_data = sorted(filtered_data, key=lambda x: x["fan_points"], reverse=True)

    return limit_results(sorted_data, full, limit)

# Filter rankings by position (2023 Case Study)
@app.get("/rankings/position/{position}")
def get_rankings_by_position(
    position: str,
    full: bool = False,
    limit: int = 25
):
    merged_data = get_2023_case_study()  # Use case study function

    # Filter by position
    filtered_data = [p for p in merged_data if p["position"].upper() == position.upper()]

    # Sort by fan points
    sorted_data = sorted(filtered_data, key=lambda x: x["fan_points"], reverse=True)

    return limit_results(sorted_data, full, limit)

# Endpoint to mark a player as drafted (for 2024 Mock Drafts)
@app.post("/draft/{player_name}")
def draft_player(player_name: str):
    undrafted_players = get_2024_mock_drafts()

    # Check if the player exists in the undrafted players list
    player = next((p for p in undrafted_players if p["name"].lower() == player_name.lower()), None)

    if player is None:
        raise HTTPException(status_code=404, detail="Player not found or already drafted")

    # Add the player to the drafted list
    drafted_players.append(player_name)

    return {
        "message": f"{player_name} has been drafted.",
        "remaining_players": get_2024_mock_drafts()
    }

# Reset drafted players list
@app.post("/reset_draft")
def reset_draft():
    global drafted_players
    drafted_players = []
    return {"message": "Draft has been reset."}
