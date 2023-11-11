export const getRandomEnum = <T>(anEnum: T) => {
	const enumValues = Object.keys(anEnum) as Array<keyof T>;
	// remove the UNKNOWN enum at index 0
	enumValues.shift();
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumKey = enumValues[randomIndex];
	return anEnum[randomEnumKey];
};
