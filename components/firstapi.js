// API key passed at launch
const MEALDB_API_KEY = process.env.API_KEY1;

// API call to TheMealDB for 10 random recipes
async function firstAPI() {
    const response = await fetch(`https://www.themealdb.com/api/json/v2/${MEALDB_API_KEY}/randomselection.php`);
    const data = await response.json();
    return data;
  };

module.exports = {firstAPI};