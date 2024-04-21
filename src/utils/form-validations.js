export function validateUserName(userName) {
	if (userName === "") {
		return "El nombre es requerido"
	} else if (userName.length < 3) {
		return "El nombre debe ser de al menos 3 caracteres"
	} else return ""
}

export function validateEmail(email) {
	if (email === "") {
		return "El email es requerido"
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		return "El correo no es válido"
	} else return ""
}

export function validatePassword(password) {
	if (password === "") {
		return "La contraseña es requerida"
	} else if (password.length < 8) {
		return "La contraseña debe ser de al menos 8 caracteres"
	} else return ""
}

export function confirmPassword(password, confirmPassword) {
	if (confirmPassword === "") {
		return "La confirmación de la contraseña es requerida"
	} else if (password !== confirmPassword) {
		return "Las contraseñas no coinciden"
	} else return ""
}

export async function validateResponse(response) {
	if (!response.ok) {
		const error = await response.json()
		return error.message
	}
}

export function validateResult(result) {
	if (result?.error) {
		return result.error
	}
}
