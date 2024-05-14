import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData()
	const classData = {}
	for (const [key, value] of formData.entries()) {
		classData[key] = value
	}

	// const response = await fetch("http://localhost:1234/class", {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await fetch("https://control-horas-api.onrender.com/class", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(classData),
	})
		.then((response) => response.json())
		.catch((error) => error as Error)

	return new Response(JSON.stringify(response))
}
