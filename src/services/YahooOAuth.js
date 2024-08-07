const oauth = require("oauth");

const OAUTH_CONSUMER_KEY = "YOUR_CLIENT_ID";
const OAUTH_CONSUMER_SECRET = "YOUR_CLIENT_SECRET";
const OAUTH_CALLBACK = "YOUR_CALLBACK_URL";

const consumer = new oauth.OAuth(
  "https://api.login.yahoo.com/oauth/v2/get_request_token",
  "https://api.login.yahoo.com/oauth/v2/get_token",
  OAUTH_CONSUMER_KEY,
  OAUTH_CONSUMER_SECRET,
  "1.0",
  OAUTH_CALLBACK,
  "HMAC-SHA1"
);

module.exports = consumer;
