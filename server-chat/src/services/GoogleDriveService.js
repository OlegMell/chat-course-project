const fs = require("fs");
const readline = require("readline");
const client = require('../utils/googleApi');
const {google} = require("googleapis");


class GoogleDriveService {
  constructor() {
    // console.log(client());
    this.drive = google.drive({ version: "v3", auth: client() });
  }

  getImage(name) {
    let fileId;
    this.drive.files.list({
      q: `name = ${name}`,
      space: "drive",
      fields: "nextPageToken, files(id, name)",
    }, (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      console.log(res);
      const files = res.data.files;
      fileId = files[0].id;
    });

    return fileId;
  }
}

module.exports = GoogleDriveService;

