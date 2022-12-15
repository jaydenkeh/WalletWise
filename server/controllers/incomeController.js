const express = require("express");
const Income = require("../models/Income");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// app.post("/api/income", async (req, res) => {
//   try {
//     const income = await Income.create(req.body);
//     res.status(201).json(income);
//     console.log(req.body);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// });

module.exports = router;
