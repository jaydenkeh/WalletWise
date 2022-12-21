const express = require("express");
const Income = require("../models/incomeSchema.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const income = await Income.find().exec();
    for (let i = 0; i < income.length; i++) {
      income[i].amount = income[i].amount / 100;
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/total", async (req, res) => {
  try {
    const income = Income.aggregate(
      [
        //get userName from jwt token payload
        { $match: { userName: "test" } },
        {
          $group: {
            _id: "$type",
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
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.route("/total").get(function (req, res) {
//   Income.aggregate(
//     [
//       //get userName from jwt token payload
//       { $match: { userName: "admin" } },
//       {
//         $group: {
//           _id: "$account",
//           total: {
//             $sum: "$amount",
//           },
//         },
//       },
//     ],
//     function (err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });

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
    for (let i = 0; i < income.length; i++) {
      income[i].amount = income[i].amount / 100;
    }
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
