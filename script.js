const foodCalories = {
  // Breakfast items
  egg: 90,
  bread: 100,
  oatmeal: 150,
  cereal: 100,
  yogurt: 150,
  granola: 200,
  berries: 40,
  orange_juice: 110,
  bacon: 43,
  sausage: 100,

  // Snacks
  banana: 120,
  apple: 95,
  almonds: 160,
  peanuts: 160,
  mixed_nuts: 170,
  peanut_butter: 80,
  jelly: 50,
  protein_bar: 200,
  cheese: 110,
  cottage_cheese: 12,
  crackers: 200,
  dark_chocolate: 170,
  popcorn: 374,
  hummus: 25,
  carrots: 25,
  celery: 6,

  // Dinner items
  chicken_breast: 165,
  salmon: 280,
  steak: 679,
  pork_chop: 350,
  rice: 205,
  pasta: 200,
  quinoa: 220,
  couscous: 175,
  broccoli: 50,
  spinach: 10,
  green_beans: 40,
  asparagus: 20,
  cauliflower: 25,
  zucchini: 20,
  sweet_potato: 86,
  potato: 163,
  mashed_potatoes: 240,
  gravy: 20,
  garden_salad: 150,
  caesar_salad: 180,

  // Add more food items and their calorie values here
  date_honey: 371,
};

function getCalories(food, quantity, unit) {
  const calorieInfo = foodCalories[food];

  if (unit === "count") {
    return Math.round(calorieInfo * quantity);
  }

  // General conversion factors (approximations)
  const tspToGrams = 5; // 1 tsp is approximately 5 grams
  const tbspToGrams = 15; // 1 tbsp is approximately 15 grams
  const cupToGrams = 240; // 1 cup is approximately 240 grams

  let grams;

  switch (unit) {
    case "tsp":
      grams = quantity * tspToGrams;
      break;
    case "tbsp":
      grams = quantity * tbspToGrams;
      break;
    case "cup":
      grams = quantity * cupToGrams;
      break;
    default:
      grams = quantity;
  }

  return Math.round((grams / 100) * calorieInfo);
}

function populateFoodDropdown() {
  const foodDatalist = document.getElementById("foodOptions");

  for (const food in foodCalories) {
    const option = document.createElement("option");
    option.value = food;
    option.textContent = food.charAt(0).toUpperCase() + food.slice(1);
    foodDatalist.appendChild(option);
  }
}

populateFoodDropdown();

function removeListItem(event) {
  const listItemContainer = event.target.parentElement;
  const listItem = listItemContainer.querySelector(".list-item");
  const calories = parseFloat(listItem.getAttribute("data-calories"));
  const totalOutput = document.getElementById("total");
  const currentTotal = parseFloat(totalOutput.textContent);
  const newTotal = currentTotal - calories;

  totalOutput.textContent = newTotal;
  listItemContainer.remove();
}

document.getElementById("add").addEventListener("click", function () {
  const foodInput = document.getElementById("food");
  const quantityInput = document.getElementById("quantity");
  const unitInput = document.getElementById("unit");
  const totalOutput = document.getElementById("total");
  const foodList = document.getElementById("foodList");

  const food = foodInput.value.trim().toLowerCase();
  const quantity = parseFloat(quantityInput.value.replace(",", ".")) || 0; // Replace eval with parseFloat
  const unit = unitInput.value;
  const unitLabel = unitInput.options[unitInput.selectedIndex].text;

  if (food !== "" && quantity > 0 && foodCalories.hasOwnProperty(food)) {
    const calories = getCalories(food, quantity, unit);
    totalOutput.textContent = parseFloat(totalOutput.textContent) + calories;

    const listItem = document.createElement("li");
    listItem.className = "list-item";
    listItem.textContent = `${quantity} ${unitLabel} ${food} (${calories} cal)`;
    listItem.setAttribute("data-calories", calories);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "X";
    removeButton.addEventListener("click", removeListItem);

    const listItemContainer = document.createElement("div");
    listItemContainer.className = "list-item-container";
    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(removeButton);

    foodList.appendChild(listItemContainer);
  }

  foodInput.value = "";
  quantityInput.value = "";
});

document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("total").textContent = "0";
  document.getElementById("foodList").innerHTML = "";
});
