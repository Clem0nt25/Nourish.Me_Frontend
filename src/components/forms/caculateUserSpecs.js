function caculateUserSpecs(input, userId) {
	const currDate = new Date();
	const userAge = currDate.getFullYear() - input.yearOfBirth;

	const goalWeight =
		Number(input.currentWeight) +
		(input.mainGoal === "get-lean"
			? -Number(input.goalWeightChange)
			: Number(input.goalWeightChange));

	let activityFactor = 1.2;
	switch (input.activityLevel) {
		case "sedentary":
			activityFactor = 1.2;
			break;
		case "light":
			activityFactor = 1.375;
			break;
		case "moderate":
			activityFactor = 1.55;
			break;
		case "active":
			activityFactor = 1.725;
			break;
		case "intense":
			activityFactor = 1.9;
			break;
	}

	let coloriesGapDaily = 0;
	switch (input.weightChangePerWeek) {
		case "0.25kg":
			coloriesGapDaily = 250;
			break;
		case "0.5kg":
			coloriesGapDaily = 500;
			break;
		case "0.75kg":
			coloriesGapDaily = 750;
			break;
		case "skip":
			coloriesGapDaily = 0;
			break;
	}

	const baseCalories =
		(10 * input.currentWeight +
			6.25 * input.height -
			5 * userAge +
			(input.gender === "female" ? -161 : 5)) *
		activityFactor;

	const goalCalories = Math.round(
		baseCalories +
			(input.mainGoal === "get-lean" ? -coloriesGapDaily : coloriesGapDaily)
	);

	const nutritionProportion = {};
	switch (input.mainGoal) {
		case "bulk-up":
			nutritionProportion.protein = 0.23;
			nutritionProportion.carbs = 0.5;
			nutritionProportion.fat = 0.27;
			break;
		case "get-strong":
			nutritionProportion.protein = 0.2;
			nutritionProportion.carbs = 0.58;
			nutritionProportion.fat = 0.22;
			break;
		case "recompose":
			nutritionProportion.protein = 0.28;
			nutritionProportion.carbs = 0.5;
			nutritionProportion.fat = 0.22;
			break;
		case "get-lean":
			nutritionProportion.protein = 0.38;
			nutritionProportion.carbs = 0.4;
			nutritionProportion.fat = 0.22;
			break;
		case "keep-shape":
			nutritionProportion.protein = 0.2;
			nutritionProportion.carbs = 0.55;
			nutritionProportion.fat = 0.25;
			break;
	}

	const goalProtein = Math.round(
		(nutritionProportion.protein * goalCalories) / 4
	);
	const goalCarbs = Math.round((nutritionProportion.carbs * goalCalories) / 4);
	const goalFat = Math.round((nutritionProportion.fat * goalCalories) / 9);

	const userSpecsFromInput = { ...input };
	delete userSpecsFromInput.goalWeightChange;

	const userSpecs = {
		...userSpecsFromInput,
		goalWeight,
		goalCalories,
		goalProtein,
		goalCarbs,
		goalFat,
		goalFiber: 30,
		data: currDate.toISOString().split("T")[0],
		userId,
	};

	return userSpecs;
}

export default caculateUserSpecs;
