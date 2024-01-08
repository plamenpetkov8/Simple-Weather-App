import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// Get favourites
router.get("/get", async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });

  try {
    const collection = await db.collection("favourites");
    const results = await collection.findOne({}, { _id: 1, data: 0 });

    res.send(results).status(200);
  } catch (e) {
    // 501/502 - Bad Request
    res.send(e.message).status(501);
  }
});

// Updates all favourites one-shot
router.patch("/update", async (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET, OPTIONS",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  });

  console.log(req?.body);

  if (!Array.isArray(req?.body)) {
    res.send("Invalid Data Type".status(400));
    return;
  }

  const updates = {
    $set: {
      data: req?.body,
    },
  };

  try {
    const collection = await db.collection("favourites");
    const result = await collection.updateOne({}, updates);
    res.send(result).status(200);
  } catch (e) {
    // 501/502 - Bad Request
    res.send(e.message).status(501);
  }
});

export default router;
