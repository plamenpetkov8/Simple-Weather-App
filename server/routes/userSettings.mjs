import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// Get user settings
router.get("/get", async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });

  try {
    const collection = await db.collection("userSettings");
    const results = await collection.findOne({}, { _id: 0, data: 1 });

    res.send(results).status(200);
  } catch (e) {
    res.send(e.message).status(501);
  }
});

// Update all user settings one-shot
router.patch("/update", async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });

  if (
    req?.body == null ||
    typeof req?.body !== "object" ||
    !req?.body?.theme ||
    !req?.body?.temperatureUnit
  ) {
    res.send("Invalid Data Type".status(400));
    return;
  }

  const updates = {
    $set: {
      data: req?.body,
    },
  };

  try {
    const collection = await db.collection("userSettings");
    const result = await collection.updateOne({}, updates);
    res.send(result).status(200);
  } catch (e) {
    // 501/502 - Bad Request
    res.send(e.message).status(501);
  }
});

export default router;
