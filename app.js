const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/expenseModel");
const bodyParser = require("body-parser");

const URI =
  "mongodb+srv://vyshnavmeleppat:Vyshnav%4033@expense-tracker.dheq2s0.mongodb.net/Expense-Tracker?retryWrites=true&w=majority&appName=expense-tracker";

mongoose
  .connect(URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/expenses", async (_, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).end();
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).send({ id: expense.id });
  } catch (error) {
    res.status(500).end();
  }
});

app.put("/expenses/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const newExpenseData = req.body;
  try {
    await Expense.updateOne({ id: id }, { $set: { ...newExpenseData } });
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

app.delete("/expenses/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await Expense.deleteOne({ id: id });
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

// app.listen(9000, () => {
//   console.log(`Server is running on port 9000`);
// });

module.exports = app;
