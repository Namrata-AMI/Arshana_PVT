const express = require("express");
const app = express();
const path = require("path");
//const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
//app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


/*app.get("/see",(req,res)=>{
    res.render("lists/home.ejs",{isHome:false});
})*/

app.get("/",(req,res)=>{
    res.render("lists/about.ejs", { isHome: false });
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});