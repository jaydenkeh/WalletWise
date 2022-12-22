const express = require("express");
const router = express.Router();
const Account = require("../models/accountSchema.js");

router.get("/", async (req, res) => {
  try {
    const account = await Account.find().exec();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.find({ userid: id }).exec();
    res.status(200).json(account);
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndDelete(id);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
