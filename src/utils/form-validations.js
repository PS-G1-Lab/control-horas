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

export function validateConfirmPassword(password, confirmPassword) {
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
	} else return ""
}

export function validateResult(result) {
	if (result?.error) {
		return result.error
	} else return ""
}

export function validateTitle(title) {
	if (title === "") {
		return "El título es requerido"
	} else if (title.length < 3) {
		return "El título debe ser de al menos 3 caracteres"
	} else return ""
}

export function validateDate(date) {
	if (date === "") {
		return "La fecha es requerida"
	} else return ""
}

export function validateHour(hour) {
	if (hour === "") {
		return "La hora es requerida"
	} else return ""
}

export function validateDescription(description) {
	if (description === "") {
		return "La descripción es requerida"
	} else if (description.length < 10) {
		return "La descripción debe ser de al menos 10 caracteres"
	} else return ""
}

export function validateSubject(title) {
	if (title === "") {
		return "La asignatura es requerida"
	} else if (title.length < 3) {
		return "La asignatura debe ser de al menos 3 caracteres"
	} else return ""
}
