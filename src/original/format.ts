export const getAuthinticatedPropertyList = (
	authinticatedPropertoes: readonly {
		readonly property: string;
	}[]
): readonly string[] => {
	const properties = authinticatedPropertoes.map((data) => {
		return data.property
	})
	return properties
}

export const getLockupValuesMap = (
	lockupSumValues: readonly {
		readonly property_address: string;
		readonly sum_values: string;
	}[]
): ReadonlyMap<string, string> => {
	const values = lockupSumValues.map<readonly [string, string]>(
		({ property_address, sum_values }) => [property_address, sum_values]
	)
	return new Map<string, string>(values)
}
