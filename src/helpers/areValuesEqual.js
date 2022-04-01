const areValuesEqual = (value1, value2) => {
	const isEmpty = (_value) => String(_value).trim() === ""
	const cleanValue = (_value) => String(_value).trim()
	if (!value1 || !value2) return false
	if (isEmpty(value1) || isEmpty(value2)) return false
	if (cleanValue(value1) !== cleanValue(value2)) return false
	return true
}

export default areValuesEqual
