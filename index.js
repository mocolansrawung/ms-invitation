const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const config = require("config");
const dbConfig = config.get("mocolansrawung.dbConfig.dbName");

const Message = require("./models/messages");
// const createCalendar = require("./calendar");

mongoose
    .connect(
        "mongodb+srv://mocolansrawung:sInqHiktkjiJ6XnL@cluster0.ou1d5dp.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Mongo connection open.");
    })
    .catch((err) => {
        console.log("Monggo connecton error!!!");
        console.log(err);
    });

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}

// GET open the invitation
app.get(
    "/in",
    wrapAsync(async (req, res, next) => {
        const { s, to } = req.query;
        res.render("cover", { s, to });
    })
);

// GET messages
app.get(
    "/",
    wrapAsync(async (req, res, next) => {
        const messages = await Message.find({}).sort(-createdAt);
        const { s } = req.query;
        res.render("index", { messages, s });
    })
);

// POST new message
app.post(
    "/",
    wrapAsync(async (req, res, next) => {
        const newMessage = new Message(req.body.message);
        await newMessage.save();
        res.redirect("#messageSection");
    })
);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);
