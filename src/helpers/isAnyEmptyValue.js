export default function isAnyEmptyValue(obj) {
	const someInvalid = []
	const entries = Object.entries(obj)
	if (entries.length <= 0) return true
	entries.forEach((entry) => {
		if (String(entry[1]).trim() === "") {
			someInvalid.push(true)
		}
	})
	return someInvalid.some((el) => el === true)
}
