const express = require("express");
const Income = require("../models/incomeSchema.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const income = await Income.find().exec();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.route("/total").get(function (req, res) {
  Income.aggregate(
    [
      {
        $group: {
          _id: "$account",
          total: {
            $sum: "$amount",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/", async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    res.json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndDelete(id);
    res.json(income);
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
