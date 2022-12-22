const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionSchema.js");

router.get("/", async (req, res) => {
  try {
    const transaction = await Transaction.find().exec();
    for (let i = 0; i < transaction.length; i++) {
      transaction[i].amount = transaction[i].amount / 100;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/income/total/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "income" }] } },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/expense/total/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "expense" }] } },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    for (let i = 0; i < transaction.length; i++) {
      transaction[i].amount = transaction[i].amount / 100;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
