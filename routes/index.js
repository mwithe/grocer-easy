var express = require('express');
var router = express.Router();
const AWS = require("aws-sdk");
require("dotenv").config();
require('../components/pagecountS3');

const first = require('../components/firstapi');
const second = require('../components/secondapi');
const createMeal = require('../components/createmeal');
var pageCount = require('../components/pagecountS3');

//Arrays used to store the JSON response once formatted
const formattedMeals = []
const formattedNutrition = [];

router.get('/', async function(req, res) {

  //Call first API
  let data = await first.firstAPI();

  //Second API is called during the createMeal function
  await createMeal.createMeal(data, formattedMeals, formattedNutrition);

  res.render("index", { data: { formattedMeals: formattedMeals, pageCount: pageCount, title: 'Grocer-easy'} });
});

module.exports = router;
