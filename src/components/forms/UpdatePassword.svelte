<script>
	import Button from "@/components/Button.astro"
	import Textbox from "@/components/Textbox.astro"
	import Textpassword from "@/components/Textpassword.astro"
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
    <div class="w-max max-w-md border border-orange-500 bg-white p-8 shadow-md">
      <form method="post" on:submit={(e) => handleUpdatePassword(e)} >
        <h2 class="mb-4 mr-32 text-2xl font-bold">Nueva Contraseña</h2>
        <div class="mb-4">
        	<Textbox type="email" id="email" content="" placeholder="Correo" bind:value={email} />
        </div>
        {#if errors.email}
        <div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.email}</span>
        </div>
        {/if}
        <div class="mb-4">
          <Textpassword content="Nueva Contraseña" bind:value={newPassword} />
        </div>
        {#if errors.newPassword}   	
        <div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.newPassword}</span>
        </div>
        {/if}
        <div class="mb-4">
          <Textpassword content="Repetir Contraseña" bind:value={confirmPassword} />
        </div>
        {#if errors.confirmPassword}
        <div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.confirmPassword}</span>
       	</div>
        {/if}
        {#if errors.apiError}
        <div class="p-4 mb-4 w-80 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errors.apiError}</span>
        </div>
        {/if}
        <div class="mt-9 flex items-center justify-center">
          <Button content="Confirmar Contraseña" disabled={submitButtonDisabled} />
        </div>
      </form>
    </div>
  </div>
</section>
