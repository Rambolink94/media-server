const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Make an environment variable
const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

router.get("/:name", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req.params.name}&page=1&include_adult=true`
  )
    .then((res) => res.json())
    .then((json) => console.log(json));
});

module.exports = router;

//[x] Arrival:      329865
//[x] Mummy:        564
//[x] Intersellar:  157336
//[x] Infitiy War:  299536
//[x] LOTR FOTR:    120
//[x] Big Lebowski: 115
//[x] Fountain:     1381
