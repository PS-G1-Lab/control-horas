<script>
	import { validateConfirmPassword, validateEmail, validatePassword } from "../../utils/form-validations"

	let email = ""
    let newPassword = ""
    let confirmPassword = ""
	const errors = {
		email: "",
		newPassword: "",
		confirmPassword: "",
		apiError: ""
	}

	async function handleUpdatePassword(e) {
		e.preventDefault()

		// Obtener los valores de los campos de entrada
		const formData = new FormData(e.target)
		const email = formData.get("email") // Obtener el valor del campo de correo electrónico

		const newPassword = formData.get("newPassword")
		const confirmPassword = formData.get("confirmPassword")

		// Validar el email
		errors.email = validateEmail(email)

		// Validar la nueva contraseña
		errors.newPassword = validatePassword(newPassword)

		// Validar la confirmación de la contraseña
		errors.confirmPassword = validateConfirmPassword(newPassword, confirmPassword)

		// Comprobar si hay errores de validación
		if (errors.email || errors.newPassword || errors.confirmPassword) {
			return
		}

		try {
			// Realizar la llamada a la API para actualizar la contraseña
			const response = await updatePasswordAPI(email, newPassword)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Error al actualizar la contraseña")
			}

			// Manejar el resultado exitoso aquí (por ejemplo, redirigir a una página de éxito)
			console.log("Contraseña actualizada correctamente!")
			} catch (error) {
				// Manejar errores de la API
				errors.apiError = error.message || "Hubo un problema al actualizar la contraseña"
				console.error("Error en la llamada a la API:", error)
			}
	}

	async function updatePasswordAPI(email, newPassword) {
		const url = "/api/update-password"
		const formData = new FormData()
		formData.append("email", email)
		formData.append("newPassword", newPassword)

		return await fetch(url, {
			method: "POST",
			body: formData
		})
	}

	// Lógica para deshabilitar el botón de confirmación
	$: submitButtonDisabled = !!errors.email || !!errors.newPassword || !!errors.confirmPassword
</script>

<section class="flex flex-col">
  <div class="flex h-screen items-center justify-center">
    <img
      src="img/man-question.svg"
      alt="Ilustración de un hombre pensando una contraseña"
      class="mr-6 hidden lg:block"
    />
    <div class="w-3/12 border border-orange-500 bg-white p-8 shadow-md">
      <form method="post" on:submit={(e) => handleUpdatePassword(e)}>
        <h2 class="mb-4 text-3xl font-bold">Nueva Contraseña</h2>
        <div class="mb-4">
					<p class="text-xl flex justify-normal font-sans font-bold"> Correo</p>
          <input type="email" id="email" placeholder="Correo" bind:value={email} class="w-full border-b-2 border-black mb-4 mt-4 outline-none" />
        </div>
        {#if errors.email}
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.email}</span>
        </div>
        {/if}
        <div class="mb-4">
					<p class="text-xl flex justify-normal font-sans font-bold"> Contraseña</p>
          <input type="password" id="newPassword" placeholder="Nueva Contraseña" bind:value={newPassword} class="w-full mb-4 mt-4 border-b-2 border-black outline-none" />
        </div>
        {#if errors.newPassword}   
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.newPassword}</span>
        </div>
        {/if}
        <div class="mb-4">
					<p class="text-xl flex justify-normal font-sans font-bold"> Repetir contraseña</p>
          <input type="password" id="confirmPassword" placeholder="Repetir Contraseña" bind:value={confirmPassword} class="w-full mt-4 mb-4 border-b-2 border-black outline-none" />
        </div>
        {#if errors.confirmPassword}
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.confirmPassword}</span>
        </div>
        {/if}
        {#if errors.apiError}
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.apiError}</span>
        </div>
        {/if}
        <div class="flex justify-center">
          <input
            type="submit"
            value="Confirmar contraseña"
            class="mx-auto w-56 justify-center rounded-full bg-orange-500 px-4 py-2 text-lg font-bold text-white hover:bg-orange-600 cursor-pointer"
          />
        </div>
      </form>
    </div>
  </div>
</section>


