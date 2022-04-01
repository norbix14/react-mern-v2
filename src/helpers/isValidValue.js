export default function isValidValue (value) {
	if (!value || String(value).trim() === "") return false
	return true
}
