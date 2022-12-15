const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
      trim: true,
    },
    type: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: "0" },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Income = mongoose.model("incomes", incomeSchema);

module.exports = Income;
