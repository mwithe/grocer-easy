//Add items to Shopping List
const addToList = document.getElementsByClassName('add');
const productRow = document.getElementsByClassName('product-row');

// Enables add to list function to all 'add' buttons
for (var i = 0; i < addToList.length; i++) {
  button = addToList[i];
  button.addEventListener('click', addToListActive)
}

// Gets the information of the selected recipe via the button
function addToListActive (event) {
  button = event.target;
  var listItem = button.parentElement;

  var name = listItem.getElementsByClassName('recipe-name')[0].innerText;

  var recipeList = listItem.getElementsByClassName('recipe-list')[0].innerHTML;

  var calories = listItem.getElementsByClassName('calories')[0].innerText;

  var protein = listItem.getElementsByClassName('protein')[0].innerText;

  var fat = listItem.getElementsByClassName('fat')[0].innerText;

  var fatSaturated = listItem.getElementsByClassName('fatSaturated')[0].innerText;

  var sugar = listItem.getElementsByClassName('sugar')[0].innerText;

  var fibre = listItem.getElementsByClassName('fibre')[0].innerText;

  var sodium = listItem.getElementsByClassName('sodium')[0].innerText;

  var cholesterol = listItem.getElementsByClassName('cholesterol')[0].innerText;

  var carbohydrates = listItem.getElementsByClassName('carbohydrates')[0].innerText;


  addItemToList (name, recipeList, calories, protein, fat, fatSaturated, sugar, fibre, sodium, cholesterol, carbohydrates);
  updateCartPrice();
}

// Creates an item in the shopping list from the information received in addToListActive
function addItemToList (name, price, calories,protein, fat, fatSaturated, sugar, fibre, sodium, cholesterol, carbohydrates) {
    var productRow = document.createElement('div');
    productRow.classList.add('product-row');
    var productRows = document.getElementsByClassName('list-location')[0];
    var recipeName = document.getElementsByClassName('recipeName');

    for (var i = 0; i < recipeName.length; i++){
      if (recipeName[i].innerText == name){
        console.log('This item has already been added to the cart')
        return;
      }
    }
    
    var cartRowItems = `
      <div class="product-row">
          <p class="recipeName" name=${name}>${name}</p>
          <ul>
            ${price}
          </ul>

        <div class='information' style='display:none;'>
          <p class="list-item-calories">${calories}</p>
          <p class="list-item-protein">${protein}</p>
          <p class="list-item-fat">${fat}</p>
          <p class="list-item-fatSaturated">${fatSaturated}</p>
          <p class="list-item-sugar">${sugar}</p>
          <p class="list-item-fibre">${fibre}</p>
          <p class="list-item-sodium">${sodium}</p>
          <p class="list-item-cholesterol">${cholesterol}</p>
          <p class="list-item-carbohydrates">${carbohydrates}</p>
        </div>

          <button class="remove-btn">Remove</button>
      </div> 
        `

  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem);

  updateCartPrice()
}

//Enables remove from list functionality on buttons created by addItemToList
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener('click', removeItem);
}

// Removes selected item from shopping list
function removeItem (event) {
  btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartPrice();
}

