const express = require("express");
const app = express();
var fs = require("fs");
var visits = require('./visits.json');
var json = require('./users.json');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
 app.get("/visits", (request, response) => {
   response.setHeader("Access-Control-Allow-Origin", "*");
   response.status(200).json(visits.visits);
   visits.visits++
 })

 app.get('/newscore/:number/:username', (req, res) => {
var number = req.params.number
var username = req.params.username

json.users.push({
  "score": number,
  "username": username
})

res.status(200).json(json)
})

app.get('/scores', (req, res) => {
  res.status(200).json(json)
  })

setInterval(function () {
  let stringifieddata = JSON.stringify(visits);
  fs.writeFileSync('./visits.json', stringifieddata);
}, 2000);

setInterval(function () {
  let stringifieddata1 = JSON.stringify(json);
  fs.writeFileSync('./users.json', stringifieddata1);
}, 2000);

app.listen(80)