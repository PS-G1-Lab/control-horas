import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData()
	const userData = {}
	for (const [key, value] of formData.entries()) {
		userData[key] = value
	}

	// const response = await fetch("https://control-horas-api-dev-zjjb.2.ie-1.fl0.io/class/registerInClass", {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await fetch("http://localhost:1234/user/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((response) => response.json())
		.catch((error) => error as Error)

	return new Response(JSON.stringify(response))
}
