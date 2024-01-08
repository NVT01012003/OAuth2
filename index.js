import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { apiRouter } from "./src/api/index.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + "/public"));
app.use(apiRouter);
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
