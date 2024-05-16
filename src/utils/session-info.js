export function getCookies() {
	const cookies = document.cookie.split(";")
	const cookiesObject = {}
	cookies.forEach((cookie) => {
		const [key, value] = cookie.split("=")
		cookiesObject[key.trim()] = value
	})
	return cookiesObject
}
