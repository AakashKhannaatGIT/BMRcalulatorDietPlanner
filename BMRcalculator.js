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
    food: "Whole-wheat bread",
    calorie: 81,
    qtyInGrams: 32,
    qty: 1,
    protien: 4,
    carbohydrates: 14,
    fats: 1.1,
    allowenceQty: 10,
  },
  {
    food: "Cooked White Rice",
    calorie: 205,
    qtyInGrams: 158,
    qty: 1,
    protien: 4.3,
    carbohydrates: 45,
    fats: 0.4,
    allowenceQty: 2,
  },
  {
    food: "Oats",
    calorie: 153,
    qtyInGrams: 41,
    qty: 1,
    protien: 5.3,
    carbohydrates: 27,
    fats: 2.6,
    allowenceQty: 2,
  },
  {
    food: "Red banana",
    calorie: 52.5,
    qtyInGrams: 59,
    qty: 1,
    protien: 0.7,
    carbohydrates: 13.5,
    fats: 0.2,
    allowenceQty: 2,
  },
];
const FATS_FOOD_LIST = [
  {
    food: "Almonds",
    calorie: 7.7,
    qtyInGrams: 1.3,
    qty: 1,
    protien: 0.3,
    carbohydrates: 0.3,
    fats: 0.7,
    allowenceQty: 30,
  },
  {
    food: "Peanut Butter",
    calorie: 94,
    qtyInGrams: 16,
    qty: 1,
    protien: 3.5,
    carbohydrates: 3.9,
    fats: 8,
    allowenceQty: 2,
  },
  {
    food: "Milk",
    calorie: 122,
    qtyInGrams: 244,
    qty: 1,
    protien: 8.1,
    carbohydrates: 12,
    fats: 4.8,
    allowenceQty: 1,
  },
];

