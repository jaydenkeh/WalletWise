const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema(
  {
    account: {
      type: String,
      required: true,
      trim: true,
    },
    type: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: "0" },
    description: { type: String, trim: true },
    date: { type: Date, require: true, default: new Date() },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expensesSchema);

module.exports = Expense;