// Calculates the totals of all data stored in the list
function updateCartPrice() {
  var totalListCalories = 0;
  var totalListProtein = 0;
  var totalListFat = 0;
  var totalListSaturatedFat = 0;
  var totalListSugar = 0;
  var totalListFibre = 0;
  var totalListSodium = 0;
  var totalListCholesterol = 0;
  var totalListCarbohydrates = 0;

  const servings = 6;

  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i];

    var itemCalories = cartRow.getElementsByClassName('list-item-calories')[0];
    var calories = parseInt(itemCalories.innerText);
    totalListCalories += calories;

    var itemProtein = cartRow.getElementsByClassName('list-item-protein')[0];
    var protein = parseInt(itemProtein.innerText);
    totalListProtein += protein;

    var itemFat = cartRow.getElementsByClassName('list-item-fat')[0];
    var fat = parseInt(itemFat.innerText);
    totalListFat += fat;

    var itemSaturatedFat = cartRow.getElementsByClassName('list-item-fatSaturated')[0];
    var saturatedFat = parseInt(itemSaturatedFat.innerText);
    totalListSaturatedFat += saturatedFat;

    var itemSugar = cartRow.getElementsByClassName('list-item-sugar')[0];
    var sugar = parseInt(itemSugar.innerText);
    totalListSugar += sugar;

    var itemFibre = cartRow.getElementsByClassName('list-item-fibre')[0];
    var fibre = parseInt(itemFibre.innerText);
    totalListFibre += fibre;

    var itemSodium = cartRow.getElementsByClassName('list-item-sodium')[0];
    var sodium = parseInt(itemSodium.innerText);
    totalListSodium += sodium;
    
    var itemCholesterol = cartRow.getElementsByClassName('list-item-cholesterol')[0];
    var cholesterol = parseInt(itemCholesterol.innerText);
    totalListCholesterol += cholesterol;
  
    var itemCarbohydrates = cartRow.getElementsByClassName('list-item-carbohydrates')[0];
    var carbohydrates = parseInt(itemCarbohydrates.innerText);
    totalListCarbohydrates += carbohydrates;
  }

  document.getElementsByClassName('total-calories')[0].innerText = 'Daily Calories: ' + parseInt(((totalListCalories * servings) / 7)) + ' cal';

  document.getElementsByClassName('total-protein')[0].innerText = 'Daily Protein: ' + parseInt(((totalListProtein * servings) / 7)) + 'g';

  document.getElementsByClassName('total-carbohydrates')[0].innerText = 'Daily Carbohydrates: ' + parseInt(((totalListCarbohydrates * servings) / 7)) + 'g';

  document.getElementsByClassName('total-fat')[0].innerText = 'Daily Fat: ' + parseInt(((totalListFat * servings) / 7)) + 'g';

  document.getElementsByClassName('total-saturated-fat')[0].innerText = 'Daily Saturated Fat: ' + parseInt(((totalListSaturatedFat * servings) / 7)) + 'g';

  document.getElementsByClassName('total-sugar')[0].innerText = 'Daily Sugar: ' + parseInt(((totalListSugar * servings) / 7)) + 'g'; 

  document.getElementsByClassName('total-fibre')[0].innerText = 'Daily Fibre: ' + parseInt(((totalListFibre * servings) / 7)) + 'g';

  document.getElementsByClassName('total-sodium')[0].innerText = 'Daily Sodium: ' + parseInt(((totalListSodium * servings) / 7)) + 'mg';

  document.getElementsByClassName('total-cholesterol')[0].innerText = 'Daily Cholesterol: ' + parseInt(((totalListCholesterol * servings) / 7)) + 'mg'; 


  if (totalListSodium > 500) {
    const sodiumHigh = 'sodium';
    recommendMeal(sodiumHigh);
  };
  
  if (totalListCholesterol > 300) {
    const cholesterolHigh = 'cholesterol';
    recommendMeal(cholesterolHigh);
  };

  if (totalListSugar > 100) {
    const sugarHigh = 'sugar';
    recommendMeal(sugarHigh);
  };
  
};

// Recommend meals (preferably not already in the list) with low amounts of the target variable
function recommendMeal(threat) {
  console.log('High Threat: ', threat);

  var recipes = document.getElementsByClassName('recipe-name');

  var target = document.getElementsByClassName('recipeName');


  for (var i = 0; i < target.length; i++) {
    for (var x = 0; x < recipes.length; x++) {
      if (recipes[x].innerText !== target[i].innerText) {
             var sodium = document.getElementsByClassName('sodium')[x].innerText;

             var cholesterol = document.getElementsByClassName('cholesterol')[x].innerText;

             var sugar = document.getElementsByClassName('sugar')[x].innerText;

          if (threat === 'sodium') {
             if (sodium < 150 && sodium > 1) {
                let warn = 'sodium';
                let meal = recipes[x].innerText;
                let value = sodium;

                createWarning(warn, meal, value);  
                return;
             };
            }
            
           if (threat === 'cholesterol') {
            if (cholesterol < 150 && cholesterol > 1) {
               let warn = 'cholesterol';
               let meal = recipes[x].innerText;
               let value = cholesterol;

               createWarning(warn, meal, value);  
               return;
            };
           }

           if (threat === 'sugar') {
            if (sugar < 20) {
               let warn = 'sugar';
               let meal = recipes[x].innerText;
               let value = sugar;

               createWarning(warn, meal, value);  
               return;
            };
           }
        }
    }
  }
};

// Creates warning displayed on screen
function createWarning(threat, meal, value) {
  console.log('threat: ', threat);
  console.log('Meal: ', meal);
  console.log('value: ', value);

  if (document.getElementsByClassName(`${threat}-warning-row`).length == 0) {

  var warningRow = document.createElement('div');

  warningRow.classList.add(`${threat}-warning-row`);

  var warningRows = document.getElementsByClassName('recommendations')[0];

  var warningRowItems = `
      <div class="${threat}-warning-row">
        <h3>Warning!</h3>
        <p>It looks like <b>${threat}</b> content is too high in shopping list.</p>
        <p><b>${meal}</b> is a meal with just ${value} ${threat}.
        <button class="remove-warning-btn">Close</button>
    </div>
      `
  warningRow.innerHTML = warningRowItems;
  warningRows.append(warningRow);
  warningRow.getElementsByClassName('remove-warning-btn')[0].addEventListener('click', removeWarning);

}
}

// Close the warning
function removeWarning (event) {
  btnClicked = event.target;
  btnClicked.parentElement.parentElement.parentElement.remove();
}