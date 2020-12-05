const {google} = require("googleapis");
const fs = require("fs");
const readline = require("readline");


const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const TOKEN_PATH = "./src/config/token.json";

function getClient () {
  let client = ';';
  fs.readFile("./src/config/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    client = authorize(JSON.parse(content));
    // console.log(client);
  });

  function authorize(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client);
      oAuth2Client.setCredentials(JSON.parse(token));
    });
    return oAuth2Client;
  }


  function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
      });
    });
  }
}



module.exports = getClient;


