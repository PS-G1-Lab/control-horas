async function translateText(text, sourceLanguage, targetLanguage) {
	const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2"
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
			"x-rapidapi-host": "deep-translate1.p.rapidapi.com",
		},
		body: JSON.stringify({
			q: text,
			source: sourceLanguage,
			target: targetLanguage,
		}),
	}

	try {
		const response = await fetch(url, options)
		const result = await response.json()
		return result.data.translations[0].translatedText
	} catch (error) {
		console.error(error)
	}
}

module.exports = translateText
