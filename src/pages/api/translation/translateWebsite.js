const { JSDOM } = require("jsdom")
const translateText = require("./translates")

async function translateWebsite(url, originalLanguage, targetLanguage) {
	const response = await fetch(url)
	const html = await response.text()

	const dom = new JSDOM(html)
	const document = dom.window.document
	const textNodes = Array.from(
		document.body.querySelectorAll("*:not(script):not(style):not([href])")
	)
		.flatMap((element) => Array.from(element.childNodes))
		.filter((node) => node.nodeType === Node.TEXT_NODE)

	await Promise.all(
		textNodes.map(async (node) => {
			const text = node.textContent.trim()
			if (text) {
				const translatedText = await translateText(text, originalLanguage, targetLanguage)
				node.textContent = node.textContent.replace(text, translatedText)
			}
		})
	)

	return dom.serialize()
}

module.exports = translateWebsite
