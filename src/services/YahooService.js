const axios = require("axios");
const oauth = require("./YahooOAuth");

let oauthToken = "";
let oauthTokenSecret = "";

function getRequestToken() {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
      if (error) {
        reject(error);
      } else {
        oauthToken = token;
        oauthTokenSecret = tokenSecret;
        resolve(
          `https://api.login.yahoo.com/oauth/v2/request_auth?oauth_token=${token}`
        );
      }
    });
  });
}

function getAccessToken(oauthVerifier) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(
      oauthToken,
      oauthTokenSecret,
      oauthVerifier,
      (error, accessToken, accessTokenSecret, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ accessToken, accessTokenSecret });
        }
      }
    );
  });
}

function fetchPPRRankings(accessToken, accessTokenSecret) {
  const url =
    "https://fantasysports.yahooapis.com/fantasy/v2/league/league_key/players;status=FA;sort=AR";
  return axios.get(url, {
    headers: {
      Authorization: `OAuth oauth_consumer_key="${OAUTH_CONSUMER_KEY}", oauth_token="${accessToken}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${Math.floor(
        new Date().getTime() / 1000
      )}", oauth_nonce="${Math.random()
        .toString(36)
        .substring(7)}", oauth_version="1.0"`,
    },
  });
}

module.exports = {
  getRequestToken,
  getAccessToken,
  fetchPPRRankings,
};