function totalBMRProcess(person) {
  const MAINTENCE_CALORIE = getMaintenceCalorie(person);
  const CALORIE_AND_PROTIEN_GOAL = getCalorieGoalTarget(person);
  const CALORIE_GOAL = CALORIE_AND_PROTIEN_GOAL.goalCalorie;
  console.log(CALORIE_GOAL);
  //Holds the foods that is equally distributed and total calories of protien food
  const PROTIEN_DISTRIBUTION = distributeProtien(person);
  const TOTAL_PROTIEN_CALORIE = PROTIEN_DISTRIBUTION.totalProtienCalorie;
  const UTILIZED_PROTIEN_FOOD_LIST = PROTIEN_DISTRIBUTION.utilizedFoodList;

  const CARBS_DISTRIBUTION = distributeCarbohydrates(CALORIE_GOAL, person);
  const TOTAL_CARBS_CALORIE = CARBS_DISTRIBUTION.totalCarbsCalorie;
  const UTILIZED_CARBS_FOOD_LIST = CARBS_DISTRIBUTION.utilizedFoodList;

  const TOTAL_FATS_CALORIE =
    CALORIE_GOAL - (TOTAL_CARBS_CALORIE + TOTAL_PROTIEN_CALORIE);
  const FATS_DISTRIBUTION = distributeFats(TOTAL_FATS_CALORIE);
  const UTILIZED_FATS_FOOD_LIST = FATS_DISTRIBUTION.utilizedFoodList;
  let protienParagraphList;
  let carbsParagraphList;
  let fatsParagraphList;
  if (UTILIZED_PROTIEN_FOOD_LIST) {
    const PROTIEN_FOOD_OBJECT = groupFoodData(UTILIZED_PROTIEN_FOOD_LIST);
    protienParagraphList = createFoodParagraph(PROTIEN_FOOD_OBJECT);
  } else {
    console.log("PROTIEN BASKET OVERRIDDEN");
  }
  if (UTILIZED_CARBS_FOOD_LIST) {
    const CARBS_FOOD_OBJECT = groupFoodData(UTILIZED_CARBS_FOOD_LIST);
    carbsParagraphList = createFoodParagraph(CARBS_FOOD_OBJECT);
  } else {
    console.log("CARBOHYDRATES BASKET OVERRIDDEN");
  }
  if (UTILIZED_FATS_FOOD_LIST) {
    const FATS_FOOD_OBJECT = groupFoodData(UTILIZED_FATS_FOOD_LIST);
    fatsParagraphList = createFoodParagraph(FATS_FOOD_OBJECT);
  } else {
    console.log("FATS BASKET OVERRIDDEN");
  }
  produceDataTableInHTML(
    protienParagraphList,
    carbsParagraphList,
    fatsParagraphList
  );
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
      if (protienGather >= PROTIEN_GOAL) {
        break;
      }
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
function getGoalCarbsTarget(calorieGoal, person) {
  const GOAL = person.goal;
  let carbsCalories = 0;
  switch (GOAL) {
    case "deficit":
      carbsCalories = (calorieGoal * 43) / 100;
      break;
    case "surplus":
      carbsCalories = (calorieGoal * 45) / 100;
      break;
  }
  return parseInt(carbsCalories);
}

function distributeCarbohydrates(calorieGoal, person) {
  const CARBS_CALORIE_GOAL = getGoalCarbsTarget(calorieGoal, person);
  var carbsGather = 0;
  let carbsFoodList = [...CARBOHYDRATES_FOOD_LIST];
  let utilizedFoodList = [];
  let usedFoodQty = [];
  let totalCarbsInGrams = 0;
  while (carbsGather <= CARBS_CALORIE_GOAL) {
    for (let i = 0; i < carbsFoodList.length; i++) {
      let foodItem = carbsFoodList[i];
      if (foodItem.allowenceQty == 0) {
        if (!usedFoodQty.includes(foodItem.food)) {
          usedFoodQty.push(foodItem.food);
        }
        continue;
      }
      carbsGather += foodItem.calorie;
      totalCarbsInGrams += foodItem.carbohydrates;
      foodItem.allowenceQty--;
      utilizedFoodList.push(foodItem);
      if (carbsGather >= CARBS_CALORIE_GOAL) {
        break;
      }
    }
    let allowanceOverride = false;
    if (usedFoodQty.length == carbsFoodList.length) {
      allowanceOverride = true;
    } else {
      allowanceOverride = false;
    }
    if (allowanceOverride) {
      return {
        utilizedFoodList: false,
        message: "Carbs Basket overridden",
        basket: usedFoodQty,
        totalCarbsInGrams: 0,
      };
    }
  }
  return {
    utilizedFoodList: utilizedFoodList,
    totalCarbsInGrams: totalCarbsInGrams,
    totalCarbsCalorie: CARBS_CALORIE_GOAL,
  };
}
function distributeFats(fatsCalorieGoal) {
  var fatsGather = 0;
  let fatsFoodList = [...FATS_FOOD_LIST];
  let utilizedFoodList = [];
  let usedFoodQty = [];
  let totalFatsInGrams = 0;
  while (fatsGather <= fatsCalorieGoal) {
    for (let i = 0; i < fatsFoodList.length; i++) {
      let foodItem = fatsFoodList[i];
      if (foodItem.allowenceQty == 0) {
        if (!usedFoodQty.includes(foodItem.food)) {
          usedFoodQty.push(foodItem.food);
        }
        continue;
      }
      fatsGather += foodItem.calorie;
      totalFatsInGrams += foodItem.fats;
      foodItem.allowenceQty--;
      utilizedFoodList.push(foodItem);
      if (fatsGather >= fatsCalorieGoal) {
        break;
      }
    }
    let allowanceOverride = false;
    if (usedFoodQty.length == fatsFoodList.length) {
      allowanceOverride = true;
    } else {
      allowanceOverride = false;
    }
    if (allowanceOverride) {
      return {
        utilizedFoodList: false,
        message: "Fats Basket overridden",
        basket: usedFoodQty,
        totalFatsInGrams: 0,
      };
    }
  }
  return {
    utilizedFoodList: utilizedFoodList,
    totalFatsInGrams: totalFatsInGrams,
    totalFatsCalorie: fatsCalorieGoal,
  };
}
function groupFoodData(dataArr) {
  let groupedObject = {};
  let totalCalorie = 0;
  let totalProtien = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  for (let i = 0; i < dataArr.length; i++) {
    let key = dataArr[i].food;
    let row = dataArr[i];
    if (groupedObject[key]) {
      groupedObject[key].qty += row.qty;
      groupedObject[key].calorie += row.calorie;
      groupedObject[key].protien += row.protien;
      totalCalorie += row.calorie;
      totalProtien += row.protien;
      totalCarbs += row.carbohydrates;
      totalFats += row.fats;
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
      totalCarbs += row.carbohydrates;
      totalFats += row.fats;
    }
  }
  groupedObject.totalNutrition = {
    totalCalorie: totalCalorie.toFixed(2),
    totalProtien: totalProtien.toFixed(2),
    totalCarbs: totalCarbs.toFixed(2),
    totalFats: totalFats.toFixed(2),
  };
  return groupedObject;
}
function createFoodParagraph(dataObject) {
  let paragraph = "";
  let paraArr = [];

  let arrPara = "";
  for (let key in dataObject) {
    if (key == "totalNutrition") {
      continue;
    }
    let row = dataObject[key];
    paragraph += `Food : ${key}<br> 1.grams : ${parseInt(
      row.gramQty
    )}<br> 2.qty :${parseInt(row.qty)}<br> Total<br>  1.protien :${parseInt(
      row.protien
    )}<br>  2.Carbohydrates :${row.carbohydrates}<br>  3.Fats :${
      row.fats
    }<br>  4.calories :${row.calorie}<br><br>`;
    arrPara = `Food : ${key}<br> 1.grams : ${parseInt(
      row.gramQty
    )}<br> 2.qty :${parseInt(row.qty)}<br> Total<br>  1.protien :${parseInt(
      row.protien
    )}<br>  2.Carbohydrates :${row.carbohydrates}<br>  3.Fats :${
      row.fats
    }<br>  4.calories :${row.calorie}<br><br>`;
    paraArr.push(arrPara);
  }
  console.log(paraArr);
  let totalNutrition = dataObject.totalNutrition;
  paragraph += `Total nutrition<br> 1.Calorie : ${parseInt(
    totalNutrition.totalCalorie
  )}<br> 2.Protien : ${parseInt(
    totalNutrition.totalProtien
  )}<br> 3.Carbohydrates : ${parseInt(totalNutrition.totalCarbs)}`;
  arrPara = `Total nutrition<br> 1.Calorie : ${parseInt(
    totalNutrition.totalCalorie
  )}<br> 2.Protien : ${parseInt(
    totalNutrition.totalProtien
  )}<br> 3.Carbohydrates : ${parseInt(totalNutrition.totalCarbs)}<br>
   4.Fats : ${parseInt(totalNutrition.totalFats)}`;

  return { paraArr: paraArr, arrPara: arrPara };
  // console.log(paragraph);
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
function produceDataTableInHTML(protienParaObj, carbsParaObj, fatsParaObj) {
  let protienArr = protienParaObj.paraArr;
  let carbsArr = carbsParaObj.paraArr;
  let fatsArr = fatsParaObj.paraArr;

  let protienTotalPara = protienParaObj.arrPara;
  let carbsTotalPara = carbsParaObj.arrPara;
  let fatsTotalPara = fatsParaObj.arrPara;

  let tableRowLength = protienArr.length;
  if (tableRowLength < carbsArr.length) {
    tableRowLength = carbsArr.length;
  }
  if (tableRowLength < fatsArr.length) {
    tableRowLength = fatsArr.length;
  }
  let tableString = `<table>`;
  for (let i = 0; i < tableRowLength; i++) {
    tableString += `<tr>
                      <td>${protienArr[i] ? protienArr[i] : ""}</td>
                      <td>${carbsArr[i] ? carbsArr[i] : ""}</td>
                      <td>${fatsArr[i] ? fatsArr[i] : ""}</td>
                    </tr>`;
  }
  tableString += `<tr>
                    <td>${protienTotalPara}</td>
                    <td>${carbsTotalPara}</td>
                    <td>${fatsTotalPara}</td>
                  </tr>`;
  tableString += `</table>`;
  let tableDataPreview = document.getElementById("workTable");
  tableDataPreview.innerHTML = tableString;
}
