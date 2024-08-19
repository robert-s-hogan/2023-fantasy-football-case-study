from fastapi import FastAPI
import json

app = FastAPI()

# Load data from JSON files
with open('2023_yahoo_EOS_results.json') as f:
    eos_data = json.load(f)

with open('2023_yahoo_draft_rankings.json') as f:
    rankings_data = json.load(f)

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Fantasy Football API",
        "available_endpoints": {
            "/rankings": "Get all draft rankings",
            "/eos_results": "Get all EOS results",
            "/rankings/team/{team}": "Filter rankings by team",
            "/rankings/position/{position}": "Filter rankings by position"
        }
    }

# Endpoint to get all draft rankings
@app.get("/rankings")
def get_rankings():
    return rankings_data

# Endpoint to get all EOS results
@app.get("/eos_results")
def get_eos_results():
    return eos_data

# Endpoint to filter players by team in rankings
@app.get("/rankings/team/{team}")
def get_players_by_team(team: str):
    team_players = [player for player in rankings_data if player["team"] == team.upper()]
    if team_players:
        return team_players
    else:
        return {"message": f"No players found for team: {team}"}

# Endpoint to filter players by position in rankings
@app.get("/rankings/position/{position}")
def get_players_by_position(position: str):
    position_players = [player for player in rankings_data if player["position"] == position.upper()]
    if position_players:
        return position_players
    else:
        return {"message": f"No players found for position: {position}"}
