var express     = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose")

// var mhshots = [
// 	{name: "New Weapon", img:"https://i.redd.it/edn8hvecwx4y.png"},
// 	{name: "Final Boss", img: "https://i.ytimg.com/vi/u7tuDneIGwo/maxresdefault.jpg"},
// 	{name: "MHXX", img:"http://images.nintendolife.com/news/2016/12/gallery_feast_your_eyes_on_a_whole_lot_of_monster_hunter_xx_double_cross_screens/attachment/0/original.jpg"},
// 	{name: "New Weapon", img:"https://i.redd.it/edn8hvecwx4y.png"},
// 	{name: "Final Boss", img: "https://i.ytimg.com/vi/u7tuDneIGwo/maxresdefault.jpg"},
// 	{name: "MHXX", img:"http://images.nintendolife.com/news/2016/12/gallery_feast_your_eyes_on_a_whole_lot_of_monster_hunter_xx_double_cross_screens/attachment/0/original.jpg"}
// ]

mongoose.connect("mongodb://localhost/mh_gallery");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//setup schema
var mhshotSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Mhshot = mongoose.model("Mhshot", mhshotSchema);

app.get("/", function(req, res){
	res.render("landing");
})

//show add the mhshots at /mhshots
app.get("/mhshots", function(req, res){
	Mhshot.find({}, function(err, results){
		if(err){
			console.log(err);
		} else {
			res.render("mhshots", {mhshots: results})
		}
	})
})

//add new mhshot into mongodb
app.post("/mhshots", function(req, res){
	var newMhshot = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description
	};

	Mhshot.create(newMhshot, function(err, newMhshot){
		if(err){
			console.log(err);
		} else{
			console.log("Newly created mhshots");
			console.log(newMhshot);
			res.redirect("/mhshots");
		}
	})
})

app.get("/mhshots/new", function(req, res){
	res.render("new");
})

app.get("/mhshots/:id", function(req, res){
	Mhshot.findById(req.params.id, function(err, foundMhshot){
		if(err){
			console.log(err);
		} else {
			res.render("show", {mhshots: foundMhshot});
		}
	});
})

app.listen(3000, function(){
	console.log("MyMHgallery has connected!");
})