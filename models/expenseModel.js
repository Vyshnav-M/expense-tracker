const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true, // Ensure uniqueness
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

expenseSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const lastDocument = await Expense.findOne({}, {}, { sort: { id: -1 } });
    doc.id = lastDocument && lastDocument.id ? lastDocument.id + 1 : 1;
  }
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
