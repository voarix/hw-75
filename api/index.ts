import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const PASSWORD = "testpassword";

app.use(cors());
app.use(express.json());

const Vigenere = require("caesar-salad").Vigenere;

app.post("/encode", async (req, res) => {
  const {password, message} = req.body;

  if (!message || !password) {
    res.status(400).send({error: "Message params must be in req url"});
    return
  }

  if (password !== PASSWORD) {
    res.status(400).send({error: "Incorrect password    "});
    return
  }

  const encodeMessage: string = await Vigenere.Cipher(PASSWORD).crypt(message);

  res.send({encoded: encodeMessage});
});

app.post("/decode", async (req, res) => {
  const {password, message} = req.body;

  if (!message || !password) {
    res.status(400).send({error: "Message params must be in req url"});
    return
  }

  if (password !== PASSWORD) {
    res.status(400).send({error: "Incorrect password"});
    return
  }

  const decodeMessage: string = await Vigenere.Decipher(PASSWORD).crypt(message);
  res.send({decoded: decodeMessage});
});


const run = async () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

run().catch(console.error);