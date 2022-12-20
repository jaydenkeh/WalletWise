const express = require("express");
const router = express.Router();
const Account = require("../models/accountSchema.js");

router.get("/", async (req, res) => {
  try {
    const account = await Account.find().exec();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/new", async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
