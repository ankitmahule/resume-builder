const fs = require("fs");
const pdf = require("pdf-parse");
const cors = require("cors");
const express = require("express");
const { formidable } = require("formidable");

const app = express();
const form = formidable();

app.use(
  cors({
    origin: "*",
  }),
  express.json()
);

app.post("/read-resume", async (req, res) => {
  try {
    [fields, files] = await form.parse(req);
    let dataBuffer = fs.readFileSync(files.file[0].filepath);
    console.log(req.body);
    pdf(dataBuffer)
      .then((data) => {
        const fileData = { fileData: data.text };
        res.status(200).send(fileData);
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    res.status(400).send("Error occurred" + error);
  }
});

app.listen("8080", () => {
  console.log("app listening");
});
