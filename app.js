var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("lalal");
})

app.listen(3000, function(){
	console.log("MyYelpCamp has connected!");
})