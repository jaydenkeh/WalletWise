const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    accountName: { type: String, required: true, trim: true },
    accountType: { type: String, required: true, trim: true },
    accountBalance: { type: Number, required: true, min: "0" },
    currency: { type: String, required: true },
    userid: { type: String },
  },
  { timestamps: true }
);

const Account = mongoose.model("DaphneAccount", accountSchema);

module.exports = Account;
