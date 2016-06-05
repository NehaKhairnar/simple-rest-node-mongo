var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
module.exports.mongoose = mongoose;
var Customer     =   require("./Customer.js");
var Entry = require("./Entry.js")
var router      =   express.Router();
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/customers")
    .get(function(req,res){
	    Customer.find({}, function(err, data) {
	    if (!err) res.json(data);
	    });
    })
    .post(function(req,res){
		var c = new Customer(req.body);
		c.save()
		res.json({return: "success"});
    });

router.route("/customers/:id")
    .get(function(req,res){
        var response = {};
        Customer.find({id: req.params.id} ,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        });
    })

app.use('/',router);

app.listen(8000);
console.log("Listening to PORT 3000");