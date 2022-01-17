const path = require("path");
const finnhub = require('finnhub')
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

// setup handlebars
app.set("view engine", "hbs"); // set templating engine
app.set("views", viewsPath); // point to custom views directory instead of /views

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setup body parsing
app.use(express.json());

app.get("/", (req, res) => {
   res.render("index")
});

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c7bp9fiad3ia366g24n0"
const finnhubClient = new finnhub.DefaultApi()

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));


app.post('/', (req,res) => {
  console.log(req.body);
  finnhubClient.indicesConstituents(req.body.etf, (error, data, response) => {
      console.log(data["constituents"]);
      res.status(200).send(data["constituents"]);
      //res.status(200).json(data["constituents"]);
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
