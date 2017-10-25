var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mhshots = [
	{name: "New Weapon", img:"https://i.redd.it/edn8hvecwx4y.png"},
	{name: "Final Boss", img: "https://i.ytimg.com/vi/u7tuDneIGwo/maxresdefault.jpg"},
	{name: "MHXX", img:"http://images.nintendolife.com/news/2016/12/gallery_feast_your_eyes_on_a_whole_lot_of_monster_hunter_xx_double_cross_screens/attachment/0/original.jpg"}
]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/mhshots", function(req, res){
	res.render("mhshots", {mhshots: mhshots});
})

app.post("/mhshots", function(req, res){
	mhshots.push({name: req.body.name, img: req.body.image});
	res.redirect("/mhshots");
})

app.get("/mhshots/new", function(req, res){
	res.render("new");
})

app.listen(3000, function(){
	console.log("MyMHgallery has connected!");
})