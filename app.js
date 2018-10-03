var express = require ("express");

var app = express();
var request = require("request"); //to get the raw webdata retruned from the website(JSON) to display in the terminal.

app.use(express.static("public")); //tells express to look inside the public folder for your css
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("search"); //my search form .ejs page
});


app.get("/results", function(req, res){
    
    var query = req.query.search // to pluck the data from the query string(search bar up top). Which we enabled the user to enter using the form in search.ejs with name="search". THEREFORE req.query.search
    
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb" // concatenating the url for omdb + ^query variable^ + my api key and passing in the var url below
    
   request(url, function(error, response , body){ //have to add in the callback function(error, res, bod)
       if(!error && response.statusCode == 200){
           var data = JSON.parse(body); //parses the body converting it to an object because it was a string and could not be read
           res.render("results", {data: data, query: query});
           //res.send(data["Search"][0]["Title"]);
           
       }
   });
});

app.get("/details/:id", function (req, res) {
    var imdbid = req.params.id;
    
    var url = "http://www.omdbapi.com/?i=" + imdbid + "&plot=full&apikey=thewdb"
 
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("details", {movieData: data});
        }
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER IS ACTIVE!"); 
});



//api calls:

// NORMAL SEARCH: http://www.omdbapi.com/?s=jurassic+park&apikey=thewdb  
//TITLE SEARCH: http://www.omdbapi.com/?i=tt0107290&apikey=thewdb  &plot=full