const express = require("express");
const router = express.Router();
const Account = require("../models/accountSchema.js");

// router.post("/", async (req, res) => {
//   try {
//     const account = await Account.find()
//       .sort({ createdAt: 1 })
//       .populate("user_id");
//     res.json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
