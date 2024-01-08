import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/favourites.mjs";
import userSettings from "./routes/userSettings.mjs";

const PORT = process.env.PORT || 5050;

console.log(PORT);

const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/favourites", posts);
app.use("/userSettings", userSettings);

// Global error handling
app.use((err, _req, res) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, (test1, test2, test3) => {
  console.log(`Server is running on port: ${PORT}`);
});
