const SEDENTARY = 1.2;
const LIGHTLY_ACTIVE = 1.375;
const MODERATELY_ACTIVE = 1.55;
const VERY_ACTIVE = 1.725;
const SUPER_ACTIVE = 1.9;
const PROTIEN_FOOD_LIST = [
  {
    food: "Egg-Whites",
    calorie: 17,
    qtyInGrams: 58,
    protien: 3.6,
    carbohydrates: 0.2,
    fats: 0.1,
    allowenceQty: 10,
  },
  {
    food: "Egg",
    calorie: 72,
    qtyInGrams: 58,
    protien: 6.3,
    carbohydrates: 0.4,
    fats: 4.8,
    allowenceQty: 3,
  },
  {
    food: "Chicken breast",
    calorie: 198,
    qtyInGrams: 100,
    protien: 37,
    carbohydrates: 0,
    fats: 4.3,
    allowenceQty: 2,
  },
  {
    food: "Soya chunks",
    calorie: 172,
    qtyInGrams: 50,
    protien: 26,
    carbohydrates: 16.5,
    fats: 0.5,
    allowenceQty: 1,
  },
];

function getPersonBMR(person) {
  const AGE = person.age;
  const WEIGHT = person.weight;
  const HEIGHT = person.height;
  const GENDER = person.gender;
  let bmr = 0;
  switch (GENDER) {
    case "male":
      bmr = 10 * WEIGHT + 6.25 * HEIGHT - 5 * AGE + 5;
      break;
    case "female":
      bmr = 10 * WEIGHT + 6.25 * HEIGHT - 5 * AGE + 161;
  }
  return bmr;
}
function getMaintenceCalorie(person) {
  const activityLevel = person.activityLevel;
  const BMR = getPersonBMR(person);
  let maintanceCalorie = 0;
  switch (activityLevel) {
    case "sedentary":
      maintanceCalorie = BMR * SEDENTARY;
      break;
    case "lightlyActive":
      maintanceCalorie = BMR * LIGHTLY_ACTIVE;
      break;
    case "moderatlyActive":
      maintanceCalorie = BMR * MODERATELY_ACTIVE;
      break;
    case "veryActive":
      maintanceCalorie = BMR * VERY_ACTIVE;
      break;
    case "superActive":
      maintanceCalorie = BMR * SUPER_ACTIVE;
      break;
  }
  return maintanceCalorie;
}
function getGoalCalorieProtienTarget(person) {
  const GOAL = person.goal;
  const WEIGHT = person.weight;
  const MAINTENCE_CALORIE = getMaintenceCalorie(person);
  let goalCalorie = 0;
  let protienTarget = 0;
  switch (GOAL) {
    case "deficit":
      goalCalorie = MAINTENCE_CALORIE - 300;
      protienTarget = WEIGHT * 1.5;
      break;
    case "surplus":
      goalCalorie = MAINTENCE_CALORIE + 300;
      protienTarget = WEIGHT * 2;
      break;
  }
  return { goalCalorie: goalCalorie, protienTarget: protienTarget };
}

let person1 = {
  name: "Aakash Khanna",
  weight: 93,
  height: 191,
  age: 23,
  gender: "male",
  activityLevel: "lightlyActive",
  goal: "deficit",
};

let person2 = {
  name: "Khanna",
  weight: 88,
  height: 190,
  age: 20,
  gender: "male",
  activityLevel: "veryActive",
  goal: "surplus",
};

console.log(distributeNutrition(person1));

function distributeNutrition(person) {
  const CAL_PROTIEN_GOAL = getGoalCalorieProtienTarget(person);
  const CALORIE_GOAL = CAL_PROTIEN_GOAL.goalCalorie;
  const PROTIEN_GOAL = CAL_PROTIEN_GOAL.protienTarget;
  var protienGather = 0;
  let protienFoodList = [...PROTIEN_FOOD_LIST];
  let utilizedFoodList = [];
  let usedFoodQty = [];

  while (protienGather <= PROTIEN_GOAL) {
    for (let i = 0; i < protienFoodList.length; i++) {
      let foodItem = protienFoodList[i];
      if (foodItem.allowenceQty == 0) {
        if (!usedFoodQty.includes(foodItem.food)) {
          usedFoodQty.push(foodItem.food);
        }
        continue;
      }
      protienGather += foodItem.protien;
      foodItem.allowenceQty--;
      utilizedFoodList.push(foodItem);
    }
    let allowanceOverride = false;
    if (usedFoodQty.length == protienFoodList.length) {
      allowanceOverride = true;
    } else {
      allowanceOverride = false;
    }
    if (allowanceOverride) {
      return { message: "Basket overridden", basket: usedFoodQty };
    }
  }
  return utilizedFoodList;
}
// console.log(parseInt(getMaintenceCalorie(person1)));
// console.log(getMaintenceCalorie(person2));
