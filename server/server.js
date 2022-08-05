const express = require("express");
const { buildError } = require("express-ez-405");

const app = express();
app.use(express.json());

const userRouter = require("./routes/user");
const mainRouter = require("./routes/main");
const nestedRouter = require("./routes/nested");

// // Routes
app.use("/main", mainRouter);
app.use("/user", userRouter);
app.use("/nested/route", nestedRouter);
// Routes

app.use("", (req, _, next) => {
  const err = buildError(app, req);
  if (!err) return next();
  return next(err);
});

// Error handling
app.use((err, _, res, __) => res.status(err.status).json(err.message));
// Error handling

// Server actually starts in ./server/start.js for testing purposes
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = { app, server };
