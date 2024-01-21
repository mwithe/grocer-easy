const second = require('./secondapi');

async function createMeal (data, totalArray, formattedNutriArray) {
    let count = 0;
    let ingredients = [];
    let measurements = [];
    let recipes = [];
    let response = [];
  
    //For each recipe, iterate and store the basic information
    for (let i = 0; i < data.meals.length; i++) {
      const name = data.meals[i].strMeal;
      const category = data.meals[i].strCategory;
      const image = data.meals[i].strMealThumb;
      const instructions = data.meals[i].strInstructions
  
      //For each ingredient stored in the ingredients and measurement arrays of the recipe object, iterate and store
      for (let x = 1; x <= 20; x++) {
        if (data.meals[count][`strIngredient${x}`]) {
  
          ingredients.push(
            data.meals[count][`strIngredient${x}`]
            );
  
          measurements.push(
            data.meals[count][`strMeasure${x}`]
          );
  
          let recipeEntry = data.meals[count][`strMeasure${x}`].concat(' ', data.meals[count][`strIngredient${x}`]);
  
          recipes.push(recipeEntry);
        }
      }
      count++;
  
      //Call second API  with recipe name and retrieve the nutritional information
      await second.secondAPI(name, formattedNutriArray);
      response.push(formattedNutriArray);
  
      //Reduce the nested level of the response
      let reduce = response.pop();
      nutrients = reduce.pop();
  
      //Push as object to the final completed meal array
      totalArray.push({name, category, image, ingredients, measurements, nutrients, recipes, instructions});
      ingredients = [];
      measurements = [];
      nutrients = [];
      recipes = [];
    }
  };

  module.exports = {createMeal};