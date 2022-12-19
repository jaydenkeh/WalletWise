const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./signupSchema");

const accountSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    accountType: {
      type: String,
      required: true,
      trim: true,
    },
    accountDescription: { type: String, required: true, trim: true },
    accountBalance: { type: Number, required: true, min: "0" },
    currency: { type: String, required: true },
    bankAccount: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
