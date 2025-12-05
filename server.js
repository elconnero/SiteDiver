// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// For Vite build:
app.use(express.static(path.join(__dirname, "dist")));

// For CRA, change "dist" to "build"
// app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
  // or "build/index.html" if CRA
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
