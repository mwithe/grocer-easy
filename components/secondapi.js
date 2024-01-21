// API key passed at launch
const NUTRITION_API_KEY = process.env.API_KEY2;

// API call to Nutrition by API Ninjas for the nutritional information of recipes from first API
async function secondAPI(recipe, formattedNutriArray) {
    // API2 may return several arrays of information each ingredient in some cases, this object is used to sum the total for the meal.
    let summedNutrients = {
      calories: 0,
      protein: 0,
      fat: 0,
      fatSaturated: 0,
      sugar: 0,
      fibre: 0,
      sodium: 0,
      cholesterol: 0,
      carbohydrates: 0,
    };
  
    let sumCalories = 0;
    let sumProtein = 0;
    let sumFat = 0;
    let sumFatSaturated = 0;
    let sumSugar = 0;
    let sumFibre = 0;
    let sumSodium = 0;
    let sumCholesterol = 0;
    let sumCarbohydrates = 0;
  
    //API Call
      const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${recipe}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${NUTRITION_API_KEY}`,
          'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
          }
        };
  
        try {
          const response = await fetch(url, options);
          const result = await response.json();
  
          //If multiple ingredients returned, iterate and save each ones information to the total
          if (result) {
            for (i = 0; i < result.length; i++) {
              sumCalories += parseInt(result[i].calories);
              sumProtein += parseInt(result[i].protein_g);
              sumFat += parseInt(result[i].fat_total_g);
              sumFatSaturated += parseInt(result[i].fat_saturated_g);
              sumSugar += parseInt(result[i].sugar_g);
              sumFibre += parseInt(result[i].fiber_g);
              sumSodium += parseInt(result[i].sodium_mg);
              sumCholesterol += parseInt(result[i].cholesterol_mg);
              sumCarbohydrates += parseInt(result[i].carbohydrates_total_g);
            }
          }
          else {};
  
          summedNutrients.calories = sumCalories;
          summedNutrients.protein = sumProtein;
          summedNutrients.fat = sumFat;
          summedNutrients.fatSaturated = sumFatSaturated;
          summedNutrients.sugar = sumSugar;
          summedNutrients.fibre = sumFibre;
          summedNutrients.sodium = sumSodium;
          summedNutrients.cholesterol = sumCholesterol;
          summedNutrients.carbohydrates = sumCarbohydrates;
  
          formattedNutriArray.push(summedNutrients);
  
        } catch (error) {
            console.error(error);
        }
  };

  module.exports = {secondAPI};