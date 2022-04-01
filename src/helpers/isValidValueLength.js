const isValidValueLength = (value, length = 6) => {
	const cleanValue = (_value) => String(_value).trim()
	const valueLength = (_value) => cleanValue(_value).length
	if (valueLength(value) <= 0 || valueLength(value) < length) return false
	return true
}

export default isValidValueLength
