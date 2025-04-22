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
    qty: 1,
    protien: 3.6,
    carbohydrates: 0.2,
    fats: 0.1,
    allowenceQty: 10,
  },
  {
    food: "Egg",
    calorie: 72,
    qtyInGrams: 58,
    qty: 1,
    protien: 6.3,
    carbohydrates: 0.4,
    fats: 4.8,
    allowenceQty: 3,
  },
  {
    food: "Chicken breast",
    calorie: 198,
    qtyInGrams: 100,
    qty: 1,
    protien: 37,
    carbohydrates: 0,
    fats: 4.3,
    allowenceQty: 2,
  },
  {
    food: "Soya chunks",
    calorie: 172,
    qtyInGrams: 50,
    qty: 1,
    protien: 26,
    carbohydrates: 16.5,
    fats: 0.5,
    allowenceQty: 1,
  },
];
const CARBOHYDRATES_FOOD_LIST = [
  {
    food: "Egg-Whites",
    calorie: 17,
    qtyInGrams: 58,
    qty: 1,
    protien: 3.6,
    carbohydrates: 0.2,
    fats: 0.1,
    allowenceQty: 10,
  },
];
const FATS_FOOD_LIST = [];

function totalBMRProcess(person) {
  const MAINTENCE_CALORIE = getMaintenceCalorie(person);
  const CALORIE_AND_PROTIEN_GOAL = getCalorieGoalTarget(person);
  const CALORIE_GOAL = CALORIE_AND_PROTIEN_GOAL.goalCalorie;
  //Holds the foods that is equally distributed and total calories of protien food
  const PROTIEN_DISTRIBUTION = distributeProtien(person);
  console.log(PROTIEN_DISTRIBUTION);
  const TOTAL_PROTIEN_CALORIE = PROTIEN_DISTRIBUTION.totalProtienCalorie;
  const UTILIZED_PROTIEN_FOOD_LIST = PROTIEN_DISTRIBUTION.utilizedFoodList;

  const CARBS_DISTRIBUTION = getGoalCarbsTarget(CALORIE_GOAL, person);
  if (UTILIZED_PROTIEN_FOOD_LIST) {
    const PROTIEN_FOOD_OBJECT = groupFoodData(UTILIZED_PROTIEN_FOOD_LIST);
    createFoodParagraph(PROTIEN_FOOD_OBJECT);
  } else {
    console.log("BASKET OVERRIDDEN");
  }
}

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
function getCalorieGoalTarget(person) {
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
function getGoalCarbsTarget(calorieGoal, person) {
  const GOAL = person.goal;
  let carbsCalories = 0;
  switch (GOAL) {
    case "deficit":
      carbsCalories = calorieGoal % 43;
      break;
    case "surplus":
      carbsCalories = calorieGoal % 45;
      break;
  }
  console.log(carbsCalories);
}
function distributeProtien(person) {
  const CAL_PROTIEN_GOAL = getCalorieGoalTarget(person);
  const CALORIE_GOAL = CAL_PROTIEN_GOAL.goalCalorie;
  const PROTIEN_GOAL = CAL_PROTIEN_GOAL.protienTarget;
  var protienGather = 0;
  let protienFoodList = [...PROTIEN_FOOD_LIST];
  let utilizedFoodList = [];
  let usedFoodQty = [];
  let totalProtienCalorie = 0;
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
      totalProtienCalorie += foodItem.calorie;
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
      return {
        utilizedFoodList: false,
        message: "Basket overridden",
        basket: usedFoodQty,
        totalProtienCalorie: 0,
      };
    }
  }
  return {
    utilizedFoodList: utilizedFoodList,
    totalProtienCalorie: totalProtienCalorie,
  };
}
// function distributeCarbohydrates(person,protienCalories) {
//   const CAL_GOAL = getGoalCalorieTarget(person);
//   const CALORIE_GOAL = CAL_GOAL.goalCalorie;
//   const PROTIEN_CAL_GOAL = protienCalories;
//   if(person.)
// }
function groupFoodData(dataArr) {
  let groupedObject = {};
  let totalCalorie = 0;
  let totalProtien = 0;
  for (let i = 0; i < dataArr.length; i++) {
    let key = dataArr[i].food;
    let row = dataArr[i];
    if (groupedObject[key]) {
      groupedObject[key].qty += row.qty;
      groupedObject[key].calorie += row.calorie;
      groupedObject[key].protien += row.protien;
      totalCalorie += row.calorie;
      totalProtien += row.protien;
    } else {
      groupedObject[key] = {
        qty: row.qty,
        calorie: row.calorie,
        protien: row.protien,
        carbohydrates: row.carbohydrates,
        fats: row.fats,
        gramQty: row.qtyInGrams,
      };
      totalCalorie += row.calorie;
      totalProtien += row.protien;
    }
  }
  groupedObject.totalNutrition = {
    totalCalorie: totalCalorie,
    totalProtien: totalProtien,
  };
  return groupedObject;
}
function createFoodParagraph(dataObject) {
  let paragraph = "";
  for (let key in dataObject) {
    if (key == "totalNutrition") {
      continue;
    }
    let row = dataObject[key];
    paragraph += `Food : ${key}\n 1.grams : ${row.gramQty}\n 2.qty :${row.qty}\n Total\n  1.protien :${row.protien}\n  2.Carbohydrates :${row.carbohydrates}\n  3.Fats :${row.fats}\n  4.calories :${row.calorie}\n\n`;
  }
  let totalNutrition = dataObject.totalNutrition;
  paragraph += `Total nutrition\n 1.Calorie : ${parseInt(
    totalNutrition.totalCalorie
  )}\n 2.Protien : ${parseInt(totalNutrition.totalProtien)}`;
  console.log(paragraph);
}

let person1 = {
  name: "Navin derick",
  weight: 91,
  height: 186,
  age: 31,
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
totalBMRProcess(person1);
// let protienDataObj = groupFoodData(distributeProtien(person1));
// let protienCalories = protienDataObj.totalNutrition;
// createFoodParagraph(protienDataObj);
// console.log(parseInt(getMaintenceCalorie(person1)));
// console.log(getMaintenceCalorie(person2));
