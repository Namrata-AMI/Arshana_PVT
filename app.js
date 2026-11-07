
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");

const contactRouter = require("./routes/contact");




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());





app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});





app.get("/", (req, res) => {
  res.render("lists/home.ejs", { isHome: false });
});

app.get("/about", (req, res) => {
  res.render("lists/about.ejs");
});

app.get("/services", (req, res) => {
  res.render("lists/service.ejs");
});

app.get("/projects", (req, res) => {
  res.render("lists/project.ejs");
});

app.get("/gallery", (req, res) => {
  res.render("lists/gallery.ejs");
});

app.get("/blogs", (req, res) => {
  res.render("lists/blogs.ejs");
});

app.get("/contact", (req, res) => {
  res.render("lists/contact.ejs");
});

app.use("/contact", contactRouter);




app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
