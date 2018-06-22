import {loadMeatFromData} from "./Meat";
import {loadToppingFromData} from "./Topping";

export function calculateCostPerLb(meal) {
    if (!meal.meats) {
        return 0;
    }
    return meal.meats.reduce((carry, meat) => {
        return carry + meat.cost_per_lb;
    }, 0) / meal.meats.length;
}

export class Meal {}

export const loadMealFromData = function(data) {
    let meal = new Meal();

    meal.id = data.id;
    meal.code = data.code;
    meal.label = data.label;
    meal.variety = data.variety;
    meal.meal_value = data.meal_value;
    meal.has_bone = data.has_bone;

    meal.calendar_code = data.pivot ? data.pivot.calendar_code : null;
    meal.pivot = data.pivot;

    meal.meats = data.meats ? data.meats.map(meat => loadMeatFromData(meat)) : null;
    meal.toppings = data.toppings ? data.toppings.map(topping => loadToppingFromData(topping)) : null;

    meal.cost_per_lb = 0 || calculateCostPerLb(meal);
    return meal;
};