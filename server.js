const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const auth = require("./routes/auth");

const app = express();
const PORT = 8000;
const MONGO_URI =
  "mongodb+srv://aprin418:justTemp@cluster0.92dc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch((err) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "very secret this is",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://aprin418:justTemp@cluster0.92dc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Good monring sunshine!"));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));
